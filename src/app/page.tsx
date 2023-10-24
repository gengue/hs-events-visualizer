import { kv } from "@vercel/kv";
import Header from "@/components/header";

const endpoint = process.env.HASURA_ENDPOINT as string;

export default async function Home({ searchParams }: { searchParams: any }) {
  const service = await kv.get<Record<string, any>>(endpoint);

  let result = service ? Object.entries(service) : [];
  if (service && searchParams?.search) {
    result = Object.entries(service).reduce(
      (acc, [tableName, triggers]: any) => {
        // filter by trigger name or table name
        const filteredTriggers = triggers.filter(
          (trigger: any) =>
            trigger.name.includes(searchParams.search) ||
            trigger.webhook.includes(searchParams.search) ||
            tableName.includes(searchParams.search),
        );

        if (filteredTriggers.length > 0) {
          acc.push([tableName, filteredTriggers]);
        }
        return acc;
      },
      [] as any[],
    );
  }

  return (
    <main className="">
      <h1 className="text-4xl font-bold text-center">Hasura events viewer</h1>
      {searchParams?.search && (
        <p className="text-center text-xl mt-4">
          Showing events for <code>{searchParams.search}</code>
        </p>
      )}
      <div className="flex flex-col h-full p-6">
        <Header />
        <div className="flex-1 overflow-y-auto border rounded-lg border-zinc-200 dark:border-zinc-800">
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {result?.map(([tableName, triggers]) => (
              <li className="p-4" key={tableName}>
                <details>
                  <summary className="font-medium cursor-pointer">
                    {tableName} ({triggers.length})
                  </summary>
                  <table className="table-fixed text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                    <thead>
                      <tr>
                        <th className="w-1/4 px-4 py-2">Trigger Name</th>
                        <th className="w-1/4 px-4 py-2">Webhook URL</th>
                        <th className="w-1/6 px-4 py-2">Insert</th>
                        <th className="w-1/6 px-4 py-2">Update</th>
                        <th className="w-1/6 px-4 py-2">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {triggers.map((trigger: any) => (
                        <tr
                          className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md"
                          key={trigger.webhook}
                        >
                          <td className="border px-4 py-2">{trigger.name}</td>
                          <td className="border px-4 py-2">
                            {trigger.webhook}
                          </td>
                          <td className="border px-4 py-2">{trigger.insert}</td>
                          <td className="border px-4 py-2">{trigger.update}</td>
                          <td className="border px-4 py-2">{trigger.delete}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
