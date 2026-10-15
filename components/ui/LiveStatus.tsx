"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";

/** Worked out in the browser (the HTML is built ahead of time). Height is reserved so nothing shifts. */
export function LiveStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getOpenStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={cn("flex min-h-6 items-center gap-3 text-[0.9rem] tracking-[0.02em]", className)} aria-live="polite">
      <span aria-hidden className={cn("h-1.5 w-1.5 shrink-0 rounded-full", status?.isOpen ? "live-dot bg-brass-light" : "bg-current opacity-40")} />
      <span className={cn("transition-opacity duration-700", status ? "opacity-100" : "opacity-0")}>
        {status?.label ?? "Checking today's hours"}
      </span>
    </p>
  );
}
