import type { Metadata } from "next";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Section from "@/components/section";
import PageHero from "@/components/page-hero";
import { termsSections } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms | TAK Kinship",
};

export default function TermsPage() {
  return (
    <>
      <NavBar />
      <main className="flex-1 overflow-x-clip pt-[72px]">
        <PageHero
          height={360}
          heading="Terms of service."
          body=""
        />

        <Section pt={40} pb={140}>
          {termsSections.map((section, i) => (
            <div key={i}>
              <h2 className="font-display text-xl font-semibold text-text-primary">
                {section.heading}
              </h2>
              <p className="mt-2 mb-10 leading-relaxed text-text-secondary">
                {section.body}
              </p>
            </div>
          ))}
        </Section>
      </main>
      <Footer />
    </>
  );
}
