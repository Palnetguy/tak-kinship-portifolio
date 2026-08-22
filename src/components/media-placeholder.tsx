export default function MediaPlaceholder({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-elevated ${className ?? ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_25%,color-mix(in_srgb,var(--text-accent)_12%,transparent),transparent_36%),linear-gradient(135deg,transparent_42%,color-mix(in_srgb,var(--text-accent)_5%,transparent))]" />
      <svg viewBox="0 0 120 80" className="relative h-16 w-24 text-text-accent opacity-45" fill="none">
        <rect x="11" y="10" width="98" height="60" rx="4" stroke="currentColor" strokeWidth="1.25" />
        <path d="m18 59 23-23 16 15 14-12 31 20" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
        <circle cx="82" cy="27" r="5" fill="currentColor" opacity="0.7" />
      </svg>
    </div>
  );
}
