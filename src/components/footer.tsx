import Link from "next/link";

/**
 * Footer, traced from Home.png y 7418-7837.
 *
 * The reference is four columns, not three: a brand block with a description,
 * then Pages, Services and Follow Us, over a full-width rule and a copyright
 * line. The first build had three columns, no Services or Follow Us list, and
 * measured 270 against the design's 419, the largest single shortfall on the
 * page at 36%.
 *
 * The wordmark here is set as text rather than the logo raster: in the
 * reference it is a flat green all-caps line, not the stacked mark the nav
 * carries.
 */

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact", href: "/contact" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Web", href: "/services" },
      { label: "App", href: "/services" },
      { label: "Desktop", href: "/services" },
      { label: "Research", href: "/services" },
      { label: "UI/UX", href: "/services" },
    ],
  },
  {
    heading: "Follow Us",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "X / Twitter", href: "https://x.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-bg-canvas">
      {/* The green light streak that runs under the brand column in the
          reference. Decorative only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[150px] -left-24 h-40 w-[560px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--text-accent) 26%, transparent), transparent)",
          filter: "blur(38px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-16 h-72 w-72 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--text-accent) 22%, transparent), transparent)",
          filter: "blur(44px)",
        }}
      />

      <div className="relative mx-auto max-w-[1344px] px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Link
              href="/"
              className="font-display text-lg font-bold tracking-wide text-text-accent no-underline"
            >
              TAK KINSHIP
            </Link>
            <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-text-secondary">
              Turning bold ideas into impactful digital solutions. Based in
              Uganda, building for the world.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="m-0 text-sm font-semibold text-text-primary">
                {col.heading}
              </h3>
              <ul className="m-0 mt-5 flex list-none flex-col gap-[14px] p-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-text-secondary no-underline transition-colors hover:text-text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-border-subtle pt-6">
          <p className="m-0 text-xs text-text-muted">
            &copy; {new Date().getFullYear()} TAK Kinship. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
