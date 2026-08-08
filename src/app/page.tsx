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
import { ICONS } from "@/components/icons";
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
      <main className="flex-1 overflow-x-clip pt-[72px]">
        {/* Hero. Centred, not left-aligned: the reference sets the headline,
            body and buttons on the page's centre line, with the two 384x384
            `Decorative Code Block` panels flanking them (right panel high at
            x 998.8, left panel low at x 68.8). Left-aligning these was the
            single biggest arrangement error in the first build. */}
        <Section className="min-h-[779px]" pt={43} pb={62}>
          <CodeBlockDecor
            variant="right"
            className="top-[43px] right-0 hidden lg:block"
          />
          <CodeBlockDecor
            variant="left"
            className="top-[261px] left-0 hidden lg:block"
          />
          <Glow className="right-24 top-10" size={560} strength={0.14} />
          <Glow className="left-40 bottom-8" size={420} strength={0.08} />
          <PlusField className="bottom-4 left-0" rows={1} cols={5} />

          <div className="relative flex flex-col items-center gap-6 py-24 text-center">
            <h1 className="font-display m-0 max-w-[620px] text-4xl font-bold leading-tight md:text-[67px] md:leading-[1.1]">
              Where innovation meets impact.
            </h1>
            <p className="m-0 max-w-[590px] text-[15px] leading-relaxed text-text-secondary">
              We turn bold ideas into impactful digital solutions. At TAK
              Kinship, we engineer robust software, craft intuitive
              experiences, and build scalable infrastructure for modern
              enterprises.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="md" href="/contact">
                Start a Project
              </Button>
              <Button variant="secondary" size="md" href="/portfolio">
                See Our Work
              </Button>
            </div>
          </div>
        </Section>

        {/* Problem. Cards are 432 x 311 at a 24px gap, each centred on a lined
            icon; the reference's heading carries no green run. */}
        <Section pt={60} pb={160}>
          <PlusField className="left-0 top-4" rows={2} cols={5} />
          <PlusField className="bottom-16 right-0" rows={1} cols={5} />
          <Reveal>
            <SectionHeading eyebrow="The Problem" maxWidth={700} mb={44}>
              Most software slows businesses down.
            </SectionHeading>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {problems.map((p) => (
                <Card key={p.title} icon={p.icon} title={p.title} body={p.body} />
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Services. `Bento Grid Layout`, 1344x658 in the design: 3 x 2 at a
            34px gap, every card the same height whatever the copy length. */}
        <Section pt={60} pb={200}>
          <PlusField className="left-0 top-2" />
          <TriangleMark className="right-6 top-6" size={150} rotate={-90} opacity={0.45} />
          <TriangleMark className="bottom-10 left-1/2 -translate-x-1/2" size={90} opacity={0.3} />
          <Glow className="-right-24 top-24" size={480} strength={0.16} />
          <Reveal>
            <SectionHeading eyebrow="What We Offer" highlight="Ideas" maxWidth={900} mb={86}>
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

        {/* Process. The five steps sit ON a horizontal rule in the reference,
            with the numbered discs punched through it. The first build drew
            the discs but not the rule, which is what made the row read as five
            unrelated columns rather than as one timeline. */}
        <Section pt={60} pb={206}>
          <TriangleMark className="left-6 top-0" size={130} rotate={90} opacity={0.4} />
          <TriangleMark className="bottom-8 left-56" size={110} opacity={0.35} />
          <PlusField className="right-0 top-2" rows={3} cols={5} />
          <PlusField className="bottom-14 left-0" rows={3} cols={5} />
          <Reveal>
            <SectionHeading eyebrow="How We Work" highlight="Results" maxWidth={700} mb={90}>
              A Proven Process for Reliable Results
            </SectionHeading>
            <div className="relative">
              {/* Behind the discs, inset by half a column so it stops at the
                  first and last step rather than running to the container. */}
              <div
                aria-hidden
                className="absolute top-5 right-[10%] left-[10%] hidden h-px bg-border-subtle lg:block"
              />
              <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
                {processSteps.map((step) => (
                  <div
                    key={step.number}
                    className="flex flex-col items-center gap-[17px] text-center"
                  >
                    <span className="font-display flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-bg-canvas text-sm font-bold text-text-primary">
                      {step.number}
                    </span>
                    <h3 className="font-display m-0 mt-[17px] text-lg font-bold text-text-accent">
                      {step.title}
                    </h3>
                    <p className="m-0 max-w-[24ch] text-sm leading-relaxed text-text-secondary">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* Portfolio preview. Cards 426 x 474 at a 33px gap, each led by its
            real 426x225 screenshot. The reference ends the section on the card
            grid and a dot field, with no trailing button. */}
        <Section pt={60} pb={197}>
          <DotField className="left-2 top-6" width={150} height={130} />
          <DotField className="right-6 bottom-16" width={170} height={140} />
          <Glow className="-right-20 top-0" size={520} strength={0.12} />
          <Reveal>
            <SectionHeading eyebrow="Our Work" maxWidth={1290} mb={54}>
              Every project is a testament to innovation, a journey into excellence.
            </SectionHeading>
            <div className="grid grid-cols-1 gap-[33px] md:grid-cols-2 lg:grid-cols-3">
              {portfolioProjects.map((project) => (
                <PortfolioCard key={project.slug} project={project} />
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Why Trust Us. Two blocks in the design, not one: `Bento Grid
            Layout` (four value cards, 317 x 268 at a 25px gap) sitting above
            `Bento Grid / Cards` (the wide 1344x365 experience + quote +
            clients panel, 34px below the cards). */}
        <Section pt={60} pb={202}>
          <DotField className="-left-2 top-2" />
          <Glow className="-left-32 top-40" size={420} strength={0.1} />
          <Reveal>
            <SectionHeading
              maxWidth={780}
              mb={95}
              eyebrow="Why Trust Us"
              sub="Excellence from strategy to execution, as architects of IT solutions, we propel businesses into the future."
            >
              We deal with the aspects of professional IT services.
            </SectionHeading>
            <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-2 lg:grid-cols-4">
              {whyTrustValues.map((value) => (
                <BentoCard
                  key={value.title}
                  icon={value.icon}
                  title={value.title}
                  body={value.body}
                  accentTitle
                  minHeight={268}
                />
              ))}
            </div>
            <TrustPanel />
          </Reveal>
        </Section>

        {/* We Build For. 4 x 2 tiles, 316 x 158 at a 26px gap, each leading
            with a lined icon above its label. */}
        <Section pt={46} pb={187}>
          <Glow className="left-1/3 top-16" size={460} strength={0.1} />
          <Reveal>
            <SectionHeading eyebrow="We Build For" highlight="East Africa" maxWidth={920} mb={32}>
              Built for the sectors moving East Africa.
            </SectionHeading>
            <div className="grid grid-cols-2 gap-[26px] sm:grid-cols-4">
              {sectors.map((sector) => {
                const Icon = ICONS[sector.icon];
                return (
                  <div
                    key={sector.label}
                    className="flex min-h-[158px] flex-col items-center justify-center gap-3 rounded-xl border border-border-subtle bg-[#0a0b0a] px-4 text-center transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--text-accent)_35%,transparent)]"
                  >
                    <Icon className="h-6 w-6 text-text-accent" />
                    <span className="font-display text-[15px] font-medium">
                      {sector.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Section>

        <ConnectCta />
      </main>
      <Footer />
    </>
  );
}
