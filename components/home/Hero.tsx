import Link from "next/link";
import { ReserveButton } from "@/components/layout/ReserveButton";
import { LiveStatus } from "@/components/ui/LiveStatus";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="on-dark relative z-[1] h-[100svh] min-h-[38rem] bg-stone text-bone">
      <div className="absolute inset-0 overflow-hidden bg-ink">
        <Photo photo="hero" alt="Fresh tagliatelle with ragù and shaved Parmigiano" fill priority fetchPriority="high" sizes="100vw" quality={72} className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(25_24_23/0.25)_0%,rgb(25_24_23/0.7)_75%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-5 pt-(--header-h) text-center">
        <p className="animate-[fade-in_1.6s_var(--ease-silk)_0.2s_both] text-[0.95rem] tracking-[0.12em] text-bone/85">{site.descriptor}</p>
        <h1 className="mt-2 text-[clamp(8.5rem,38vw,25rem)] leading-[0.85] tracking-[-0.03em] italic">
          <span aria-hidden className="inline-flex">
            {site.name.split("").map((l, i) => (
              <span key={i} className="rise-mask">
                <span className="rise" style={{ ["--i" as string]: i }}>
                  {l}
                </span>
              </span>
            ))}
          </span>
          <span className="sr-only">{site.name}, pasta atelier in Mayfair</span>
        </h1>
        <p className="mt-6 max-w-[26rem] animate-[fade-up_1.4s_var(--ease-silk)_0.7s_both] font-display text-[clamp(1.25rem,2vw,1.6rem)] leading-snug italic">
          {site.tagline}
        </p>
        <div className="mt-10 flex w-full max-w-[15rem] animate-[fade-up_1.4s_var(--ease-silk)_0.9s_both] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center">
          <Link href="/menu/" className="btn [--btn-fill:var(--color-bone)] [--btn-text:var(--color-ink)]">
            Explore the menu
          </Link>
          <ReserveButton className="btn-solid [--btn-bg:var(--color-bone)] [--btn-fill:var(--color-barolo)] [--btn-solid-text:var(--color-ink)] [--btn-text:var(--color-bone)]" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto flex max-w-[90rem] items-end justify-between px-5 pb-7 text-[0.9rem] sm:px-10">
        <LiveStatus className="pointer-events-auto" />
        <p className="hidden text-bone/80 sm:block">
          {site.address.street}, Mayfair
        </p>
      </div>
    </section>
  );
}
