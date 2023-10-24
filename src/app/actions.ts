"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

const endpoint = process.env.HASURA_ENDPOINT as string;

export async function updateMetadata() {
  const response = await fetch(endpoint, {
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
    },
    referrer:
      "https://core.venturatravel.org/console/events/data/make_trip_version_create/modify",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"type":"export_metadata","version":2,"args":{}}',
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const data = await response.json();
  await kv.set(endpoint, extractEventsByTable(data));
  revalidatePath("/");
}

export async function getMetadata() {
  const service = await kv.get<Record<string, any>>(endpoint);

  if (!service) {
    await updateMetadata();
  }

  revalidatePath("/");
}

function extractEventsByTable(metadata: any) {
  const mainDb = metadata.metadata.sources.find(
    (i: any) => i.name === "default",
  );
  if (!mainDb) {
    console.log("No main db found");
    return -1;
  }
  // get first 10
  const tablesWithEventTriggers = mainDb.tables.filter(
    (i: any) => i.event_triggers?.length > 0,
  );
  const eventTriggers = new Map();

  for (const table of tablesWithEventTriggers) {
    for (const eventTrigger of table.event_triggers) {
      const previousEventTrigger = eventTriggers.get(table.table.name) || [];

      let insertColumns = eventTrigger.definition?.insert?.columns;
      if (
        insertColumns &&
        Array.isArray(insertColumns) &&
        insertColumns.length > 0
      ) {
        insertColumns = insertColumns.join(", ");
      }

      let updateColumns = eventTrigger.definition?.update?.columns;
      if (
        updateColumns &&
        Array.isArray(updateColumns) &&
        updateColumns.length > 0
      ) {
        updateColumns = updateColumns.join(", ");
      }

      let deleteColumns = eventTrigger.definition?.delete?.columns;
      if (
        deleteColumns &&
        Array.isArray(deleteColumns) &&
        deleteColumns.length > 0
      ) {
        deleteColumns = deleteColumns.join(", ");
      }

      const formattedEventTrigger = {
        name: eventTrigger.name,
        webhook: eventTrigger.webhook,
        insert: insertColumns,
        update: updateColumns,
        delete: deleteColumns,
      };
      eventTriggers.set(table.table.name, [
        ...previousEventTrigger,
        formattedEventTrigger,
      ]);
    }
  }

  const asObject = Object.fromEntries(eventTriggers);
  return asObject;
}
