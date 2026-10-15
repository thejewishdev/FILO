"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { useReservation } from "./Reservation";

/**
 * Phones only: a slim bar pinned to the bottom of the screen with the two things people do
 * from a restaurant site on their phone, call or reserve. Slides in after the first screen.
 */
export function MobileBar() {
  const { open } = useReservation();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "on-dark fixed inset-x-0 bottom-0 z-40 border-t border-bone/10 bg-ink px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-bone transition-transform duration-500 ease-(--ease-silk) md:hidden",
        shown ? "translate-y-0" : "translate-y-full",
      )}
      inert={!shown}
    >
      <div className="flex gap-3">
        <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="tap flex min-h-12 flex-1 items-center justify-center gap-2 border border-bone/30 text-[0.95rem]">
          <Phone size={16} strokeWidth={1.25} aria-hidden /> Call
        </a>
        <button type="button" onClick={open} className="tap flex min-h-12 flex-[2] items-center justify-center bg-bone text-[0.95rem] text-ink">
          Reserve a table
        </button>
      </div>
    </div>
  );
}
