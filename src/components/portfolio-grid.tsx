"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { portfolioProjects } from "@/lib/content";
import PortfolioCard from "@/components/portfolio-card";

/**
 * Filtered portfolio grid.
 *
 * REFERENCE, filter rail: Watermelon UI's navigator/segmented pattern, taken as
 * structure. One pill-shaped rail holds all four options and a single
 * accent-filled indicator slides between them, instead of four independent
 * buttons each toggling its own fill. Their version is Radix Tabs underneath;
 * this is a plain measured `translateX`, because the rail is four static
 * labels and pulling Radix in for it would fail the no-new-dependency rule.
 *
 * REFERENCE, the grid itself: designspells, "Transition" tag. Filtering used to
 * swap the DOM instantly, so cards vanished and appeared with no relation to
 * each other. Now the surviving set re-enters on a short stagger keyed to the
 * active filter, which reads as the grid rearranging rather than blinking.
 *
 * WHY THE INDICATOR IS MEASURED, NOT COMPUTED. Equal-width pills would let the
 * indicator be `translateX(index * 100%)` with no JS at all, but the labels are
 * "All", "Mobile", "Web" and "Desktop", and forcing them to one width to save
 * the measurement would leave "All" swimming in whitespace. So the rail
 * measures its own buttons. It re-measures on resize, because the font can
 * reflow and a stale offset is worse than no indicator.
 *
 * The indicator is `aria-hidden` decoration. The real state lives on the
 * buttons' `aria-pressed`, so nothing depends on the measurement succeeding.
 */

const filters = ["All", "Mobile", "Web", "Desktop"] as const;
type Filter = (typeof filters)[number];

function matchesFilter(category: string, filter: Filter) {
  if (filter === "All") return true;
  if (filter === "Mobile") return category === "MOBILE APP";
  if (filter === "Web") return category === "Web App";
  return category === "Desktop App";
}

export default function PortfolioGrid() {
  const [active, setActive] = useState<Filter>("All");
  const railRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(
    null,
  );

  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const measure = () => {
      const button = rail.querySelector<HTMLButtonElement>(
        `[data-filter="${active}"]`,
      );
      if (!button) return;
      setIndicator({ x: button.offsetLeft, w: button.offsetWidth });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [active]);

  const visible = portfolioProjects.filter((p) => matchesFilter(p.category, active));

  return (
    <div>
      <div className="mb-[34px] flex flex-wrap items-center gap-4">
        <div
          ref={railRef}
          role="group"
          aria-label="Filter projects by platform"
          className="relative inline-flex rounded-full border border-border-subtle p-1"
        >
          {indicator && (
            <span
              aria-hidden
              className="absolute inset-y-1 rounded-full bg-action-primary transition-[transform,width] duration-300 ease-out motion-reduce:transition-none"
              style={{
                width: indicator.w,
                transform: `translateX(${indicator.x - 4}px)`,
                left: 4,
              }}
            />
          )}
          {filters.map((filter) => {
            const on = active === filter;
            return (
              <button
                key={filter}
                data-filter={filter}
                onClick={() => setActive(filter)}
                aria-pressed={on}
                className={`relative cursor-pointer rounded-full border-0 bg-transparent px-5 py-2 text-sm transition-colors duration-300 motion-reduce:transition-none ${
                  on
                    ? "font-medium text-text-on-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <span
          className="ml-auto text-sm text-text-accent"
          aria-live="polite"
          aria-atomic="true"
        >
          {visible.length} project{visible.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* `key` on the wrapper is what restarts the stagger: changing the filter
          remounts the list, so every surviving card replays its entry rather
          than only the newly-added ones animating. */}
      <div
        key={active}
        className="grid grid-cols-1 gap-[33px] md:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((project, i) => (
          <div
            key={project.slug}
            className="tak-filter-enter"
            style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
          >
            <PortfolioCard project={project} />
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="m-0 py-16 text-center text-sm text-text-secondary">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
