import { requireStaff } from "@/lib/session";
import { listLeads, listRequests } from "@/lib/store";
import { orgs } from "@/lib/portal-data";

export const metadata = { title: "Admin | Focus AI portal" };

export default async function Page() {
  await requireStaff();
  const [leads, reqs] = await Promise.all([listLeads(), listRequests()]);
  const open = reqs.filter((r) => r.status !== "Done").length;
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl">Focus AI overview</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-5"><p className="text-3xl">{orgs.length - 1}</p><p className="text-xs text-black/60">Clients</p></div>
        <div className="rounded-lg bg-white p-5"><p className="text-3xl">{open}</p><p className="text-xs text-black/60">Open client requests</p></div>
        <div className="rounded-lg bg-white p-5"><p className="text-3xl">{leads.length}</p><p className="text-xs text-black/60">Website leads</p></div>
      </div>
      <h2 className="mt-10 text-xl">Website leads</h2>
      {leads.length === 0 ? (
        <p className="mt-4 rounded-lg bg-white p-6 text-black/60">No leads yet. Submissions from the contact form appear here.</p>
      ) : (
        <ul className="mt-4 divide-y divide-black/10 rounded-lg bg-white">
          {leads.map((l) => (
            <li key={l.id} className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">{l.first} {l.last} · {l.company}</p>
                <p className="text-xs text-black/50">{new Date(l.createdAt).toLocaleString("en-AU")}</p>
              </div>
              <p className="text-xs text-black/50">{l.email} · {l.subject} · {l.industry}</p>
              <p className="mt-2 text-sm text-black/70">{l.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
