import { requireStaff } from "@/lib/session";
import { orgs, usageStats } from "@/lib/portal-data";
import MonthlyReportButton from "./MonthlyReportButton";

export const metadata = { title: "Clients | Focus AI portal" };

export default async function Page() {
  await requireStaff();
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl">Clients</h1>
      <p className="mt-1 text-black/60">Generate and send each client&apos;s monthly summary in one click.</p>
      <div className="mt-8 space-y-4">
        {orgs.filter((o) => o.id !== "focusai").map((o) => (
          <section key={o.id} className="rounded-lg bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><h2 className="text-xl">{o.name}</h2><p className="text-xs text-black/50">{o.sector} · Lead: {o.lead}</p></div>
              <MonthlyReportButton orgId={o.id} />
            </div>
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-black/70">
              {(usageStats[o.id] ?? []).map((s) => <span key={s.label}>{s.label}: <b>{s.value}</b></span>)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
