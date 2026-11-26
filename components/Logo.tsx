export default function Logo() {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="text-[13px] font-medium uppercase tracking-[0.3em]">Focus</span>
      <span className="h-5 w-px bg-black/30" />
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="9.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="11" cy="11" r="3.5" fill="currentColor" />
      </svg>
    </span>
  );
}
