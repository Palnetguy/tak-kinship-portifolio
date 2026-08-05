import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Button from "@/components/button";
import Card from "@/components/card";
import Section from "@/components/section";
import PortfolioCard from "@/components/portfolio-card";
import ConnectCta from "@/components/connect-cta";
import Reveal from "@/components/reveal";
import {
  problems,
  services,
  processSteps,
  portfolioProjects,
  whyTrustValues,
  sectors,
} from "@/lib/content";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono-eyebrow m-0 mb-3 text-sm font-medium uppercase tracking-wide text-action-primary">
      {children}
    </p>
  );
}

export default function Page() {
  return (
    <>
      <NavBar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <Section>
          <div className="flex flex-col items-start gap-6 py-12 md:py-24">
            <h1 className="font-display m-0 max-w-3xl text-4xl font-bold leading-tight md:text-6xl md:leading-[1.05]">
              Where innovation meets impact.
            </h1>
            <p className="m-0 max-w-xl text-lg text-text-secondary">
              We turn bold ideas into impactful digital solutions. At TAK
              Kinship, we engineer robust software, craft intuitive
              experiences, and build scalable infrastructure for modern
              enterprises.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="md" href="/contact">
                Start a Project
              </Button>
              <Button variant="secondary" size="md" href="/portfolio">
                See Our Work
              </Button>
            </div>
          </div>
        </Section>

        {/* Problem */}
        <Section>
          <Reveal>
            <Eyebrow>The Problem</Eyebrow>
            <h2 className="font-display m-0 mb-10 max-w-2xl text-3xl font-bold md:text-4xl">
              Most software slows businesses down.
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {problems.map((p) => (
                <Card key={p.title} title={p.title} body={p.body} />
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Services */}
        <Section>
          <Reveal>
            <Eyebrow>What We Offer</Eyebrow>
            <h2 className="font-display m-0 mb-10 max-w-2xl text-3xl font-bold md:text-4xl">
              Transforming Ideas into Extraordinary Solutions.
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <Card key={s.title} title={s.title} body={s.body} />
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Process */}
        <Section>
          <Reveal>
            <Eyebrow>How We Work</Eyebrow>
            <h2 className="font-display m-0 mb-10 max-w-2xl text-3xl font-bold md:text-4xl">
              A Proven Process for Reliable Results
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step) => (
                <div key={step.number} className="flex flex-col gap-3">
                  <span className="font-display flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-sm font-bold text-text-accent">
                    {step.number}
                  </span>
                  <h3 className="font-display m-0 text-lg font-bold">
                    {step.title}
                  </h3>
                  <p className="m-0 text-sm text-text-secondary">{step.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Portfolio preview */}
        <Section>
          <Reveal>
            <Eyebrow>Our Work</Eyebrow>
            <h2 className="font-display m-0 mb-10 max-w-2xl text-3xl font-bold md:text-4xl">
              Every project is a testament to innovation, a journey into
              excellence.
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {portfolioProjects.map((project) => (
                <PortfolioCard key={project.slug} project={project} />
              ))}
            </div>
            <div className="mt-10">
              <Button variant="secondary" size="md" href="/portfolio">
                See Our Work
              </Button>
            </div>
          </Reveal>
        </Section>

        {/* Why Trust Us */}
        <Section>
          <Reveal>
            <h2 className="font-display m-0 mb-4 max-w-2xl text-3xl font-bold md:text-4xl">
              We deal with the aspects of professional IT services.
            </h2>
            <p className="mb-10 max-w-2xl text-text-secondary">
              Excellence from strategy to execution, as architects of IT
              solutions, we propel businesses into the future.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whyTrustValues.map((value) => (
                <Card key={value.title} title={value.title} body={value.body} />
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-2 border-t border-border-subtle pt-8 md:flex-row md:items-center md:justify-between">
              <p className="font-display m-0 text-2xl font-bold text-text-accent">
                7+ Years
                <span className="font-mono-eyebrow ml-3 text-xs font-medium uppercase tracking-wide text-text-muted">
                  Industry Experience
                </span>
              </p>
              <p className="m-0 text-text-secondary italic">
                &ldquo;Innovating the Future, One Solution at a Time.&rdquo;
              </p>
            </div>
          </Reveal>
        </Section>

        {/* We Build For (sectors) */}
        <Section>
          <Reveal>
            <Eyebrow>We Build For</Eyebrow>
            <h2 className="font-display m-0 mb-10 max-w-2xl text-3xl font-bold md:text-4xl">
              Built for the sectors moving East Africa.
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {sectors.map((sector) => (
                <div
                  key={sector}
                  className="flex items-center justify-center rounded-xl border border-border-subtle bg-bg-input px-4 py-8 text-center"
                >
                  <span className="font-display text-base font-medium">
                    {sector}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        <ConnectCta />
      </main>
      <Footer />
    </>
  );
}
