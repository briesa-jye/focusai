import { requireSession } from "@/lib/session";
import { listRequests } from "@/lib/store";
import RequestForm from "./RequestForm";

export const metadata = { title: "Requests | Focus AI portal" };
const badge = { Open: "bg-sky-100 text-sky-800", "In progress": "bg-amber-100 text-amber-800", Done: "bg-emerald-100 text-emerald-800" };

export default async function Page() {
  const { org } = await requireSession();
  const rows = await listRequests(org.id);
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl">Requests</h1>
      <p className="mt-1 text-black/60">Ask our team for changes, training or new work.</p>
      <RequestForm />
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
