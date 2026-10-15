import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[85svh] max-w-[90rem] flex-col justify-center px-5 pt-(--header-h) sm:px-10">
      <h1 className="text-[clamp(3.5rem,10vw,8rem)] italic">A loose thread.</h1>
      <p className="mt-5 max-w-[28rem] text-ink-soft">This page doesn&rsquo;t exist. The menu, and the rest of the house, are this way.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/menu/" className="btn">
          Explore the menu
        </Link>
        <Link href="/" className="btn">
          Return home
        </Link>
      </div>
    </section>
  );
}
