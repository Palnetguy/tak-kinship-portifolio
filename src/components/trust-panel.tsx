/**
 * The wide panel that closes Why Trust Us: experience figure, quote, and a
 * row of client logos. `Bento Grid / Cards`, 1344x268 in the design.
 *
 * The build had this as a bare `border-t` with two paragraphs, which is 268px
 * of the section's 548px shortfall on its own.
 *
 * ON THE LOGOS: David's design fills this row with Google, Pinterest, Stripe,
 * reddit and Spotify. Those are almost certainly comp filler, and shipping
 * them on tak-site would state in public that TAK has those five companies as
 * clients. So the row is built to the design's structure and rhythm but with
 * TAK's own sector labels until KingFizzy supplies the real client list; the
 * moment he does, replace `CLIENT_MARKS` and nothing else changes.
 */

const CLIENT_MARKS = [
  "Fintech",
  "Logistics",
  "Healthcare",
  "Agritech",
  "Education",
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
    <div className="relative mt-[34px] flex min-h-[365px] flex-col justify-center overflow-hidden rounded-2xl border border-border-subtle bg-[#0f0f10] px-10 py-12">
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

      <ul className="relative mt-[76px] flex list-none flex-wrap items-center justify-between gap-8 p-0">
        {CLIENT_MARKS.map((mark) => (
          <li
            key={mark}
            className="font-display text-2xl font-medium text-text-secondary opacity-70 transition-opacity duration-300 hover:opacity-100"
          >
            {mark}
          </li>
        ))}
      </ul>
    </div>
  );
}
