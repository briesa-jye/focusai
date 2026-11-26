import Link from "next/link";

const team = [
  ["Jye Sanjurjo", "Director"], ["Levi Mieli", "Director"],
];

export const metadata = { title: "Our People | Focus AI" };

export default function People() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-28 pt-40">
      <h1 className="text-5xl font-medium tracking-tight md:text-7xl">Our People</h1>
      <p className="mt-6 max-w-2xl text-lg text-black/70">The people behind Focus AI.</p>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map(([n, r]) => (
          <div key={n}>
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-400" />
            <p className="mt-4 text-xl font-medium">{n}</p>
            <p className="text-muted">{r}</p>
          </div>
        ))}
      </div>
      <Link href="/#contact" className="mt-16 inline-block font-medium underline underline-offset-4">Speak to our team</Link>
    </section>
  );
}
