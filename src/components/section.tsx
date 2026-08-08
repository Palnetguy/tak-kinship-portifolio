import { type ReactNode } from "react";

/**
 * The page's one layout primitive.
 *
 * `max-w-[1344px]` with `px-12` (48px) is measured, not chosen: every "Main
 * Container" in the Figma file is 1344 wide inside the 1440 frame, and the
 * card grids independently confirm it (portfolio columns run 47.8 to 1390.8).
 *
 * `relative` so decorative layers (components/decor.tsx) can be absolutely
 * positioned against the section they belong to. `isolate` keeps their
 * stacking contained, so a glow can never paint over the next section.
 */
export default function Section({
  className = "",
  pt = 60,
  pb = 200,
  children,
}: {
  className?: string;
  /**
   * Vertical padding, in design px, measured per section off Home.png rather
   * than set to one house value. The reference is NOT uniform: top padding is
   * 60 almost everywhere (Services 59.8, Process 60.0, Portfolio 60.0, Trust
   * 59.8) but bottom padding runs from 160 on Problem to 242 on Connect. A
   * single `py` value was worth ~70px of error per section, in alternating
   * directions, which is why some sections measured short and others long.
   */
  pt?: number;
  pb?: number;
  children?: ReactNode;
}) {
  return (
    <section
      className={`relative isolate mx-auto max-w-[1344px] px-12 ${className}`}
      style={{ paddingTop: pt, paddingBottom: pb }}
    >
      {children}
    </section>
  );
}
