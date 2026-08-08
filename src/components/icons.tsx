/**
 * Inline icon set.
 *
 * The measured delta (wiki/projects/tak-kinship/home-measured-delta.md,
 * Finding 3) found ZERO <svg> in the entire build against a design whose
 * service and value cards each lead with a lined icon inside a ring. Icons
 * are the smallest visual unit of that design language, so they are drawn
 * here rather than pulled from an icon package: the set is six plus four,
 * it never grows, and a dependency would be heavier than the file.
 *
 * All paths are 24x24, 1.5 stroke, currentColor, round caps. That matches
 * the reference's line weight at the 20px render size the badge uses.
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

export function CodeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5Z" />
    </svg>
  );
}

export function CloudIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 18h9.5a3.5 3.5 0 0 0 .4-7A5.5 5.5 0 0 0 6.6 10 4 4 0 0 0 7 18Z" />
    </svg>
  );
}

export function BulbIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9.5 17a5.5 5.5 0 1 1 5 0v1.5a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 9.5 18.5V17Z" />
      <path d="M10 20.5h4" />
    </svg>
  );
}

export function PaletteIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1 0 1.6-.7 1.6-1.5 0-.5-.2-.8-.5-1.1-.3-.4-.5-.7-.5-1.2 0-.8.7-1.5 1.6-1.5h1.4a4.9 4.9 0 0 0 4.9-4.9c0-3.8-3.8-6.8-8.5-6.8Z" />
      <circle cx="8.5" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.8" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.6" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M11 4.5 12.4 8.6 16.5 10l-4.1 1.4L11 15.5 9.6 11.4 5.5 10l4.1-1.4L11 4.5Z" />
      <path d="M17.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 19 6v5.5c0 4-2.9 7.4-7 8.9-4.1-1.5-7-4.9-7-8.9V6l7-2.5Z" />
    </svg>
  );
}

export function PulseIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.5M15.5 8.5a5 5 0 1 1-7 0" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="9.5" cy="9" r="3" />
      <path d="M4 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6.4a3 3 0 0 1 0 5.2M17.5 19a5.5 5.5 0 0 0-2.2-4.4" />
    </svg>
  );
}

/* --- Problem cards. Traced from Home.png y 851-1556: plug-with-slash,
       hourglass, folded map. --- */

export function PlugOffIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 7V3M15 7v4" />
      <path d="M7 7h10v3a5 5 0 0 1-5 5 5 5 0 0 1-4.4-2.6" />
      <path d="M12 15v5" />
      <path d="M4 4l16 16" />
    </svg>
  );
}

export function HourglassIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 3h10M7 21h10" />
      <path d="M8 3v3.5c0 1.4 4 3.6 4 5.5s-4 4.1-4 5.5V21" />
      <path d="M16 3v3.5c0 1.4-4 3.6-4 5.5s4 4.1 4 5.5V21" />
    </svg>
  );
}

export function MapIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 4 3.5 6.2v13.3L9 17.3l6 2.4 5.5-2.2V4.2L15 6.4 9 4Z" />
      <path d="M9 4v13.3M15 6.4v13.3" />
    </svg>
  );
}

/* --- We Build For sector tiles. Traced from Home.png y 6008-6713. --- */

export function CardIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
      <path d="M2.5 10h19" />
    </svg>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20 4c0 9-5.2 14-11 14a5 5 0 0 1-5-5C4 7.7 10.5 4 20 4Z" />
      <path d="M4 20c3-6 7-9 12-11" />
    </svg>
  );
}

export function GraduationIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4 22 9l-10 5L2 9l10-5Z" />
      <path d="M6 11.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.8" />
    </svg>
  );
}

export function StethoscopeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3v5a4 4 0 0 0 8 0V3" />
      <path d="M4 3h3M13 3h3" />
      <path d="M10 12v3a5 5 0 0 0 10 0v-1.2" />
      <circle cx="20" cy="11" r="2" />
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 6.5h11v9h-11v-9Z" />
      <path d="M13.5 10h4l3 3v2.5h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M10.5 9.2v5.6L15 12l-4.5-2.8Z" />
    </svg>
  );
}

export function BankIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M5.5 9.5v8M10 9.5v8M14 9.5v8M18.5 9.5v8" />
      <path d="M3 19.5h18" />
    </svg>
  );
}

/** Envelope beside the email link in Connect With Us. */
export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
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
