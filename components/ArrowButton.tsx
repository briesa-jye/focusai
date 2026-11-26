import Link from "next/link";

export function ArrowIcon({ diagonal = false, invert = false }: { diagonal?: boolean; invert?: boolean }) {
  return (
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${invert ? "bg-white text-black" : "bg-black text-white"}`}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {diagonal ? <path d="M3 9l6-6M4 3h5v5" /> : <path d="M4.5 2.5L8 6l-3.5 3.5" />}
      </svg>
    </span>
  );
}

export default function ArrowButton({ href, children, diagonal, external }: { href: string; children: React.ReactNode; diagonal?: boolean; external?: boolean }) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex items-center gap-3 text-[15px] font-medium"
    >
      <span className="border-b border-transparent group-hover:border-black transition-colors">{children}</span>
      <span className="transition-transform group-hover:translate-x-0.5"><ArrowIcon diagonal={diagonal} /></span>
    </Link>
  );
}
