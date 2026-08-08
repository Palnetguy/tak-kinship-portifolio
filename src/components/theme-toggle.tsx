"use client";

import { useEffect, useState } from "react";

/**
 * Sized h-10 w-10 to match Button's `sm` height exactly. It was `p-3` around a
 * 16px icon, which came out 42px against the button's 38 and left the nav
 * visibly uneven.
 *
 * Also fixes a persistence bug: the stored theme was read into React state on
 * mount but never written back to `data-theme`, so a reload always rendered
 * dark with a moon icon claiming otherwise. The attribute is applied in the
 * same effect now.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Read back what the blocking script in <head> already decided. Deriving
    // it again here defaulted to "dark" whenever nothing was stored, which
    // clobbered the attribute that script had just set and made the theme
    // unsettable from anywhere but this button.
    const applied = document.documentElement.getAttribute("data-theme");
    if (applied === "light" || applied === "dark") {
      setTheme(applied);
      return;
    }
    const stored = localStorage.getItem("tak:theme") as "dark" | "light" | null;
    const next = stored || "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("tak:theme", next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-subtle bg-transparent text-text-primary transition-colors hover:border-text-accent hover:text-text-accent"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
