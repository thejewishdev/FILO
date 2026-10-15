const text =
  "Every strand is rolled and cut by hand in our front window, an hour before you sit down. Nothing is dried. Nothing is frozen. Nothing waits.";

/** A single statement that lights up line by line as it scrolls through the viewport (CSS scroll timeline). */
export function Manifesto() {
  return (
    <section aria-label="Our philosophy" className="mx-auto max-w-[78rem] px-5 py-32 sm:px-10 lg:py-48">
      <p className="text-center font-display text-[clamp(2.1rem,4.8vw,4.6rem)] leading-[1.12] tracking-[-0.02em]">
        {text.split(" ").map((word, i) => (
          <span key={i} className="word">
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
