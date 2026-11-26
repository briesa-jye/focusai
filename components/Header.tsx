"use client";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { ArrowIcon } from "./ArrowButton";

const links = [
  { href: "/#services", label: "Our Services" },
  { href: "/#work", label: "Our Work" },
  { href: "/our-people", label: "Our People" },
  { href: "/#contact", label: "Contact Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/#top" aria-label="Focus AI home"><Logo /></Link>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[15px] text-black/70 hover:text-black transition-colors">{l.label}</Link>
          ))}
        </nav>
        <Link href="/#contact" className="hidden items-center gap-3 text-[15px] font-medium md:inline-flex">
          Get in touch <ArrowIcon />
        </Link>
        <button className="md:hidden text-sm font-medium" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-line bg-white px-6 py-6 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
