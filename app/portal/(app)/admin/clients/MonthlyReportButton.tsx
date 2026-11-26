"use client";
import { useActionState } from "react";
import { sendMonthlyReport } from "../../../actions";

export default function MonthlyReportButton({ orgId }: { orgId: string }) {
  const [state, action, pending] = useActionState(sendMonthlyReport, undefined);
  return (
    <form action={action} className="text-right">
      <input type="hidden" name="orgId" value={orgId} />
      <button disabled={pending} className="rounded-md bg-[#121f2c] px-4 py-2 text-xs font-medium text-white disabled:opacity-60">{pending ? "Sending..." : "Send monthly report"}</button>
      {state?.message && <pre className="mt-3 max-w-md whitespace-pre-wrap text-left text-xs text-black/60">{state.message}</pre>}
    </form>
  );
}
