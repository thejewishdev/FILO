import { ReserveButton } from "@/components/layout/ReserveButton";
import { Photo } from "@/components/ui/Photo";
import type { PhotoKey } from "@/data/photos";

const views: { photo: PhotoKey; alt: string; caption: string }[] = [
  { photo: "darkRoom", alt: "The dining room under low pendant lights", caption: "The dining room" },
  { photo: "bar", alt: "The bar with its backlit shelves", caption: "The bar" },
  { photo: "chefPlating", alt: "The pass, under copper lamps", caption: "The pass" },
  { photo: "wineBottles", alt: "Bottles in the cellar", caption: "The cellar" },
];

/** La sala: one full-width photograph of the room with its description, then four smaller views. Static: nothing moves on scroll. */
export function Sala() {
  return (
    <section aria-labelledby="sala-title" className="on-dark relative z-[1] bg-ink text-bone">
      <div className="relative isolate flex min-h-[80svh] items-end md:min-h-[92svh]">
        <Photo photo="candleTable" alt="A candlelit table laid for dinner at Filo" fill sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(25_24_23/0.88)_0%,rgb(25_24_23/0.4)_45%,rgb(25_24_23/0.15)_100%)]" />
        <div className="mx-auto w-full max-w-[90rem] px-5 pb-14 sm:px-10 lg:pb-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 id="sala-title" className="text-[clamp(3.5rem,11vw,10rem)] leading-[0.85] italic lg:col-span-6">
              La sala
            </h2>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-[0.98rem] text-bone/90 md:text-[1.05rem]">
                A Georgian townhouse on Mount Street: forty covers in walnut and plaster, a pasta table in the front window, a cellar of six
                hundred Italian wines beneath, and one long table for eight beside the pass.
              </p>
              <ReserveButton
                label="Reserve the chef's table"
                className="mt-8 [--btn-fill:var(--color-bone)] [--btn-text:var(--color-ink)]"
              />
            </div>
          </div>
        </div>
      </div>

      <ul className="no-scrollbar mx-auto flex max-w-[90rem] snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 py-14 sm:grid sm:grid-cols-4 sm:gap-6 sm:px-10 md:py-20">
        {views.map((v) => (
          <li key={v.photo} className="w-[62vw] shrink-0 snap-start sm:w-auto">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-bone/5">
                <Photo photo={v.photo} alt={v.alt} fill sizes="(min-width: 640px) 22vw, 62vw" className="object-cover" />
              </div>
              <figcaption className="mt-4 text-center font-display text-[1.2rem] italic text-bone/85">{v.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
