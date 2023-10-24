"use server";

import { revalidatePath } from "next/cache";

export async function getMetadata() {
  console.log("sias");
  const response = await fetch("https://core.venturatravel.org/v1/metadata", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua": '"Not=A?Brand";v="99", "Chromium";v="118"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-hasura-admin-secret": "secret",
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
  console.log(data);
  revalidatePath("/");
}
