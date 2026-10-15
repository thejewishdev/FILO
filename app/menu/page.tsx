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
      <header className="on-dark relative isolate flex h-[62svh] min-h-[26rem] items-end justify-center bg-ink text-bone">
        <Photo photo="cacio" alt="Tonnarelli cacio e pepe beside a wheel of Pecorino" fill priority fetchPriority="high" sizes="100vw" quality={72} className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(25_24_23/0.82)_0%,rgb(25_24_23/0.45)_45%,rgb(25_24_23/0.55)_100%)]" />
        <div className="px-5 pb-14 text-center sm:pb-20">
          <h1 className="text-[clamp(4.5rem,11vw,9rem)] leading-[0.85] tracking-[-0.03em] italic">
            <span className="rise-mask">
              <span className="rise">Menu</span>
            </span>
          </h1>
          <p className="mt-5 animate-[fade-up_1.2s_var(--ease-silk)_0.3s_both] text-bone/85">Cut by hand through the day. Changes with the season.</p>
        </div>
      </header>
      <MenuExplorer />
    </>
  );
}
