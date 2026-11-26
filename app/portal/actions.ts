"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addRequest } from "@/lib/store";
import { checkLogin, createSession, destroySession, requireSession } from "@/lib/session";

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
  revalidatePath("/portal/requests");
  revalidatePath("/portal");
  return { ok: true };
}
