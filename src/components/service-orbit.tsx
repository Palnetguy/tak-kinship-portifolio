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
  width = 300,
}: {
  item: Item;
  focused: boolean;
  iconSide?: "left" | "right";
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
      className="flex items-center gap-3 rounded-full border p-2 transition-colors duration-500"
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
          iconSide === "right" ? "ml-1 flex-1 items-end text-right" : ""
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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }
    const id = setInterval(() => setActive((a) => a + 1), DWELL);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative hidden h-[440px] w-[648px] shrink-0 xl:block"
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
          width={268}
        />
      </div>

      {/* The cycling column. The falloff does most of the work; the mask stops
          the buffer slot's arrival from clipping hard against the box edge. */}
      <div
        className="absolute top-0 left-[288px] h-full w-[360px]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)",
        }}
      >
        {/* The dashed arc, drawn through the same x offsets the slots use so
            the pills sit on the line rather than near it. */}
        <svg
          className="pointer-events-none absolute inset-0"
          width={360}
          height={440}
          viewBox="0 0 360 440"
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
          // A wrap is a five-slot leap. Snap it instead of sliding it across
          // the whole column; it happens on the invisible buffer slot, so
          // none of the jump is ever on screen.
          const jumped =
            prev.current[i] !== undefined &&
            Math.abs(slot - prev.current[i]) > 1;
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
  );
}
