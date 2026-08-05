"use client";

import { useState } from "react";
import { type Faq } from "@/lib/content";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 text-text-accent transition-transform ${open ? "rotate-180" : ""}`}
    >
      <polyline points="1,1 6,6 11,1" />
    </svg>
  );
}

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div
            key={faq.question}
            className="rounded-xl border border-border-subtle bg-bg-input p-6"
          >
            <button
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent p-0 text-left"
              aria-expanded={open}
            >
              <span className="text-lg font-semibold text-text-primary">
                {faq.question}
              </span>
              <ChevronIcon open={open} />
            </button>
            {open && (
              <p className="m-0 mt-4 text-sm text-text-secondary">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
