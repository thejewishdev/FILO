import { MapPin } from "lucide-react";
import Link from "next/link";
import { LiveStatus } from "@/components/ui/LiveStatus";
import { hoursSummary, site } from "@/data/site";
import { ReserveButton } from "./ReserveButton";
import { StudioCredit } from "./StudioCredit";

export function Footer() {
  const { lat, lng } = site.address;
  const d = 0.0035;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${[lng - d * 2, lat - d, lng + d * 2, lat + d].join(",")}&layer=mapnik&marker=${lat},${lng}`;
  const directions = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=18/${lat}/${lng}`;

  return (
    <footer className="on-dark relative z-[1] bg-ink text-bone">
      <div className="mx-auto max-w-[90rem] px-5 pt-20 pb-28 sm:px-10 md:pb-12 lg:pt-32">
        <div className="grid gap-8 border-b border-bone/12 pb-14 md:gap-10 md:pb-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="text-[clamp(2.4rem,6.5vw,6rem)] leading-[0.98] italic">An evening at Filo begins with a reservation.</h2>
          <div className="flex flex-col gap-5 lg:items-end">
            <ReserveButton className="w-full sm:w-auto [--btn-fill:var(--color-bone)] [--btn-text:var(--color-ink)]" />
            <p className="max-w-[22rem] text-[0.95rem] text-bone/70 lg:text-right">Six seats at the pasta counter are kept each night for guests without a booking.</p>
          </div>
        </div>

        <div className="grid gap-12 pt-12 md:grid-cols-2 md:gap-14 md:pt-16 lg:grid-cols-[1fr_1fr_1.25fr] lg:gap-16">
          <section aria-labelledby="f-hours">
            <h3 id="f-hours" className="mb-6 text-[1.75rem] italic">
              Hours
            </h3>
            <LiveStatus className="mb-6 text-brass-light" />
            <dl className="space-y-4 text-[0.95rem]">
              {hoursSummary.map((h) => (
                <div key={h.days} className="flex justify-between gap-6 border-b border-bone/10 pb-4">
                  <dt>{h.days}</dt>
                  <dd className="text-right text-bone/70">{h.time}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="f-visit">
            <h3 id="f-visit" className="mb-6 text-[1.75rem] italic">
              Visit
            </h3>
            <address className="space-y-1 text-[0.95rem] not-italic">
              <p>{site.address.street}</p>
              <p>{site.address.city}</p>
              <p className="pt-4">
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-line inline-block py-1.5">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="link-line inline-block py-1.5">
                  {site.email}
                </a>
              </p>
            </address>
            <ul className="mt-6 flex gap-7 text-[0.95rem]">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="link-line inline-block py-2">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Map" className="md:col-span-2 lg:col-span-1">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#2a2826] sm:aspect-[16/10]">
              {/* OSM has no dark tiles: the embed is inverted and toned to sit on ink. */}
              <iframe
                title={`Map showing ${site.name} at ${site.address.street}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full border-0 [filter:invert(0.92)_hue-rotate(180deg)_grayscale(0.85)_sepia(0.2)_brightness(0.85)_contrast(1.05)]"
              />
            </div>
            <a href={directions} target="_blank" rel="noreferrer" className="link-line mt-3 inline-flex items-center gap-2 py-2 text-[0.95rem]">
              <MapPin size={16} strokeWidth={1.25} aria-hidden /> Directions
            </a>
          </section>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end md:mt-24">
          <p aria-hidden className="font-display text-[clamp(5rem,16vw,13rem)] leading-[0.75] text-bone/90 italic">
            {site.name}
          </p>
          <nav aria-label="Footer" className="flex items-center gap-7 pb-2 text-[0.9rem] text-bone/70">
            <Link href="/" className="link-line py-2">
              Home
            </Link>
            <Link href="/menu/" className="link-line py-2">
              Menu
            </Link>
            <span>&copy; {new Date().getFullYear()} {site.name}</span>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-bone/10 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[0.85rem] text-bone/60">A concept website made for a portfolio. Filo is a fictional restaurant.</p>
          <StudioCredit />
        </div>
      </div>
    </footer>
  );
}
