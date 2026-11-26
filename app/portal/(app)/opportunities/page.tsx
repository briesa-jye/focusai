import { requireSession } from "@/lib/session";
import { opportunities } from "@/lib/portal-data";

export const metadata = { title: "AI opportunities | Focus AI portal" };

const Bar = ({ n, tone }: { n: number; tone: string }) => (
  <div className="h-1.5 w-24 rounded-full bg-black/10"><div className={`h-full rounded-full ${tone}`} style={{ width: `${n * 10}%` }} /></div>
);

export default async function Page() {
  const { org } = await requireSession();
  const rows = opportunities.filter((o) => o.orgId === org.id).sort((a, b) => b.value - a.value);
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl">AI opportunities</h1>
      <p className="mt-1 text-black/60">Your ranked use cases, scored out of 10 for value, risk and effort.</p>
      <div className="mt-8 overflow-x-auto rounded-lg bg-white">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-black/40">
            <tr><th className="p-5">Opportunity</th><th>Value</th><th>Risk</th><th>Effort</th><th>Stage</th></tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {rows.map((o) => (
              <tr key={o.id}>
                <td className="p-5 font-medium">{o.title}</td>
                <td><Bar n={o.value} tone="bg-emerald-500" /></td>
                <td><Bar n={o.risk} tone="bg-rose-400" /></td>
                <td><Bar n={o.effort} tone="bg-sky-500" /></td>
                <td><span className="rounded-full bg-soft px-3 py-1 text-xs">{o.stage}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
