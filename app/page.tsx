import Link from "next/link";
import ArrowButton, { ArrowIcon } from "@/components/ArrowButton";
import HeroGradient from "@/components/HeroGradient";
import ContactForm from "@/components/ContactForm";

const services = [
  ["01", "AI Strategy", "Find where AI creates real value in your firm and build a roadmap you can act on."],
  ["02", "AI Design", "Shape tools and workflows around the people who use them, so adoption sticks."],
  ["03", "AI Infrastructure", "Secure, scalable foundations for your data, models and integrations."],
  ["04", "AI Development", "Custom assistants and automations built and shipped by our engineers."],
  ["05", "AI Change", "Bring your teams along with training, governance and clear ways of working."],
  ["06", "AI Workforce", "Redesign roles and capability so people and AI do their best work together."],
];

const work = [
  { title: "Northpoint Capital", text: "How a funds manager cut research time with a private knowledge assistant.", tag: "Case study" },
  { title: "Harbour & Co Advisory", text: "A firm-wide AI programme, from first pilot to everyday practice.", tag: "Case study" },
  { title: "Putting AI tools to work", text: "Why the hard part of adoption begins after the licences are bought.", tag: "Article", ext: true },
  { title: "Inside the decision", text: "What leaders weigh when committing to an AI transformation.", tag: "Article", ext: true },
];

const pillars = [
  ["Identify the right AI opportunities", "We map your workflows and rank opportunities by value, risk and effort."],
  ["Build AI capability", "We upskill your people and set the guardrails so your firm can run with AI."],
  ["Tailored AI solutions", "We design and build solutions around your data, clients and standards."],
];

