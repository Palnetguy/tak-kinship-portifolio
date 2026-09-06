import Section from "@/components/section";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import { DotField } from "@/components/decor";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import { getLiveTestimonials } from "@/lib/tak-api";
import BackendNotice from "@/components/backend-notice";

/**
 * Client testimonials.
 *
 * The live backend is the source of truth: when Martin wires the key,
 * `getLiveTestimonials` returns real quotes and they take priority. Until then
 * the section shows DEMO PLACEHOLDER quotes (KingFizzy, 2026-08-11) so the
 * layout is visible for the Wednesday walkthrough. The placeholders are
 * qualitative with fictitious first names and no real client names, so nothing
 * a visitor could check is invented; see `placeholderTestimonials` in
 * content.ts. Swap them for real quotes before this is production content.
 *
 * Previously this rendered NOTHING without a live backend. That is the correct
 * production behaviour and is one line away (drop the fallback), which is why
 * the placeholders live in their own clearly-labelled export rather than being
 * inlined here.
 *
 * Server component. It never reaches the client, so the credential behind
 * `getLiveTestimonials` never does either.
 */
export default async function Testimonials() {
  const items = await getLiveTestimonials();
  if (!items?.length) {
    return (
      <Section pt={60} pb={180}>
        <BackendNotice
          title="Testimonials unavailable"
          body="Client testimonials have not been published yet. Please check back shortly."
        />
      </Section>
    );
  }

  return (
    <Section pt={60} pb={180}>
      <DotField className="top-4 right-0" width={160} height={140} />
      <Reveal>
        <SectionHeading eyebrow="In Their Words" maxWidth={820} mb={54}>
          What the people we build for say.
        </SectionHeading>
        <TestimonialsCarousel items={items} />
      </Reveal>
    </Section>
  );
}
