"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Photo } from "@/components/ui/Photo";
import { getItem, pairings } from "@/data/menu";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Pairings({ onOpenDish }: { onOpenDish: (id: string) => void }) {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = pairings[index];
  const dish = getItem(current.dishId);
  const wine = getItem(current.wineId);

  const onKey = (e: KeyboardEvent) => {
    const step = ({ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as Record<string, number>)[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (index + step + pairings.length) % pairings.length;
    setIndex(next);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="pairings-title" className="on-dark relative z-[1] bg-barolo text-bone">
      <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-10 sm:py-28 lg:py-40">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 id="pairings-title" className="text-[clamp(2.6rem,5vw,4.6rem)] leading-[1.05] lg:col-span-7">
            The sommelier&rsquo;s table
          </h2>
          <p className="max-w-[28rem] text-bone/75 lg:col-span-4 lg:col-start-9 lg:self-end">
            {site.sommelier} keeps four pairings on the list all year, because they never fail. Choose a dish to see what she pours, and why.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-16 sm:gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div
            role="tablist"
            aria-label="Pairings"
            onKeyDown={onKey}
            className="no-scrollbar fade-edges -mx-5 flex gap-2 overflow-x-auto px-5 lg:col-span-5 lg:mx-0 lg:block lg:px-0 lg:[mask-image:none]"
          >
            {pairings.map((p, i) => (
              <button
                key={p.dishId}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`pair-${i}`}
                aria-selected={i === index}
                aria-controls="pair-panel"
                tabIndex={i === index ? 0 : -1}
                onClick={() => setIndex(i)}
                className={cn(
                  "group flex shrink-0 items-baseline gap-5 border px-4 py-3 text-left transition-colors duration-500 lg:w-full lg:border-x-0 lg:border-b-0 lg:border-bone/15 lg:px-0 lg:py-6 lg:last:border-b",
                  i === index ? "border-bone/70 bg-bone/8" : "border-bone/20",
                )}
              >
                <span aria-hidden className={cn("hidden h-px w-8 shrink-0 translate-y-[-0.35em] lg:block transition-[background-color,width] duration-700 ease-(--ease-silk)", i === index ? "w-12 bg-brass-light" : "bg-bone/25")} />
                <span className={cn("font-display text-[1.15rem] leading-tight whitespace-nowrap transition-colors duration-700 lg:text-[clamp(1.5rem,2.4vw,2.1rem)] lg:whitespace-normal", i === index ? "text-bone italic" : "text-bone/60 group-hover:text-bone/85")}>
                  {getItem(p.dishId).name}
                </span>
              </button>
            ))}
          </div>

          <div id="pair-panel" role="tabpanel" aria-labelledby={`pair-${index}`} className="grid gap-8 sm:grid-cols-[0.8fr_1fr] lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink sm:aspect-[3/4]">
              {pairings.map((p, i) => {
                const d = getItem(p.dishId);
                return (
                  <div key={p.dishId} className={cn("absolute inset-0 transition-opacity duration-1000 ease-(--ease-silk)", i === index ? "opacity-100" : "opacity-0")}>
                    {d.photo && <Photo photo={d.photo} alt={i === index ? d.name : ""} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />}
                  </div>
                );
              })}
            </div>
            <div key={index} className="animate-[fade-up_0.9s_var(--ease-silk)] self-center">
              <p className="text-[0.9rem] text-bone/70">Poured with it</p>
              <h3 className="mt-2 text-[clamp(1.8rem,2.6vw,2.4rem)] leading-[1.1] italic">{wine.name}</h3>
              <p className="mt-2 text-[0.95rem] text-bone/70">{wine.description}</p>
              <div aria-hidden className="my-7 h-px w-12 bg-brass-light" />
              <p className="text-[1.02rem] leading-relaxed text-bone/90">{current.why}</p>
              <button type="button" onClick={() => onOpenDish(dish.id)} className="btn mt-9 [--btn-fill:var(--color-bone)] [--btn-text:var(--color-barolo)]">
                View the dish
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
