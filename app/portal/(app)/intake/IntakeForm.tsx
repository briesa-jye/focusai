"use client";
import { useActionState } from "react";
import Dropdown from "@/components/Dropdown";
import { submitIntake } from "../../actions";

const tools = ["Microsoft 365", "Google Workspace", "Salesforce / CRM", "Xero / MYOB", "Document management", "Other"];
const data = ["Client files", "Personal information", "Financial data", "Legal documents", "Internal policies"];
const concerns = ["Privacy and confidentiality", "Accuracy", "Staff adoption", "Cost", "Regulation"];

function Group({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <fieldset className="mt-6">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer rounded-full border border-black/15 px-3 py-1.5 text-xs has-[:checked]:bg-[#121f2c] has-[:checked]:text-white">
            <input type="checkbox" name={name} value={o} className="sr-only" />{o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function IntakeForm({ hasReport }: { hasReport: boolean }) {
  const [state, action, pending] = useActionState(submitIntake, undefined);
  return (
    <form action={action} className="mt-8 rounded-lg bg-white p-6">
      <h2 className="text-xl">{hasReport ? "Update your answers" : "Tell us about your firm"}</h2>
      <label className="mt-6 block text-sm font-medium">Where does your team spend the most time? *
        <textarea name="timeSinks" rows={3} required className="field mt-1 font-normal" placeholder="e.g. searching old files, drafting investor reports, writing meeting notes" />
      </label>
      <label className="mt-4 block text-sm font-medium">What would you like AI to help you achieve?
        <textarea name="goals" rows={2} className="field mt-1 font-normal" placeholder="e.g. faster reporting, fewer manual tasks" />
      </label>
      <div className="mt-4"><p className="text-sm font-medium">Team size</p><Dropdown name="teamSize" placeholder="Select" options={["1-10", "11-50", "51-200", "200+"]} /></div>
      <Group name="tools" label="Tools you use" options={tools} />
      <Group name="data" label="Information involved" options={data} />
      <Group name="concerns" label="Your main concerns" options={concerns} />
      {state?.error && <p role="alert" className="mt-4 text-sm text-red-600">{state.error}</p>}
      {state?.ok && <p role="status" className="mt-4 text-sm text-emerald-700">Draft report generated above. Your Focus AI lead has been notified.</p>}
      <button disabled={pending} className="mt-6 rounded-md bg-[#121f2c] px-5 py-3 text-sm font-medium text-white disabled:opacity-60">{pending ? "Generating..." : "Generate draft report"}</button>
    </form>
  );
}
