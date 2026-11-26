import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { requests as seed, type Request } from "./portal-data";

// Local JSON file store so submitted requests persist in dev.
// Not suitable for serverless hosting: swap for a database (Supabase) later.
const FILE = path.join(process.cwd(), "data", "requests.json");

async function readExtra(): Promise<Request[]> {
  try { return JSON.parse(await fs.readFile(FILE, "utf8")); } catch { return []; }
}

export async function listRequests(orgId: string): Promise<Request[]> {
  const extra = await readExtra();
  return [...extra, ...seed].filter((r) => r.orgId === orgId);
}

export async function addRequest(orgId: string, title: string, owner: string) {
  const extra = await readExtra();
  const item: Request = {
    id: `r-${Date.now()}`,
    orgId,
    title,
    status: "Open",
    date: new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "short" }),
    owner,
  };
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify([item, ...extra], null, 2));
}
