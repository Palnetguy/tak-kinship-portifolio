"use client";

import { useState } from "react";
import { type PortfolioProject } from "@/lib/content";
import Modal from "@/components/modal";
import ProjectDetailContent from "@/components/project-detail-modal";

function PortfolioThumbnail({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-bg-canvas">
      <div className="flex items-center gap-3 rounded-full border border-border-subtle px-4 py-2">
        <span
          className="block h-2 w-2 rounded-full bg-action-primary"
          aria-hidden
        />
        <span className="font-display text-sm text-text-secondary">
          {name}
        </span>
      </div>
    </div>
  );
}

export default function PortfolioCard({ project }: { project: PortfolioProject }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer overflow-hidden rounded-xl border border-border-subtle bg-bg-input p-0 text-left transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none"
      >
        <div className="h-[225px] w-full">
          <PortfolioThumbnail name={project.name} />
        </div>
        <div className="flex flex-col gap-3 p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display m-0 text-2xl font-medium text-text-primary">
              {project.name}
            </h3>
            <span className="font-mono-eyebrow text-xs text-text-accent">
              {project.category}
            </span>
          </div>
          <p className="m-0 text-sm text-text-secondary">{project.blurb}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border-subtle px-3 py-1 text-xs text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <ProjectDetailContent project={project} />
        </Modal>
      )}
    </>
  );
}
