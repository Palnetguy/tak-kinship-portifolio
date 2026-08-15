"use client";

import { useEffect, type ReactNode } from "react";
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
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-scrim p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative max-h-[85vh] w-full overflow-y-auto rounded-2xl border border-border-subtle bg-elevated"
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
  );
}
