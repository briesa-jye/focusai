import { requireStaff } from "@/lib/session";
import { listRequests } from "@/lib/store";
import { orgs } from "@/lib/portal-data";
import { updateRequestStatus } from "../../../actions";

export const metadata = { title: "All requests | Focus AI portal" };

export default async function Page() {
  await requireStaff();
  const reqs = await listRequests();
  const name = (id: string) => orgs.find((o) => o.id === id)?.name ?? id;
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl">Client requests</h1>
      <p className="mt-1 text-black/60">Move requests through the pipeline. Clients see the change straight away.</p>
      <ul className="mt-8 divide-y divide-black/10 rounded-lg bg-white">
        {reqs.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="font-medium">{r.title}</p>
              <p className="text-xs text-black/50">{name(r.orgId)} · Raised {r.date}</p>
            </div>
            <form action={updateRequestStatus} className="flex gap-2">
              <input type="hidden" name="id" value={r.id} />
              <select name="status" defaultValue={r.status} className="rounded-md border border-black/15 px-2 py-2 text-xs">
                <option>Open</option><option>In progress</option><option>Done</option>
              </select>
              <button className="rounded-md bg-[#121f2c] px-3 py-2 text-xs text-white">Update</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
