import Button from "@/components/button";
import Section from "@/components/section";

export default function ConnectCta() {
  return (
    <Section>
      <div className="flex flex-col items-center gap-6 py-8 text-center md:py-16">
        <p className="font-mono-eyebrow m-0 text-sm font-medium uppercase tracking-wide text-action-primary">
          Connect With Us
        </p>
        <h2 className="font-display m-0 max-w-2xl text-4xl font-bold md:text-5xl">
          Ready to innovate together?
        </h2>
        <p className="m-0 max-w-xl text-text-secondary">
          Let&rsquo;s start a conversation about how we can transform your
          ideas into powerful digital solutions.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="md" href="/contact">
            Start a Project
          </Button>
          <Button variant="secondary" size="md" href="/portfolio">
            See Our Work
          </Button>
        </div>
        <a
          href="mailto:info@takkinship.com"
          className="text-sm text-text-accent no-underline"
        >
          info@takkinship.com
        </a>
      </div>
    </Section>
  );
}
