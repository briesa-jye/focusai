import { requireSession } from "@/lib/session";
import { requests } from "@/lib/portal-data";

export const metadata = { title: "Requests | Focus AI portal" };
const badge = { Open: "bg-sky-100 text-sky-800", "In progress": "bg-amber-100 text-amber-800", Done: "bg-emerald-100 text-emerald-800" };

export default async function Page() {
  const { org } = await requireSession();
  const rows = requests.filter((r) => r.orgId === org.id);
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl">Requests</h1>
      <p className="mt-1 text-black/60">Ask our team for changes, training or new work.</p>
      <form className="mt-8 flex flex-col gap-3 rounded-lg bg-white p-5 sm:flex-row">
        <input className="field flex-1" placeholder="Describe what you need (sample form, not saved yet)" />
        <button type="button" className="rounded-md bg-[#121f2c] px-5 py-3 text-sm font-medium text-white">Submit request</button>
      </form>
      <ul className="mt-6 divide-y divide-black/10 rounded-lg bg-white">
        {rows.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="font-medium">{r.title}</p>
              <p className="text-xs text-black/50">Raised {r.date} · Owner: {r.owner}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs ${badge[r.status]}`}>{r.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
