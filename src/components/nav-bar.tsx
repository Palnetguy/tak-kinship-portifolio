"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-bg-canvas">
      <div className="mx-auto flex max-w-[1344px] items-center justify-between px-5 h-16">
        <Link
          href="/"
          className="text-text-primary font-semibold text-lg no-underline"
        >
          TAK Kinship
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden p-3 rounded-full border border-border-subtle bg-transparent text-text-primary cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/services"
            className="text-text-secondary no-underline text-sm"
          >
            Services
          </Link>
          <Link
            href="/portfolio"
            className="text-text-secondary no-underline text-sm"
          >
            Portfolio
          </Link>
          <Link
            href="/contact"
            className="text-text-secondary no-underline text-sm"
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div
        className="md:hidden overflow-hidden transition-all duration-200"
        style={{ maxHeight: open ? "200px" : "0px" }}
      >
        <div className="flex flex-col gap-4 px-5 pb-5 border-t border-border-subtle">
          <Link
            href="/services"
            onClick={() => setOpen(false)}
            className="text-text-secondary no-underline text-sm pt-5"
          >
            Services
          </Link>
          <Link
            href="/portfolio"
            onClick={() => setOpen(false)}
            className="text-text-secondary no-underline text-sm"
          >
            Portfolio
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="text-text-secondary no-underline text-sm"
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
