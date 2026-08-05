import type { Metadata } from "next";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Button from "@/components/button";
import Section from "@/components/section";
import ConnectCta from "@/components/connect-cta";
import ServiceCard from "@/components/service-card";
import { serviceDetails, servicesHero } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services | TAK Kinship",
};

export default function ServicesPage() {
  return (
    <>
      <NavBar />
      <main className="flex-1 pt-16">
        <Section>
          <div className="flex flex-col items-start gap-6 py-12 md:py-24">
            <h1 className="font-display m-0 max-w-3xl text-4xl font-bold leading-tight md:text-6xl md:leading-[1.05]">
              {servicesHero.heading}
            </h1>
            <p className="m-0 max-w-xl text-lg text-text-secondary">
              {servicesHero.body}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="md" href="/contact">
                Start a Project
              </Button>
              <Button variant="secondary" size="md" href="/portfolio">
                View Portfolio
              </Button>
            </div>
          </div>
        </Section>

        <Section>
          <p className="font-mono-eyebrow m-0 mb-3 text-sm font-medium uppercase tracking-wide text-action-primary">
            What We Offer
          </p>
          <h2 className="font-display m-0 mb-10 max-w-2xl text-3xl font-bold md:text-4xl">
            Transforming Ideas into Extraordinary Solutions.
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.values(serviceDetails).map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </Section>

        <ConnectCta />
      </main>
      <Footer />
    </>
  );
}
