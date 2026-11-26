"use client";
import { useActionState } from "react";
import Dropdown from "./Dropdown";
import { submitContact } from "@/app/actions-contact";

const subjects = ["Working with us", "Partnerships", "Media", "Careers", "Something else"];
const industries = ["Real estate and property management", "Property investment and funds management", "Finance and mortgage broking", "Insurance broking", "Accounting and bookkeeping", "Legal practices", "Advisory firms", "Recruitment", "Other professional services", "Other"];
const sources = ["Search engine", "AI assistant", "LinkedIn", "Referral", "Event", "Something else"];

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, undefined);
  const booking = process.env.NEXT_PUBLIC_BOOKING_URL;
  if (state?.ok) return (
    <div className="py-16">
      <p className="text-2xl">Thank you. We&apos;ll be in touch within one business day.</p>
      {booking && <a href={booking} className="mt-6 inline-block underline">Book a call now</a>}
    </div>
  );
  return (
    <form
      action={action}
      className="grid gap-x-10 gap-y-2 md:grid-cols-2"
    >
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" aria-hidden />
      <input className="field" name="first" placeholder="First name *" required />
      <input className="field" name="last" placeholder="Last name *" required />
      <input className="field" name="title" placeholder="Job title" />
      <input className="field" name="company" placeholder="Company *" required />
      <input className="field md:col-span-2" type="email" name="email" placeholder="Email *" required />
      <Dropdown name="subject" placeholder="Subject" options={subjects} required />
      <Dropdown name="industry" placeholder="Industry" options={industries} required />
      <div className="md:col-span-2"><Dropdown name="source" placeholder="How did you hear about Focus AI?" options={sources} /></div>
      <textarea className="field md:col-span-2" name="message" rows={4} placeholder="Message *" required />
      <p className="mt-4 text-sm text-muted md:col-span-2">
        By sending this you agree to our <a className="underline" href="/legal/privacy">Privacy policy</a> and <a className="underline" href="/legal/terms">Terms</a>.
      </p>
      {state?.error && <p role="alert" className="text-sm text-red-600 md:col-span-2">{state.error}</p>}
      <button type="submit" disabled={pending} className="mt-6 inline-flex w-fit items-center rounded-md bg-[#121f2c] px-5 py-3 text-sm font-medium text-white">
        {pending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
