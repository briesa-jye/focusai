import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import LoginForm from "./LoginForm";

export const metadata = { title: "Client login | Focus AI" };

export default async function LoginPage() {
  if (await getSession()) redirect("/portal");
  return (
    <div className="hero-bg flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <Link href="/" className="text-[13px] font-medium uppercase tracking-[0.3em]">Focus AI</Link>
        <h1 className="mt-8 text-3xl">Client portal</h1>
        <p className="mt-2 text-sm text-black/60">Sign in to see your engagement, deliverables and requests.</p>
        <LoginForm />
        <div className="mt-8 rounded-md bg-soft p-4 text-xs text-black/70">
          <p className="font-medium">Demo accounts (sample data)</p>
          <p className="mt-1">demo@northpoint.example, member@northpoint.example or demo@harbour.example</p>
          <p>Password: demo1234</p>
        </div>
      </div>
    </div>
  );
}
