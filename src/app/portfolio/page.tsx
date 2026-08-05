import type { Metadata } from "next";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Section from "@/components/section";
import ConnectCta from "@/components/connect-cta";
import PortfolioGrid from "@/components/portfolio-grid";
import { portfolioHero } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio | TAK Kinship",
};

export default function PortfolioPage() {
  return (
    <>
      <NavBar />
      <main className="flex-1 pt-16">
        <Section>
          <div className="flex flex-col items-start gap-6 py-12 md:py-20">
            <h1 className="font-display m-0 max-w-3xl text-4xl font-bold leading-tight md:text-6xl md:leading-[1.05]">
              {portfolioHero.heading}
            </h1>
            <p className="m-0 max-w-xl text-lg text-text-secondary">
              {portfolioHero.body}
            </p>
          </div>
        </Section>

        <Section>
          <PortfolioGrid />
        </Section>

        <ConnectCta />
      </main>
      <Footer />
    </>
  );
}
