"use client";

import { useState } from "react";
import { type ServiceDetail } from "@/lib/content";
import Modal from "@/components/modal";
import ServiceDetailContent from "@/components/service-detail-modal";

export default function ServiceCard({ service }: { service: ServiceDetail }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-xl border border-border-subtle bg-bg-input p-6 text-left transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none"
        style={{ borderRadius: "12px" }}
      >
        <h3 className="font-display m-0 mb-2 text-base font-semibold text-text-primary">
          {service.title}
        </h3>
        <p className="m-0 mb-3 text-sm text-text-secondary">
          {service.description}
        </p>
        <span className="text-sm text-text-accent">Learn more</span>
      </button>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <ServiceDetailContent service={service} />
        </Modal>
      )}
    </>
  );
}
