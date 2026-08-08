import type { Metadata } from "next";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Button from "@/components/button";
import Section from "@/components/section";
import PageHero from "@/components/page-hero";
import ConnectCta from "@/components/connect-cta";
import SectionHeading from "@/components/section-heading";
import ServiceCard from "@/components/service-card";
import { PlusField, TriangleMark, Glow } from "@/components/decor";
import { serviceDetails, servicesHero, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services | TAK Kinship",
};

/**
 * Services, traced from Services.png (1440 x 2977.5).
 *
 * The reference's "What We Offer" block is the SAME bento grid as Home's,
 * centred heading and all, not the smaller left-aligned card list this page
 * was built with. The only difference from Home is that each card here is
 * interactive and carries a "Learn more" affordance into the detail overlay.
 */
export default function ServicesPage() {
  // The bento copy lives on `services`; the overlay copy on `serviceDetails`.
  // They are keyed by the same title, so pair them rather than duplicating.
  const cards = services.map((s) => ({
    ...s,
    detail: serviceDetails[s.title],
  }));

  return (
    <>
      <NavBar />
      <main className="flex-1 overflow-x-clip pt-[72px]">
        <PageHero
          align="left"
          height={726}
          codePanel
          heading={servicesHero.heading}
          highlight="Kinship"
          body={servicesHero.body}
        >
          <Button variant="primary" size="md" href="#what-we-offer">
            Explore Services
          </Button>
          <Button variant="secondary" size="md" href="/portfolio">
            View Portfolio
          </Button>
        </PageHero>

        <Section pt={60} pb={200} className="scroll-mt-[72px]" id="what-we-offer">
          <PlusField className="left-0 top-2" />
          <TriangleMark className="right-6 top-6" size={150} rotate={-90} opacity={0.45} />
          <TriangleMark className="bottom-10 left-1/2 -translate-x-1/2" size={90} opacity={0.3} />
          <Glow className="-right-24 top-24" size={480} strength={0.16} />
          <SectionHeading
            eyebrow="What We Offer"
            highlight="Ideas"
            maxWidth={900}
            mb={86}
          >
            Transforming Ideas into Extraordinary Solutions.
          </SectionHeading>
          <div className="grid grid-cols-1 gap-[34px] md:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <ServiceCard
                key={c.title}
                icon={c.icon}
                title={c.title}
                body={c.body}
                detail={c.detail}
              />
            ))}
          </div>
        </Section>

        <ConnectCta />
      </main>
      <Footer />
    </>
  );
}
