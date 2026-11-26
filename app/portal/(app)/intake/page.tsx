import { requireSession } from "@/lib/session";
import { listIntakes } from "@/lib/store";
import IntakeForm from "./IntakeForm";

export const metadata = { title: "AI intake | Focus AI portal" };

const Bar = ({ n, tone }: { n: number; tone: string }) => (
  <div className="h-1.5 w-20 rounded-full bg-black/10"><div className={`h-full rounded-full ${tone}`} style={{ width: `${n * 10}%` }} /></div>
);

export default async function Page() {
  const { org } = await requireSession();
  const latest = (await listIntakes(org.id))[0];
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl">AI intake</h1>
      <p className="mt-1 text-black/60">Answer a few questions and we&apos;ll draft a ranked list of AI opportunities for your firm.</p>
      {latest && (
        <section className="mt-8 rounded-lg bg-white p-6">
          <h2 className="text-xl">Your latest draft report</h2>
          <p className="mt-1 text-xs text-black/50">{new Date(latest.createdAt).toLocaleDateString("en-AU")} · Draft for review by your Focus AI lead</p>
          <p className="mt-4 text-black/80">{latest.summary}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-widest text-black/40"><tr><th className="py-2">Opportunity</th><th>Value</th><th>Risk</th><th>Effort</th></tr></thead>
              <tbody className="divide-y divide-black/10">
                {latest.items.map((i) => (
                  <tr key={i.title}><td className="py-3 pr-4"><p className="font-medium">{i.title}</p><p className="text-xs text-black/50">{i.why}</p></td>
                    <td><Bar n={i.value} tone="bg-emerald-500" /></td><td><Bar n={i.risk} tone="bg-rose-400" /></td><td><Bar n={i.effort} tone="bg-sky-500" /></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      <IntakeForm hasReport={!!latest} />
    </div>
  );
}
