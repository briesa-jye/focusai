"use client";
import { usePathname } from "next/navigation";

/** Hides the marketing header/footer inside the client portal. */
export default function Chrome({ children }: { children: React.ReactNode }) {
  return usePathname().startsWith("/portal") ? null : <>{children}</>;
}
