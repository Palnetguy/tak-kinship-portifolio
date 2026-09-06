import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Section from "@/components/section";
import PageHero from "@/components/page-hero";
import Button from "@/components/button";
import { getLiveProjectBySlug, getLiveProjectPolicy } from "@/lib/tak-api";
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
      ? `${project.name} Privacy Policy | TAK Kinship`
      : "Project privacy policy | TAK Kinship",
  };
}

export default async function PortfolioPrivacyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getLiveProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const policy = project.projectId
    ? await getLiveProjectPolicy(project.projectId)
    : null;

  return (
    <>
      <NavBar />
      <main className="flex-1 overflow-x-clip pt-[72px]">
        <PageHero
          height={320}
          heading={`${project.name} privacy policy.`}
          body=""
        />

        <Section pt={40} pb={140}>
          <div className="mb-10">
            <Button variant="secondary" size="sm" href={`/portfolio/${project.slug}`}>
              Back to project
            </Button>
          </div>

          {policy ? (
            <p className="m-0 max-w-[90ch] text-sm leading-relaxed text-text-secondary">
              {policy}
            </p>
          ) : <BackendNotice title="Privacy policy unavailable" body="A privacy policy for this project has not been published yet." />}
        </Section>
      </main>
      <Footer />
    </>
  );
}
