"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  ["/portal", "Dashboard"],
  ["/portal/deliverables", "Deliverables"],
  ["/portal/requests", "Requests"],
  ["/portal/opportunities", "AI opportunities"],
  ["/portal/invoices", "Invoices"],
];

export default function PortalNav() {
  const path = usePathname();
  return (
    <nav className="mt-6 flex gap-1 overflow-x-auto md:flex-col">
      {items.map(([href, label]) => (
        <Link key={href} href={href} className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors ${path === href ? "bg-[#121f2c] text-white" : "hover:bg-black/5"}`}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
