import Link from "next/link";
import { work } from "@/lib/content";

export const metadata = { title: "Our Work | Focus AI", description: "Case studies and articles on turning expertise and AI into advantage." };

export default function Page() {
  return (
    <>
      <section className="hero-bg px-5 pb-24 pt-44">
        <div className="mx-auto max-w-[1440px]">
          <h1 className="text-[clamp(2.4rem,4.6vw,4.25rem)]">Our Work</h1>
          <p className="mt-6 max-w-[470px] text-lg tracking-[-0.02em]">Ideas and real-world work on turning human expertise, knowledge and AI into advantage.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1440px] gap-6 px-5 py-20 md:grid-cols-2">
        {work.map((w) => (
          <Link key={w.slug} href={`/work/${w.slug}`} className="group">
            <div className="frame aspect-[16/10] transition-opacity group-hover:opacity-80" />
            <p className="mt-5 text-xs uppercase tracking-widest text-black/50">{w.tag}</p>
            <h2 className="mt-1 text-2xl">{w.title}</h2>
            <p className="mt-2 text-black/70">{w.summary}</p>
            <span className="mt-4 inline-block text-sm font-medium underline-offset-4 group-hover:underline">{w.tag === "Article" ? "Read article" : "Read case study"} →</span>
          </Link>
        ))}
      </section>
    </>
  );
}
