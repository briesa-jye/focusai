import { redirect } from "next/navigation";
import { requireSession } from "@/lib/session";
import { milestones, usageStats, invoices } from "@/lib/portal-data";
import { listRequests } from "@/lib/store";

export const metadata = { title: "Dashboard | Focus AI portal" };

const dot = { done: "bg-emerald-500", active: "bg-amber-400", upcoming: "bg-black/20" };

export default async function Dashboard() {
  const { user, org } = await requireSession();
  if (user.role === "staff") redirect("/portal/admin");
  const open = (await listRequests(org.id)).filter((r) => r.status !== "Done").length;
  const due = invoices.filter((i) => i.orgId === org.id && i.status !== "Paid").length;
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl">Welcome back, {user.name.split(" ")[0]}</h1>
      <p className="mt-1 text-black/60">Your Focus AI lead: {org.lead}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {usageStats[org.id].map((s) => (
          <div key={s.label} className="rounded-lg bg-white p-5">
            <p className="text-3xl tracking-tight">{s.value}</p>
            <p className="mt-1 text-xs text-black/60">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr]">
        <section className="rounded-lg bg-white p-6">
          <h2 className="text-xl">Engagement progress</h2>
          <ol className="mt-5 space-y-5">
            {milestones[org.id].map((m) => (
              <li key={m.title} className="flex items-start gap-4">
                <span className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${dot[m.status]}`} />
                <div className="flex-1">
                  <p className="font-medium">{m.title}</p>
                  <p className="text-xs text-black/50 capitalize">{m.status} · due {m.due}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="space-y-4">
          <div className="rounded-lg bg-white p-6"><p className="text-3xl">{open}</p><p className="text-xs text-black/60">Open requests</p></div>
          <div className="rounded-lg bg-white p-6"><p className="text-3xl">{due}</p><p className="text-xs text-black/60">Invoices awaiting payment</p></div>
        </section>
      </div>
    </div>
  );
}
