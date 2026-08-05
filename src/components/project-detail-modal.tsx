import { type PortfolioProject } from "@/lib/content";

export default function ProjectDetailContent({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-mono-eyebrow m-0 mb-2 text-xs uppercase tracking-wide text-text-accent">
          {project.category}
        </p>
        <h2 className="font-display m-0 mb-3 text-2xl font-semibold">
          {project.name}
        </h2>
        <p className="m-0 max-w-xl text-text-secondary">{project.blurb}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px]">
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-mono-eyebrow m-0 mb-2 text-xs uppercase tracking-wide text-text-accent">
              Overview
            </p>
            <p className="m-0 text-sm text-text-secondary">
              {project.overview}
            </p>
          </div>
          <div className="border-t border-border-subtle pt-6">
            <p className="font-mono-eyebrow m-0 mb-2 text-xs uppercase tracking-wide text-text-accent">
              Problem
            </p>
            <p className="m-0 text-sm text-text-secondary">
              {project.problem}
            </p>
          </div>
          <div className="border-t border-border-subtle pt-6">
            <p className="font-mono-eyebrow m-0 mb-2 text-xs uppercase tracking-wide text-text-accent">
              Solution
            </p>
            <p className="m-0 text-sm text-text-secondary">
              {project.solution}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-bg-input p-6">
          <div>
            <p className="m-0 mb-2 text-sm font-semibold text-text-primary">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="font-mono-eyebrow rounded-full border border-border-subtle bg-bg-canvas px-3 py-2 text-xs text-text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border-subtle pt-4 text-sm">
            <span className="text-text-secondary">Status</span>
            <span className="font-mono-eyebrow rounded-full border border-border-subtle bg-bg-canvas px-3 py-1 text-xs text-text-accent">
              {project.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
