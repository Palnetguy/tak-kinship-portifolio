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
} as const;

export type IconKey = keyof typeof ICONS;
