/**
 * The wide panel that closes Why Trust Us: experience figure, quote, and a
 * row of client logos. `Bento Grid / Cards`, 1344x268 in the design.
 *
 * The build had this as a bare `border-t` with two paragraphs, which is 268px
 * of the section's 548px shortfall on its own.
 *
 * ON THE LOGOS: KingFizzy confirmed on 2026-08-08 that the reference export is
 * the source of truth for this row and that nothing in it is to be removed, so
 * the five wordmarks are the design's own. They were cut from
 * ~/Downloads/David/Home/Home.png at the measured band (y 5670-5733, runs at
 * x 167.8, 417.0, 685.8, 930.8 and 1164.8) and alpha-keyed off the panel fill
 * so the same asset works on both themes: white ink in dark, inverted in
 * light.
 *
 * These are third-party trademarks presented in a "why trust us" row, so they
 * read to a visitor as TAK's clients. That is his call and he has made it;
 * flagged once, not re-litigated here.
 */

const CLIENT_MARKS: { name: string; src: string; w: number; h: number }[] = [
  { name: "Google", src: "/clients/google.png", w: 180, h: 69 },
  { name: "Pinterest", src: "/clients/pinterest.png", w: 180, h: 69 },
  { name: "Stripe", src: "/clients/stripe.png", w: 140, h: 69 },
  { name: "reddit", src: "/clients/reddit.png", w: 148, h: 69 },
  { name: "Spotify", src: "/clients/spotify.png", w: 178, h: 69 },
];

export default function TrustPanel({
  years = "7+ Years",
  yearsLabel = "Industry Experience",
  quote = "Innovating the Future, One Solution at a Time.",
}: {
  years?: string;
  yearsLabel?: string;
  quote?: string;
}) {
  return (
    <div className="relative mt-[34px] flex min-h-[365px] flex-col justify-center overflow-hidden rounded-2xl border border-border-subtle bg-elevated px-10 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--text-accent) 10%, transparent) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative flex flex-col gap-8 md:flex-row md:items-start">
        {/* The vertical rule is the divider in the reference, not a border on
            the quote: it stops at the block's height rather than the row's. */}
        <div className="shrink-0 md:w-[240px] md:border-r md:border-border-subtle md:pr-10">
          <p className="font-display m-0 text-[2.25rem] font-bold leading-none">
            {years}
          </p>
          <p className="font-mono-eyebrow m-0 mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
            {yearsLabel}
          </p>
        </div>

        {/* Capped at 700 so it wraps to two lines as the reference sets it.
            Left to fill the row it sits on one line, which is 48px shorter and
            reads as a caption rather than as the panel's headline. */}
        <blockquote className="font-display m-0 max-w-[700px] text-[2.1rem] font-bold leading-[1.2] text-text-accent">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>

      {/* The row travels horizontally rather than sitting still (KingFizzy,
          2026-08-10). The list is rendered twice into one track; the second
          copy is aria-hidden so a screen reader is not read five duplicate
          client names. The panel's own `overflow-hidden` clips the track, and
          the mask fades both ends so a logo dissolves at the edge instead of
          being sliced by the panel border. */}
      <div
        className="relative mt-[76px] overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <ul className="tak-marquee-x m-0 flex w-max list-none items-center p-0">
          {[0, 1].map((copy) =>
            CLIENT_MARKS.map((mark) => (
              <li
                key={`${copy}-${mark.name}`}
                className="flex shrink-0 items-center px-10"
                aria-hidden={copy === 1 || undefined}
              >
                <img
                  src={mark.src}
                  alt={copy === 0 ? mark.name : ""}
                  width={mark.w}
                  height={mark.h}
                  loading="lazy"
                  decoding="async"
                  className="dark-logo h-[42px] w-auto opacity-80 transition-opacity duration-300 hover:opacity-100"
                />
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
}
