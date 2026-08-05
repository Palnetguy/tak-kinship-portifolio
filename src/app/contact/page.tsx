import type { Metadata } from "next";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Section from "@/components/section";
import ContactForm from "@/components/contact-form";
import FaqAccordion from "@/components/faq-accordion";
import { contactHero, contactInfo, faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact | TAK Kinship",
};

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <main className="flex-1 pt-16">
        <Section>
          <div className="flex flex-col items-start gap-6 py-12 md:py-20">
            <h1 className="font-display m-0 max-w-3xl text-4xl font-bold leading-tight md:text-6xl md:leading-[1.05]">
              {contactHero.heading}
            </h1>
            <p className="m-0 max-w-xl text-lg text-text-secondary">
              {contactHero.body}
            </p>
          </div>
        </Section>

        <Section>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display m-0 mb-3 text-2xl font-bold">
                Let&rsquo;s connect
              </h2>
              <p className="mb-8 max-w-md text-text-secondary">
                We&rsquo;d love to hear from you. Whether you have a question,
                want to discuss a project, or just want to say hello, feel
                free to reach out.
              </p>
              <ContactForm />
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-xl border border-border-subtle bg-bg-input p-6">
                <p className="font-display m-0 mb-4 text-lg font-bold">
                  To Get Us
                </p>
                <dl className="m-0 flex flex-col gap-4">
                  {contactInfo.map((item) => (
                    <div key={item.label}>
                      <dt className="font-mono-eyebrow text-xs uppercase tracking-wide text-text-muted">
                        {item.label}
                      </dt>
                      <dd className="m-0 mt-1 text-text-primary">
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-text-accent no-underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* PLACEHOLDER: no map API key wired up yet. Neutral panel
                  stands in for an embedded map until one is configured. */}
              <div className="flex h-[220px] items-center justify-center rounded-xl border border-border-subtle bg-bg-canvas">
                <span className="text-sm text-text-muted">
                  Map: Kakoba Division, Mbarara, Uganda
                </span>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <h2 className="font-display m-0 mb-10 max-w-2xl text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <FaqAccordion faqs={faqs} />
        </Section>
      </main>
      <Footer />
    </>
  );
}
