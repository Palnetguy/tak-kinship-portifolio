"use client";

import { useEffect, useRef, useState } from "react";

const locations = ["Uganda", "East Africa", "Africa", "EU", "Worldwide"];
const DISPLAY_DURATION = 2800;
const TRANSITION_DURATION = 360;

export default function RotatingLocation() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const transitionTimer = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setVisible(false);
      transitionTimer.current = window.setTimeout(() => {
        setIndex((current) => (current + 1) % locations.length);
        setVisible(true);
      }, TRANSITION_DURATION);
    }, DISPLAY_DURATION + TRANSITION_DURATION);

    return () => {
      window.clearInterval(interval);
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
    };
  }, []);

  return (
    <>
      <span
        aria-hidden="true"
        className={`inline-block text-text-accent transition-[opacity,transform] duration-[360ms] ease-out motion-reduce:transition-none ${
            visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
      >
        {locations[index]}.
      </span>
      <span className="sr-only">Uganda.</span>
    </>
  );
}
