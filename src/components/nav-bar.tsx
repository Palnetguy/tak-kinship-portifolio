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

  const links = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
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
        style={{ maxHeight: open ? "260px" : "0px" }}
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
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
