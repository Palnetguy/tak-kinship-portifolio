"use client";

import { useId, useState } from "react";
import { type Faq } from "@/lib/content";

/**
 * FAQ disclosure list.
 *
 * REFERENCE: Watermelon UI (MIT, tabler-free, `accordion-03` and
 * `accordion-05` in WatermelonCorp/watermellon-registry). What was taken is
 * **structure only**, and nothing was copied: their components are built on
 * Radix via shadcn's `Accordion`, which this project does not have and is not
 * adding for six questions. Three ideas came across:
 *
 *   1. **One list, not N boxes.** Their rows are separated by a single hairline
 *      rule and share one column. Ours were six individually bordered, filled,
 *      rounded cards, which is six containers whose only job was to hold text.
 *      That is precisely the pattern the standing rule bans (Zander Whitehurst,
 *      adopted 2026-08-05: containers used for layout create a boxy UI and
 *      visual noise). Removing them is the single biggest change here.
 *   2. **A leading index.** A small ordinal beside each question, which gives
 *      the list a spine now that the boxes are gone.
 *   3. **The closed rows recede and the open row comes forward**, so the list
 *      reads as one thing with a current item rather than six equal slabs.
 *
 * TWO THINGS DELIBERATELY NOT TAKEN.
 *
 * Watermelon dims its closed rows to `text-foreground/20`. At 20% that is
 * roughly a 1.5:1 contrast ratio against either of our surfaces, which fails
 * WCAG for text a visitor is expected to read and choose between. Closed rows
 * here go to `text-text-secondary`, which is a real token that passes in both
 * themes. Their palette is theirs; ours is the constraint.
 *
 * Their `accordion-03` puts an image inside the open panel. Our answers are
 * prose and there is no image to put there, so it was left out rather than
 * invented.
 *
 * MOTION: the panel animates with the `grid-template-rows: 0fr -> 1fr`
 * technique, so the height is real and the browser interpolates it without
 * anyone measuring a scrollHeight. The old build rendered `{open && <p>}`,
 * which pops. Reduced motion drops the duration to zero and keeps the state
 * change, rather than removing the disclosure.
 */

/** Plus that becomes a minus. One bar rotates, the other stays. */
function ToggleMark({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="relative mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-text-accent"
    >
      <span className="absolute h-px w-3.5 bg-current" />
      <span
        className={`absolute h-px w-3.5 bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "rotate-0" : "rotate-90"
        }`}
      />
    </span>
  );
}

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="flex flex-col border-t border-border-subtle">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={faq.question} className="border-b border-border-subtle">
            <h3 className="m-0">
              <button
                id={buttonId}
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
                aria-controls={panelId}
                className="group flex w-full cursor-pointer items-start gap-4 border-0 bg-transparent px-1 py-6 text-left sm:gap-6"
              >
                <span
                  aria-hidden
                  className={`font-mono-eyebrow mt-1 w-6 shrink-0 text-[11px] font-medium tabular-nums tracking-[0.14em] transition-colors duration-300 motion-reduce:transition-none ${
                    open ? "text-text-accent" : "text-text-muted"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className={`flex-1 text-lg font-semibold transition-colors duration-300 motion-reduce:transition-none ${
                    open
                      ? "text-text-primary"
                      : "text-text-secondary group-hover:text-text-primary"
                  }`}
                >
                  {faq.question}
                </span>

                <ToggleMark open={open} />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              // `inert` rather than `hidden`. `hidden` is only a UA
              // `display:none` rule, and this element must stay `display:grid`
              // for the row to animate, so the attribute would be overridden
              // and the guarantee lost. `inert` takes the subtree out of the
              // tab order AND out of the accessibility tree without touching
              // layout, which is exactly what a collapsed panel needs.
              inert={!open}
              className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p
                  className={`m-0 max-w-[68ch] pb-7 pl-1 pr-10 text-sm leading-relaxed text-text-secondary transition-opacity duration-300 motion-reduce:transition-none sm:pl-[3.25rem] ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
