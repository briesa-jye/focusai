"use server";
import { addLead } from "@/lib/store";
import { sendEmail, teamEmail } from "@/lib/email";

export async function submitContact(_prev: { error?: string; ok?: boolean } | undefined, fd: FormData) {
  if (String(fd.get("website") ?? "")) return { ok: true }; // honeypot: silently drop bots
  const g = (k: string) => String(fd.get(k) ?? "").trim().slice(0, 2000);
  const email = g("email");
  if (!g("first") || !g("last") || !g("company") || !g("message") || !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Please complete all required fields with a valid email." };
  }
  const lead = await addLead({ first: g("first"), last: g("last"), email, company: g("company"), title: g("title"), subject: g("subject"), industry: g("industry"), source: g("source"), message: g("message") });

  const to = teamEmail();
  if (to) {
    await sendEmail({ to, subject: `New enquiry: ${lead.company}`, text: `${lead.first} ${lead.last} (${lead.title || "no title"}) at ${lead.company}\n${lead.email}\nSubject: ${lead.subject}\nIndustry: ${lead.industry}\nHeard via: ${lead.source}\n\n${lead.message}` });
  }
  const booking = process.env.NEXT_PUBLIC_BOOKING_URL;
  await sendEmail({ to: email, subject: "Thanks for contacting Focus AI", text: `Hi ${lead.first},\n\nThanks for getting in touch. We have your message and will reply within one business day.${booking ? `\n\nIf you would like to book a call now: ${booking}` : ""}\n\nThe Focus AI team` });
  return { ok: true };
}
