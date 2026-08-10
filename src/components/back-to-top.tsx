"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/icons";

/**
 * Back-to-top control, bottom right.
 *
 * REFERENCE: takkinship.com's own. Measured off their live site rather than
 * assumed, by scrolling to the bottom and reading every `position: fixed`
 * element: a 70x70 circle at right 10 / bottom 20, `border-radius: 50%`,
 * transparent fill, `z-index: 800`, wrapping a `#progress-value` span with an
 * arrow SVG inside. So it is not a plain button. It is a **scroll-progress
 * ring around an up arrow**, and that idea is what carries over.
 *
 * TWO THINGS CHANGED FROM THEIRS, both for the same reason: this is the
 * redesign, not a copy of the live site.
 *
 *   - 52px, not 70. Every other round control on this site is 40 to 48 (the
 *     theme toggle is h-10, the modal close h-9). A 70px puck would be the
 *     largest circle on the page by half again and would read as an artifact
 *     of a different design system, which it is.
 *   - Bottom right at 32/32 rather than 20/10. Theirs sits almost in the
 *     corner; the site's own gutter rhythm is 8s and 12s, and 10px off the
 *     right edge reads as unaligned next to a 1344 column.
 *
 * PROGRESS IS REAL, not decorative. The ring is a stroke-dasharray circle
 * driven by actual scroll depth, so it answers "how much is left" as well as
 * "go back". `pathLength={1}` lets the dash maths run in 0..1 and avoids
 * hardcoding 2*pi*r, which silently breaks the moment anyone changes the
 * radius.
 *
 * ACCESSIBILITY AND MOTION
 *   - It is a real <button>, labelled, and hidden from the a11y tree entirely
 *     while it is off screen, so it never becomes an invisible tab stop.
 *   - The ring is aria-hidden. A screen reader gets "Back to top", not a
 *     percentage that changes under it as it reads.
 *   - `prefers-reduced-motion` gets an instant jump instead of a smooth
 *     scroll, and no fade on appear. A long smooth scroll is exactly the kind
 *     of large-area movement that setting exists to suppress.
 *   - The scroll listener is passive and rAF-throttled, so it cannot block
 *     scrolling on a slow device.
 */
export default function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let raf = 0;

    const read = () => {
      raf = 0;
      const doc = document.documentElement;
      // The denominator is the scrollable distance, not the document height.
      // Using scrollHeight alone means the ring never reaches full on any page
      // taller than the viewport, which is every page here.
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
      // 400 is roughly half a viewport: far enough that the control is not
      // competing with the hero, close enough that it is there when wanted.
      setShown(y > 400);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      // `inert` while hidden, so it is neither focusable nor announced. A
      // control that is invisible but still in the tab order is worse than no
      // control at all.
      inert={!shown}
      className={`fixed bottom-8 right-8 z-[800] flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border border-border-subtle bg-elevated-80 text-text-accent backdrop-blur transition-[opacity,transform,border-color] duration-300 ease-out hover:border-text-accent motion-reduce:transition-none ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0 motion-reduce:translate-y-0"
      }`}
    >
      <svg
        aria-hidden
        viewBox="0 0 52 52"
        className="absolute inset-0 h-full w-full -rotate-90"
        fill="none"
      >
        <circle
          cx="26"
          cy="26"
          r="24"
          pathLength={1}
          stroke="var(--text-accent)"
          strokeOpacity={0.18}
          strokeWidth={2}
        />
        <circle
          cx="26"
          cy="26"
          r="24"
          pathLength={1}
          stroke="var(--text-accent)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
        />
      </svg>
      <ArrowUpIcon className="relative h-[18px] w-[18px]" />
    </button>
  );
}
