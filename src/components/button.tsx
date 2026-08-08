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
  const base =
    "inline-flex items-center justify-center font-medium rounded-full border cursor-pointer no-underline transition-colors";

  const variantClass =
    variant === "primary"
      ? "bg-action-primary text-text-on-accent border-action-primary"
      : "bg-transparent text-text-primary border-border-subtle hover:text-action-secondary-hover hover:border-action-secondary-hover";

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
