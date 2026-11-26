import "server-only";
import type { ReportItem } from "./store";

// Catalogue of common professional-services AI opportunities, matched by keyword.
const CATALOGUE: { re: RegExp; item: Omit<ReportItem, "why"> }[] = [
  { re: /search|find|precedent|knowledge|policy|policies|look ?up/i, item: { title: "Private knowledge assistant", value: 9, risk: 3, effort: 5 } },
  { re: /email|inbox|enquir|triage/i, item: { title: "Email triage and draft replies", value: 7, risk: 3, effort: 3 } },
  { re: /report|letter|draft|proposal|advice/i, item: { title: "Document and report drafting", value: 8, risk: 4, effort: 4 } },
  { re: /meeting|minutes|notes|transcri/i, item: { title: "Meeting capture and actions", value: 6, risk: 2, effort: 2 } },
  { re: /contract|due.?diligence|review|lease|agreement/i, item: { title: "Contract and document review", value: 8, risk: 6, effort: 7 } },
  { re: /data entry|manual|spreadsheet|copy|re-?key|admin/i, item: { title: "Admin and data-entry automation", value: 7, risk: 2, effort: 4 } },
  { re: /complian|checklist|audit|regulat/i, item: { title: "Compliance checklist automation", value: 7, risk: 5, effort: 5 } },
  { re: /onboard|training|new staff|induction/i, item: { title: "Staff onboarding assistant", value: 5, risk: 2, effort: 3 } },
];

export function heuristicReport(a: Record<string, string>) {
  const text = [a.timeSinks, a.goals, a.tools].join(" ");
  const items: ReportItem[] = CATALOGUE.filter((c) => c.re.test(text)).map((c) => ({ ...c.item, why: "Mentioned in your answers about where time goes or what you want to achieve." }));
  if (items.length === 0) items.push({ title: "Discovery workshop", value: 6, risk: 2, effort: 2, why: "We need a conversation to find the best starting point." });

  // Raise risk where the firm flagged sensitive data or concerns.
  const sensitive = /client|confidential|personal|financial|legal/i.test(`${a.data} ${a.concerns}`);
  if (sensitive) for (const i of items) i.risk = Math.min(10, i.risk + 1);

  items.sort((x, y) => y.value - y.risk * 0.5 - (x.value - x.risk * 0.5));
  const top = items[0].title;
  const summary = `Based on your answers, the strongest place to start is "${top}". We found ${items.length} opportunit${items.length === 1 ? "y" : "ies"} worth scoping.${sensitive ? " You flagged sensitive data, so we would pair any build with a governance review first." : ""}`;
  return { items, summary };
}

// Optional: asks Claude to tighten the summary. Falls back silently if no key or the call fails.
export async function aiSummary(a: Record<string, string>, base: string): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-5-5",
        max_tokens: 400,
        messages: [{ role: "user", content: `You are an AI consultant. Write a 3 sentence plain-English summary of the best AI starting points for this professional services firm. Do not invent facts.\n\nIntake answers: ${JSON.stringify(a)}\n\nDraft summary: ${base}` }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.content?.[0]?.text ?? null;
  } catch { return null; }
}
