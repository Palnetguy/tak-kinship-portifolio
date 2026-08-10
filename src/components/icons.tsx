/**
 * Inline icon set.
 *
 * The measured delta (wiki/projects/tak-kinship/home-measured-delta.md,
 * Finding 3) found ZERO <svg> in the entire build against a design whose
 * service and value cards each lead with a lined icon inside a ring. Icons
 * are the smallest visual unit of that design language.
 *
 * 2026-08-10, THE FAMILY SWAP. These were hand-drawn from the reference PNG,
 * one at a time, and it showed: the optical weights disagreed, some glyphs
 * carried three strokes where their neighbours carried five, and several sat
 * at different visual sizes inside an identical 24 box. Every path below is
 * now **Tabler Icons** geometry (MIT, tabler.io, v3.46.0), inlined from the
 * `outline` pack.
 *
 * TWO DELIBERATE DEPARTURES FROM TABLER, both so the swap is a family change
 * and not a design change:
 *
 * 1. **Stroke stays 1.5, not Tabler's 2.** The 1.5 was measured off the
 *    reference at the 20px size the badge renders at. Tabler contributes the
 *    geometry; TAK's own measured line weight is not up for renegotiation by
 *    an icon set. This is the same "structure, not theme" rule the UI-upgrade
 *    brief applies to Watermelon.
 * 2. **Every glyph still depicts what it depicted before.** `pulse` is still
 *    the circle-and-bar power mark, not a heart rate line, even though
 *    "Impact" would arguably read better as a rising chart. Swapping icon
 *    families is sanctioned work. Changing which concept an icon shows is
 *    redesign, and the trace is the spec.
 *
 * No dependency was added. `@tabler/icons-react` would pull a package to
 * render 22 known-at-build-time paths, and tree-shaking it still costs more
 * than this file does.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* --- Services. Traced from Home.png, now on Tabler geometry. --- */

export function CodeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 8l-4 4l4 4" />
      <path d="M17 8l4 4l-4 4" />
      <path d="M14 4l-4 16" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14" />
      <path d="M11 4h2" />
      <path d="M12 17v.01" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M3.6 9h16.8" />
      <path d="M3.6 15h16.8" />
      <path d="M11.5 3a17 17 0 0 0 0 18" />
      <path d="M12.5 3a17 17 0 0 1 0 18" />
    </svg>
  );
}

export function CloudIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878" />
    </svg>
  );
}

export function BulbIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
      <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
      <path d="M9.7 17l4.6 0" />
    </svg>
  );
}

export function PaletteIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
      <path d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </svg>
  );
}

/* --- Why Trust Us values. --- */

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
    </svg>
  );
}

export function PulseIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 6a7.75 7.75 0 1 0 10 0" />
      <path d="M12 4l0 8" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </svg>
  );
}

/* --- Problem cards. Traced from Home.png y 851-1556: plug-with-slash,
       hourglass, folded map. --- */

export function PlugOffIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M16.123 16.092l-.177 .177a5.81 5.81 0 1 1 -8.215 -8.215l.159 -.159" />
      <path d="M4 20l3.5 -3.5" />
      <path d="M15 4l-3.5 3.5" />
      <path d="M20 9l-3.5 3.5" />
      <path d="M3 3l18 18" />
    </svg>
  );
}

export function HourglassIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.5 7h11" />
      <path d="M6.5 17h11" />
      <path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1" />
      <path d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1" />
    </svg>
  );
}

export function MapIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5" />
      <path d="M9 4v13" />
      <path d="M15 7v5.5" />
      <path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879" />
      <path d="M19 18v.01" />
    </svg>
  );
}

/* --- We Build For sector tiles. Traced from Home.png y 6008-6713. --- */

export function CardIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -8" />
      <path d="M3 10l18 0" />
      <path d="M7 15l.01 0" />
      <path d="M11 15l2 0" />
    </svg>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
      <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3l.014 0" />
    </svg>
  );
}

export function GraduationIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
    </svg>
  );
}

export function StethoscopeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 4h-1a2 2 0 0 0 -2 2v3.5a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1" />
      <path d="M8 15a6 6 0 1 0 12 0v-3" />
      <path d="M11 3v2" />
      <path d="M6 3v2" />
      <path d="M18 10a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304" />
      <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
      <path d="M3 9l4 0" />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
      <path d="M16 3l-4 4l-4 -4" />
    </svg>
  );
}

export function BankIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 21l18 0" />
      <path d="M3 10l18 0" />
      <path d="M5 6l7 -3l7 3" />
      <path d="M4 10l0 11" />
      <path d="M20 10l0 11" />
      <path d="M8 14l0 3" />
      <path d="M12 14l0 3" />
      <path d="M16 14l0 3" />
    </svg>
  );
}

/** Envelope beside the email link in Connect With Us. */
export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
      <path d="M3 7l9 6l9 -6" />
    </svg>
  );
}

/* --- Chrome glyphs: menu, close, and the theme pair.
 *
 * These four were the actual mismatch the brief was pointing at. They were
 * **Feather** icons (the stock Feather sun with eight rays, the Feather moon,
 * the Feather x and hamburger), drawn at stroke 2, sitting inline in
 * nav-bar.tsx, modal.tsx and theme-toggle.tsx while every content icon was
 * hand-drawn at 1.5. Three families across one page. They live here now, in
 * the one file, at the one weight. --- */

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 6l16 0" />
      <path d="M4 12l16 0" />
      <path d="M4 18l16 0" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
    </svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008" />
    </svg>
  );
}

/** Lookup used by the content layer, which stores an icon KEY, not a component. */
export const ICONS = {
  code: CodeIcon,
  phone: PhoneIcon,
  globe: GlobeIcon,
  cloud: CloudIcon,
  bulb: BulbIcon,
  palette: PaletteIcon,
  sparkle: SparkleIcon,
  shield: ShieldIcon,
  pulse: PulseIcon,
  users: UsersIcon,
  plugOff: PlugOffIcon,
  hourglass: HourglassIcon,
  map: MapIcon,
  card: CardIcon,
  leaf: LeafIcon,
  graduation: GraduationIcon,
  stethoscope: StethoscopeIcon,
  bag: BagIcon,
  truck: TruckIcon,
  play: PlayIcon,
  bank: BankIcon,
  mail: MailIcon,
} as const;

export type IconKey = keyof typeof ICONS;
