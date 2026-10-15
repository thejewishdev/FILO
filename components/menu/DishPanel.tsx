"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { Sheet } from "@/components/ui/Sheet";
import { categories, currency, dietLabels, menu } from "@/data/menu";

type Props = { itemId: string | null; onClose: () => void; onStep?: (delta: number) => void };

/** Dish focus: a side panel on desktop, a bottom sheet on phones. */
export function DishPanel({ itemId, onClose, onStep }: Props) {
  // Keep the last dish on screen while the panel animates out.
  const [lastId, setLastId] = useState(itemId);
  const [desktop, setDesktop] = useState(true);
  if (itemId && itemId !== lastId) setLastId(itemId);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!itemId || !onStep) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [itemId, onStep]);

  const item = menu.find((i) => i.id === lastId);
  const category = categories.find((c) => c.id === item?.category);

  return (
    <Sheet
      open={itemId !== null}
      onClose={onClose}
      labelledBy="dish-title"
      from={desktop ? "translateX(100%)" : "translateY(100%)"}
      className={desktop ? "my-0 mr-0 ml-auto h-dvh w-[min(38rem,94vw)]" : "mx-0 mt-auto mb-0 w-full max-w-none"}
      panelClassName={desktop ? "h-full overflow-y-auto overscroll-contain bg-stone" : "max-h-[92svh] overflow-y-auto overscroll-contain rounded-t-2xl bg-stone"}
    >
      {item && (
        <article>
          {!desktop && (
            <button type="button" onClick={onClose} aria-label="Close dish details" className="flex h-7 w-full items-center justify-center bg-stone">
              <span className="h-1 w-10 rounded-full bg-ink/25" />
            </button>
          )}
          <div className="on-dark relative aspect-[4/3] w-full bg-barolo">
            {item.photo ? (
              <Photo key={item.id} photo={item.photo} alt={item.name} fill sizes="(min-width: 768px) 608px, 100vw" className="animate-[fade-in_0.8s_var(--ease-silk)] object-cover" />
            ) : (
              <div aria-hidden className="grid h-full place-items-center">
                <svg viewBox="0 0 200 60" className="w-2/3 text-brass-light">
                  <path d="M0 40 C 40 40, 50 12, 100 12 S 160 40, 200 40" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            )}
            <div className="absolute top-3 right-3 flex text-bone">
              {onStep && (
                <>
                  <button type="button" onClick={() => onStep(-1)} aria-label="Previous dish" className="tap grid h-11 w-11 place-items-center bg-ink/35 backdrop-blur-sm hover:bg-ink/60">
                    <ArrowLeft size={18} strokeWidth={1.25} />
                  </button>
                  <button type="button" onClick={() => onStep(1)} aria-label="Next dish" className="tap grid h-11 w-11 place-items-center bg-ink/35 backdrop-blur-sm hover:bg-ink/60">
                    <ArrowRight size={18} strokeWidth={1.25} />
                  </button>
                </>
              )}
              <button type="button" onClick={onClose} aria-label="Close dish details" autoFocus className="tap grid h-11 w-11 place-items-center bg-ink/35 backdrop-blur-sm hover:bg-ink/60">
                <X size={18} strokeWidth={1.25} />
              </button>
            </div>
          </div>

          <div key={item.id} className="animate-[fade-up_0.8s_var(--ease-silk)] px-6 pt-8 pb-12 sm:px-10">
            <p className="text-[0.9rem] text-ink-soft">{category?.label}</p>
            <div className="mt-2 flex items-start justify-between gap-6">
              <h2 id="dish-title" className="text-[clamp(2.1rem,4.5vw,2.9rem)] italic">
                {item.name}
              </h2>
              <span className="pt-2 text-lg tabular-nums">{currency.format(item.price)}</span>
            </div>
            {item.priceNote && <p className="mt-1 text-[0.9rem] text-ink-soft">{item.priceNote}</p>}
            <p className="mt-5 text-[1.05rem]">{item.description}</p>

            {item.tastingNotes && (
              <blockquote className="mt-8 border-l border-brass pl-5 font-display text-[1.3rem] leading-snug italic">{item.tastingNotes}</blockquote>
            )}

            <dl className="mt-10 grid gap-6 border-t border-ink/12 pt-8 text-[0.95rem] sm:grid-cols-2">
              {item.origin && (
                <div>
                  <dt className="text-ink-soft">Provenance</dt>
                  <dd className="mt-1">{item.origin}</dd>
                </div>
              )}
              <div>
                <dt className="text-ink-soft">Allergens</dt>
                <dd className="mt-1">{item.allergens.length ? item.allergens.join(", ") : "Please tell us about any allergy and the kitchen will adapt."}</dd>
              </div>
              {item.tags.length > 0 && (
                <div>
                  <dt className="text-ink-soft">Notes</dt>
                  <dd className="mt-1">{item.tags.map((t) => dietLabels[t]).join(", ")}</dd>
                </div>
              )}
              {item.pairing && (
                <div>
                  <dt className="text-ink-soft">The sommelier suggests</dt>
                  <dd className="mt-1 font-display text-[1.15rem] italic">{item.pairing}</dd>
                </div>
              )}
            </dl>
          </div>
        </article>
      )}
    </Sheet>
  );
}
