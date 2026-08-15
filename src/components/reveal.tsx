"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealCallback = () => void;

const callbacks = new WeakMap<Element, RevealCallback>();

let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver() {
  if (sharedObserver || typeof window === "undefined") return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const callback = callbacks.get(entry.target);
        if (!callback) continue;
        callbacks.delete(entry.target);
        sharedObserver?.unobserve(entry.target);
        callback();
      }
    },
    { threshold: 0.15 },
  );

  return sharedObserver;
}

export default function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = getSharedObserver();
    if (!observer) {
      const id = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(id);
    }

    const reveal = () => {
      window.requestAnimationFrame(() => setVisible(true));
    };
    callbacks.set(node, reveal);
    observer.observe(node);

    return () => {
      callbacks.delete(node);
      observer.unobserve(node);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
