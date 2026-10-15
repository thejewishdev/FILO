import type { Metadata } from "next";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { categories, menu } from "@/data/menu";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Menu",
  description: "Hand-cut pasta, antipasti, secondi, the tasting menu, dolci, cocktails and wine at Filo, Mount Street, Mayfair.",
  alternates: { canonical: `${site.url}/menu/` },
};

export default function MenuPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Menu",
          name: `${site.name} menu`,
          hasMenuSection: categories.map((c) => ({
            "@type": "MenuSection",
            name: c.label,
            hasMenuItem: menu
              .filter((i) => i.category === c.id)
              .map((i) => ({ "@type": "MenuItem", name: i.name, description: i.description, offers: { "@type": "Offer", price: i.price, priceCurrency: "GBP" } })),
          })),
        }}
      />
      {/* A black band: the fork photo is shot on pure black, so it melts into the background with no visible edge. */}
      <header className="on-dark relative isolate overflow-hidden bg-black text-bone">
        <div className="mx-auto grid min-h-[29rem] max-w-[90rem] grid-cols-[1fr_auto] items-end gap-6 px-5 pt-(--header-h) sm:px-10 md:min-h-[78svh] md:grid-cols-12 md:items-center">
          <div className="relative z-10 max-w-[60%] pb-12 sm:max-w-[54%] md:col-span-7 md:max-w-none md:pb-0">
            <h1 className="text-[clamp(4.5rem,13vw,11rem)] leading-[0.85] tracking-[-0.03em] italic">
              <span className="rise-mask">
                <span className="rise">Menu</span>
              </span>
            </h1>
            <p className="mt-6 max-w-[26rem] animate-[fade-up_1.2s_var(--ease-silk)_0.3s_both] font-display text-[clamp(1.2rem,1.8vw,1.5rem)] leading-snug text-bone/90 italic">
              Cut by hand through the day. Changes with the season.
            </p>
            <p className="mt-8 animate-[fade-up_1.2s_var(--ease-silk)_0.45s_both] text-[0.9rem] text-bone/65">
              Lunch Thursday to Saturday. Dinner Tuesday to Saturday.
            </p>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[44%] md:static md:col-span-5 md:h-full md:w-auto">
            <div className="relative h-full min-h-[29rem] md:min-h-[78svh]">
              <Photo
                photo="forkTwirl"
                alt="A twist of spaghetti in tomato sauce on a silver fork"
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 768px) 40vw, 44vw"
                quality={75}
                className="object-contain object-bottom md:object-center"
              />
            </div>
          </div>
        </div>
      </header>
      <MenuExplorer />
    </>
  );
}
