import Button from "@/components/button";
import Section from "@/components/section";
import { DotField, TriangleMark } from "@/components/decor";
import { MailIcon } from "@/components/icons";

/**
 * Connect With Us, traced from Home.png y 6713-7418.
 *
 * The reference greens "together?" in the headline, sets the email as a link
 * with an envelope beside it, and frames the block with a dot field at the
 * lower left and a dot field plus a filled triangle at the upper right.
 *
 * Note for anyone re-reading the delta doc: its Finding 4 called sections 7
 * and 8 "two different Connect With Us blocks" and asked which one to keep.
 * Measured, that is wrong. Section 7 (y 6008-6713) is We Build For and
 * section 8 is this one. There is no duplicate and nothing to decide.
 */
export default function ConnectCta() {
  return (
    <Section pt={100} pb={242}>
      <DotField className="bottom-24 left-0" width={110} height={160} />
      <DotField className="right-0 top-0" width={170} height={150} />
      <TriangleMark
        className="right-8 top-2"
        size={130}
        rotate={180}
        opacity={0.35}
      />
      <div className="relative flex flex-col items-center gap-6 py-7 text-center">
        <p className="font-mono-eyebrow m-0 text-xs font-medium uppercase tracking-[0.18em] text-text-accent">
          Connect With Us
        </p>
        <h2 className="font-display m-0 max-w-[820px] text-4xl font-bold leading-[1.12] md:text-[3.25rem]">
          Ready to innovate <span className="text-text-accent">together?</span>
        </h2>
        <p className="m-0 max-w-[520px] text-[15px] leading-relaxed text-text-secondary">
          Let&rsquo;s start a conversation about how we can transform your
          ideas into powerful digital solutions.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="md" href="/contact">
            Start a Project
          </Button>
          <Button variant="secondary" size="md" href="/portfolio">
            See Our Work
          </Button>
        </div>
        <a
          href="mailto:info@takkinship.com"
          className="mt-3 inline-flex items-center gap-2 text-[15px] text-text-accent no-underline hover:underline"
        >
          <MailIcon className="h-[18px] w-[18px]" />
          info@takkinship.com
        </a>
      </div>
    </Section>
  );
}
