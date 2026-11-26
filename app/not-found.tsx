import ArrowButton from "@/components/ArrowButton";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col justify-center px-5 pt-32">
      <h1 className="text-[clamp(2.5rem,6vw,5rem)]">Page not found</h1>
      <p className="mt-4 text-black/60">That page doesn&apos;t exist or has moved.</p>
      <div className="mt-8"><ArrowButton href="/" variant="outline">Back to home</ArrowButton></div>
    </section>
  );
}
