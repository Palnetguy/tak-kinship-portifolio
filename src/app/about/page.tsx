import type { Metadata } from "next";
import Image from "next/image";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Section from "@/components/section";
import PageHero from "@/components/page-hero";
import SectionHeading from "@/components/section-heading";
import ConnectCta from "@/components/connect-cta";
import Reveal from "@/components/reveal";
import Card from "@/components/card";
import MediaPlaceholder from "@/components/media-placeholder";
import { PlusField, TriangleMark, Glow } from "@/components/decor";
import FloatObject from "@/components/float-object";
import {
  aboutHero,
  ceo,
  differentiators,
  experience,
} from "@/lib/about";
import { getLiveTeam } from "@/lib/tak-api";

export const metadata: Metadata = {
  title: "About | TAK Kinship",
  description:
    "Learn about TAK Kinship's journey, vision, and commitment to building a brighter, connected future through innovative technology solutions.",
};

/**
 * About.
 *
 * Built from the live takkinship.com/about page, which is the only place the
 * real team exists. The four-person array in that site's JS bundle is demo
 * data (one shared `testProfilePic` image, a famous footballer among the
 * names) and is deliberately not used. See wiki synergy-plan.md section 1B.
 */
export default async function Page() {
  const roster = (await getLiveTeam()) ?? [];
  const liveCeo =
    roster.find((member) => member.name.toLowerCase().includes("martin")) ??
    null;
  const ceoImage = liveCeo?.image || "";

  return (
    <>
      <NavBar />
      <main className="flex-1 overflow-x-clip pt-[72px]">
        <PageHero
          heading={aboutHero.heading}
          body={aboutHero.body}
          align="center"
          height={430}
        />

        {/* Experience + why we are unique, as a two-column read. */}
        <Section pt={0} pb={140}>
          <Glow className="-left-24 top-0" size={460} strength={0.12} />
          <Reveal>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="font-display m-0 mb-5 max-w-[460px] text-3xl font-bold leading-[1.12] tracking-tight md:text-[38px]">
                  {experience.heading}
                </h2>
                <p className="m-0 text-[15px] leading-relaxed text-text-secondary">
                  {experience.body}
                </p>
              </div>
              <div>
                <h2 className="font-display m-0 mb-5 text-3xl font-bold leading-[1.12] tracking-tight md:text-[38px]">
                  {experience.uniqueHeading}
                </h2>
                <p className="m-0 text-[15px] leading-relaxed text-text-secondary">
                  {experience.uniqueBody}
                </p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* The four differentiators. */}
        <Section pt={0} pb={160}>
          <PlusField className="right-0 top-0" rows={2} cols={5} />
          <FloatObject
            src="/decor/tak-web.png"
            className="-left-32 top-10 hidden xl:block"
            size={300}
            opacity={0.3}
            duration={19}
            depth={16}
          />
          <Reveal>
            <SectionHeading eyebrow="Why Us" maxWidth={760} mb={48}>
              What you get when you build with us.
            </SectionHeading>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {differentiators.map((d) => (
                <Card key={d.title} icon={d.icon} title={d.title} body={d.body} />
              ))}
            </div>
          </Reveal>
        </Section>

        {/* A word from our CEO. Real, named and attributable, which is the
            single strongest thing the live site has that the rebuild did not. */}
        <Section pt={0} pb={160}>
          <Glow className="right-0 top-10" size={520} strength={0.14} />
          <Reveal>
            <div className="flex flex-col items-center gap-10 rounded-2xl border border-border-subtle bg-elevated p-8 md:p-12 lg:flex-row lg:items-start lg:gap-14">
              <div className="w-[220px] shrink-0">
                {ceoImage ? (
                  <Image
                    src={ceoImage}
                    alt={`${ceo.name}, ${ceo.role} of TAK Kinship`}
                    width={520}
                    height={520}
                    className="h-auto w-full rounded-xl object-cover"
                    sizes="220px"
                  />
                ) : (
                  <div className="aspect-square w-full overflow-hidden rounded-xl border border-border-subtle">
                    <MediaPlaceholder />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start">
                <p className="font-mono-eyebrow m-0 mb-4 text-xs font-medium tracking-[0.18em] text-text-accent uppercase">
                  {ceo.eyebrow}
                </p>
                <h2 className="font-display m-0 text-2xl font-bold tracking-tight md:text-[30px]">
                  {ceo.name}
                </h2>
                <p className="m-0 mb-6 text-[13px] text-text-muted">{ceo.role}</p>
                {ceo.quote.map((p) => (
                  <p
                    key={p.slice(0, 24)}
                    className="m-0 mb-4 max-w-[640px] text-[15px] leading-relaxed text-text-secondary last:mb-0"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* The real team.
            FLAG, awaiting TAK content (2026-08-10 walkthrough), do not fabricate:
            1. ROSTER EXPANSION. This shows the six people from the old site's
               bundle. Reviewers said more members are not represented and it
               must be updated before go-live. Needs real names, roles and bios
               from TAK; the array lives in src/lib/about.ts and the live API
               roster overrides it the moment Martin fills team-members/.
            2. EXPERIENCE-FIRST REFRAME. The team asked that the copy move from
               "what each member can do" toward each member's experience working
               at TAK. Several of these bios already read that way and they are
               real people's own words, so they are NOT rewritten here; the
               reframe is applied when TAK supplies experience-first bios, via
               the same about.ts / API path. The heading already frames it: "In
               their own words." */}
        <Section id="team" pt={0} pb={180}>
          <TriangleMark className="right-8 top-0" size={130} rotate={-90} opacity={0.35} />
          <FloatObject
            src="/decor/tak-orb.png"
            className="-right-20 bottom-40 hidden xl:block"
            size={170}
            opacity={0.5}
            delay={1.5}
            duration={13}
            depth={38}
          />
          <Reveal>
            <SectionHeading eyebrow="Our Team" maxWidth={820} mb={20}>
              The people behind the work.
            </SectionHeading>
            <p className="mx-auto mb-14 max-w-[620px] text-center text-[15px] leading-relaxed text-text-secondary">
              {/* Counted, not typed. Once the roster can come from the API a
                  hardcoded "Six" is a sentence that goes wrong the first time
                  Martin hires someone. */}
              {roster.length} people in Uganda building software for the region.
              In their own words.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {roster.map((m) => (
                <article
                  key={m.name}
                  className="flex flex-col rounded-xl border border-border-subtle bg-surface p-6 tak-hover-glow"
                >
                  <div className="mb-5 flex items-center gap-4">
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name}
                        width={520}
                        height={520}
                        className="h-14 w-14 shrink-0 rounded-full object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-elevated text-[11px] text-text-muted">
                        N/A
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-display m-0 text-[17px] font-bold leading-tight">
                        {m.name}
                      </h3>
                      <p className="font-mono-eyebrow m-0 mt-1 text-[11px] tracking-[0.12em] text-text-accent uppercase">
                        {m.role}
                      </p>
                    </div>
                  </div>
                  <p className="m-0 text-[14px] leading-relaxed text-text-secondary">
                    {m.bio}
                  </p>
                </article>
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
