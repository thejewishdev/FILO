"use client";

import { Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LiveStatus } from "@/components/ui/LiveStatus";
import { Sheet } from "@/components/ui/Sheet";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { useReservation } from "./Reservation";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu/", label: "Menu" },
];

export function Header() {
  const pathname = usePathname();
  const { open: reserve } = useReservation();
  const [pastHero, setPastHero] = useState(false);
  const [drawer, setDrawer] = useState(false);
  // Pages that open with a full-bleed photo get a transparent header until you scroll.
  const hasPhotoTop = pathname === "/" || pathname.startsWith("/menu");
  const overHero = hasPhotoTop && !pastHero;

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => setDrawer(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <>
      <a href="#main" className="fixed top-3 left-3 z-[90] -translate-y-24 bg-ink px-4 py-2 text-stone focus:translate-y-0">
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-(--header-h) border-b transition-[background-color,color,border-color] duration-700 ease-(--ease-silk)",
          overHero ? "on-dark border-transparent text-bone" : "border-ink/10 bg-stone text-ink",
        )}
      >
        <div className="mx-auto grid h-full max-w-[90rem] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-10">
          <nav aria-label="Main" className="hidden items-center gap-9 text-[0.95rem] tracking-[0.03em] md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className="link-line pb-0.5">
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setDrawer(true)}
            aria-label="Open navigation"
            aria-expanded={drawer}
            className="tap -ml-2 grid h-11 w-11 place-items-center md:hidden"
          >
            <MenuIcon size={24} strokeWidth={1.25} />
          </button>

          <Link href="/" aria-label={`${site.name}, home`} className="font-display text-[2.35rem] leading-none italic">
            {site.name}
          </Link>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={reserve}
              className={cn(
                "btn min-h-11 px-5 text-[0.9rem] max-sm:border-0 max-sm:px-0 max-sm:before:hidden",
                overHero ? "[--btn-fill:var(--color-bone)] [--btn-text:var(--color-ink)]" : "",
              )}
            >
              Reserve
            </button>
          </div>
        </div>
      </header>

      <Sheet
        open={drawer}
        onClose={() => setDrawer(false)}
        label="Navigation"
        from="translateX(-100%)"
        className="my-0 mr-auto ml-0 h-dvh w-[min(88vw,24rem)] md:hidden"
        panelClassName="on-dark flex h-full flex-col bg-barolo px-7 pt-5 pb-9 text-bone"
      >
        <div className="flex">
          <button type="button" onClick={() => setDrawer(false)} aria-label="Close navigation" className="tap -ml-2 grid h-11 w-11 place-items-center">
            <X size={24} strokeWidth={1.25} />
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-10 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setDrawer(false)}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn("font-display text-[3.5rem] leading-[1.1]", isActive(l.href) ? "italic text-brass-light" : "")}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-6">
          <LiveStatus />
          <button
            type="button"
            onClick={() => {
              setDrawer(false);
              reserve();
            }}
            className="btn w-full [--btn-fill:var(--color-bone)] [--btn-text:var(--color-barolo)]"
          >
            Reserve a table
          </button>
          <p className="text-[0.95rem] text-bone/75">
            {site.address.street}, {site.address.city}
            <br />
            {site.phone}
          </p>
        </div>
      </Sheet>
    </>
  );
}
