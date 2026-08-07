/**
 * Decorative and atmospheric layers.
 *
 * Finding 3 of the measured delta: the build had zero svgs, zero absolutely
 * positioned elements, zero blurs, zero gradients. The design has at least
 * seven named decorative layers. That absence is why the page read as "a
 * plain webpage" while every component measured correct.
 *
 * Everything here is `aria-hidden` and `pointer-events-none`, and every
 * element is positioned against a `relative` ancestor the SECTION owns, so a
 * decoration can never affect layout or the height measurements the delta
 * table is re-measured against.
 *
 * These are traced from the 4x reference exports in ~/Downloads/David/, not
 * eyeballed: positions are given in the design's own 1440 space and expressed
 * as percentages so they hold at the one breakpoint the design defines.
 */

/**
 * `Decorative Code Block`, 384x384, twice in the Hero.
 *
 * Ghosted code, not real code: it is atmosphere behind the headline, so the
 * lines are rendered as bars at varying widths and indents rather than as
 * text. Real text at that opacity would invite reading, and a screen reader
 * would announce it.
 */
export function CodeBlockDecor({
  className,
  size = 384,
  opacity = 0.5,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  // width, indent level. Deterministic, so server and client render the same
  // thing (a random layout would hydrate-mismatch).
  const lines: [number, number][] = [
    [58, 0], [78, 1], [44, 2], [66, 2], [38, 1],
    [72, 0], [50, 1], [82, 1], [34, 2], [60, 1], [46, 0],
  ];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className ?? ""}`}
      style={{ width: size, height: size, opacity }}
    >
      <div
        className="h-full w-full rounded-2xl border border-[color-mix(in_srgb,var(--text-accent)_18%,transparent)] p-7"
        style={{
          background:
            "linear-gradient(160deg, color-mix(in srgb, var(--text-accent) 7%, transparent) 0%, transparent 60%)",
        }}
      >
        <div className="flex h-full flex-col justify-center gap-[13px]">
          {lines.map(([w, indent], i) => (
            <div
              key={i}
              className="h-[7px] rounded-full"
              style={{
                width: `${w}%`,
                marginLeft: `${indent * 9}%`,
                background:
                  i % 3 === 0
                    ? "color-mix(in srgb, var(--text-accent) 45%, transparent)"
                    : "color-mix(in srgb, var(--text-secondary) 22%, transparent)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Sparse grid of small plus marks. Top-left of Services in the reference. */
export function PlusField({
  className,
  rows = 2,
  cols = 6,
}: {
  className?: string;
  rows?: number;
  cols?: number;
}) {
  const marks: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // The reference thins out toward the lower rows rather than drawing a
      // full rectangle, which is what stops it reading as a table.
      if (r > 0 && c > rows - r) continue;
      marks.push({ x: c * 34, y: r * 34 });
    }
  }
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute ${className ?? ""}`}
      width={cols * 34}
      height={rows * 34}
      viewBox={`0 0 ${cols * 34} ${rows * 34}`}
      fill="none"
    >
      {marks.map((m, i) => (
        <path
          key={i}
          d={`M${m.x + 4} ${m.y + 10}h12M${m.x + 10} ${m.y + 4}v12`}
          stroke="var(--text-accent)"
          strokeOpacity={0.34}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/**
 * Radiating dot field. Top-left of Why Trust Us in the reference: dots are
 * densest at the centre-right of the cluster and fall away outward, which a
 * uniform grid cannot reproduce, so density is a function of distance.
 */
export function DotField({
  className,
  width = 190,
  height = 165,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  const step = 14;
  const cx = width * 0.62;
  const cy = height * 0.5;
  const maxD = Math.hypot(width, height) * 0.55;
  const dots: { x: number; y: number; o: number }[] = [];
  for (let y = 6; y < height; y += step) {
    for (let x = 6; x < width; x += step) {
      const d = Math.hypot(x - cx, y - cy) / maxD;
      if (d > 1) continue;
      dots.push({ x, y, o: Math.max(0, 0.55 * (1 - d * d)) });
    }
  }
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute ${className ?? ""}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={2.4}
          fill="var(--text-accent)"
          fillOpacity={d.o}
        />
      ))}
    </svg>
  );
}

/**
 * Outlined triangle mark. Two sit in the reference: one large at the top
 * right of Services pointing left, one smaller below the grid pointing up.
 * Rendered as a stroked path, not a filled shape: the reference's are hollow.
 */
export function TriangleMark({
  className,
  size = 120,
  rotate = 0,
  opacity = 0.5,
}: {
  className?: string;
  size?: number;
  rotate?: number;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute ${className ?? ""}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M50 12 88 82H12L50 12Z"
        stroke="var(--text-accent)"
        strokeOpacity={opacity}
        strokeWidth={5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Soft green glow. The reference's `Ellipse 2` / `Ellipse 3` layers: pure
 * atmosphere, the only decorations the delta note says are safe to
 * approximate. A radial-gradient div beats an SVG here because it blurs for
 * free and costs one element.
 */
export function Glow({
  className,
  size = 420,
  strength = 0.14,
}: {
  className?: string;
  size?: number;
  strength?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, color-mix(in srgb, var(--text-accent) ${Math.round(
          strength * 100
        )}%, transparent) 0%, transparent 70%)`,
        filter: "blur(40px)",
      }}
    />
  );
}
