"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/button";

// PLACEHOLDER: no backend or form-processing service exists yet. Submitting
// opens the user's email client with the message prefilled via mailto: so the
// form is honestly functional rather than a dead end. Wire to a real form
// handler (e.g. an API route + email service) before launch.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const organisation = data.get("organisation");
    const message = data.get("message");

    const body = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Organisation: ${organisation || "Not set"}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:info@takkinship.com?subject=${encodeURIComponent(
      "New project inquiry",
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-text-secondary">
          First Name
          <input
            name="firstName"
            required
            className="rounded-lg border border-border-subtle bg-bg-canvas px-4 py-3 text-text-primary outline-none focus:border-action-primary"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-text-secondary">
          Last Name
          <input
            name="lastName"
            required
            className="rounded-lg border border-border-subtle bg-bg-canvas px-4 py-3 text-text-primary outline-none focus:border-action-primary"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm text-text-secondary">
        Email
        <input
          type="email"
          name="email"
          required
          className="rounded-lg border border-border-subtle bg-bg-canvas px-4 py-3 text-text-primary outline-none focus:border-action-primary"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-text-secondary">
        Organisation
        <input
          name="organisation"
          className="rounded-lg border border-border-subtle bg-bg-canvas px-4 py-3 text-text-primary outline-none focus:border-action-primary"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-text-secondary">
        Message
        <textarea
          name="message"
          required
          rows={5}
          className="resize-none rounded-lg border border-border-subtle bg-bg-canvas px-4 py-3 text-text-primary outline-none focus:border-action-primary"
        />
      </label>
      <Button variant="primary" size="md">
        Send
      </Button>
      {sent && (
        <p className="m-0 text-sm text-text-accent">
          Opening your email client with this message prefilled.
        </p>
      )}
    </form>
  );
}
