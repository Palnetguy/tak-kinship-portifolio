import Section from "@/components/section";
import { CodeBlockDecor, PlusField, Glow } from "@/components/decor";

/**
 * The inner-page hero, traced from Services.png, Portfolio.png and
 * Contact.png.
 *
 * The three are NOT the same, which is why this takes an `align` rather than
 * being copied three times:
 *   Services   left-aligned, greens "Kinship", carries a 384-wide code panel
 *              on the right and a plus field low-left
 *   Portfolio  centred, greens "innovation."
 *   Contact    centred, no green run at all
 *
 * All three were built left-aligned at 60px with no decoration and no green
 * run, so two of the three had the wrong alignment and all three the wrong
 * type size. Heading size is 60px here against Home's 67: measured off the
 * reference, the inner pages set a smaller display line.
 */
export default function PageHero({
  heading,
  highlight,
  body,
  align = "center",
  codePanel = false,
  height,
  children,
}: {
  heading: string;
  highlight?: string;
  body: string;
  align?: "left" | "center";
  codePanel?: boolean;
  /**
   * Section height in design px, measured per page. The three heroes are NOT
   * the same height: Services runs 72-798 (726), Portfolio 72-589 (517) and
   * Contact 72-430 (358). One shared height was worth up to 370px of error.
   */
  height: number;
  children?: React.ReactNode;
}) {
  const parts = highlight ? heading.split(highlight) : [heading];
  const centred = align === "center";

  return (
    <Section pt={60} pb={40} minHeight={height}>
      {codePanel && (
        <CodeBlockDecor
          variant="right"
          className="top-[60px] right-0 hidden lg:block"
        />
      )}
      <Glow className="right-10 top-4" size={520} strength={0.13} />
      <PlusField className="bottom-2 left-0" rows={3} cols={5} />

      <div
        className={`relative flex flex-col gap-6 py-10 ${
          centred ? "items-center text-center" : "items-start text-left"
        }`}
      >
        <h1
          className={`font-display m-0 text-4xl font-bold leading-[1.1] md:text-[60px] ${
            centred ? "max-w-[900px]" : "max-w-[620px]"
          }`}
        >
          {parts.map((part, i) => (
            <span key={i}>
              {part}
              {highlight && i < parts.length - 1 && (
                <span className="text-text-accent">{highlight}</span>
              )}
            </span>
          ))}
        </h1>
        <p
          className={`m-0 text-[15px] leading-relaxed text-text-secondary ${
            centred ? "max-w-[720px]" : "max-w-[520px]"
          }`}
        >
          {body}
        </p>
        {children && (
          <div className={`flex flex-wrap gap-4 ${centred ? "justify-center" : ""}`}>
            {children}
          </div>
        )}
      </div>
    </Section>
  );
}
