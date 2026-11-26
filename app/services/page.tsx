import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
import { services } from "@/lib/content";

export const metadata = { title: "Our Services | Focus AI", description: "AI strategy, design, infrastructure, development, change and workforce services for professional services firms." };

export default function Page() {
  return (
    <>
      <section className="hero-bg px-5 pb-24 pt-44">
        <div className="mx-auto max-w-[1440px]">
          <h1 className="max-w-3xl text-[clamp(2.4rem,4.6vw,4.25rem)]">Our Services</h1>
          <p className="mt-6 max-w-[470px] text-lg tracking-[-0.02em]">End-to-end support, from the first conversation about AI to a capability your firm owns.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {services.map((s) => <Link key={s.slug} href={`#${s.slug}`} className="rounded-full bg-white/70 px-4 py-2 text-[13px] hover:bg-white">{s.title}</Link>)}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[1440px] divide-y divide-black/10 px-5">
        {services.map((s) => (
          <section key={s.slug} id={s.slug} className="grid gap-10 py-20 md:grid-cols-[1fr_2fr]">
            <div><span className="text-sm text-black/50">{s.n}</span><h2 className="mt-2 text-4xl">{s.title}</h2></div>
            <div>
              <p className="max-w-xl text-xl leading-snug tracking-[-0.02em]">{s.intro}</p>
              <ul className="mt-8 space-y-3">
                {s.points.map((p) => <li key={p} className="flex gap-3 text-black/70"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />{p}</li>)}
              </ul>
              <p className="mt-8 rounded-lg bg-soft p-5 text-sm"><b>Outcome:</b> {s.outcome}</p>
            </div>
          </section>
        ))}
      </div>
      <section className="px-5 py-24">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6">
          <div><h2 className="text-3xl">Not sure where to start?</h2><p className="mt-2 text-black/60">Get in touch and we&apos;ll point you to the right place.</p></div>
          <ArrowButton href="/contact" variant="outline">Speak to our team</ArrowButton>
        </div>
      </section>
    </>
  );
}
