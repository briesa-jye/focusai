import Link from "next/link";
import { requireSession } from "@/lib/session";
import { logout } from "../actions";
import PortalNav from "./PortalNav";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, org } = await requireSession();
  return (
    <div className="min-h-screen bg-[#f6f5f2] md:grid md:grid-cols-[240px_1fr]">
      <aside className="flex flex-col border-b border-black/10 bg-white p-5 md:min-h-screen md:border-b-0 md:border-r">
        <Link href="/" className="text-[13px] font-medium uppercase tracking-[0.3em]">Focus AI</Link>
        <p className="mt-6 text-xs uppercase tracking-widest text-black/40">Client</p>
        <p className="font-medium">{org.name}</p>
        <PortalNav role={user.role} />
        <div className="mt-6 border-t border-black/10 pt-4 text-sm md:mt-auto">
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-black/50">{user.role === "staff" ? "Focus AI staff" : user.role === "admin" ? "Client admin" : "Team member"}</p>
          <form action={logout}><button className="mt-3 text-xs underline">Sign out</button></form>
        </div>
      </aside>
      <main className="p-5 md:p-10">{children}</main>
    </div>
  );
}
