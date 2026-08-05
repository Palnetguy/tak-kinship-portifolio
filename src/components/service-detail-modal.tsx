import { type ServiceDetail, processSteps } from "@/lib/content";

export default function ServiceDetailContent({ service }: { service: ServiceDetail }) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-mono-eyebrow m-0 mb-2 text-xs uppercase tracking-wide text-text-accent">
          Service
        </p>
        <h2 className="font-display m-0 mb-3 text-3xl font-medium">
          {service.title}
        </h2>
        <p className="m-0 max-w-xl text-text-secondary">
          {service.description}
        </p>
      </div>

      <div className="border-t border-border-subtle" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div>
            <p className="font-mono-eyebrow m-0 mb-2 text-xs uppercase tracking-wide text-text-accent">
              Problem It Solves
            </p>
            <p className="m-0 text-sm text-text-secondary">
              {service.problemItSolves}
            </p>
          </div>
          <div>
            <p className="font-mono-eyebrow m-0 mb-2 text-xs uppercase tracking-wide text-text-accent">
              Who It&rsquo;s For
            </p>
            <p className="m-0 text-sm text-text-secondary">
              {service.whoItsFor}
            </p>
          </div>
          <div>
            <p className="font-mono-eyebrow m-0 mb-2 text-xs uppercase tracking-wide text-text-accent">
              Tools Used
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-mono-eyebrow rounded-full border border-border-subtle bg-bg-input px-3 py-2 text-xs text-text-accent"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="font-mono-eyebrow m-0 mb-4 text-xs uppercase tracking-wide text-text-accent">
            How We Work
          </p>
          <ol className="m-0 flex list-none flex-col gap-6 border-l border-action-primary p-0 pl-6">
            {processSteps.map((step) => (
              <li key={step.number}>
                <p className="font-display m-0 text-base font-semibold">
                  {step.number}. {step.title}
                </p>
                <p className="m-0 mt-1 text-sm text-text-secondary">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
