// SAMPLE DATA ONLY. Replace with a real database (and hashed passwords) before going live.
export type Role = "admin" | "member" | "staff";

export type PortalUser = { email: string; password: string; name: string; role: Role; orgId: string };
export type Org = { id: string; name: string; sector: string; lead: string };
export type Milestone = { title: string; due: string; status: "done" | "active" | "upcoming" };
export type Deliverable = { id: string; orgId: string; title: string; type: string; date: string; size: string };
export type Request = { id: string; orgId: string; title: string; status: "Open" | "In progress" | "Done"; date: string; owner: string };
export type Opportunity = { id: string; orgId: string; title: string; value: number; risk: number; effort: number; stage: "Idea" | "Pilot" | "Live" };
export type Invoice = { id: string; orgId: string; date: string; amount: number; status: "Paid" | "Due" | "Overdue" };

export const orgs: Org[] = [
  { id: "focusai", name: "Focus AI", sector: "Internal", lead: "Focus AI team" },
  { id: "northpoint", name: "Northpoint Capital", sector: "Funds management", lead: "Alex Morgan" },
  { id: "harbour", name: "Harbour & Co Advisory", sector: "Advisory", lead: "Jordan Hayes" },
];

export const users: PortalUser[] = [
  { email: "team@focusai.example", password: "demo1234", name: "Focus AI Team", role: "staff", orgId: "focusai" },
  { email: "demo@northpoint.example", password: "demo1234", name: "Priya Shah", role: "admin", orgId: "northpoint" },
  { email: "member@northpoint.example", password: "demo1234", name: "Tom Reilly", role: "member", orgId: "northpoint" },
  { email: "demo@harbour.example", password: "demo1234", name: "Mia Lawson", role: "admin", orgId: "harbour" },
];

export const milestones: Record<string, Milestone[]> = {
  northpoint: [
    { title: "AI opportunity assessment", due: "12 Aug", status: "done" },
    { title: "Knowledge assistant pilot", due: "30 Sep", status: "done" },
    { title: "Rollout to research team", due: "28 Nov", status: "active" },
    { title: "Governance framework sign-off", due: "19 Dec", status: "upcoming" },
  ],
  harbour: [
    { title: "Workflow mapping", due: "02 Sep", status: "done" },
    { title: "Document drafting automation", due: "14 Nov", status: "active" },
    { title: "Staff training programme", due: "12 Dec", status: "upcoming" },
  ],
};

export const deliverables: Deliverable[] = [
  { id: "d1", orgId: "northpoint", title: "AI Opportunity Assessment", type: "Report", date: "12 Aug 2026", size: "2.4 MB" },
  { id: "d2", orgId: "northpoint", title: "Pilot results and findings", type: "Presentation", date: "02 Oct 2026", size: "5.1 MB" },
  { id: "d3", orgId: "northpoint", title: "AI acceptable-use policy", type: "Policy", date: "14 Nov 2026", size: "310 KB" },
  { id: "d4", orgId: "northpoint", title: "Leadership workshop recording", type: "Video", date: "20 Oct 2026", size: "184 MB" },
  { id: "d5", orgId: "harbour", title: "Workflow map: advisory", type: "Report", date: "02 Sep 2026", size: "1.8 MB" },
  { id: "d6", orgId: "harbour", title: "Drafting automation spec", type: "Document", date: "21 Oct 2026", size: "640 KB" },
];

export const requests: Request[] = [
  { id: "r1", orgId: "northpoint", title: "Add 2023 fund reports to the assistant", status: "In progress", date: "18 Nov", owner: "Sam Rivera" },
  { id: "r2", orgId: "northpoint", title: "Training session for new analysts", status: "Open", date: "22 Nov", owner: "Casey Nguyen" },
  { id: "r3", orgId: "northpoint", title: "Export usage numbers for board pack", status: "Done", date: "04 Nov", owner: "Taylor Chen" },
  { id: "r4", orgId: "harbour", title: "Change template tone for client letters", status: "Open", date: "20 Nov", owner: "Sam Rivera" },
];

export const opportunities: Opportunity[] = [
  { id: "o1", orgId: "northpoint", title: "Research knowledge assistant", value: 9, risk: 3, effort: 5, stage: "Live" },
  { id: "o2", orgId: "northpoint", title: "Investor report drafting", value: 7, risk: 4, effort: 4, stage: "Pilot" },
  { id: "o3", orgId: "northpoint", title: "Due-diligence document review", value: 8, risk: 6, effort: 7, stage: "Idea" },
  { id: "o4", orgId: "harbour", title: "Client letter drafting", value: 8, risk: 3, effort: 3, stage: "Pilot" },
  { id: "o5", orgId: "harbour", title: "Meeting notes and actions", value: 6, risk: 2, effort: 2, stage: "Idea" },
];

export const invoices: Invoice[] = [
  { id: "INV-1042", orgId: "northpoint", date: "01 Oct 2026", amount: 18500, status: "Paid" },
  { id: "INV-1061", orgId: "northpoint", date: "01 Nov 2026", amount: 18500, status: "Due" },
  { id: "INV-1050", orgId: "harbour", date: "15 Oct 2026", amount: 12000, status: "Paid" },
  { id: "INV-1066", orgId: "harbour", date: "15 Nov 2026", amount: 12000, status: "Overdue" },
];

export const usageStats: Record<string, { label: string; value: string }[]> = {
  northpoint: [{ label: "Hours saved this month", value: "212" }, { label: "Assistant queries", value: "3,480" }, { label: "Active users", value: "27" }],
  harbour: [{ label: "Hours saved this month", value: "64" }, { label: "Letters drafted", value: "410" }, { label: "Active users", value: "11" }],
};
