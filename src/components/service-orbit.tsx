"use client";

import { useEffect, useRef, useState } from "react";
import { ICONS, type IconKey } from "@/components/icons";

/**
 * The hero's right-hand visual: service pills cycling down a dashed arc.
 *
 * Traced from the reference clip KingFizzy sent (x.com/flohoeller,
 * "Designed in Figma, animated in Claude"), which is a coded CSS animation
 * rather than generated video. That matters: a generated MP4 could not hold
 * crisp type, exact icons, a seamless loop, or react to the theme toggle, and
 * would cost megabytes in the hero. This is ~4kb of transforms.
 *
 * Measured off the clip's frames (2396x1436, sampled at 1.2fps):
 *   - one focused pill on the centre line, sharing its y with the left pill
 *   - neighbours step DOWN the list over time: the pill above slides into the
 *     centre and the centre slides below. New items enter at the top.
 *   - slot pitch is even, and off-centre pills step RIGHT, so the column
 *     traces an arc that bulges left at the focus
 *   - opacity falls away hard from the focus (~1 / ~0.4 / ~0.12)
 *   - dwell is ~3.3s per item
 */

const PITCH = 88; // vertical distance between slot centres
const DWELL = 3300; // ms on the centre line, measured off the clip

/** Slot styling by signed distance from the focus. Index 3 is the buffer
 *  slot: an item is invisible there, which is where it teleports from the
 *  bottom of the list back to the top without the jump ever being seen. */
const SLOT: Record<number, { o: number; x: number; s: number }> = {
  [-2]: { o: 0.12, x: 62, s: 0.9 },
  [-1]: { o: 0.38, x: 30, s: 0.95 },
  [0]: { o: 1, x: 0, s: 1 },
  [1]: { o: 0.38, x: 30, s: 0.95 },
  [2]: { o: 0.12, x: 62, s: 0.9 },
  [3]: { o: 0, x: 96, s: 0.86 },
};

type Item = { icon: IconKey; title: string; sub: string };

/** Six, so the six slots above map one-to-one and the list needs no padding. */
const ITEMS: Item[] = [
  { icon: "globe", title: "Web Development", sub: "React / Next.js" },
  { icon: "phone", title: "Mobile Apps", sub: "Flutter / Firebase" },
  { icon: "code", title: "Custom Software", sub: "Python / Django" },
  { icon: "cloud", title: "Cloud", sub: "Deploy / Migrate" },
  { icon: "palette", title: "UI/UX Design", sub: "Figma / Prototyping" },
  { icon: "bulb", title: "IT Consulting", sub: "Strategy / Execution" },
];

const N = ITEMS.length;

/** Signed slot for item `i`, in [-2, 3]. Increases by one per tick, so items
 *  travel downward and the wrap lands on the invisible buffer slot. */
function slotOf(i: number, active: number) {
  const r = (((active - i) % N) + N) % N;
  return r > 3 ? r - N : r;
}

function Pill({
  item,
  focused,
  iconSide = "left",
  width,
}: {
  item: Item;
  focused: boolean;
  iconSide?: "left" | "right";
  /** Fixed width, for the cycling column where every pill must agree. Left
   *  undefined the pill hugs its content, which is what the anchor wants: at a
   *  fixed width its content was narrower than the box, and because its text is
   *  right-aligned every pixel of slack piled up on the left. */
  width?: number;
}) {
  const Icon = ICONS[item.icon];
  const chip = (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-500"
      style={{
        background: focused
          ? "var(--text-accent)"
          : "color-mix(in srgb, var(--text-accent) 14%, transparent)",
        color: focused ? "var(--bg-surface)" : "var(--text-accent)",
        boxShadow: focused
          ? "0 0 22px color-mix(in srgb, var(--text-accent) 45%, transparent)"
          : "none",
      }}
    >
      <Icon className="h-5 w-5" />
    </span>
  );

  return (
    <div
      // Padding is 8px on the ICON side and 20px on the TEXT side, and the
      // asymmetry is the point. On a `rounded-full` pill the end cap is a 28px
      // radius arc, so a 40px circular chip follows that curve and needs only
      // its 8px, while a flat run of text set 8px in sits INSIDE the curve and
      // reads as cramped against the border. Equal 8/8 padding measures
      // symmetric and looks wrong, which is why it kept coming back.
      className={`flex items-center gap-3 rounded-full border py-2 transition-colors duration-500 ${
        iconSide === "right" ? "pr-2 pl-5" : "pr-5 pl-2"
      }`}
      style={{
        width,
        // Glass, built from the theme tokens so the pill inverts with the
        // toggle instead of staying a dark chip on a light page.
        //
        // Deliberately NO backdrop-blur. Both the Section (`isolate`) and this
        // component's mask-image create a stacking context, which makes them
        // the backdrop root: a backdrop-filter inside samples an EMPTY
        // backdrop and blurs transparent black, tinting every pill charcoal.
        // That is invisible on the near-black dark theme and turned the light
        // theme's pills into dark-on-dark slugs. The translucent fill over the
        // canvas already reads as glass, so the filter bought nothing.
        background: focused
          ? "color-mix(in srgb, var(--bg-elevated) 92%, transparent)"
          : "color-mix(in srgb, var(--bg-elevated) 72%, transparent)",
        borderColor: focused
          ? "color-mix(in srgb, var(--text-accent) 40%, transparent)"
          : "var(--border-subtle)",
        boxShadow: focused
          ? "0 8px 40px color-mix(in srgb, var(--text-accent) 16%, transparent)"
          : "none",
      }}
    >
      {iconSide === "left" && chip}
      <span
        className={`flex min-w-0 flex-col ${
          // No flex-1 on the anchor: it would re-introduce the same slack the
          // auto width just removed.
          iconSide === "right" ? "items-end text-right" : ""
        }`}
      >
        <span className="truncate text-[14px] leading-tight font-medium text-text-primary">
          {item.title}
        </span>
        <span className="truncate text-[12.5px] leading-tight text-text-secondary">
          {item.sub}
        </span>
      </span>
      {iconSide === "right" && chip}
    </div>
  );
}

