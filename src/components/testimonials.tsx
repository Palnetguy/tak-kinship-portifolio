import Image from "next/image";
import Section from "@/components/section";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import { DotField } from "@/components/decor";
import { getLiveTestimonials } from "@/lib/tak-api";
import { placeholderTestimonials } from "@/lib/content";

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
  const items = (await getLiveTestimonials()) ?? placeholderTestimonials;
  if (!items.length) return null;

  return (
    <Section pt={60} pb={180}>
      <DotField className="top-4 right-0" width={160} height={140} />
      <Reveal>
        <SectionHeading eyebrow="In Their Words" maxWidth={820} mb={54}>
          What the people we build for say.
        </SectionHeading>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure
              key={`${t.author}-${t.quote.slice(0, 24)}`}
              className="tak-hover-glow m-0 flex flex-col rounded-xl border border-border-subtle bg-surface p-6"
            >
              <blockquote className="m-0 flex-1 text-[15px] leading-relaxed text-text-secondary">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                {t.image ? (
                  <Image
                    src={t.image}
                    alt=""
                    width={96}
                    height={96}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                    sizes="44px"
                  />
                ) : null}
                <span className="min-w-0">
                  <span className="font-display block text-[15px] font-bold">
                    {t.author}
                  </span>
                  {t.role ? (
                    <span className="font-mono-eyebrow block text-[11px] tracking-[0.12em] text-text-accent uppercase">
                      {t.role}
                    </span>
                  ) : null}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
