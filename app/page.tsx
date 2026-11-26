import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
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
  { title: "Northpoint Capital", text: "How a funds manager cut research time by two thirds with a private knowledge assistant.", tag: "Case study" },
  { title: "Harbour & Co Advisory", text: "A firm-wide AI programme, from first pilot to everyday practice.", tag: "Case study" },
  { title: "Putting AI tools to work", text: "Why the hard part of AI adoption begins after the licences are bought.", tag: "Article", ext: true },
  { title: "Inside the decision", text: "What leaders weigh when committing to an AI transformation.", tag: "Article", ext: true },
];

const pillars = [
  ["Identify the right AI opportunities", "We map your workflows and rank opportunities by value, risk and effort, so you invest in what matters first."],
  ["Build AI capability", "We upskill your people and set the guardrails, so your firm can run with AI long after we leave."],
  ["Tailored AI solutions", "Off-the-shelf rarely fits. We design and build solutions around your data, clients and standards."],
];

export default function Home() {
  return (
    <>
      <section id="top" className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-between px-6 pb-10 pt-24">
        <div>
          <h1 className="max-w-5xl text-[clamp(2.75rem,8vw,7rem)] font-medium leading-[0.98] tracking-tight">
            Strategic Artificial Intelligence Consultancy.
          </h1>
          <p className="mt-10 max-w-2xl text-xl text-black/70">
            We help professional services firms turn hard-won expertise and institutional knowledge into lasting advantage through technology.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-10">
            <ArrowButton href="/#work">Explore our work</ArrowButton>
            <Link href="/#contact" className="text-[15px] font-medium underline-offset-4 hover:underline">Speak to our team</Link>
          </div>
        </div>
        <div className="mt-24 flex items-end justify-between border-t border-line pt-6 text-sm text-muted">
          <span>Scroll down</span>
          <span className="max-w-md text-right">What becomes possible when human expertise leads and AI amplifies it?</span>
        </div>
      </section>

      <section id="people" className="bg-soft py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl">Our People</h2>
          <p className="mt-6 max-w-2xl text-lg text-black/70">A multidisciplinary team spanning business leadership, commercial strategy, human-centred design and AI engineering.</p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[["Alex Morgan", "Director"], ["Jordan Hayes", "Director"]].map(([n, r]) => (
              <div key={n} className="rounded-2xl bg-white p-4">
                <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-400" />
                <p className="mt-5 text-xl font-medium">{n}</p>
                <p className="text-muted">{r}</p>
              </div>
            ))}
            <Link href="/our-people" className="flex aspect-[4/5] flex-col justify-end rounded-2xl bg-black p-8 text-white md:aspect-auto">
              <span className="text-3xl font-medium leading-tight">Meet the full team</span>
              <span className="mt-6">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="services" className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl">Our Services</h2>
          <p className="mt-6 max-w-2xl text-lg text-black/70">End-to-end support, from the first conversation about AI to a capability your firm owns.</p>
          <div className="mt-14 grid border-l border-t border-line md:grid-cols-2 lg:grid-cols-3">
            {services.map(([n, t, d]) => (
              <div key={n} className="group border-b border-r border-line p-8 transition-colors hover:bg-black hover:text-white">
                <span className="text-sm text-muted group-hover:text-white/60">{n}</span>
                <h3 className="mt-10 text-2xl font-medium">{t}</h3>
                <p className="mt-3 text-black/60 group-hover:text-white/70">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-medium">Not sure where to start?</h3>
              <p className="mt-2 text-black/60">Talk to us. We&apos;ll help you find the first step.</p>
            </div>
            <ArrowButton href="/#contact">Speak to our team</ArrowButton>
          </div>
        </div>
      </section>

      <section id="work" className="bg-soft py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl">Our Work</h2>
          <p className="mt-6 max-w-2xl text-lg text-black/70">Selected engagements and thinking from our team.</p>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {work.map((w) => (
              <article key={w.title} className="rounded-2xl bg-white p-4">
                <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-300" />
                <div className="p-4">
                  <p className="text-xs uppercase tracking-widest text-muted">{w.tag}</p>
                  <h3 className="mt-2 text-2xl font-medium">{w.title}</h3>
                  <p className="mt-2 text-black/60">{w.text}</p>
                  <div className="mt-6">
                    {w.ext ? <ArrowButton href="#" diagonal external>Open article</ArrowButton> : <ArrowButton href="/#contact">Speak to our team</ArrowButton>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="max-w-3xl text-4xl font-medium tracking-tight md:text-6xl">AI strategy starts with your business.</h2>
          <div className="mt-16 space-y-20">
            {pillars.map(([t, d], i) => (
              <div key={t} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-400" />
                <div>
                  <h3 className="text-3xl font-medium">{t}</h3>
                  <p className="mt-4 max-w-md text-lg text-black/60">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-28 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="max-w-4xl text-4xl font-medium tracking-tight md:text-6xl">AI that builds on what makes your firm competitive.</h2>
          <p className="mt-8 max-w-2xl text-lg text-white/70">In property, funds management and professional services, your edge is expertise and relationships. We design AI that protects and extends both.</p>
          <Link href="/#contact" className="mt-10 inline-flex items-center gap-3 font-medium">Speak to our team <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">›</span></Link>
        </div>
      </section>

      <section id="contact" className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-[clamp(2.5rem,7vw,6.5rem)] font-medium uppercase leading-none tracking-tight">Refocus what&apos;s possible. Then go further.</h2>
          <p className="mt-8 max-w-xl text-lg text-black/60">Tell us about your firm and what you want AI to do for it.</p>
          <div className="mt-14 max-w-4xl"><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
