import type { Metadata } from "next";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Section from "@/components/section";
import PageHero from "@/components/page-hero";
import ConnectCta from "@/components/connect-cta";
import PortfolioGrid from "@/components/portfolio-grid";
import Reveal from "@/components/reveal";
import { DotField, Glow } from "@/components/decor";
import { portfolioIntro } from "@/lib/content";
import { getLiveProjects } from "@/lib/tak-api";
import BackendNotice from "@/components/backend-notice";

export const metadata: Metadata = {
  title: "Portfolio | TAK Kinship",
};

/**
 * Portfolio, traced from Portfolio.png (1440 x 3047).
 *
 * The hero is CENTRED here and greens "innovation.". It was built
 * left-aligned with no green run: the same error as the Services hero, but
 * with the opposite correct answer, which is why the two are one component
 * taking an `align` rather than one shared alignment.
 */
export default async function PortfolioPage() {
  const liveProjects = await getLiveProjects();
  const projects = liveProjects ?? [];

  return (
    <>
      <NavBar />
      <main className="flex-1 overflow-x-clip pt-[72px]">
        <PageHero
          height={517}
          heading="Every project is a testament to innovation."
          highlight="innovation."
          body="A journey into excellence, and a canvas painted with the strokes of transformative technology."
        />

        <Section pt={60} pb={197}>
          <DotField className="right-4 bottom-24" width={150} height={130} />
          <Glow className="-right-20 top-10" size={520} strength={0.12} />
          <Reveal>
            <p className="m-0 mb-9 max-w-[680px] text-[15px] leading-relaxed text-text-secondary">
              {portfolioIntro}
            </p>
          </Reveal>
          {projects.length ? (
            <PortfolioGrid projects={projects} />
          ) : (
            <BackendNotice
              title="Portfolio unavailable"
              body="There are no published portfolio projects available right now. Please check back shortly."
            />
          )}
        </Section>

        <ConnectCta />
      </main>
      <Footer />
    </>
  );
}
