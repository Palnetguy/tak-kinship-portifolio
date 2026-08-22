"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { type PortfolioProject } from "@/lib/content";
import Modal from "@/components/modal";
import MediaPlaceholder from "@/components/media-placeholder";

const ProjectDetailContent = dynamic(
  () => import("@/components/project-detail-modal"),
  { loading: () => null },
);

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
  const unoptimized = project.image.startsWith(
    "https://tak-kinship-bkt.s3.us-west-2.amazonaws.com/",
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${project.name} project details`}
        aria-haspopup="dialog"
        className="group flex h-full min-h-[474px] cursor-pointer flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface p-0 text-left tak-hover-glow hover:-translate-y-1 motion-reduce:transform-none"
      >
        <div className="relative h-[225px] w-full shrink-0 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt=""
              fill
              unoptimized={unoptimized}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 426px"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
            />
          ) : (
            <MediaPlaceholder />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 px-5 pt-6 pb-7">
          <h3 className="font-display m-0 text-2xl font-medium text-text-primary">
            {project.name}
          </h3>
          <span className="font-mono-eyebrow text-[11px] font-medium uppercase tracking-[0.14em] text-text-accent">
            {project.category}
          </span>
          <p
            className="m-0 mt-1 overflow-hidden text-sm leading-relaxed text-text-secondary"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 4,
            }}
          >
            {project.blurb}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-3">
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
        <Modal onClose={() => setOpen(false)} padded={false} maxWidth={865}>
          <ProjectDetailContent project={project} />
        </Modal>
      )}
    </>
  );
}
