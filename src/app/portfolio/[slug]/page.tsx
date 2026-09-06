import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Section from "@/components/section";
import ConnectCta from "@/components/connect-cta";
import Button from "@/components/button";
import ProjectDetailContent from "@/components/project-detail-modal";
import { getLiveProjectBySlug } from "@/lib/tak-api";

export const dynamicParams = true;

export function generateStaticParams() { return []; }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getLiveProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found | TAK Kinship" };
  }
  const title = `${project.name} | TAK Kinship`;
  return {
    title,
    description: project.blurb,
    openGraph: {
      title,
      description: project.blurb,
      images: [project.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.blurb,
      images: [project.image],
    },
  };
}

export default async function PortfolioProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getLiveProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  return (
    <>
      <NavBar />
      <main className="flex-1 overflow-x-clip pt-[72px]">
        <Section pt={60} pb={197}>
          <div className="mb-10">
            <Button variant="secondary" size="sm" href="/portfolio">
              Back to portfolio
            </Button>
          </div>
          <ProjectDetailContent project={project} />
        </Section>
        <ConnectCta />
      </main>
      <Footer />
    </>
  );
}
