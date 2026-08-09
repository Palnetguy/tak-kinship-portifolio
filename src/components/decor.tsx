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
 * Measured off the 4x reference (Home.png y 72-851):
 *   right panel  x 998.8-1381.8, y ~115-499   (383 wide, so 384)
 *   left panel   x  68.8-452,    y ~333-717
 *
 * The first build rendered these as abstract grey bars. The reference's are
 * real terminal panels: a title bar with three dots, a rule under it, then
 * syntax-coloured source. That is the difference between reading as a code
 * block and reading as a loading skeleton, and it is invisible to a property
 * check, so it survived the first pass.
 *
 * The code is `aria-hidden` and rendered as spans rather than a <pre>: it is
 * atmosphere, and a screen reader announcing a fake deploy log helps nobody.
 */

type Tok = [text: string, tone?: "kw" | "str" | "num" | "cmt" | "fn"];

const TONE: Record<string, string> = {
  kw: "color-mix(in srgb, var(--text-accent) 85%, white)",
  str: "var(--text-accent)",
  num: "color-mix(in srgb, var(--text-accent) 70%, white)",
  cmt: "color-mix(in srgb, var(--text-secondary) 60%, transparent)",
  fn: "color-mix(in srgb, var(--text-primary) 70%, transparent)",
};

/** The two panels' source, transcribed from the reference. */
export const HERO_CODE: Record<"left" | "right", Tok[][]> = {
  left: [
    [["const ", "kw"], ["system"], [" = {"]],
    [["  status: "], ['"Active"', "str"], [","]],
    [["  integrity: "], ["95", "num"], [","]],
    [["  latency: "], ['"8ms"', "str"], [","]],
    [["  deploy: "], ["function", "kw"], ["() {"]],
    [["    return ", "kw"], ['"Deployment Successful"', "str"], [";"]],
    [["  }"]],
    [["};"]],
    [[""]],
    [["// Booting up the main system...", "cmt"]],
    [["system"], [".deploy", "fn"], ["();"]],
  ],
  right: [
    [["const ", "kw"], ["system"], [" = {"]],
    [["  status: "], ['"Operational"', "str"], [","]],
    [["  integrity: "], ["100", "num"], [","]],
    [["  latency: "], ['"12ms"', "str"], [","]],
    [["  deploy: "], ["function", "kw"], ["() {"]],
    [["    return ", "kw"], ['"Stable Release"', "str"], [";"]],
    [["  }"]],
    [["};"]],
    [[""]],
    [["// Initializing core infrastructure...", "cmt"]],
    [["system"], [".deploy", "fn"], ["();"]],
  ],
};

export function CodeBlockDecor({
  className,
  size = 384,
  opacity = 1,
  variant = "right",
}: {
  className?: string;
  size?: number;
  opacity?: number;
  variant?: "left" | "right";
}) {
  const lines = HERO_CODE[variant];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className ?? ""}`}
      style={{ width: size, height: size, opacity }}
    >
      <div
        className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border-subtle"
        style={{ background: "var(--bg-code)" }}
      >
        <div className="flex items-center gap-2 px-5 pt-5 pb-3">
          {["#3f4442", "#3f4442", "#3f4442"].map((c, i) => (
            <span
              key={i}
              className="block h-[9px] w-[9px] rounded-full"
              style={{ background: c }}
            />
          ))}
        </div>
        <div className="mx-5 border-t border-border-subtle" />
        <div className="font-mono-eyebrow flex flex-col gap-[5px] px-5 py-4 text-[10.5px] leading-[1.5] text-text-secondary">
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {line.map(([text, tone], j) => (
                <span key={j} style={tone ? { color: TONE[tone] } : undefined}>
                  {text}
                </span>
              ))}
            </div>
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
          className="tak-tick"
          // Staggered so the field ripples rather than snapping as one block.
          // NEGATIVE, so every mark is already mid-cycle on first paint rather
          // than sitting at its dim keyframe waiting for its turn. One value
          // covers both the tick and the pulse, since `animation-delay` applies
          // down the whole animation list.
          style={{ animationDelay: `-${(i % 7) * 0.45}s` }}
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
  // `d` is kept, not just consumed: it sets the dot's resting opacity AND its
  // animation delay, so the ripple travels along the same axis the density
  // already falls away on. A pulse with random delays would read as noise
  // over a structure, rather than as the structure itself breathing.
  const dots: { x: number; y: number; o: number; d: number }[] = [];
  for (let y = 6; y < height; y += step) {
    for (let x = 6; x < width; x += step) {
      const d = Math.hypot(x - cx, y - cy) / maxD;
      if (d > 1) continue;
      dots.push({ x, y, o: Math.max(0, 0.55 * (1 - d * d)), d });
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
      {dots.map((dot, i) => (
        <circle
          key={i}
          className="tak-dot"
          // NEGATIVE delay, so every field is already mid-ripple on first
          // paint. A positive delay would open with the whole cluster sitting
          // at its dim keyframe, waiting, which is the one state that looks
          // broken rather than slow.
          //
          // `fillOpacity` holds the radial falloff and the animation drives
          // `opacity`. They are separate properties and multiply, so the
          // cluster keeps its shape through the whole cycle instead of
          // flattening to one brightness at the peak.
          style={{ animationDelay: `-${(dot.d * 2.2).toFixed(2)}s` }}
          cx={dot.x}
          cy={dot.y}
          r={2.4}
          fill="var(--text-accent)"
          fillOpacity={dot.o}
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
  // Two elements, not one: the call site's base rotation lives on the outer
  // span and the tick animation on the inner svg. On a single element the
  // animation's transform would replace the base rotation outright, and every
  // triangle would snap to 0deg the moment it started.
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute block ${className ?? ""}`}
      style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}
    >
      <svg
        className="tak-tick-slow block"
        // Offset derived from `size` rather than from a new prop, because
        // every pair of triangles that shares a viewport already differs in
        // size (130 against 110, 150 against 90). That gets them breathing out
        // of phase with no call-site churn, and it is deterministic, so the
        // server and client render the same value.
        style={{ animationDelay: `-${(size % 7) * 0.6}s` }}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50 12 88 82H12L50 12Z"
          stroke="var(--text-accent)"
          strokeOpacity={opacity}
          strokeWidth={5}
          strokeLinejoin="round"
        />
      </svg>
    </span>
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
