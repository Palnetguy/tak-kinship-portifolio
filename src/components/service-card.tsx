"use client";

import { useState } from "react";
import { type ServiceDetail } from "@/lib/content";
import { ICONS, type IconKey } from "@/components/icons";
import Modal from "@/components/modal";
import ServiceDetailContent from "@/components/service-detail-modal";

/**
 * The Services page card, traced from Services.png y ~1000-1560.
 *
 * It is Home's bento card, not a separate smaller card: same 310 min-height,
 * same ringed icon badge, same type scale. The only addition the reference
 * shows is a "Learn more ->" line, which it draws on the active/hover card
 * (UI/UX Design in the comp) rather than on all six at rest.
 */
export default function ServiceCard({
  icon,
  title,
  body,
  detail,
}: {
  icon: IconKey;
  title: string;
  body: string;
  detail?: ServiceDetail;
}) {
  const [open, setOpen] = useState(false);
  const Icon = ICONS[icon];

  return (
    <>
      <button
        onClick={() => detail && setOpen(true)}
        aria-label={`${title}, learn more`}
        className="group relative flex min-h-[310px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface p-7 text-left tak-hover-glow"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--text-accent) 12%, transparent) 0%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />

        <span
          aria-hidden
          className="relative mb-8 flex h-11 w-11 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--text-accent)_35%,transparent)] text-text-accent"
        >
          <Icon className="h-5 w-5" />
        </span>

        <h3 className="font-display relative m-0 mb-3 text-xl font-bold text-text-primary">
          {title}
        </h3>
        <p className="relative m-0 max-w-[30ch] text-[15px] leading-relaxed text-text-secondary">
          {body}
        </p>

        {detail && (
          <span className="font-mono-eyebrow relative mt-auto pt-6 text-[11px] text-text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            Learn more &rarr;
          </span>
        )}
      </button>

      {open && detail && (
        <Modal onClose={() => setOpen(false)}>
          <ServiceDetailContent service={detail} icon={icon} />
        </Modal>
      )}
    </>
  );
}
