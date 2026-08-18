"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/icons";

export default function Modal({
  onClose,
  padded = true,
  maxWidth = 972,
  children,
}: {
  onClose: () => void;
  /** Project Details bleeds its hero image to the modal edge, so it opts out. */
  padded?: boolean;
  /** Service Detail Overlay measures 972x843 in the reference (a clean 4x). */
  maxWidth?: number;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    panelRef.current?.scrollTo({ top: 0, behavior: "auto" });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-bg-scrim px-4 py-6 backdrop-blur-sm md:px-6 md:py-10"
      onClick={onClose}
      role="presentation"
    >
      <div className="flex min-h-full items-start justify-center md:items-center">
        <div
          ref={panelRef}
          className="relative w-full max-h-[calc(100vh-3rem)] overflow-y-auto overscroll-contain rounded-2xl border border-border-subtle bg-elevated shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:max-h-[calc(100vh-5rem)]"
          style={{ maxWidth }}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border-subtle bg-elevated-80 text-text-accent backdrop-blur"
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
          <div className={padded ? "p-8 md:p-10" : ""}>{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
