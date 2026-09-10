"use client";

import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

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
/**
 * UI upgrade pass, 2026-08-09. Reference: designspells.com, `Interaction` tag.
 *
 * Taken from it: a field should confirm focus with more than a one-pixel
 * border change, and should say what is wrong WHERE it is wrong rather than
 * only at submit. Three changes, all inside TAK's existing tokens:
 *
 *   1. focus adds a soft accent ring on top of the border, so the active field
 *      is findable at a glance instead of by hunting for a colour shift
 *   2. `user-invalid`, not `invalid`. Plain `:invalid` marks every required
 *      field red before the user has typed a character, which is the single
 *      most common way this pattern is shipped wrong. `:user-invalid` waits
 *      until the field has actually been interacted with.
 *   3. the ring is `box-shadow`, not `outline`, so it follows the 8px radius
 */
const FIELD =
  "w-full rounded-lg border border-border-subtle bg-transparent px-4 py-3 text-[15px] text-text-primary outline-none " +
  "placeholder:text-text-muted " +
  "transition-[border-color,box-shadow] duration-200 " +
  "focus:border-action-primary focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--text-accent)_22%,transparent)] " +
  "user-invalid:border-[#c0564f] user-invalid:shadow-[0_0_0_3px_color-mix(in_srgb,#c0564f_20%,transparent)]";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorText, setErrorText] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const startedAt = useRef(0);
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidget = useRef<string | undefined>(undefined);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function renderTurnstile() {
    if (!turnstileSiteKey || !window.turnstile || !turnstileContainer.current || turnstileWidget.current) return;
    turnstileWidget.current = window.turnstile.render(turnstileContainer.current, {
      sitekey: turnstileSiteKey,
      action: "contact",
      theme: "auto",
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState("submitting");
    setErrorText("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: String(data.get("firstName") ?? ""),
        lastName: String(data.get("lastName") ?? ""),
        email: String(data.get("email") ?? ""),
        organisation: String(data.get("organisation") ?? ""),
        message: String(data.get("message") ?? ""),
        website: String(data.get("website") ?? ""),
        startedAt: startedAt.current,
        turnstileToken,
      }),
    });

    if (response.ok) {
      form.reset();
      startedAt.current = Date.now();
      setTurnstileToken("");
      window.turnstile?.reset(turnstileWidget.current);
      setState("success");
      return;
    }

    const payload = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;
    setErrorText(
      payload?.error ||
        "We could not send your message right now. Email info@takkinship.com instead.",
    );
    setState("error");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={renderTurnstile}
        />
      )}
      <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
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
      {turnstileSiteKey && <div ref={turnstileContainer} className="min-h-[65px]" />}
      {/* Same press/focus contract as `components/button.tsx`, so the one
          button that is not a <Button> does not behave differently. */}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-1 w-full cursor-pointer rounded-lg border border-action-primary bg-action-primary px-6 py-3 text-[15px] font-medium text-text-on-accent
          transition-[background-color,box-shadow,transform] duration-200 ease-out
          hover:bg-[color-mix(in_srgb,var(--action-primary)_88%,white)]
          hover:shadow-[0_8px_28px_color-mix(in_srgb,var(--text-accent)_28%,transparent)]
          active:scale-[0.985] motion-reduce:active:scale-100
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-accent)]
          disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "submitting" ? "Sending..." : "Send"}
      </button>
      {state === "success" && (
        <p className="m-0 text-sm text-text-accent" role="status">
          Message sent. We will get back to you soon.
        </p>
      )}
      {state === "error" && (
        <p className="m-0 text-sm text-[#d07a72]" role="alert">
          {errorText}
        </p>
      )}
    </form>
  );
}
