import { ReserveButton } from "@/components/layout/ReserveButton";
import { Photo } from "@/components/ui/Photo";
import type { PhotoKey } from "@/data/photos";

const sides: { photo: PhotoKey; alt: string; className: string; dx: string; dy: string }[] = [
  { photo: "darkRoom", alt: "The dining room under low pendant lights", className: "left-[5%] top-[17%] w-[26vw] aspect-[3/4] sm:w-[17vw]", dx: "-32vw", dy: "-22vh" },
  { photo: "bar", alt: "The bar with its backlit shelves", className: "right-[6%] top-[15%] w-[30vw] aspect-[4/3] sm:w-[19vw]", dx: "32vw", dy: "-26vh" },
  { photo: "chefPlating", alt: "The pass, under copper lamps", className: "left-[9%] bottom-[9%] w-[24vw] aspect-[4/5] sm:w-[14vw]", dx: "-28vw", dy: "26vh" },
  { photo: "wineBottles", alt: "Bottles in the cellar", className: "right-[8%] bottom-[11%] w-[30vw] aspect-[16/11] sm:w-[20vw]", dx: "30vw", dy: "24vh" },
];

/**
 * La sala: a pinned scene driven by scroll (CSS view timeline, no JavaScript). The room starts as
 * a small arch among four smaller views and grows to fill the screen while they drift away; then the
 * words arrive. Without scroll-timeline support it simply shows the final, full-screen state.
 */
export function Sala() {
  return (
    <section aria-labelledby="sala-title" className="sala on-dark relative z-[1] h-[230vh] bg-ink text-bone md:h-[320vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {sides.map((s) => (
          <div
            key={s.photo}
            className={`sala-side absolute overflow-hidden ${s.className}`}
            style={{ ["--dx" as string]: s.dx, ["--dy" as string]: s.dy }}
          >
            <Photo photo={s.photo} alt={s.alt} fill sizes="(min-width: 640px) 20vw, 30vw" className="object-cover" />
          </div>
        ))}

        <div className="sala-center absolute inset-0 z-10 origin-center overflow-hidden">
          <Photo photo="candleTable" alt="A candlelit table laid for dinner at Filo" fill sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(25_24_23/0.85)_0%,rgb(25_24_23/0.35)_45%,rgb(25_24_23/0.15)_100%)]" />
        </div>

        <div className="sala-text absolute inset-x-0 bottom-0 z-20 mx-auto max-w-[90rem] px-5 pb-14 sm:px-10 lg:pb-20">
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
    </section>
  );
}
