import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowButton from "@/components/ArrowButton";
import { work } from "@/lib/content";

export function generateStaticParams() { return work.map((w) => ({ slug: w.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = work.find((x) => x.slug === slug);
  return { title: w ? `${w.title} | Focus AI` : "Not found" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = work.find((x) => x.slug === slug);
  if (!w) notFound();
  return (
    <article className="mx-auto max-w-3xl px-5 pb-28 pt-40">
      <Link href="/work" className="text-sm text-black/60 hover:text-black">← Our Work</Link>
      <p className="mt-8 text-xs uppercase tracking-widest text-black/50">{w.tag}</p>
      <h1 className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)]">{w.title}</h1>
      <p className="mt-4 text-xl text-black/70">{w.summary}</p>
      <div className="frame mt-10 aspect-[16/9]" />
      {w.stats && (
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {w.stats.map((s) => <div key={s.label} className="rounded-lg bg-soft p-5"><p className="text-3xl">{s.value}</p><p className="text-xs text-black/60">{s.label}</p></div>)}
        </div>
      )}
      <div className="mt-10 space-y-5 text-lg leading-relaxed text-black/80">
        {w.body.map((p) => <p key={p}>{p}</p>)}
      </div>
      <p className="mt-10 text-xs text-black/40">Illustrative example. Details are representative, not a named client engagement.</p>
      <div className="mt-12"><ArrowButton href="/contact" variant="outline">Speak to our team</ArrowButton></div>
    </article>
  );
}
