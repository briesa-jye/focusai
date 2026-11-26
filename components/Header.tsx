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
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
      <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-6">
        <Link href="/#top" aria-label="Focus AI home"><Logo /></Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[13px] transition-opacity hover:opacity-60">{l.label}</Link>
          ))}
        </nav>
        <div className="flex justify-end">
          <Link href="/#contact" className="hidden items-center gap-3 rounded-md bg-white px-4 py-3 text-[13px] font-medium text-[#121f2c] md:inline-flex">
            Get in touch <ArrowIcon />
          </Link>
          <button className="text-[13px] font-medium md:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? "Close" : "Menu"}</button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 bg-white px-5 py-6 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
