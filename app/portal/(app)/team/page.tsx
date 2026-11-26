import { requireSession } from "@/lib/session";
import { users } from "@/lib/portal-data";

export const metadata = { title: "Team | Focus AI portal" };

export default async function Page() {
  const { user, org } = await requireSession();
  const members = users.filter((u) => u.orgId === org.id);
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl">Team</h1>
      <p className="mt-1 text-black/60">People at {org.name} with access to this portal.</p>
      <ul className="mt-8 divide-y divide-black/10 rounded-lg bg-white">
        {members.map((m) => (
          <li key={m.email} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div><p className="font-medium">{m.name}</p><p className="text-xs text-black/50">{m.email}</p></div>
            <span className="rounded-full bg-soft px-3 py-1 text-xs">{m.role === "admin" ? "Client admin" : "Team member"}</span>
          </li>
        ))}
      </ul>
      {user.role === "admin" ? (
        <form className="mt-6 flex flex-col gap-3 rounded-lg bg-white p-5 sm:flex-row">
          <input className="field flex-1" type="email" placeholder="Invite a colleague by email" disabled />
          <button type="button" disabled className="rounded-md bg-[#121f2c] px-5 py-3 text-sm font-medium text-white opacity-50">Invite (needs accounts backend)</button>
        </form>
      ) : (
        <p className="mt-6 text-sm text-black/60">Ask a client admin to invite colleagues.</p>
      )}
    </div>
  );
}