const wrap = "mx-auto max-w-[1440px] px-5 md:px-6";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="hero-bg relative flex min-h-[100svh] items-center overflow-hidden">
        <HeroGradient />
        <div className={`${wrap} relative w-full`}>
          <h1 className="max-w-3xl text-[clamp(2.4rem,4.6vw,4.25rem)]">Strategic Artificial Intelligence Consultancy.</h1>
          <p className="mt-6 max-w-[470px] text-lg leading-[1.4] tracking-[-0.02em]">
            Focus AI partners with professional services firms to unlock the value of their expertise and institutional knowledge through technology.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ArrowButton href="/#work">Explore our work</ArrowButton>
            <ArrowButton href="/#contact" variant="slate">Speak to our team</ArrowButton>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-2 text-[13px]">
          <span className="w-12 text-center leading-tight">Scroll down</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M7 1v12M2 8l5 5 5-5" /></svg>
        </div>
      </section>

      {/* Statement */}
      <section className="py-24">
        <div className={wrap}>
          <h2 className="max-w-5xl text-[clamp(1.75rem,3vw,2.5rem)]">
            Rethink what&apos;s possible in the AI era, and the role of human expertise in shaping better decisions.
          </h2>
        </div>
      </section>

      {/* People */}
      <section id="about" className="bg-white py-10">
        <div className={wrap}>
          <h2 className="text-4xl">Our People</h2>
          <p className="mt-4 max-w-[470px] text-lg tracking-[-0.02em] text-black/70">A multidisciplinary team combining business leadership, commercial strategy, human-centred design and AI.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[["Alex Morgan", "Director"], ["Jordan Hayes", "Director"]].map(([n, r]) => (
              <div key={n} className="rounded-lg bg-soft p-6">
                <div className="frame aspect-[4/3]" />
                <p className="mt-16 text-xl tracking-[-0.02em]">{n}</p>
                <p className="mt-1 text-xs text-black/60">{r}</p>
              </div>
            ))}
            <Link href="/our-people" className="flex min-h-[320px] flex-col justify-between rounded-lg border border-black/10 p-6">
              <div>
                <p className="text-xl tracking-[-0.02em]">Meet the full team</p>
                <p className="mt-2 text-xs text-black/60">See everyone behind Focus AI.</p>
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4.5 2.5L8 6l-3.5 3.5" /></svg>
              </span>
            </Link>
          </div>
          <div className="relative mx-auto mt-24 max-w-3xl">
            <div className="frame aspect-[4/3]" />
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow">
              <svg width="12" height="14" viewBox="0 0 12 14"><path d="M1 1l10 6-10 6z" fill="#121f2c" /></svg>
            </span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative py-10">
        <div className="hero-bg absolute inset-x-0 bottom-0 top-[180px]" />
        <div className={`${wrap} relative`}>
          <h2 className="text-4xl">Our Services</h2>
          <p className="mt-4 max-w-[470px] text-lg tracking-[-0.02em] text-black/70">We work with leaders to identify the commercial opportunities AI can unlock, then help build them.</p>
          <div className="mt-24 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map(([n, t, d]) => (
              <div key={n} className="glass flex min-h-[260px] flex-col justify-between rounded-lg p-6">
                <span className="text-xs text-black/60">{n}</span>
                <div>
                  <h3 className="text-xl">{t}</h3>
                  <p className="mt-2 text-sm leading-snug text-black/70">{d}</p>
                </div>
              </div>
            ))}
            <div className="flex min-h-[260px] flex-col justify-between rounded-lg bg-[#2f4a55] p-6 text-white lg:col-start-3">
              <h3 className="text-xl">Not sure where to start?</h3>
              <div>
                <p className="mb-4 text-sm text-white/80">Get in touch and we&apos;ll point you to the right place.</p>
                <ArrowButton href="/#contact">Speak to our team</ArrowButton>
              </div>
            </div>
          </div>
          <div className="h-24" />
        </div>
      </section>

      {/* Work */}
      <section id="work" className="bg-white py-10">
        <div className={wrap}>
          <h2 className="text-4xl">Our Work</h2>
          <p className="mt-4 max-w-[470px] text-lg tracking-[-0.02em] text-black/70">Ideas and real-world work on turning human expertise, knowledge and AI into advantage.</p>
        </div>
        <div className="mt-10 space-y-16">
          {work.map((w) => (
            <article key={w.title}>
              <div className="frame aspect-[16/7] w-full !rounded-none" />
              <div className={`${wrap} mt-6 flex flex-wrap items-start justify-between gap-6`}>
                <div className="max-w-xl">
                  <p className="text-xs uppercase tracking-widest text-black/50">{w.tag}</p>
                  <h3 className="mt-2 text-2xl">{w.title}</h3>
                  <p className="mt-2 text-black/70">{w.text}</p>
                </div>
                {w.ext ? <ArrowButton href="#" diagonal external variant="outline">Open article</ArrowButton> : <ArrowButton href="/#contact" variant="outline">Speak to our team</ArrowButton>}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Strategy */}
      <section className="bg-white py-10">
        <div className={wrap}>
          <h2 className="max-w-3xl text-[clamp(1.75rem,3.2vw,2.75rem)]">AI strategy starts with your business.</h2>
          <div className="mt-16 space-y-16">
            {pillars.map(([t, d], i) => (
              <div key={t} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
                <div className="frame aspect-[4/3]" />
                <div>
                  <h3 className="text-2xl">{t}</h3>
                  <p className="mt-3 max-w-md text-black/70">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive */}
      <section className="bg-white py-24">
        <div className={wrap}>
          <h2 className="max-w-4xl text-[clamp(1.75rem,3.2vw,2.75rem)]">AI that builds on what makes your firm competitive.</h2>
          <p className="mt-6 max-w-[470px] text-lg tracking-[-0.02em] text-black/70">We partner with leaders across property, funds management and professional services to extend what already sets them apart.</p>
          <div className="mt-8"><ArrowButton href="/#contact" variant="outline">Speak to our team</ArrowButton></div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-5 pb-16 pt-44">
        <h2 className="mx-auto max-w-[1440px] text-center text-[clamp(2.5rem,8vw,7.5rem)] font-medium uppercase leading-[0.95] tracking-[-0.04em]">Refocus what&apos;s possible. Then go further.</h2>
        <p className="mx-auto mt-8 max-w-md text-center text-lg text-black/60">Your firm&apos;s greatest asset is the expertise inside it. Tell us how you want to use it.</p>
        <div className="mx-auto mt-16 max-w-3xl"><ContactForm /></div>
      </section>
    </>
  );
}
