export type LegalSection = { heading: string; body: string };

const PENDING =
  "This section is awaiting TAK Kinship's own wording. It has deliberately not been drafted, because a policy is a commitment to real visitors and an invented one states obligations nobody at TAK has agreed to.";

export const termsSections: LegalSection[] = [
  { heading: "Agreement to terms", body: PENDING },
  { heading: "Services", body: PENDING },
  { heading: "Intellectual property", body: PENDING },
  { heading: "Client responsibilities", body: PENDING },
  { heading: "Limitation of liability", body: PENDING },
  { heading: "Governing law", body: PENDING },
  { heading: "Contact", body: PENDING },
];

export const privacySections: LegalSection[] = [
  { heading: "What we collect", body: PENDING },
  { heading: "How we use it", body: PENDING },
  { heading: "Third-party services", body: PENDING },
  { heading: "Cookies and local storage", body: PENDING },
  { heading: "Data retention", body: PENDING },
  { heading: "Your rights", body: PENDING },
  { heading: "Contact", body: PENDING },
];
