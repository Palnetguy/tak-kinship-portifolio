"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

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
      const timer = window.setTimeout(() => setTheme(applied), 0);
      return () => window.clearTimeout(timer);
    }
    const stored = localStorage.getItem("tak:theme") as "dark" | "light" | null;
    const next = stored || "dark";
    const timer = window.setTimeout(() => setTheme(next), 0);
    document.documentElement.setAttribute("data-theme", next);
    return () => window.clearTimeout(timer);
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
      {theme === "dark" ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </button>
  );
}
