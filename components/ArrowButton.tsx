import Link from "next/link";

export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-black text-white">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {diagonal ? <path d="M3 9l6-6M4 3h5v5" /> : <path d="M4.5 2.5L8 6l-3.5 3.5" />}
      </svg>
    </span>
  );
}

/** White pill (default) or slate pill. */
export default function ArrowButton({ href, children, diagonal, external, variant = "white" }: { href: string; children: React.ReactNode; diagonal?: boolean; external?: boolean; variant?: "white" | "slate" | "outline" }) {
  const styles = {
    white: "bg-white text-[#121f2c] hover:bg-white/80",
    slate: "bg-[#5c6d76] text-white hover:bg-[#4b5a62]",
    outline: "border border-black/15 text-[#121f2c] hover:bg-black/5",
  }[variant];
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center gap-3 rounded-md px-4 py-3 text-[13px] font-medium transition-colors ${styles}`}
    >
      {children}
      {variant === "white" || variant === "outline" ? <ArrowIcon diagonal={diagonal} /> : null}
    </Link>
  );
}
