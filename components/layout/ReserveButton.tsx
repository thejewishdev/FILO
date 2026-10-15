"use client";

import { cn } from "@/lib/cn";
import { useReservation } from "./Reservation";

export function ReserveButton({ className, label = "Reserve a table" }: { className?: string; label?: string }) {
  const { open } = useReservation();
  return (
    <button type="button" onClick={open} className={cn("btn", className)}>
      {label}
    </button>
  );
}
