"use client";

import { useState, type FormEvent } from "react";

// PLACEHOLDER: no backend or form-processing service exists yet. Submitting
// opens the user's email client with the message prefilled via mailto: so the
// form is honestly functional rather than a dead end. Wire to a real form
// handler (e.g. an API route + email service) before launch.

/**
 * Traced from Contact.png y 449-1044.
 *
 * The reference labels every field with an in-field placeholder, not a label
 * above it, and the fields sit two-up then full width: Last Name / First
 * Name, Email, Organisation, Message, then a full-width green Send. The build
 * had stacked labels, which made the panel ~120px taller than the design and
 * changed its rhythm entirely.
 *
 * Each input still carries a real <label>, visually hidden. A placeholder is
 * not an accessible name: it disappears on focus and screen readers treat it
 * inconsistently, so matching the design's LOOK must not cost the label.
 *
 * NOTE: the reference spells this field "Organsitaion". Shipped as
 * "Organisation" under the standing rule not to reproduce a typo verbatim.
 * Flagged for David so the Figma file gets fixed at source too.
 */
const FIELD =
  "w-full rounded-lg border border-border-subtle bg-transparent px-4 py-3 text-[15px] text-text-primary outline-none placeholder:text-text-muted focus:border-action-primary";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${data.get("firstName")} ${data.get("lastName")}`,
      `Email: ${data.get("email")}`,
      `Organisation: ${data.get("organisation") || "Not set"}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:info@takkinship.com?subject=${encodeURIComponent(
      "New project inquiry",
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Last Name</span>
          <input name="lastName" required placeholder="Last Name" className={FIELD} />
        </label>
        <label className="block">
          <span className="sr-only">First Name</span>
          <input name="firstName" required placeholder="First Name" className={FIELD} />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Email</span>
        <input type="email" name="email" required placeholder="Email" className={FIELD} />
      </label>
      <label className="block">
        <span className="sr-only">Organisation</span>
        <input name="organisation" placeholder="Organisation" className={FIELD} />
      </label>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Message"
          className={`${FIELD} resize-none`}
        />
      </label>
      <button
        type="submit"
        className="mt-1 w-full cursor-pointer rounded-lg border border-action-primary bg-action-primary px-6 py-3 text-[15px] font-medium text-text-on-accent transition-colors hover:bg-[color-mix(in_srgb,var(--action-primary)_85%,white)]"
      >
        Send
      </button>
      {sent && (
        <p className="m-0 text-sm text-text-accent" role="status">
          Opening your email client with this message prefilled.
        </p>
      )}
    </form>
  );
}
