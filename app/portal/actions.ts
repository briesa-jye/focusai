"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addRequest, setRequestStatus, addIntake, listRequests, type Intake } from "@/lib/store";
import { sendEmail, teamEmail } from "@/lib/email";
import { heuristicReport, aiSummary } from "@/lib/report";
import { users, usageStats, milestones } from "@/lib/portal-data";
import { checkLogin, createSession, destroySession, requireSession, requireStaff } from "@/lib/session";

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  const user = checkLogin(String(formData.get("email") ?? ""), String(formData.get("password") ?? ""));
  if (!user) return { error: "Incorrect email or password." };
  await createSession(user.email);
  redirect("/portal");
}

export async function logout() {
  await destroySession();
  redirect("/portal/login");
}

export async function submitRequest(_prev: { error?: string; ok?: boolean } | undefined, formData: FormData) {
  const { org } = await requireSession();
  const title = String(formData.get("title") ?? "").trim();
  if (title.length < 5) return { error: "Please describe your request in a few words." };
  if (title.length > 200) return { error: "Please keep it under 200 characters." };
  await addRequest(org.id, title, org.lead);
  if (teamEmail()) await sendEmail({ to: teamEmail(), subject: `New request from ${org.name}`, text: title });
  revalidatePath("/portal/requests");
  revalidatePath("/portal");
  return { ok: true };
}

export async function updateRequestStatus(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  if (!["Open", "In progress", "Done"].includes(status)) return;
  await setRequestStatus(id, status as "Open" | "In progress" | "Done");
  revalidatePath("/portal/admin/requests");
  revalidatePath("/portal/requests");
}

export async function submitIntake(_prev: { error?: string; ok?: boolean } | undefined, fd: FormData) {
  const { org } = await requireSession();
  const g = (k: string) => String(fd.getAll(k).join(", ")).trim().slice(0, 2000);
  const answers = { timeSinks: g("timeSinks"), tools: g("tools"), data: g("data"), concerns: g("concerns"), goals: g("goals"), teamSize: g("teamSize") };
  if (answers.timeSinks.length < 10) return { error: "Tell us a little more about where your team's time goes." };
  const base = heuristicReport(answers);
  const ai = await aiSummary(answers, base.summary);
  const intake: Intake = { id: `i-${Date.now()}`, orgId: org.id, createdAt: new Date().toISOString(), answers, items: base.items, summary: ai ?? base.summary, usedAI: !!ai };
  await addIntake(intake);
  if (teamEmail()) await sendEmail({ to: teamEmail(), subject: `Intake completed: ${org.name}`, text: `${intake.summary}\n\nTop opportunities: ${intake.items.map((i) => i.title).join(", ")}` });
  revalidatePath("/portal/intake");
  return { ok: true };
}

export async function sendMonthlyReport(_prev: { message?: string } | undefined, fd: FormData) {
  await requireStaff();
  const orgId = String(fd.get("orgId"));
  const stats = usageStats[orgId];
  if (!stats) return { message: "No usage data for this client." };
  const open = (await listRequests(orgId)).filter((r) => r.status !== "Done").length;
  const next = (milestones[orgId] ?? []).find((m) => m.status !== "done");
  const text = `Your Focus AI monthly summary\n\n${stats.map((s) => `${s.label}: ${s.value}`).join("\n")}\nOpen requests: ${open}\n${next ? `Next milestone: ${next.title} (due ${next.due})\n` : ""}\nSign in to the portal for details.\n\nThe Focus AI team`;
  const recipients = users.filter((u) => u.orgId === orgId && u.role === "admin").map((u) => u.email);
  const r = await sendEmail({ to: recipients, subject: "Your Focus AI monthly summary", text });
  return { message: r.sent ? `Sent to ${recipients.join(", ")}.` : "Email isn't configured (no RESEND_API_KEY), so nothing was sent. Preview:\n\n" + text };
}
