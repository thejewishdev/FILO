"use client";

import Link from "next/link";
import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { currency, getItem, signatures } from "@/data/menu";
import { cn } from "@/lib/cn";

const profileLabels = { richness: "Richness", salinity: "Salinity", acidity: "Acidity" } as const;

/** Where each place setting sits on the table (percent of the table's size). Top-side settings face the other way. */
const seats = [
  { x: 27, y: 27, facing: "down" },
  { x: 73, y: 27, facing: "down" },
  { x: 27, y: 73, facing: "up" },
  { x: 73, y: 73, facing: "up" },
] as const;

/** Fork, knife and wine glass, drawn in fine brass-tinted lines around a plate. */
function Cutlery() {
  return (
    <svg aria-hidden viewBox="0 0 200 120" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <g fill="none" stroke="rgb(237 231 221 / 0.55)" strokeWidth="0.9" strokeLinecap="round">
        {/* Fork, left of the plate */}
        <path d="M30 22 V98 M26 22 V38 M30 22 V38 M34 22 V38 M26 38 Q30 44 34 38" />
        {/* Knife, right of the plate */}
        <path d="M170 22 C176 30 176 48 172 58 L170 58 V98" />
        {/* Wine glass, above right */}
        <circle cx="178" cy="6" r="9" />
        <circle cx="178" cy="6" r="6.2" strokeOpacity="0.4" />
      </g>
    </svg>
  );
}

/**
 * The four signatures as a dinner table seen from above. Choosing a plate lifts it and shows
 * its notes beside the table. No scroll-linked work: only short transitions on interaction.
 */
export function Signatures() {
  const [index, setIndex] = useState(1);
  const current = signatures[index];
  const item = getItem(current.dishId);

  return (
    <section aria-labelledby="sig-title" className="mx-auto max-w-[90rem] px-5 pb-32 sm:px-10 lg:pb-44">
      <div className="flex flex-col gap-6 border-t border-ink/15 pt-20 md:flex-row md:items-end md:justify-between lg:pt-28">
        <h2 id="sig-title" className="max-w-[16ch] text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] italic">
          Four plates worth crossing London for
        </h2>
        <p className="max-w-[24rem] text-ink-soft">The table our regulars would set. Choose a plate to read about it.</p>
      </div>

      <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-14">
        {/* The table */}
        <div
          role="tablist"
          aria-label="Signature dishes"
          className="relative aspect-square overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(25_24_23/0.55)] sm:aspect-[4/3] lg:col-span-8 lg:aspect-[16/10]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgb(255 255 255 / 0.06), transparent 65%), repeating-linear-gradient(90deg, rgb(255 255 255 / 0.018) 0 2px, transparent 2px 11px), repeating-linear-gradient(90deg, rgb(0 0 0 / 0.05) 0 1px, transparent 1px 37px), linear-gradient(180deg, #3b2a21, #2c1f19)",
          }}
        >
          {/* Linen runner down the middle of the table */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-[16%] -translate-y-1/2 bg-bone/90"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgb(25 24 23 / 0.035) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgb(25 24 23 / 0.03) 0 1px, transparent 1px 3px)",
            }}
          />
          <div aria-hidden className="absolute top-1/2 left-1/2 aspect-square w-[5%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brass/60" />

          {signatures.map((s, i) => {
            const dish = getItem(s.dishId);
            const seat = seats[i];
            const selected = i === index;
            return (
              <div
                key={s.dishId}
                className="absolute w-[50%] -translate-x-1/2 -translate-y-1/2 sm:w-[34%]"
                style={{ left: `${seat.x}%`, top: `${seat.y}%` }}
              >
                <div className={cn("relative aspect-[200/120]", seat.facing === "down" && "rotate-180")}>
                  <Cutlery />
                </div>
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <button
                    type="button"
                    role="tab"
                    id={`plate-${i}`}
                    aria-selected={selected}
                    aria-controls="plate-panel"
                    aria-label={dish.name}
                    onClick={() => setIndex(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setIndex(i)}
                    className={cn(
                      "pointer-events-auto aspect-square w-[58%] rounded-full bg-bone p-[5%] transition-[transform,box-shadow,opacity] duration-500 ease-(--ease-silk)",
                      selected
                        ? "-translate-y-1.5 scale-105 shadow-[0_22px_30px_-12px_rgb(0_0_0/0.75)]"
                        : "opacity-80 shadow-[0_8px_14px_-8px_rgb(0_0_0/0.7)] hover:opacity-100",
                    )}
                  >
                    {/* Charger rim, then the dish */}
                    <span className="relative block h-full w-full overflow-hidden rounded-full ring-1 ring-ink/10">
                      {dish.photo && <Photo photo={dish.photo} alt="" fill sizes="(min-width: 1024px) 15vw, 30vw" className="object-cover" />}
                    </span>
                  </button>
                </div>
                {/* Place card */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-1/2 hidden -translate-x-1/2 bg-bone px-3 py-1 font-display text-[0.85rem] whitespace-nowrap text-ink italic shadow-sm transition-opacity duration-500 sm:block",
                    seat.facing === "down" ? "-top-9" : "-bottom-9",
                    selected ? "opacity-100" : "opacity-70",
                  )}
                >
                  {dish.name.split(",")[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Notes for the chosen plate */}
        <div id="plate-panel" role="tabpanel" aria-labelledby={`plate-${index}`} className="lg:col-span-4">
          <div key={item.id} className="animate-[fade-up_0.7s_var(--ease-silk)]">
            <p className="text-[0.9rem] text-ink-soft">Signature</p>
            <div className="mt-3 flex items-baseline justify-between gap-6">
              <h3 className="text-[clamp(1.9rem,2.8vw,2.6rem)] leading-[1.05] italic">{item.name}</h3>
              <span className="shrink-0 tabular-nums">{currency.format(item.price)}</span>
            </div>
            <p className="mt-5 font-display text-[1.2rem] leading-snug">{item.tastingNotes}</p>
            {item.origin && <p className="mt-3 text-[0.95rem] text-ink-soft">{item.origin}</p>}
            <dl className="mt-8 grid grid-cols-3 gap-5">
              {(Object.keys(profileLabels) as (keyof typeof profileLabels)[]).map((k) => (
                <div key={k}>
                  <dt className="text-[0.85rem] text-ink-soft">{profileLabels[k]}</dt>
                  <dd className="mt-2">
                    <span className="sr-only">{current.profile[k]} out of 5</span>
                    <span aria-hidden className="block h-px bg-ink/15">
                      <span className="block h-px bg-brass transition-[width] duration-700 ease-(--ease-silk)" style={{ width: `${current.profile[k] * 20}%` }} />
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <Link href={`/menu/?dish=${item.id}`} className="link-line mt-7 inline-block py-2 text-[0.95rem] text-barolo">
              See it on the menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
