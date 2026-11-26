import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { requests as seed, type Request } from "./portal-data";

// Local JSON file store (dev only). Not suitable for serverless hosting:
// swap these functions for a database (Supabase) later; callers won't change.
const dir = path.join(process.cwd(), "data");

async function read<T>(file: string, fallback: T): Promise<T> {
  try { return JSON.parse(await fs.readFile(path.join(dir, file), "utf8")); } catch { return fallback; }
}
async function write(file: string, data: unknown) {
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, file), JSON.stringify(data, null, 2));
}

// ---- Requests ----
export async function listRequests(orgId?: string): Promise<Request[]> {
  const [extra, overrides] = await Promise.all([read<Request[]>("requests.json", []), read<Record<string, Request["status"]>>("request-status.json", {})]);
  return [...extra, ...seed]
    .map((r) => ({ ...r, status: overrides[r.id] ?? r.status }))
    .filter((r) => !orgId || r.orgId === orgId);
}

export async function addRequest(orgId: string, title: string, owner: string) {
  const extra = await read<Request[]>("requests.json", []);
  const item: Request = { id: `r-${Date.now()}`, orgId, title, status: "Open", owner, date: new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "short" }) };
  await write("requests.json", [item, ...extra]);
}

export async function setRequestStatus(id: string, status: Request["status"]) {
  const o = await read<Record<string, string>>("request-status.json", {});
  o[id] = status;
  await write("request-status.json", o);
}

// ---- Leads ----
export type Lead = { id: string; createdAt: string; first: string; last: string; email: string; company: string; title: string; subject: string; industry: string; source: string; message: string };
export async function listLeads() { return read<Lead[]>("leads.json", []); }
export async function addLead(l: Omit<Lead, "id" | "createdAt">) {
  const all = await listLeads();
  const lead: Lead = { id: `l-${Date.now()}`, createdAt: new Date().toISOString(), ...l };
  await write("leads.json", [lead, ...all]);
  return lead;
}

// ---- Intake and generated reports ----
export type ReportItem = { title: string; value: number; risk: number; effort: number; why: string };
export type Intake = { id: string; orgId: string; createdAt: string; answers: Record<string, string>; items: ReportItem[]; summary: string; usedAI: boolean };
export async function listIntakes(orgId: string) { return (await read<Intake[]>("intakes.json", [])).filter((i) => i.orgId === orgId); }
export async function addIntake(i: Intake) {
  const all = await read<Intake[]>("intakes.json", []);
  await write("intakes.json", [i, ...all]);
}
