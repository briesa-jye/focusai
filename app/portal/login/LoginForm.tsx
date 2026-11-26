"use client";
import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-6 space-y-2">
      <input className="field" name="email" type="email" placeholder="Email" autoComplete="email" required />
      <input className="field" name="password" type="password" placeholder="Password" autoComplete="current-password" required />
      {state?.error && <p role="alert" className="pt-2 text-sm text-red-600">{state.error}</p>}
      <button disabled={pending} className="mt-6 w-full rounded-md bg-[#121f2c] px-5 py-3 text-sm font-medium text-white disabled:opacity-60">
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