export default function ServiceOrbit() {
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);
  /** Previous slot per item, so a wrap can be moved without a transition. */
  const prev = useRef<Record<number, number>>({});
  /** The authoritative position. Both the timer and scroll write through it. */
  const cursor = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }

    // One counter, held in a ref, so the timer and the scroll handler can
    // never drift apart. Tracking them separately meant one auto-advance made
    // the next scroll step jump backwards.
    const bump = (n: number) => {
      cursor.current += n;
      setActive(cursor.current);
    };

    let id = window.setInterval(() => bump(1), DWELL);

    /** Page scroll drives the column as well as time.
     *
     *  Deliberately NOT a wheel listener on the element: hijacking the wheel
     *  over a decoration would trap the page scroll, which is the classic
     *  version of this pattern and is hostile. This reads the page's own
     *  scroll position instead, so the user is always still just scrolling.
     *
     *  SCROLL_PER_STEP is the distance that advances one service. It is a
     *  quarter viewport, which is far enough that a normal read down the page
     *  does not spin the column, and close enough that a deliberate scroll
     *  back and forth visibly drives it. */
    /** Distance that advances one service.
     *
     *  This was a quarter viewport (225px at 900), which made the feature
     *  invisible: the hero is only about 850px tall, so the arc had scrolled
     *  out of sight after two or three steps and the user never saw it
     *  respond. 110px gives a full six-service cycle inside the hero's own
     *  height, which is the only window where the effect can actually be
     *  watched. */
    const SCROLL_PER_STEP = 110;
    let base = window.scrollY;
    let queued = false;

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const steps = Math.trunc((window.scrollY - base) / SCROLL_PER_STEP);
        if (steps === 0) return;
        // Re-anchor by whole steps only, so the leftover distance carries into
        // the next one and a slow drag still advances exactly once per
        // SCROLL_PER_STEP instead of stalling.
        base += steps * SCROLL_PER_STEP;
        bump(steps);
        // Restart the timer so an auto-advance never lands on top of a step
        // the user just drove.
        window.clearInterval(id);
        id = window.setInterval(() => bump(1), DWELL);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearInterval(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className="relative hidden h-[440px] w-[684px] shrink-0 xl:block"
      aria-hidden
    >
      {/* The static counterpart, vertically locked to the arc's focus. It
          lives in this box rather than in the hero's text column so the two
          share a coordinate system and the alignment is exact, not eyeballed. */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2">
        <Pill
          item={{
            icon: "sparkle",
            title: "Product Engineering",
            sub: "One team, end to end",
          }}
          focused
          iconSide="right"
        />
      </div>

      {/* The cycling column.
          The falloff does most of the work; the mask stops the buffer slot's
          arrival from clipping hard against the box edge.

          THE BOX IS NOT THE CONTENT, and conflating the two is what kept the
          glow clipped. mask-image clips to the element box on EVERY side, and
          this gradient only fades top and bottom, so left and right stay a
          hard cut no matter how the gradient is written. Widening the box
          alone did not fix it, because the pills were still pinned to left: 0
          of that box, and the focused pill's box-shadow reaches ~40px past its
          own left edge, straight into the cut.

          So the box and the content are now separate: the masked box is 484
          wide, and an inner wrapper insets the pills 48px from its left. That
          48 is clear air the shadow can spill into on the left, and the box's
          own width leaves the same on the right (48 + 388 widest pill + 48). */}
      <div
        className="absolute top-0 left-[200px] h-full w-[484px]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)",
        }}
      >
        <div className="absolute inset-y-0 left-[48px] w-[400px]">
        {/* The dashed arc, drawn through the same x offsets the slots use so
            the pills sit on the line rather than near it. */}
        <svg
          className="pointer-events-none absolute inset-0"
          width={400}
          height={440}
          viewBox="0 0 400 440"
          fill="none"
        >
          <path
            d="M120 0 C 60 62, 30 140, 30 220 C 30 300, 60 378, 120 440"
            stroke="var(--text-accent)"
            strokeOpacity={0.3}
            strokeWidth={1.5}
            strokeDasharray="5 7"
            strokeLinecap="round"
          />
        </svg>

        {ITEMS.map((item, i) => {
          const slot = still
            ? Math.min(3, Math.max(-2, i - 2))
            : slotOf(i, active);
          const style = SLOT[slot];
          // Only a WRAP may skip its transition. The slot range is [-2, 3], so
          // a wrap is a leap of more than 3; anything up to 3 is a genuine
          // multi-step move and must still animate.
          //
          // This used to trigger on any leap greater than 1, which meant a
          // scroll of two or more services snapped every pill into place
          // instead of sliding them. That looked exactly like the carousel
          // ignoring the scroll, which is what it was reported as.
          const jumped =
            prev.current[i] !== undefined &&
            Math.abs(slot - prev.current[i]) > 3;
          prev.current[i] = slot;

          return (
            <div
              key={item.title}
              className="absolute top-1/2 left-0 will-change-transform"
              style={{
                opacity: style.o,
                transform: `translate3d(${style.x}px, calc(-50% + ${
                  slot * PITCH
                }px), 0) scale(${style.s})`,
                transition: jumped
                  ? "none"
                  : "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <Pill item={item} focused={slot === 0} width={292} />
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
