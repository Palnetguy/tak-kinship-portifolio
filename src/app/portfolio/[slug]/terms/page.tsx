import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Section from "@/components/section";
import PageHero from "@/components/page-hero";
import Button from "@/components/button";
import { getLiveProjectBySlug, getLiveProjectTerms } from "@/lib/tak-api";
import BackendNotice from "@/components/backend-notice";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getLiveProjectBySlug(slug);

  return {
    title: project
      ? `${project.name} Terms | TAK Kinship`
      : "Project terms | TAK Kinship",
  };
}

export default async function PortfolioTermsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getLiveProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const terms = project.projectId
    ? await getLiveProjectTerms(project.projectId)
    : null;

  return (
    <>
      <NavBar />
      <main className="flex-1 overflow-x-clip pt-[72px]">
        <PageHero
          height={320}
          heading={`${project.name} terms.`}
          body=""
        />

        <Section pt={40} pb={140}>
          <div className="mb-10">
            <Button variant="secondary" size="sm" href={`/portfolio/${project.slug}`}>
              Back to project
            </Button>
          </div>

          {terms ? (
            <p className="m-0 max-w-[90ch] text-sm leading-relaxed text-text-secondary">
              {terms}
            </p>
          ) : <BackendNotice title="Terms unavailable" body="Terms for this project have not been published yet." />}
        </Section>
      </main>
      <Footer />
    </>
  );
}
