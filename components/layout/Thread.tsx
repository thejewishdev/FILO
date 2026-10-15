/**
 * Il filo: one hair-thin brass thread running the length of the page, drawn as you scroll
 * (a CSS scroll timeline, no JavaScript). It passes behind the dark sections, like a needle
 * through cloth, and resurfaces on the stone ones. Desktop only, decorative.
 */
export function Thread() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
    >
      <path
        className="thread-path"
        pathLength={1}
        d="M 93 0 C 93 40, 96 70, 95 105 S 70 150, 58 168 S 8 214, 5 262 S 4 330, 7 372 S 62 420, 92 455 S 97 540, 95 590 S 48 650, 36 668 S 4 720, 5 770 S 30 880, 60 930 S 88 975, 90 1000"
        fill="none"
        stroke="var(--color-brass)"
        strokeWidth={1.1}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.85}
      />
    </svg>
  );
}
