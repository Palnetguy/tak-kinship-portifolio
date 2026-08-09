"use client";

import { useEffect, useRef } from "react";

/**
 * A rendered 3D object floating behind a section, reacting to the pointer.
 *
 * The two sources were generated for this (Recraft V4.1, flat-white plate,
 * TAK's palette locked) and cut to alpha with two different mattes, because
 * they are different problems: the orb is a solid body whose white specular
 * highlights and glowing core would be punched through by a whiteness key, so
 * it uses a filled-disc matte; the web is meant to read see-through, so its
 * interior white is keyed out along with the background.
 *
 * MOTION IS TWO LAYERS, and they are deliberately kept apart:
 *
 *  - a CSS keyframe bob (`tak-drift`, in globals.css) on the OUTER element,
 *    which runs on the compositor and needs no JavaScript at all
 *  - pointer parallax on the INNER element, written straight to the style in
 *    a rAF loop
 *
 * They are on different elements on purpose. Sharing one element would mean
 * the JavaScript transform and the keyframe transform overwrite each other
 * every frame, and the bob would die the moment the pointer moved.
 *
 * `depth` is how far this object leans into the pointer, in px. Give nearer
 * objects a larger value than distant ones and the group separates in z.
 *
 * Still `pointer-events-none`: these sit behind real content, and they must
 * never eat a click meant for a card underneath. The pointer is tracked on the
 * window instead, so the object reacts without ever being a target.
 */
export default function FloatObject({
  src,
  className,
  size = 320,
  opacity = 0.5,
  delay = 0,
  duration = 14,
  depth = 26,
}: {
  src: string;
  className?: string;
  size?: number;
  opacity?: number;
  /** Offsets the cycle so two objects on one section never bob in lockstep. */
  delay?: number;
  duration?: number;
  /** Pointer lean, in px at the edge of the viewport. */
  depth?: number;
}) {
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = inner.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Coarse pointers have no hover, so there is nothing to follow and the
    // listener would just cost battery.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      // -1..1 across the viewport, so the lean is symmetric about the centre.
      targetX = (e.clientX / window.innerWidth - 0.5) * 2 * depth;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2 * depth;
    };

    const tick = () => {
      // Ease toward the pointer instead of tracking it exactly. Following it
      // 1:1 reads as the image being dragged; lagging behind reads as mass,
      // which is what makes it feel like an object rather than a sticker.
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [depth]);

  return (
    <span
      aria-hidden
      className={`tak-drift pointer-events-none absolute block select-none ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        opacity,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <span ref={inner} className="block h-full w-full will-change-transform">
        {/* Plain <img>: a fixed-size decoration that must never affect layout,
            and next/image would add a wrapper and fight the real content
            images for fetch priority.
            eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={size} height={size} className="h-full w-full" />
      </span>
    </span>
  );
}
