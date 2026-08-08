"use client";

import { useState } from "react";
import { portfolioProjects } from "@/lib/content";
import PortfolioCard from "@/components/portfolio-card";

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
  const visible = portfolioProjects.filter((p) =>
    matchesFilter(p.category, active),
  );

  return (
    <div>
      <div className="mb-[34px] flex flex-wrap items-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`cursor-pointer rounded-full border px-5 py-2 text-sm transition-colors ${
              active === filter
                ? "border-action-primary bg-action-primary font-medium text-text-on-accent"
                : "border-border-subtle bg-transparent text-text-primary hover:border-text-accent"
            }`}
          >
            {filter}
          </button>
        ))}
        <span className="ml-auto text-sm text-text-accent">
          {visible.length} project{visible.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-[33px] md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <PortfolioCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
