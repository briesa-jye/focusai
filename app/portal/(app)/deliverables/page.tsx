import { requireSession } from "@/lib/session";
import { deliverables } from "@/lib/portal-data";

export const metadata = { title: "Deliverables | Focus AI portal" };

export default async function Page() {
  const { org } = await requireSession();
  const rows = deliverables.filter((d) => d.orgId === org.id);
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl">Deliverables</h1>
      <p className="mt-1 text-black/60">Reports, documents and recordings from your engagement.</p>
      <ul className="mt-8 divide-y divide-black/10 rounded-lg bg-white">
        {rows.map((d) => (
          <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="font-medium">{d.title}</p>
              <p className="text-xs text-black/50">{d.type} · {d.date} · {d.size}</p>
            </div>
            <button className="rounded-md border border-black/15 px-3 py-2 text-xs" title="Sample data: no file attached">Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
