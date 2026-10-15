/**
 * Studio credit: the ELIS2code wordmark, rebuilt in type so it stays crisp at any size
 * (colours sampled from the original logo).
 */
export function StudioCredit() {
  return (
    <p className="flex items-center gap-2.5 text-[0.85rem] text-bone/60">
      Designed and built by
      <span
        role="img"
        aria-label="ELIS2code"
        className="inline-flex items-baseline font-sans text-[1.05rem] leading-none tracking-[-0.02em] text-[#ebeaf1]"
      >
        <span aria-hidden className="font-bold">
          ELI<span className="text-[#eb5e72]">S2</span>
        </span>
        <span aria-hidden className="font-light">code</span>
        <span aria-hidden className="studio-cursor ml-[0.12em] font-light">_</span>
      </span>
    </p>
  );
}
