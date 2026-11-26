import { Suspense } from "react";

// Everything in the portal reads the session cookie (runtime data), so it
// renders behind a Suspense boundary instead of being prerendered.
export default function PortalRoot({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f6f5f2]" />}>
      {children}
    </Suspense>
  );
}
