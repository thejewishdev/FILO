import { Photo } from "@/components/ui/Photo";
import type { PhotoKey } from "@/data/photos";
import { philosophy, site } from "@/data/site";
import { cn } from "@/lib/cn";

/** The arch is Filo's recurring shape, after the porticoes of Bologna. Each one drifts at its own speed. */
const arches: { photo: PhotoKey; alt: string; drift: string; className: string }[] = [
  { photo: "chefPlating", alt: "Chef plating beneath copper lamps", drift: "60px", className: "lg:mt-24" },
  { photo: "ravioli", alt: "Hand-cut ravioli dusted with Parmigiano", drift: "130px", className: "" },
  { photo: "forkTwirl", alt: "A twist of spaghetti on a silver fork", drift: "40px", className: "lg:mt-40" },
];

export function Arches() {
  return (
    <section aria-labelledby="arches-title" className="mx-auto max-w-[90rem] pb-24 sm:px-10 md:pb-32 lg:pb-48">
      <h2 id="arches-title" className="sr-only">
        How we work
      </h2>
      {/* Phones: a swipeable row. Tablets and up: three columns that drift as you scroll. */}
      <ul className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 md:grid md:snap-none md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 lg:gap-14">
        {philosophy.map((p, i) => (
          <li key={p.title} className={cn("w-[74vw] max-w-[20rem] shrink-0 snap-start md:w-auto md:max-w-none", arches[i].className)}>
            <div className="drift" style={{ ["--drift" as string]: arches[i].drift }}>
              <div className="relative aspect-[3/4.4] overflow-hidden rounded-t-full bg-ink">
                <Photo photo={arches[i].photo} alt={arches[i].alt} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />
              </div>
              <div className="mx-auto max-w-[22rem] pt-6 text-center md:pt-9">
                <h3 className="text-[1.75rem] italic md:text-[2rem]">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] text-ink-soft md:mt-3 md:text-[0.98rem]">{p.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-20 max-w-[36rem] px-5 text-center font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-snug italic md:mt-28 md:px-0">
        &ldquo;A strand of pasta should be as fine as a thread, and as strong as one.&rdquo;
        <span className="mt-4 block font-sans text-[0.95rem] not-italic text-ink-soft">{site.chef}, chef and founder</span>
      </p>
    </section>
  );
}
