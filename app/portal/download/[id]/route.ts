import { getSession } from "@/lib/session";
import { deliverables } from "@/lib/portal-data";

// Sample download: returns a placeholder text file. Replace with real file storage later.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });
  const { id } = await params;
  const item = deliverables.find((d) => d.id === id && d.orgId === session.org.id);
  if (!item) return new Response("Not found", { status: 404 });
  const body = `${item.title}\n${item.type} · ${item.date}\n\nPlaceholder file for ${session.org.name}.\nReal documents will be served here once file storage is connected.\n`;
  const safe = item.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safe}.txt"`,
      "Cache-Control": "private, no-store",
    },
  });
}
