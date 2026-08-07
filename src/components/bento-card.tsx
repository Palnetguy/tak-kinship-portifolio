import { ICONS, type IconKey } from "./icons";

/**
 * The card the two bento grids are built from.
 *
 * Distinct from `Card`, which stays as-is for Problem and anywhere a plain
 * title/body block is right. This one carries the three things the reference
 * has and `Card` does not: a ringed icon badge above the title, a fixed
 * minimum height so a short body cannot collapse the row (the reference's
 * cards are all one height regardless of copy length), and a faint interior
 * glow that keeps the near-black fill from reading as flat.
 *
 * `accentTitle` is the Why Trust Us variant: its titles are green in the
 * reference, the Services titles are white.
 */
export default function BentoCard({
  icon,
  title,
  body,
  accentTitle = false,
  minHeight = 310,
}: {
  icon: IconKey;
  title: string;
  body: string;
  accentTitle?: boolean;
  minHeight?: number;
}) {
  const Icon = ICONS[icon];
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-canvas p-7 transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--text-accent)_40%,transparent)]"
      style={{ minHeight }}
    >
      {/* Interior glow, top-right. Fades up on hover so the grid has a state
          without moving anything, which a translate would (the two grids are
          the sections' height and the delta table re-measures them). */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--text-accent) 12%, transparent) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      <span
        aria-hidden
        className="relative mb-8 flex h-11 w-11 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--text-accent)_35%,transparent)] text-text-accent"
      >
        <Icon className="h-5 w-5" />
      </span>

      <h3
        className={`font-display relative m-0 mb-3 text-xl font-bold ${
          accentTitle ? "text-text-accent" : "text-text-primary"
        }`}
      >
        {title}
      </h3>
      <p className="relative m-0 max-w-[30ch] text-[15px] leading-relaxed text-text-secondary">
        {body}
      </p>
    </div>
  );
}
