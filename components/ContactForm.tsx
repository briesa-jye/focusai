"use client";
import { useState } from "react";
import { ArrowIcon } from "./ArrowButton";

const subjects = ["Working with us", "Partnerships", "Media", "Careers", "Something else"];
const industries = ["Property investment and funds management", "Real estate and property services", "Property development", "Financial services", "Legal, accounting and advisory", "Consulting and professional services", "Other"];
const sources = ["Search engine", "AI assistant", "LinkedIn", "Referral", "Event", "Something else"];

function Select({ name, label, options, required }: { name: string; label: string; options: string[]; required?: boolean }) {
  return (
    <select name={name} required={required} defaultValue="" className="field">
      <option value="" disabled>{label}{required ? " *" : ""}</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <p className="py-16 text-2xl">Thank you. We&apos;ll be in touch shortly.</p>;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: wire to an email provider (e.g. Resend) when a mailbox is chosen.
        setSent(true);
      }}
      className="grid gap-x-10 gap-y-2 md:grid-cols-2"
    >
      <input className="field" name="first" placeholder="First name *" required />
      <input className="field" name="last" placeholder="Last name *" required />
      <input className="field" name="title" placeholder="Job title" />
      <input className="field" name="company" placeholder="Company *" required />
      <input className="field md:col-span-2" type="email" name="email" placeholder="Email *" required />
      <Select name="subject" label="Subject" options={subjects} required />
      <Select name="industry" label="Industry" options={industries} required />
      <div className="md:col-span-2"><Select name="source" label="How did you hear about Focus AI?" options={sources} /></div>
      <textarea className="field md:col-span-2" name="message" rows={4} placeholder="Message *" required />
      <p className="mt-4 text-sm text-muted md:col-span-2">
        By sending this you agree to our <a className="underline" href="/legal/privacy">Privacy policy</a> and <a className="underline" href="/legal/terms">Terms</a>.
      </p>
      <button type="submit" className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-black py-2 pl-6 pr-2 text-white">
        Send <ArrowIcon invert />
      </button>
    </form>
  );
}
