import { type ServiceDetail } from "@/lib/content";
import { ICONS, type IconKey } from "@/components/icons";

/**
 * Service Detail overlay, traced from "Service Detail Overlay.png".
 *
 * That export IS a clean 4x: 3888x3372 is exactly 972x843, so unlike the
 * Project Details overlay its dimensions can be trusted. The modal is 972
 * wide, which is what `Modal`'s default maxWidth is set from.
 *
 * Two things the build was missing:
 *   1. the large ringed icon badge (~128px) to the LEFT of the header. The
 *      build opened straight on the eyebrow, so the header read as a
 *      paragraph rather than as a titled object.
 *   2. "How We Work" is a numbered timeline: discs sitting ON a vertical
 *      connector, number inside the disc. The build drew a plain left border
 *      with "1. Discover" as running text, which is the same information and
 *      a different object.
 *
 * The step copy here is the overlay's own, which is shorter and more
 * design-specific than the site-wide `processSteps` the build reused.
 */

const STEPS: { n: number; title: string; body: string }[] = [
  { n: 1, title: "Discover", body: "User research and requirements gathering." },
  { n: 2, title: "Design", body: "Wireframing and visual prototyping." },
  { n: 3, title: "Build", body: "High-fidelity screens and design systems." },
  { n: 4, title: "Launch", body: "Developer handoff and QA." },
  { n: 5, title: "Support", body: "Iterative improvements based on metrics." },
];

export default function ServiceDetailContent({
  service,
  icon = "palette",
}: {
  service: ServiceDetail;
  icon?: IconKey;
}) {
  const Icon = ICONS[icon];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        <span
          aria-hidden
          className="flex h-[128px] w-[128px] shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--text-accent)_28%,transparent)] bg-[#0a0b0a] text-text-accent"
        >
          <Icon className="h-12 w-12" />
        </span>

        <div className="min-w-0">
          <p className="font-mono-eyebrow m-0 mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-text-accent">
            Service
          </p>
          <h2 className="font-display m-0 mb-4 text-2xl font-bold">
            {service.title}
          </h2>
          <p className="m-0 text-sm leading-relaxed text-text-secondary">
            {service.description}
          </p>
        </div>
      </div>

      <div className="border-t border-border-subtle" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div>
            <p className="font-mono-eyebrow m-0 mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-text-accent">
              Problem It Solves
            </p>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              {service.problemItSolves}
            </p>
          </div>
          <div>
            <p className="font-mono-eyebrow m-0 mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-text-accent">
              Who It&rsquo;s For
            </p>
            <p className="m-0 text-sm leading-relaxed text-text-secondary">
              {service.whoItsFor}
            </p>
          </div>
          <div>
            <p className="font-mono-eyebrow m-0 mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-text-accent">
              Tools Used
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-mono-eyebrow rounded-md border border-border-subtle px-2.5 py-1.5 text-[11px] text-text-accent"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="font-mono-eyebrow m-0 mb-5 text-[11px] font-medium uppercase tracking-[0.14em] text-text-accent">
            How We Work
          </p>
          <ol className="relative m-0 flex list-none flex-col gap-6 p-0">
            {/* The connector runs behind the discs and stops at the last one,
                which is why it is inset rather than a border on the list. */}
            <span
              aria-hidden
              className="absolute top-3 bottom-3 left-[13px] w-px bg-[color-mix(in_srgb,var(--text-accent)_45%,transparent)]"
            />
            {STEPS.map((step) => (
              <li key={step.n} className="relative flex items-start gap-4">
                <span className="font-display z-10 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--text-accent)_45%,transparent)] bg-[#0a0b0a] text-[11px] font-bold text-text-primary">
                  {step.n}
                </span>
                <span className="min-w-0">
                  <span className="font-display block text-base font-bold text-text-primary">
                    {step.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-text-secondary">
                    {step.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
