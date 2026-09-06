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
import RotatingLocation from "@/components/rotating-location";
import TrustPanel from "@/components/trust-panel";
import ServiceOrbit from "@/components/service-orbit";
import TeamPanel from "@/components/team-panel";
import Testimonials from "@/components/testimonials";
import { ICONS } from "@/components/icons";
import { PlusField, DotField, TriangleMark, Glow } from "@/components/decor";
import FloatObject from "@/components/float-object";
import { getLiveProjects, getPublishedWebsiteContent } from "@/lib/tak-api";
import {
  problems,
  services,
  processSteps,
  whyTrustValues,
  sectors,
} from "@/lib/content";

export default async function Page() {
  const homeHero = await getPublishedWebsiteContent<{
    heading: string; body: string; primary_cta_label: string; primary_cta_href: string; secondary_cta_label: string; secondary_cta_href: string;
  }>("home-hero");
  const liveProjects = await getLiveProjects();
  const projects = liveProjects ?? [];

  return (
    <>
      <NavBar />
      {/* overflow-x-clip, not overflow-hidden: the atmospheric glows are
          deliberately wider than the 1344 column and bleed past the viewport
          edge, which is what makes them read as light rather than as shapes.
          `clip` contains that horizontally without creating a scroll container,
          so position: sticky anywhere inside still works. */}
      <main className="flex-1 overflow-x-clip pt-[72px]">
        {/* Hero.
            The reference centres the headline with two 384x384 `Decorative
            Code Block` panels flanking it. KingFizzy ordered this one changed
            (2026-08-09): text left, the cycling service arc right, after the
            flohoeller clip. So the split is deliberate, not a trace error.
            Both code panels come out: the right one is what the arc replaces,
            and the left one sat exactly where the body copy and buttons now
            are, ghosting its source through them at any opacity that made it
            visible at all. They are still exported from decor.tsx and still
            used verbatim on the Services hero, so nothing from the reference
            is lost, and reinstating them here is a one-line change. */}
        <Section className="min-h-[779px]" pt={43} pb={62}>
          <Glow className="right-24 top-10" size={560} strength={0.14} />
          <Glow className="left-40 bottom-8" size={420} strength={0.08} />
          <PlusField className="bottom-4 left-0" rows={1} cols={5} />

          <div className="relative flex items-center justify-between gap-12 py-20">
            <div className="flex flex-col items-start gap-6 text-left">
              <h1 className="font-display m-0 max-w-[560px] text-4xl font-bold leading-tight md:text-[67px] md:leading-[1.1]">
                {homeHero?.heading || "Website content is not published yet."}
              </h1>
              <p className="m-0 max-w-[520px] text-[15px] leading-relaxed text-text-secondary">
                {homeHero?.body || "Publish the Home hero in TAK Admin to make this section available."}
              </p>
              <div className="flex flex-wrap gap-4">
                {homeHero?.primary_cta_href && homeHero.primary_cta_label && <Button variant="primary" size="md" href={homeHero.primary_cta_href}>{homeHero.primary_cta_label}</Button>}
                {homeHero?.secondary_cta_href && homeHero.secondary_cta_label && <Button variant="secondary" size="md" href={homeHero.secondary_cta_href}>{homeHero.secondary_cta_label}</Button>}
              </div>
            </div>

            <ServiceOrbit />
          </div>

          {/* The orb, repeated under the hero text block (KingFizzy,
              2026-08-10). Same object and same two-layer motion as the pair
              behind the Services grid: a compositor-only CSS bob on the outer
              element, pointer parallax on the inner one.

              Three numbers differ from the Services instance on purpose. It is
              smaller (150 against 190) because here it sits INSIDE the 1344
              column rather than bleeding outside it, and at 190 it competed
              with the CTA row directly above it instead of sitting under it.
              Its duration is 15 against 12 and its delay 1.2 against 2.5, so
              the two never fall into a shared rhythm on the one page.

              `lg:block` rather than the pair's `xl:block`: those two hang off
              the column edges and need the wider viewport to have anywhere to
              hang. This one is inside the column, so it only needs the hero to
              still be a two-column row.

              `left-12` aligns it with the text column, not the section edge:
              `left-0` resolves to the 1344 container's own edge at x48, while
              the copy above starts at x96, and 48px out of alignment under a
              left-aligned text block reads as a mistake rather than as decor.
              `bottom-14` keeps it clear of the PlusField at `bottom-4`. Both
              numbers were measured off the rendered page, not eyeballed.

              DOUBLED TO 300 on 2026-08-10, and it FLOATS. The hero stays 779.
              A first attempt grew the hero to 960 to fit the bigger object and
              pushed every section below it down 181px; KingFizzy's correction
              was that it should hang in place and move nothing, which is what
              `-bottom-[91px]` does. The object is absolute and
              `pointer-events-none`, so overhanging the section boundary costs
              nothing structurally.

              THE POSITION IS A 45px BUDGET, and that is the whole reason these
              are odd numbers. Between the CTA's bottom edge (y610) and the ink
              of the Problem heading below (y955) there are 345px. A 300px
              object leaves 45px of total slack. `tak-drift` only ever moves it
              UP, 22px at mid-cycle, and the pointer parallax adds `depth` on
              top of that, so the slack has to be spent mostly above: about 32
              there and 13 below. `depth` is 10 rather than the pair's 18 to 34
              precisely to keep that sum under budget, and it is the right call
              on its own terms anyway, since the same lean reads as wobble
              rather than parallax at twice the size.

              Verified at rest AND with the bob forced to its peak, because a
              gap that measures fine in a screenshot puts a half-opacity sphere
              behind the buttons a few seconds later. That is exactly why the
              hero's left code panel was deleted in the first place. */}
          <FloatObject
            src="/decor/tak-orb.png"
            className="-bottom-[91px] left-12 hidden lg:block"
            size={300}
            opacity={0.5}
            delay={1.2}
            duration={15}
            depth={10}
          />
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
        <Section id="services" pt={60} pb={200}>
          <PlusField className="left-0 top-2" />
          {/* There WAS a second, larger triangle here at `right-10 bottom-40`,
              below the UI/UX Design card. Removed 2026-08-09: it stacked with
              the one at the top of the Process section directly beneath it, so
              three triangles landed in a single viewport and the fold read as
              cluttered. This one goes rather than Process's because the bento
              grid above it is already the densest block on the page. */}
          <TriangleMark className="bottom-10 left-1/2 -translate-x-1/2" size={90} opacity={0.3} />
          <Glow className="-right-24 top-24" size={480} strength={0.16} />
          {/* The two generated objects. Both sit behind the bento grid and
              outside the 1344 column so they read as depth rather than as
              content, and the two durations are coprime-ish so the pair never
              settles into a visible shared rhythm. */}
          <FloatObject
            src="/decor/tak-web.png"
            className="-right-28 top-2 hidden xl:block"
            size={360}
            opacity={0.4}
            duration={17}
            depth={18}
          />
          <FloatObject
            src="/decor/tak-orb.png"
            className="-left-24 bottom-24 hidden xl:block"
            size={190}
            opacity={0.55}
            delay={2.5}
            duration={12}
            depth={40}
          />
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
                  plain={s.plain}
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
          {/* Decorations mirrored to a rule, not moved one at a time:
              TRIANGLES RIGHT, PLUS FIELDS LEFT. KingFizzy asked for the big
              triangle to cross over for symmetry (2026-08-09), and a single
              move would not have delivered it. Moving only that one would have
              put it straight on top of the plus field that was at right-0, the
              exact collision he flagged on the Connect block, and would have
              left the small triangle behind on the left so the section read as
              a half-finished swap rather than a mirror.

              The big triangle's rotation flips with it, -90 rather than 90, so
              its apex still points INTO the copy instead of off the page.
              Deliberate departure from the reference, which has both on the
              left; it is his call and it is recorded here so nobody
              "corrects" it back during a later trace pass. */}
          <TriangleMark className="top-0 right-6" size={130} rotate={-90} opacity={0.4} />
          <TriangleMark className="right-56 bottom-8" size={110} opacity={0.35} />
          <PlusField className="top-2 left-0" rows={3} cols={5} />
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
            <div className="grid auto-rows-fr grid-cols-1 gap-[33px] md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
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
            {/* mb matches Why Trust Us (95) on KingFizzy's call, 2026-08-10:
                at 32 the tiles sat visibly tighter under their heading than
                the value cards do under theirs, two sections apart. */}
            <SectionHeading
              eyebrow="We Build For"
              highlight="East Africa"
              highlightReplacement={<RotatingLocation />}
              maxWidth={920}
              mb={95}
            >
              Built for the sectors moving East Africa
            </SectionHeading>
            <div className="grid grid-cols-2 gap-[26px] sm:grid-cols-4">
              {sectors.map((sector) => {
                const Icon = ICONS[sector.icon];
                return (
                  <div
                    key={sector.label}
                    className="flex min-h-[158px] flex-col items-center justify-center gap-3 rounded-xl border border-border-subtle bg-surface px-4 text-center tak-hover-glow"
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

        {/* The people behind the work. Ported from Joy's file per the build
            plan's approved decisions table; it sits directly before the final
            CTA, which is where she placed it. */}
        <Section id="team" pt={0} pb={180}>
          <Reveal>
            <TeamPanel />
          </Reveal>
        </Section>

        {/* Renders only when the backend returns real quotes. See the file. */}
        <Testimonials />

        <ConnectCta />
      </main>
      <Footer />
    </>
  );
}
