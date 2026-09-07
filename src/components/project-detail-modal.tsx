import Image from "next/image";
import { type PortfolioProject } from "@/lib/content";
import MediaPlaceholder from "@/components/media-placeholder";
import { shouldBypassImageOptimization } from "@/lib/media";

/**
 * Project Details overlay, traced from "Project Details.png".
 *
 * CAVEAT ON THE REFERENCE: that export is 3460x4209, which is not a clean
 * multiple at any scale (/4 = 865x1052.25, /3 = 1153.3x1403). It is a cropped
 * export, so it is trustworthy for ARRANGEMENT but not for absolute
 * dimensions. Everything below is structural for that reason; re-export the
 * overlay from Figma before pinning any exact number to it.
 *
 * What the build was missing, all absence-class:
 *   1. the hero image across the top, bled to the modal edge. The overlay
 *      leads with the project screenshot; the build opened on the eyebrow.
 *   2. a Timeline row in the Tech Stack card
 *   3. a "Visit the app" link
 *
 * Timeline and the link render only when the data exists. The reference shows
 * "2024" and a live link for Desn; nothing is invented for the other five.
 */
export default function ProjectDetailContent({
  project,
}: {
  project: PortfolioProject;
}) {
  const unoptimized = shouldBypassImageOptimization(project.image);

  return (
    <div>
      {project.image ? (
        <div className="relative h-[305px] w-full">
          <Image
            src={project.image}
            alt=""
            fill
            unoptimized={unoptimized}
            sizes="(max-width: 900px) 100vw, 852px"
            className="block object-cover"
          />
        </div>
      ) : (
        <div className="h-[305px] w-full">
          <MediaPlaceholder />
        </div>
      )}

      <div className="p-8 md:p-10">
        <p className="font-mono-eyebrow m-0 mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-text-accent">
          {project.category}
        </p>
        <h2 className="font-display m-0 mb-3 text-2xl font-bold">
          {project.name}
        </h2>
        <p className="m-0 mb-10 text-[15px] leading-relaxed text-text-secondary">
          {project.blurb}
        </p>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_280px]">
          <div className="flex flex-col gap-6">
            {(
              [
                ["Overview", project.overview],
                ["Problem", project.problem],
                ["Solution", project.solution],
              ] as const
            ).map(([label, body], i) => (
              <div
                key={label}
                className={i > 0 ? "border-t border-border-subtle pt-6" : ""}
              >
                <p className="font-mono-eyebrow m-0 mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-text-accent">
                  {label}
                </p>
                <p className="m-0 text-sm leading-relaxed text-text-secondary">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex h-fit flex-col gap-4 rounded-2xl border border-border-subtle bg-surface p-6">
            <p className="font-display m-0 text-base font-bold text-text-primary">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="font-mono-eyebrow rounded-md border border-border-subtle px-2.5 py-1.5 text-[11px] text-text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-border-subtle pt-4 text-sm">
              <span className="text-text-secondary">Status</span>
              <span className="font-mono-eyebrow rounded-full border border-border-subtle px-3 py-1 text-[11px] text-text-accent">
                {project.status}
              </span>
            </div>

            {project.year && (
              <div className="flex items-center justify-between border-t border-border-subtle pt-4 text-sm">
                <span className="text-text-secondary">Timeline</span>
                <span className="font-display font-bold text-text-primary">
                  {project.year}
                </span>
              </div>
            )}

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className="border-t border-border-subtle pt-4 text-sm text-text-accent no-underline hover:underline"
              >
                Visit the app &#8599;
              </a>
            )}

            {project.downloads && project.downloads.length > 0 && (
              <div className="border-t border-border-subtle pt-4">
                <p className="font-display m-0 mb-3 text-sm font-bold text-text-primary">
                  Downloads
                </p>
                <div className="flex flex-col gap-3">
                  {project.downloads.map((download) => (
                    <a
                      key={`${download.href}-${download.version ?? download.label}`}
                      href={download.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-lg border border-border-subtle px-3 py-2 text-sm text-text-accent no-underline transition-colors hover:border-text-accent"
                    >
                      <span className="block">{download.label}</span>
                      {download.releasedOn ? (
                        <span className="mt-1 block text-[11px] text-text-secondary">
                          {download.releasedOn}
                        </span>
                      ) : null}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {project.projectId && (
              <div className="border-t border-border-subtle pt-4 text-sm">
                <div className="flex flex-col gap-2">
                  <a
                    href={`/portfolio/${project.slug}/privacy`}
                    className="text-text-accent no-underline hover:underline"
                  >
                    Privacy policy
                  </a>
                  <a
                    href={`/portfolio/${project.slug}/terms`}
                    className="text-text-accent no-underline hover:underline"
                  >
                    Terms and conditions
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
