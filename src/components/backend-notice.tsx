type BackendNoticeProps = {
  title: string;
  body: string;
};

/** A clear state for content that has not been published in TAK Admin yet. */
export default function BackendNotice({ title, body }: BackendNoticeProps) {
  return (
    <div
      role="status"
      className="rounded-xl border border-border-subtle bg-elevated px-6 py-8 text-center"
    >
      <p className="m-0 text-base font-semibold text-text-primary">{title}</p>
      <p className="m-0 mt-2 text-sm leading-relaxed text-text-secondary">{body}</p>
    </div>
  );
}
