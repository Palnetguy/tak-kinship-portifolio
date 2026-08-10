"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./button";
import ThemeToggle from "./theme-toggle";
import { CloseIcon, MenuIcon } from "@/components/icons";

/**
 * Nav bar, traced from Home.png y 0-72.
 *
 * Measured off the 4x reference:
 *   bar height   70.8 (built at 72)
 *   logo         x 48-127.5, y 11-60.8  -> 80 x 50, flush to the 48px margin
 *   links        centred in the bar, not pushed right
 *   right side   a green "Start a Project" pill
 *
 * The first build had a plain "TAK Kinship" text logo, right-aligned links and
 * no CTA, which is why the bar read as a default template header.
 *
 * The logo is a raster cut from the reference (the DesignAgent bridge was
 * down). Its "KINSHIP" half is white, so in the light theme it is inverted
 * back to dark rather than disappearing into the background.
 */
export default function NavBar() {
  const [open, setOpen] = useState(false);

  // Contact is deliberately NOT here (KingFizzy, 2026-08-10). The green
  // "Start a Project" pill already goes to /contact, so listing it as a plain
  // link too gave the bar two controls for one destination, and the weaker of
  // the two sat next to the stronger one.
  const links = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border-subtle bg-bg-canvas">
      <div className="mx-auto flex h-[72px] max-w-[1344px] items-center justify-between px-12">
        <Link href="/" className="shrink-0 no-underline" aria-label="TAK Kinship, home">
          <img
            src="/tak-logo.png"
            alt="TAK Kinship"
            width={80}
            height={50}
            className="h-[50px] w-auto dark-logo"
          />
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] text-text-primary no-underline transition-colors hover:text-text-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <Button variant="primary" size="sm" href="/contact">
            Start a Project
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="cursor-pointer rounded-full border border-border-subtle bg-transparent p-3 text-text-primary md:hidden"
        >
          {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
        </button>
      </div>

      <div
        className="overflow-hidden transition-all duration-200 md:hidden"
        // 260 was sized for four links and nothing else. Three links plus the
        // CTA plus the theme toggle measure ~284, so the old ceiling would have
        // clipped the toggle off the bottom of an open drawer. Verified against
        // the real scrollHeight rather than guessed.
        style={{ maxHeight: open ? "340px" : "0px" }}
      >
        <div className="flex flex-col gap-4 border-t border-border-subtle px-12 pb-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="pt-5 text-sm text-text-secondary no-underline"
            >
              {l.label}
            </Link>
          ))}
          {/* The CTA is repeated here on purpose. On desktop it lives in the
              right-hand cluster, which is `hidden md:flex`, so dropping the
              Contact link without adding it back below would have left
              /contact with no route at all from a phone. */}
          <Button
            variant="primary"
            size="sm"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Start a Project
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
