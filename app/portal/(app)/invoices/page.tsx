import { requireSession } from "@/lib/session";
import { invoices } from "@/lib/portal-data";

export const metadata = { title: "Invoices | Focus AI portal" };
const badge = { Paid: "bg-emerald-100 text-emerald-800", Due: "bg-amber-100 text-amber-800", Overdue: "bg-rose-100 text-rose-800" };

export default async function Page() {
  const { user, org } = await requireSession();
  if (user.role !== "admin") {
    return (
      <div className="max-w-5xl">
        <h1 className="text-3xl">Invoices</h1>
        <p className="mt-4 rounded-lg bg-white p-6 text-black/70">Only client admins can view invoices. Ask your admin for access.</p>
      </div>
    );
  }
  const rows = invoices.filter((i) => i.orgId === org.id);
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl">Invoices</h1>
      <p className="mt-1 text-black/60">Billing history for {org.name}.</p>
      <ul className="mt-8 divide-y divide-black/10 rounded-lg bg-white">
        {rows.map((i) => (
          <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div><p className="font-medium">{i.id}</p><p className="text-xs text-black/50">{i.date}</p></div>
            <p>${i.amount.toLocaleString("en-AU")}</p>
            <span className={`rounded-full px-3 py-1 text-xs ${badge[i.status]}`}>{i.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
