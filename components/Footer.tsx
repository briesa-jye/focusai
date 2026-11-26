import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[2fr_1fr_1fr_1fr] md:px-6">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm text-black/60">Partnering with professional services businesses to put AI to work where it counts.</p>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-widest text-black/40">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#services">Our Services</Link></li>
            <li><Link href="/#work">Our Work</Link></li>
            <li><Link href="/our-people">Our People</Link></li>
            <li><Link href="/#contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-widest text-black/40">Sectors</h4>
          <ul className="space-y-2 text-sm"><li>Real Estate</li><li>Finance</li><li>Advisory</li></ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-widest text-black/40">Connect</h4>
          <ul className="space-y-2 text-sm"><li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li></ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-black/10 px-5 py-6 text-xs text-black/50 md:px-6">
        <span>© 2026 Focus AI</span>
        <span className="flex gap-6"><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link></span>
      </div>
    </footer>
  );
}
