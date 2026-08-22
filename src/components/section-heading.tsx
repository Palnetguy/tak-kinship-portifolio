import { type ReactNode } from "react";

/**
 * Centred eyebrow + display heading.
 *
 * TYPE SIZE IS MEASURED, NOT CHOSEN. Two independent strings in the reference
 * pin it: "Transforming Ideas into Extraordinary" renders 840.2px wide and
 * "Built for the sectors moving East Africa." renders 885px. Both imply 45.8
 * at Space Grotesk 700, so the heading is 46px. It was built at 52, which
 * forced an extra line onto We Build For and Process and cost ~100px of
 * section height each. (That the two strings agree to 0.1px also confirms the
 * font itself is right, which rules out a silent fallback.)
 *
 * `maxWidth` and `mb` are per-section because the reference is per-section:
 * Portfolio's heading runs to ~1270px and wraps late, Process's runs to ~700
 * and wraps after "Reliable". Both are measured off Home.png, and the numbers
 * live at the call site next to the section they describe.
 *
 * `highlight` is the green run inside the heading ("Ideas" in Services). It
 * is matched as a substring rather than passed as markup so the copy stays
 * one string in content.ts.
 */
export default function SectionHeading({
  eyebrow,
  children,
  highlight,
  highlightReplacement,
  sub,
  maxWidth = 920,
  mb = 40,
}: {
  eyebrow?: string;
  children: string;
  highlight?: string;
  /** Replaces the highlighted text while retaining the original sentence. */
  highlightReplacement?: ReactNode;
  sub?: string;
  /** Heading measure, design px. Controls where the reference wraps. */
  maxWidth?: number;
  /** Gap from the heading block to the content below it, design px. */
  mb?: number;
}) {
  const parts = highlight ? children.split(highlight) : [children];

  return (
    <div
      className="relative mx-auto text-center"
      style={{ maxWidth, marginBottom: mb }}
    >
      {eyebrow && (
        <p className="font-mono-eyebrow m-0 mb-6 text-xs font-medium uppercase tracking-[0.18em] text-text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display m-0 text-4xl font-bold leading-[1.12] tracking-tight md:text-[46px]">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {highlight && i < parts.length - 1 && (
              <span className="text-text-accent">
                {highlightReplacement ?? highlight}
              </span>
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
