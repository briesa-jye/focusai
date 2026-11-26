import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-white/60">Partnering with professional services businesses to put AI to work where it counts.</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm uppercase tracking-widest text-white/40">Explore</h4>
          <ul className="space-y-3 text-white/80">
            <li><Link href="/#services">Our Services</Link></li>
            <li><Link href="/#work">Our Work</Link></li>
            <li><Link href="/our-people">Our People</Link></li>
            <li><Link href="/#contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm uppercase tracking-widest text-white/40">Sectors</h4>
          <ul className="space-y-3 text-white/80"><li>Real Estate</li><li>Finance</li><li>Advisory</li></ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm uppercase tracking-widest text-white/40">Connect</h4>
          <ul className="space-y-3 text-white/80">
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-6 text-sm text-white/50">
        <span>© 2026 Focus AI</span>
        <span className="flex gap-6"><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link></span>
      </div>
    </footer>
  );
}
