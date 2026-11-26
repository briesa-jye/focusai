"use client";
import { useEffect, useId, useRef, useState } from "react";

/** Custom dropdown (replaces the browser's native <select>). Submits its value as a hidden form field. */
export default function Dropdown({ name, placeholder, options, required }: { name: string; placeholder: string; options: string[]; required?: boolean }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const close = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const choose = (o: string) => { setValue(o); setOpen(false); };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown") { e.preventDefault(); if (!open) setOpen(true); setActive((a) => Math.min(a + 1, options.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if ((e.key === "Enter" || e.key === " ") && open) { e.preventDefault(); choose(options[active]); }
    else if ((e.key === "Enter" || e.key === " ") && !open) { e.preventDefault(); setOpen(true); }
  };

  return (
    <div ref={root} className="relative">
      <input name={name} value={value} onChange={() => {}} required={required} tabIndex={-1} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0" />
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        onKeyDown={onKey}
        className={`field flex items-center justify-between text-left ${value ? "text-black" : "text-black/50"}`}
      >
        <span>{value || `${placeholder}${required ? " *" : ""}`}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className={`transition-transform ${open ? "rotate-180" : ""}`}><path d="M2 4.5l4 4 4-4" /></svg>
      </button>
      {open && (
        <ul id={id} role="listbox" className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-auto rounded-lg border border-black/10 bg-white py-1 shadow-lg">
          {options.map((o, i) => (
            <li
              key={o}
              role="option"
              aria-selected={o === value}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => { e.preventDefault(); choose(o); }}
              className={`cursor-pointer px-4 py-2.5 text-[15px] ${i === active ? "bg-soft" : ""} ${o === value ? "font-medium" : ""}`}
            >
              {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
