import Link from "next/link";

const team = [
  ["Alex Morgan", "Director"], ["Jordan Hayes", "Director"], ["Sam Rivera", "Head of AI Engineering"],
  ["Taylor Chen", "Principal, Strategy"], ["Casey Nguyen", "Design Lead"], ["Riley Patel", "Change Lead"],
];

export const metadata = { title: "Our People | Focus AI" };

export default function People() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <h1 className="text-5xl font-medium tracking-tight md:text-7xl">Our People</h1>
      <p className="mt-6 max-w-2xl text-lg text-black/70">Leaders, strategists, designers and engineers working as one team.</p>
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
