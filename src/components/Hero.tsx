export default function Hero() {
  const words = ["Baked", "fresh", "for", "your", "event."];
  return (
    <section id="top" className="mx-auto max-w-[1160px] px-6 pb-3 pt-14">
      <h1 className="text-[clamp(2.6rem,6.4vw,5.2rem)]" aria-label={words.join(" ")}>
        {words.map((w, i) => (
          <span key={w} className="inline-block overflow-hidden pb-[.1em] align-top" aria-hidden="true">
            <span className="hero-word" style={{ "--n": i } as React.CSSProperties}>{w}</span>{" "}
          </span>
        ))}
      </h1>
      <p className="my-6 max-w-[46ch] text-mut">
        Pre-order breads, pastries, desserts and meals for parties, weddings and corporate events. Pick your date, set your quantities and pay upfront.
      </p>
      <a href="#shop" className="pill pill-dark">Plan your event</a>
    </section>
  );
}
