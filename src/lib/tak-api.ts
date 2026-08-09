/**
 * Server-side client for TAK's own backend.
 *
 * WHY THIS FILE EXISTS, AND WHY IT IS SERVER-ONLY
 *
 * The live CRA site calls this same API straight from the browser with the
 * credential hardcoded in the bundle:
 *
 *   Xe = { Authorization: "Api-Key <41 chars>", "content-type": "application/json" }
 *
 * Anyone who opens view-source has the key. That key was never used here. This
 * module reads the credential from `TAK_API_KEY` at request time on the
 * server, so it is never serialized into any payload the browser receives.
 * Import it ONLY from server components and route handlers. Importing it into
 * a "use client" file is the one mistake that would undo the whole point, and
 * the `PUBLIC ONLY` guard below turns that mistake into a build-time error
 * rather than a silent leak.
 *
 * FAILURE IS NORMAL, NOT EXCEPTIONAL
 *
 * Every accessor returns `null` on any failure: no key configured, network
 * down, 403, malformed JSON, a shape we do not recognise. Callers fall back to
 * the vetted static content in `lib/about.ts` and `lib/content.ts`. That means
 * the site ships and renders correctly TODAY, with no key set, and starts
 * serving Martin's live edits the moment the rotated key is added to Vercel.
 * There is no deploy step between those two states.
 */

const BASE = "https://takkinship-backend.up.railway.app/api";

/** Fresh enough that an edit by Martin shows within five minutes, cheap enough
 *  that the API is not hit once per visitor. */
const REVALIDATE = 300;

/** Hard ceiling. A slow upstream must degrade to the static fallback, never
 *  hold a page render open. Railway free tiers cold-start. */
const TIMEOUT_MS = 6000;

if (typeof window !== "undefined") {
  throw new Error(
    "lib/tak-api.ts was imported into client code. It holds a credential and must stay on the server.",
  );
}

async function takFetch<T>(path: string): Promise<T | null> {
  const key = process.env.TAK_API_KEY;
  if (!key) return null;

  const control = new AbortController();
  const timer = setTimeout(() => control.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE}/${path.replace(/^\/+/, "")}`, {
      headers: {
        Authorization: `Api-Key ${key}`,
        "content-type": "application/json",
      },
      signal: control.signal,
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Django REST returns either a bare array or a paginated envelope depending
 *  on the viewset, and we have not seen a response body yet, so accept both. */
function asList(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) return payload as Record<string, unknown>[];
  if (payload && typeof payload === "object") {
    const results = (payload as { results?: unknown }).results;
    if (Array.isArray(results)) return results as Record<string, unknown>[];
  }
  return [];
}

/** First non-empty string among the given keys. The field names are unknown
 *  until we hold a real key, so read the plausible ones rather than guessing
 *  one and shipping blanks. */
function pick(row: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = row[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

export type LiveTeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

/**
 * The live roster.
 *
 * Returns null unless every row carries at least a name and an image, because
 * a half-populated grid on a real company's About page is worse than the
 * static one we already verified by hand off the rendered site.
 */
export async function getLiveTeam(): Promise<LiveTeamMember[] | null> {
  const rows = asList(await takFetch<unknown>("team-members/"));
  if (rows.length === 0) return null;

  const members = rows.map((row) => ({
    name: pick(row, "name", "full_name", "fullName"),
    role: pick(row, "role", "position", "title", "job_title"),
    bio: pick(row, "bio", "description", "about", "message"),
    image: pick(row, "image", "photo", "profile_pic", "profile_picture", "avatar"),
  }));

  return members.every((m) => m.name && m.image) ? members : null;
}

export type LiveTestimonial = {
  quote: string;
  author: string;
  role: string;
  image: string;
};

/**
 * Testimonials.
 *
 * The rebuild deliberately ships NO testimonials section, because inventing
 * praise for a real company is not on the table. This is the honest way to get
 * one: it renders only when the backend actually returns quotes, so the
 * section appears the day Martin adds the first real one and never before.
 */
export async function getLiveTestimonials(): Promise<LiveTestimonial[] | null> {
  const rows = asList(await takFetch<unknown>("testimonials/"));
  if (rows.length === 0) return null;

  const items = rows
    .map((row) => ({
      quote: pick(row, "message", "quote", "testimonial", "content", "body"),
      author: pick(row, "name", "author", "client_name", "full_name"),
      role: pick(row, "role", "position", "company", "organisation", "title"),
      image: pick(row, "image", "photo", "avatar", "profile_pic"),
    }))
    .filter((t) => t.quote && t.author);

  return items.length > 0 ? items : null;
}

/** True when a credential is configured at all. Used only to decide whether a
 *  fallback is an expected default or a real outage worth logging. */
export const apiConfigured = Boolean(process.env.TAK_API_KEY);
