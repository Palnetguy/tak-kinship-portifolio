/**
 * Centred eyebrow + display heading, as the reference sets Services and Why
 * Trust Us.
 *
 * The build left-aligned these at `text-3xl md:text-4xl`, capped at
 * `max-w-2xl`. In the reference they are centred, run to roughly 900px, wrap
 * to two lines on purpose, and are close to 56px. That single difference does
 * more to make the page read as designed than any decoration does, and it is
 * also part of why Services and Why Trust Us measured 40%+ short.
 *
 * `highlight` is the green run inside the heading ("Ideas" in Services). It
 * is matched as a substring rather than passed as markup so the copy stays
 * one string in content.ts.
 */
export default function SectionHeading({
  eyebrow,
  children,
  highlight,
  sub,
}: {
  eyebrow?: string;
  children: string;
  highlight?: string;
  sub?: string;
}) {
  const parts = highlight ? children.split(highlight) : [children];

  return (
    <div className="relative mx-auto mb-14 max-w-[920px] text-center">
      {eyebrow && (
        <p className="font-mono-eyebrow m-0 mb-4 text-xs font-medium uppercase tracking-[0.18em] text-text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display m-0 text-4xl font-bold leading-[1.12] tracking-tight md:text-[3.25rem]">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {highlight && i < parts.length - 1 && (
              <span className="text-text-accent">{highlight}</span>
            )}
          </span>
        ))}
      </h2>
      {sub && (
        <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-relaxed text-text-secondary">
          {sub}
        </p>
      )}
    </div>
  );
}
