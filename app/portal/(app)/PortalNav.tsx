"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  ["/portal", "Dashboard"],
  ["/portal/deliverables", "Deliverables"],
  ["/portal/requests", "Requests"],
  ["/portal/opportunities", "AI opportunities"],
  ["/portal/invoices", "Invoices"],
  ["/portal/intake", "AI intake"],
  ["/portal/team", "Team"],
];

const staffItems = [
  ["/portal/admin", "Overview"],
  ["/portal/admin/requests", "Requests"],
  ["/portal/admin/clients", "Clients"],
];

export default function PortalNav({ role }: { role: string }) {
  const path = usePathname();
  return (
    <nav className="mt-6 flex gap-1 overflow-x-auto md:flex-col">
      {(role === "staff" ? staffItems : items).map(([href, label]) => (
        <Link key={href} href={href} className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors ${path === href ? "bg-[#121f2c] text-white" : "hover:bg-black/5"}`}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
