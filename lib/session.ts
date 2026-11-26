import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "node:crypto";
import { users, orgs, type PortalUser } from "./portal-data";

const COOKIE = "focus_portal";
const MAX_AGE = 60 * 60 * 8;
// Set SESSION_SECRET in production. The fallback is for local demo only.
const SECRET = process.env.SESSION_SECRET ?? "dev-only-secret-change-me";

const sign = (v: string) => createHmac("sha256", SECRET).update(v).digest("base64url");

export function checkLogin(email: string, password: string): PortalUser | null {
  const u = users.find((x) => x.email === email.trim().toLowerCase());
  if (!u) return null;
  const a = Buffer.from(u.password);
  const b = Buffer.from(password);
  return a.length === b.length && timingSafeEqual(a, b) ? u : null;
}

export async function createSession(email: string) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `${email}.${exp}`;
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function getSession() {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;
  const i = raw.lastIndexOf(".");
  const payload = raw.slice(0, i);
  const sig = raw.slice(i + 1);
  const expected = sign(payload);
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  const [email, exp] = [payload.slice(0, payload.lastIndexOf(".")), Number(payload.slice(payload.lastIndexOf(".") + 1))];
  if (!exp || exp < Date.now() / 1000) return null;
  const user = users.find((u) => u.email === email);
  if (!user) return null;
  return { user, org: orgs.find((o) => o.id === user.orgId)! };
}

export async function requireSession() {
  const s = await getSession();
  if (!s) redirect("/portal/login");
  return s;
}
