import Image from "next/image";
import Section from "@/components/section";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import { DotField } from "@/components/decor";
import { getLiveTestimonials } from "@/lib/tak-api";

/**
 * Client testimonials, live-only by design.
 *
 * The reference design has a testimonials block and the rebuild has never
 * shipped one, because the only two ways to fill it were to invent quotes or
 * to leave a visibly empty section on a real company's homepage. This is the
 * third way: it renders NOTHING until TAK's own backend returns at least one
 * real testimonial with a quote and an attributable name, and appears on its
 * own the day Martin adds one. Nothing to remember, nothing to deploy.
 *
 * Server component. It never reaches the client, so the credential behind
 * `getLiveTestimonials` never does either.
 */
export default async function Testimonials() {
  const items = await getLiveTestimonials();
  if (!items) return null;

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
