import { type ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  heading?: string;
  children?: ReactNode;
};

export default function Section({ eyebrow, heading, children }: SectionProps) {
  return (
    // `relative` so decorative layers (components/decor.tsx) can be absolutely
    // positioned against the section they belong to. `isolate` keeps their
    // stacking contained, so a glow can never paint over the next section.
    <section className="relative isolate mx-auto max-w-[1344px] px-5 py-[var(--space-8)] md:py-[var(--space-16)]">
      {(eyebrow || heading) && (
        <div className="mb-8">
          {eyebrow && (
            <p className="text-text-accent text-sm font-medium uppercase tracking-wide m-0 mb-2">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-text-primary text-2xl font-semibold m-0">
              {heading}
            </h2>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
