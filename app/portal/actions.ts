"use server";
import { redirect } from "next/navigation";
import { checkLogin, createSession, destroySession } from "@/lib/session";

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
