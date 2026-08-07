import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Button from "@/components/button";
import Card from "@/components/card";
import Section from "@/components/section";
import PortfolioCard from "@/components/portfolio-card";
import ConnectCta from "@/components/connect-cta";
import Reveal from "@/components/reveal";
import BentoCard from "@/components/bento-card";
import SectionHeading from "@/components/section-heading";
import TrustPanel from "@/components/trust-panel";
import { PlusField, DotField, TriangleMark, Glow, CodeBlockDecor } from "@/components/decor";
import {
  problems,
  services,
  processSteps,
  portfolioProjects,
  whyTrustValues,
  sectors,
} from "@/lib/content";

export default function Page() {
  return (
    <>
      <NavBar />
      {/* overflow-x-clip, not overflow-hidden: the atmospheric glows are
          deliberately wider than the 1344 column and bleed past the viewport
          edge, which is what makes them read as light rather than as shapes.
          `clip` contains that horizontally without creating a scroll container,
          so position: sticky anywhere inside still works. */}
      <main className="flex-1 overflow-x-clip pt-16">
        {/* Hero. Two `Decorative Code Block` 384x384 layers sit behind and to
            the right of the copy in the design; the copy column is capped so
            they never sit under running text. */}
        <Section>
          <CodeBlockDecor className="right-4 top-6 hidden lg:block" opacity={0.55} />
          <CodeBlockDecor className="right-52 top-72 hidden lg:block" size={300} opacity={0.3} />
          <Glow className="right-10 top-20" size={520} strength={0.12} />
          <div className="relative flex flex-col items-start gap-6 py-12 md:py-24">
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
            <SectionHeading eyebrow="The Problem" highlight="slows">
              Most software slows businesses down.
            </SectionHeading>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {problems.map((p) => (
                <Card key={p.title} title={p.title} body={p.body} />
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Services. `Bento Grid Layout`, 1344x658 in the design: 3 x 2 at a
            34px gap, every card the same height whatever the copy length. */}
        <Section>
          <PlusField className="left-5 top-8" />
          <TriangleMark className="right-6 top-10" size={150} rotate={-90} opacity={0.45} />
          <TriangleMark className="bottom-16 left-1/2 -translate-x-1/2" size={90} opacity={0.3} />
          <Glow className="-right-24 top-24" size={480} strength={0.16} />
          <Reveal>
            <SectionHeading eyebrow="What We Offer" highlight="Ideas">
              Transforming Ideas into Extraordinary Solutions.
            </SectionHeading>
            <div className="grid grid-cols-1 gap-[34px] md:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <BentoCard
                  key={s.title}
                  icon={s.icon}
                  title={s.title}
                  body={s.body}
                />
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Process */}
        <Section>
          <Reveal>
            <SectionHeading eyebrow="How We Work" highlight="Proven">
              A Proven Process for Reliable Results
            </SectionHeading>
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
            <SectionHeading eyebrow="Our Work" highlight="innovation">
              Every project is a testament to innovation, a journey into excellence.
            </SectionHeading>
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

        {/* Why Trust Us. Two blocks in the design, not one: `Bento Grid
            Layout` (four value cards, 4 x 1) sitting above `Bento Grid /
            Cards` (the wide experience + quote + clients panel). */}
        <Section>
          <DotField className="-left-2 top-2" />
          <Glow className="-left-32 top-40" size={420} strength={0.1} />
          <Reveal>
            <SectionHeading
              eyebrow="Why Trust Us"
              sub="Excellence from strategy to execution, as architects of IT solutions, we propel businesses into the future."
            >
              We deal with the aspects of professional IT services.
            </SectionHeading>
            <div className="grid grid-cols-1 gap-[26px] sm:grid-cols-2 lg:grid-cols-4">
              {whyTrustValues.map((value) => (
                <BentoCard
                  key={value.title}
                  icon={value.icon}
                  title={value.title}
                  body={value.body}
                  accentTitle
                  minHeight={272}
                />
              ))}
            </div>
            <TrustPanel />
          </Reveal>
        </Section>

        {/* We Build For (sectors) */}
        <Section>
          <Reveal>
            <SectionHeading eyebrow="We Build For" highlight="East Africa">
              Built for the sectors moving East Africa.
            </SectionHeading>
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
