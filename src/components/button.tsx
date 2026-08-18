import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type ButtonBaseProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  // UI upgrade pass, 2026-08-09. Reference: designspells.com, `Button` tag.
  // Taken from it: a button should answer the POINTER DOWN, not only the
  // hover. Every example under that tag confirms the same shape, a small
  // inward scale on :active, and TAK's live site has none of it: press and
  // release and nothing at all happens until the page navigates. Colours are
  // untouched and no new token is introduced, per the brand constraint.
  //
  // `focus-visible` rather than `focus`, so the ring appears for keyboard users
  // and never fires on a mouse click. `motion-reduce` drops the scale but
  // keeps the ring, because the ring is an accessibility affordance and not
  // decoration.
  const base =
    "inline-flex items-center justify-center font-medium rounded-full border cursor-pointer no-underline " +
    "transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out " +
    "active:scale-[0.97] motion-reduce:active:scale-100 " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-accent)]";

  const variantClass =
    variant === "primary"
      ? "bg-action-primary text-text-on-accent border-action-primary " +
        // Lift on hover, using the same accent cast as `.tak-hover-glow` so the
        // site keeps one idea of "this thing is lit".
        "hover:bg-[color-mix(in_srgb,var(--action-primary)_88%,white)] " +
        "hover:shadow-[0_8px_28px_color-mix(in_srgb,var(--text-accent)_28%,transparent)]"
      : "bg-transparent text-text-primary border-border-subtle hover:text-action-secondary-hover hover:border-action-secondary-hover " +
        "hover:shadow-[0_8px_28px_color-mix(in_srgb,var(--text-accent)_14%,transparent)]";

  // Explicit heights so the nav's toggle (h-10) and CTA line up exactly.
  const sizeClass =
    size === "sm" ? "h-10 px-5 text-sm" : "h-12 px-6 text-sm";

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <a
        href={href}
        className={`${base} ${variantClass} ${sizeClass}`}
        {...anchorProps}
      />
    );
  }

  const { variant: _v, size: _s, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={`${base} ${variantClass} ${sizeClass}`} {...buttonProps} />
  );
}
