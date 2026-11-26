import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact Us | Focus AI", description: "Tell us about your firm and what you want AI to do for it." };

export default function Page() {
  return (
    <section className="px-5 pb-24 pt-44">
      <h1 className="mx-auto max-w-[1440px] text-center text-[clamp(2.5rem,8vw,7.5rem)] font-medium uppercase leading-[0.95] tracking-[-0.04em]">Refocus what&apos;s possible. Then go further.</h1>
      <p className="mx-auto mt-8 max-w-md text-center text-lg text-black/60">Tell us about your firm and what you want AI to do for it. We reply within one business day.</p>
      <div className="mx-auto mt-16 max-w-3xl"><ContactForm /></div>
    </section>
  );
}
