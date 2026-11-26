import "server-only";

// Sends email through Resend when RESEND_API_KEY is set; otherwise logs and returns sent:false
// so every flow still works locally without an account.
export async function sendEmail({ to, subject, text }: { to: string | string[]; subject: string; text: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[email not configured] to=${[to].flat().join(",")} subject="${subject}"`);
    return { sent: false as const };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.EMAIL_FROM ?? "Focus AI <onboarding@resend.dev>", to, subject, text }),
    });
    return { sent: res.ok as boolean };
  } catch {
    return { sent: false as const };
  }
}

export const teamEmail = () => process.env.TEAM_EMAIL ?? "";
