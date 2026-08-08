import { ICONS, type IconKey } from "./icons";

/**
 * The Problem card, traced from Home.png y 851-1556.
 *
 * Measured off the 4x reference:
 *   card   432 x 311, 24px gap, three across a 1344 container
 *          (columns 47.8-479, 503.8-935, 959.8-1391)
 *   icon   lined, green, ~28px, centred above the title
 *
 * The first build had this as a left-aligned title/body block roughly 100px
 * tall with no icon at all, which is most of the Problem section's 123px
 * shortfall. Everything here is centred: the design centres the icon, the
 * title and the body, and left-aligned text is the browser default that the
 * absence check is blind to.
 */
export default function Card({
  icon,
  title,
  body,
}: {
  icon?: IconKey;
  title?: string;
  body?: string;
}) {
  const Icon = icon ? ICONS[icon] : null;

  return (
    <div className="flex min-h-[311px] flex-col items-center justify-center gap-4 rounded-xl border border-border-subtle bg-[#0a0b0a] px-8 py-10 text-center transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--text-accent)_35%,transparent)]">
      {Icon && (
        <span aria-hidden className="mb-2 text-text-accent">
          <Icon className="h-8 w-8" />
        </span>
      )}
      {title && (
        <h3 className="font-display m-0 text-lg font-medium text-text-primary">
          {title}
        </h3>
      )}
      {body && (
        <p className="m-0 max-w-[34ch] text-sm leading-relaxed text-text-secondary">
          {body}
        </p>
      )}
    </div>
  );
}
