import type { Metadata } from "next";
import Image from "next/image";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Section from "@/components/section";
import PageHero from "@/components/page-hero";
import ContactForm from "@/components/contact-form";
import OfficeMap from "@/components/office-map";
import FaqAccordion from "@/components/faq-accordion";
import SectionHeading from "@/components/section-heading";
import { MailIcon } from "@/components/icons";
import { Glow } from "@/components/decor";
import { getLiveCompanyInfo, getLiveFaqs } from "@/lib/tak-api";
import { contactHero } from "@/lib/content";
import BackendNotice from "@/components/backend-notice";

export const metadata: Metadata = {
  title: "Contact | TAK Kinship",
};

/**
 * Contact, traced from Contact.png (1440 x 2902).
 *
 * Three things the build did not have:
 *   1. the hero is centred, not left-aligned
 *   2. "Let's connect" and the form sit INSIDE one 1344-wide panel whose
 *      right half is the circuit-board artwork (measured x 737-1379,
 *      y 449-1044, so 642 x 595). That artwork is a real image asset and was
 *      missing entirely.
 *   3. the map and the "To Get us" card are a row BELOW that panel, not a
 *      sidebar beside the form. The map is a live Google Maps embed (see
 *      components/office-map.tsx), not the raster cut from the comp.
 *
 * Both images were cut from the 4x reference at those measured bounds.
 */

function RowIcon({ kind }: { kind: "mail" | "pin" | "phone" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "h-5 w-5",
  };
  if (kind === "mail") return <MailIcon className="h-5 w-5" />;
  if (kind === "pin")
    return (
      <svg {...common}>
        <path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </svg>
  );
}

export default async function ContactPage() {
  const liveInfo = await getLiveCompanyInfo();
  const liveFaqs = (await getLiveFaqs()) ?? [];
  const rows = [
    {
      icon: "mail" as const,
      label: "Email",
      value: liveInfo?.email || "",
      href: liveInfo?.email ? `mailto:${liveInfo.email}` : "#contact-form",
    },
    {
      icon: "pin" as const,
      label: "Office",
      value: liveInfo?.location || "",
    },
    {
      icon: "phone" as const,
      label: "Phone",
      value: liveInfo?.phone || "",
      href: liveInfo?.phone ? `tel:${liveInfo.phone.replace(/\s+/g, "")}` : "#contact-form",
    },
  ];

  return (
    <>
      <NavBar />
      <main className="flex-1 overflow-x-clip pt-[72px]">
        <PageHero height={358} heading={contactHero.heading} body={contactHero.body} />

        {/* The form panel. One card, form left, artwork right. */}
        <Section pt={0} pb={40}>
          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10">
                <h2 className="font-display m-0 text-2xl font-bold">
                  Let&rsquo;s connect
                </h2>
                <p className="mt-3 mb-8 max-w-[340px] text-sm leading-relaxed text-text-secondary">
                  We&rsquo;d love to hear from you! Whether you have a
                  question, want to discuss a project, or just want to say
                  hello, feel free to reach out.
                </p>
                <ContactForm />
              </div>

              {/* The branded circuit plate, animated.
                  Generated from the still with Higgsfield (minimax-2.3-fast,
                  6s, 4 credits) under a locked-off-camera prompt, then made
                  into a true loop by concatenating the clip with its own
                  reverse: the first and last frames differ by 1.06/255, which
                  is compression noise, so the seam is invisible. 147kb.

                  The jpg is the `poster`, so it is what shows before the video
                  decodes, if the file 404s, and whenever the browser refuses
                  to autoplay. `muted` + `playsInline` are what make autoplay
                  legal on iOS at all. */}
              {/* Nudged 12px right per KingFizzy (2026-08-09). The card's two
                  halves are an even split, but the circuit artwork's own
                  content sits left of centre inside its frame, so the panel
                  read as sitting slightly too far left against the form. This
                  offsets the artwork, not the grid, so the card's outer edges
                  stay flush with every other section. */}
              <div className="relative min-h-[300px] translate-x-[12px]">
                <video
                  className="h-full w-full rounded-xl object-cover motion-reduce:hidden"
                  poster="/contact/circuit-panel.jpg"
                  width={1284}
                  height={1190}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="TAK Kinship Technologies Ltd. Innovating the future, one solution at a time."
                >
                  <source src="/contact/circuit-panel.mp4" type="video/mp4" />
                </video>
                {/* Reduced motion gets the original still, not a frozen video
                    element, so there is no decode cost at all. */}
                <img
                  src="/contact/circuit-panel.jpg"
                  alt="TAK Kinship Technologies Ltd. Innovating the future, one solution at a time."
                  width={1284}
                  height={1190}
                  className="hidden h-full w-full rounded-xl object-cover motion-reduce:block"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Map and contact details, a row of two. */}
        <Section pt={0} pb={40}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,884fr)_minmax(0,426fr)]">
            <div className="overflow-hidden rounded-2xl border border-border-subtle">
              <OfficeMap />
            </div>

            <div className="rounded-2xl border border-border-subtle bg-elevated p-8">
              <h2 className="font-display m-0 mb-7 text-xl font-bold">
                To Get us
              </h2>
              {liveInfo ? <ul className="m-0 flex list-none flex-col gap-6 p-0">
                {rows.map((row) => (
                  <li key={row.label} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--text-accent)_35%,transparent)] text-text-accent">
                      <RowIcon kind={row.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="font-display block text-[15px] font-bold text-text-accent">
                        {row.label}
                      </span>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="font-mono-eyebrow block text-[11px] break-words text-text-secondary no-underline hover:text-text-primary"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span className="font-mono-eyebrow block text-[11px] break-words text-text-secondary">
                          {row.value}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul> : <BackendNotice title="Contact information unavailable" body="Contact details have not been published yet. Please use the enquiry form and the TAK team will respond." />}
            </div>
          </div>
        </Section>

        <Section pt={60} pb={200}>
          <Glow className="left-1/4 top-10" size={520} strength={0.1} />
          <SectionHeading
            maxWidth={980}
            mb={56}
            sub="Eager to collaborate? Whether you have a specific project in mind or simply want to learn more about what we offer, reach out to us. Let's explore how we can transform your concepts into remarkable outcomes."
          >
            Frequently Asked Questions
          </SectionHeading>
          {/* Illustration left, questions right, which is how the live
              takkinship.com places it and what KingFizzy asked for
              (2026-08-09). The asset is TAK's own, pulled from the Cloudinary
              path their site serves it from, and its background is genuinely
              transparent (alpha 0 at the corners, checked) so it sits on the
              canvas in both themes with no plate behind it.

              No container around either half. The two columns already group
              themselves by proximity, and wrapping the illustration in a card
              purely to balance the accordion would be a surface added for
              layout rather than for emphasis. */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
            <div className="order-2 hidden lg:order-1 lg:block">
              <Image
                src="/illus/support-faq.png"
                alt=""
                width={760}
                height={562}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 0px, 40vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              {liveFaqs.length ? (
                <FaqAccordion faqs={liveFaqs} />
              ) : (
                <BackendNotice title="FAQs unavailable" body="Frequently asked questions have not been published yet. Please use the enquiry form for help." />
              )}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
