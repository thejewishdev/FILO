"use client";

import { Plus, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, currency, dietLabels, menu, type CategoryId, type DietTag, type MenuItem } from "@/data/menu";
import { cn } from "@/lib/cn";
import { DishPanel } from "./DishPanel";
import { Pairings } from "./Pairings";

const dietOrder: DietTag[] = ["vegan", "vegetarian", "gluten-free", "chef-special"];
const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function matches(item: MenuItem, terms: string[], diets: DietTag[]) {
  if (diets.some((d) => !item.tags.includes(d))) return false;
  if (!terms.length) return true;
  const text = normalize([item.name, item.description, item.pairing, item.tastingNotes, ...item.tags.map((t) => dietLabels[t])].join(" "));
  return terms.every((t) => text.includes(t));
}

export function MenuExplorer() {
  const [query, setQuery] = useState("");
  const [diets, setDiets] = useState<DietTag[]>([]);
  const [active, setActive] = useState<CategoryId>(categories[0].id);
  const [focusId, setFocusId] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // ~35 items, so filtering on each keystroke is instant.
  const visible = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    return menu.filter((i) => matches(i, terms, diets));
  }, [query, diets]);

  const groups = useMemo(
    () => categories.map((c) => ({ ...c, items: visible.filter((i) => i.category === c.id) })).filter((g) => g.items.length),
    [visible],
  );

  const filtering = query.trim() !== "" || diets.length > 0;
  const focusIndex = focusId ? visible.findIndex((i) => i.id === focusId) : -1;

  // Keep anything typed before the page finished loading (hydration would otherwise reset it).
  useEffect(() => {
    const typed = searchRef.current?.value;
    if (typed) setQuery(typed);
  }, []);

  // Deep link from the home page, e.g. /menu/?dish=cacio
  useEffect(() => {
    const dish = new URLSearchParams(window.location.search).get("dish");
    if (dish && menu.some((i) => i.id === dish)) {
      document.getElementById(`dish-${dish}`)?.scrollIntoView({ block: "center" });
      setFocusId(dish);
    }
  }, []);

  // Scrollspy: the section under the sticky bar is the active one.
  useEffect(() => {
    const sections = groups.map((g) => document.getElementById(g.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id as CategoryId);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [groups]);

  useEffect(() => {
    const row = navRef.current;
    const link = row?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    if (row && link) row.scrollTo({ left: link.offsetLeft - row.clientWidth / 2 + link.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  const toggleDiet = (d: DietTag) => setDiets((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));

  return (
    <>
      {/* Search and dietary filters: one quiet, centred row under the title. */}
      <div className="mx-auto flex max-w-[52rem] flex-col items-center gap-4 px-5 pt-10 pb-8 sm:gap-5 sm:px-10 sm:pt-12 sm:pb-10">
        <label className="relative block w-full max-w-[22rem]">
          <span className="sr-only">Search the menu</span>
          <Search size={15} strokeWidth={1.25} aria-hidden className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-ink-soft" />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu"
            className="h-10 w-full border-b border-ink/20 bg-transparent pr-8 pl-6 text-center text-[0.95rem] placeholder:text-ink-soft/80 focus:border-ink focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute top-1/2 right-0 grid h-8 w-8 -translate-y-1/2 place-items-center text-ink-soft hover:text-ink">
              <X size={14} strokeWidth={1.5} />
            </button>
          )}
        </label>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-0" role="group" aria-label="Dietary filters">
          {dietOrder.map((d) => {
            const on = diets.includes(d);
            return (
              <button
                key={d}
                type="button"
                aria-pressed={on}
                onClick={() => toggleDiet(d)}
                className={cn(
                  "link-line tap py-2.5 text-[0.9rem] transition-colors duration-500",
                  on ? "text-barolo [background-size:100%_1px]" : "text-ink-soft hover:text-ink",
                )}
              >
                {dietLabels[d]}
              </button>
            );
          })}
        </div>
        <p className="text-[0.88rem] text-ink-soft">Select any dish for tasting notes, provenance and the sommelier&rsquo;s pairing.</p>
        <p className="sr-only" aria-live="polite">
          {filtering ? `${visible.length} of ${menu.length} shown` : ""}
        </p>
      </div>

      {/* Only the section names stay pinned while scrolling. */}
      <nav aria-label="Menu sections" className="sticky top-(--header-h) z-30 border-y border-ink/10 bg-stone">
        <div ref={navRef} className="no-scrollbar fade-edges mx-auto flex max-w-[90rem] gap-7 overflow-x-auto px-5 py-2 sm:px-10 md:justify-center md:[mask-image:none]">
          {categories.map((c) => {
            const empty = !groups.some((g) => g.id === c.id);
            const isActive = active === c.id && !empty;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                data-cat={c.id}
                aria-current={isActive ? "location" : undefined}
                aria-disabled={empty || undefined}
                onClick={() => setActive(c.id)}
                className={cn(
                  "link-line shrink-0 py-1.5 font-display text-[1.15rem] whitespace-nowrap transition-colors duration-500",
                  isActive ? "text-barolo italic" : "text-ink-soft hover:text-ink",
                  empty && "pointer-events-none opacity-30",
                )}
              >
                {c.label}
              </a>
            );
          })}
        </div>
      </nav>

      <div className="mx-auto max-w-[52rem] px-5 pb-24 sm:px-10">
        <div>
          {groups.length === 0 ? (
            <div className="py-28">
              <p className="font-display text-[clamp(2.25rem,5vw,3.5rem)] italic">Nothing on the menu matches that.</p>
              <p className="mt-3 text-ink-soft">Try a single ingredient, or remove a filter.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setDiets([]);
                }}
                className="btn mt-8"
              >
                Clear search and filters
              </button>
            </div>
          ) : (
            groups.map((g) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="pt-20">
                <div className="mb-6 border-b border-ink/15 pb-7 text-center">
                  <h2 id={`${g.id}-title`} className="text-[clamp(2.6rem,5vw,4rem)] italic">
                    {g.label}
                  </h2>
                  <p className="mt-2 text-[0.92rem] text-ink-soft">{g.note}</p>
                </div>
                <ul>
                  {g.items.map((item) => (
                    <li key={item.id} id={`dish-${item.id}`}>
                      <div className="group relative -mx-4 border-b border-ink/8 px-4 py-6 transition-colors duration-500 hover:bg-stone-2/45 active:bg-stone-2/70">
                        <div className="flex items-baseline gap-4">
                          <h3 className="font-display text-[1.45rem] leading-snug sm:text-[1.6rem]">
                            {/* The button's ::after covers the whole row, making it one click target. */}
                            <button
                              type="button"
                              onClick={() => setFocusId(item.id)}
                              aria-haspopup="dialog"
                              className="cursor-pointer text-left transition-colors duration-500 group-hover:text-barolo after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-1 focus-visible:after:outline-barolo"
                            >
                              {item.name}
                            </button>
                          </h3>
                          <span aria-hidden className="h-px flex-1 translate-y-[-0.3em] bg-ink/12 transition-colors duration-700 group-hover:bg-brass" />
                          <span className="shrink-0 tabular-nums">{currency.format(item.price)}</span>
                        </div>
                        <p className="mt-1.5 max-w-[38rem] text-[0.98rem] text-ink-soft">{item.description}</p>
                        <div className="mt-2.5 flex items-center justify-between gap-6">
                          <p className="text-[0.85rem] text-ink-soft/90">
                            {[...item.tags.map((t) => dietLabels[t]), item.priceNote].filter(Boolean).join(", ")}
                          </p>
                          {/* Always visible, so touch users can see the row opens too. */}
                          <span aria-hidden className="flex shrink-0 items-center gap-2.5 text-[0.85rem] text-barolo">
                            Details
                            <span className="grid h-6 w-6 place-items-center rounded-full border border-barolo/50 transition-[background-color,color,transform,border-color] duration-500 ease-(--ease-silk) group-hover:rotate-90 group-hover:border-barolo group-hover:bg-barolo group-hover:text-bone">
                              <Plus size={12} strokeWidth={1.5} />
                            </span>
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>

      </div>

      <Pairings onOpenDish={setFocusId} />

      <DishPanel
        itemId={focusId}
        onClose={() => setFocusId(null)}
        onStep={focusIndex >= 0 && visible.length > 1 ? (d) => setFocusId(visible[(focusIndex + d + visible.length) % visible.length].id) : undefined}
      />
    </>
  );
}
