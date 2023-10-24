import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Settings from "@/components/settings";

function Explorer() {
  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-2xl">Database Event Explorer</h1>
        <div className="flex gap-2">
          <Button disabled>Update Metadata</Button>
          <Settings />
        </div>
      </div>
      <form className="mb-4">
        <div className="relative">
          <svg
            className=" absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <Input
            className="pl-8 w-full"
            placeholder="Search tables and triggers..."
            type="search"
          />
        </div>
      </form>
      <div className="flex-1 overflow-y-auto border rounded-lg border-zinc-200 dark:border-zinc-800">
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
          <li className="p-4">
            <details>
              <summary className="font-medium cursor-pointer">
                Table 1: Client
              </summary>
              <table className="table-fixed text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                <thead>
                  <tr>
                    <th className="w-1/4 px-4 py-2">Trigger Name</th>
                    <th className="w-1/4 px-4 py-2">Webhook URL</th>
                    <th className="w-1/6 px-4 py-2">Update</th>
                    <th className="w-1/6 px-4 py-2">Insert</th>
                    <th className="w-1/6 px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md">
                    <td className="border px-4 py-2">client_translate_to_en</td>
                    <td className="border px-4 py-2">
                      {`{{HASURA_QUEUE_URL}}/globalEventHandlerQueue?action=/client/translate&topic=EVENT_HANDLER`}
                    </td>
                    <td className="border px-4 py-2">
                      allergies, discapacities
                    </td>
                    <td className="border px-4 py-2">None</td>
                    <td className="border px-4 py-2">None</td>
                  </tr>
                  <tr className="bg-blue-200 dark:bg-blue-800 p-2 rounded-md">
                    <td className="border px-4 py-2">find_duplicated_client</td>
                    <td className="border px-4 py-2">
                      {`{{HASURA_QUEUE_URL}}/globalEventHandlerQueue?action=/client/validate-duplication&topic=EVENT_HANDLER`}
                    </td>
                    <td className="border px-4 py-2">None</td>
                    <td className="border px-4 py-2">*</td>
                    <td className="border px-4 py-2">None</td>
                  </tr>
                  <tr className="bg-pink-200 dark:bg-pink-800 p-2 rounded-md">
                    <td className="border px-4 py-2">hubspot_sync_client</td>
                    <td className="border px-4 py-2">
                      {`{{HASURA_QUEUE_URL}}/hsQueue?action=/hubspot_sync/sync_contact&topic=EVENT_HANDLER`}
                    </td>
                    <td className="border px-4 py-2">
                      can_be_contacted, birth_date, passport_expiration_date,
                      passport_issue_date, address_one, address_two, allergies,
                      client_rate_id, food_type_id, full_name, old_id_tmp,
                      rating_comment, salutation_type_id, created_at,
                      updated_at, country_address_id, id, nationality_id,
                      passport_country_id, rating_user_id, calling_name, city,
                      company_name, emergency_
                    </td>
                    <td className="border px-4 py-2">*</td>
                    <td className="border px-4 py-2">None</td>
                  </tr>
                </tbody>
              </table>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="">
      <h1 className="text-4xl font-bold text-center">Hasura events viewer</h1>
      <Explorer />
    </main>
  );
}
