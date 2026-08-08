"use client";

import { useState } from "react";
import { type PortfolioProject } from "@/lib/content";
import Modal from "@/components/modal";
import ProjectDetailContent from "@/components/project-detail-modal";

/**
 * Portfolio card, traced from Home.png y 3352-4773.
 *
 * Measured off the 4x reference rather than eyeballed:
 *   card      426 x 474, 33px gap, three across a 1344 container
 *   photo     426 x 225, flush to the card top (no padding above it)
 *   row pitch 507  (474 + 33)
 *
 * Three things the first build had wrong, all of them arrangement rather than
 * property, which is exactly the class of bug the reference-tracing skill
 * exists for:
 *   1. no photo at all, a name pill stood in for it
 *   2. the category sat on the title's baseline, right-aligned; in the design
 *      it is a green mono line UNDER the title
 *   3. the stack chips were borderless; the design outlines every one
 */
export default function PortfolioCard({ project }: { project: PortfolioProject }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`${project.name} project details`}
        className="group flex min-h-[474px] cursor-pointer flex-col overflow-hidden rounded-xl border border-border-subtle bg-[#0a0b0a] p-0 text-left transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none"
      >
        <div className="h-[225px] w-full shrink-0 overflow-hidden">
          <img
            src={project.image}
            alt=""
            width={852}
            height={450}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>

        <div className="flex flex-col gap-2 px-5 pt-6 pb-7">
          <h3 className="font-display m-0 text-2xl font-medium text-text-primary">
            {project.name}
          </h3>
          <span className="font-mono-eyebrow text-[11px] font-medium uppercase tracking-[0.14em] text-text-accent">
            {project.category}
          </span>
          <p className="m-0 mt-1 text-sm leading-relaxed text-text-secondary">
            {project.blurb}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="font-mono-eyebrow rounded-md border border-border-subtle px-2.5 py-1.5 text-[11px] text-text-accent"
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
