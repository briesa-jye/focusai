"use client";
import { useActionState, useEffect, useRef } from "react";
import { submitRequest } from "../../actions";

export default function RequestForm() {
  const [state, action, pending] = useActionState(submitRequest, undefined);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state?.ok) ref.current?.reset(); }, [state]);
  return (
    <form ref={ref} action={action} className="mt-8 rounded-lg bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className="field flex-1" name="title" placeholder="Describe what you need" maxLength={200} required />
        <button disabled={pending} className="rounded-md bg-[#121f2c] px-5 py-3 text-sm font-medium text-white disabled:opacity-60">
          {pending ? "Sending..." : "Submit request"}
        </button>
      </div>
      {state?.error && <p role="alert" className="mt-3 text-sm text-red-600">{state.error}</p>}
      {state?.ok && <p role="status" className="mt-3 text-sm text-emerald-700">Request sent. Our team will pick it up shortly.</p>}
    </form>
  );
}
