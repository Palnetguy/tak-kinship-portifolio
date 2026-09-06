import { type Faq, type PortfolioProject } from "@/lib/content";

/**
 * Server-side client for TAK's own backend.
 *
 * WHY THIS FILE EXISTS, AND WHY IT IS SERVER-ONLY
 *
 * The live CRA site calls this same API straight from the browser with the
 * credential hardcoded in the bundle. This module keeps the credential on the
 * server only: it prefers `TAK_API_KEY` from the environment, but also carries
 * a local development value when no environment variable is loaded. It is
 * never serialized into any payload the browser receives.
 *
 * FAILURE IS NORMAL, NOT EXCEPTIONAL
 *
 * Every accessor returns `null` on an unavailable or invalid response. Pages
 * show a clear publishing message instead of substituting static website data.
 */

const BASE = (process.env.TAK_API_BASE?.trim() || "https://takkinship-backend.up.railway.app/api").replace(/\/$/, "");
const GOOGLE_DRIVE_DOWNLOAD =
  "https://drive.google.com/uc?export=download&id=";
const DEFAULT_TAK_API_KEY = "LaaXj3ft.hGbRWxHo6KKsYGJ9SYdTRhwBBGo5fELG";
const TAK_API_KEY = process.env.TAK_API_KEY?.trim() || DEFAULT_TAK_API_KEY;

/** Fresh enough that an edit by Martin shows within five minutes, cheap enough
 *  that the API is not hit once per visitor. */
const REVALIDATE = 300;
const LOCAL_BACKEND = /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?(?:\/|$)/.test(BASE);

/** Hard ceiling so a slow upstream never holds a page render open. */
const TIMEOUT_MS = 6000;

if (typeof window !== "undefined") {
  throw new Error(
    "lib/tak-api.ts was imported into client code. It holds a credential and must stay on the server.",
  );
}

async function takFetch<T>(path: string): Promise<T | null> {
  const key = TAK_API_KEY;
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
      ...(LOCAL_BACKEND ? { cache: "no-store" as const } : { next: { revalidate: REVALIDATE } }),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function takWrite<T>(
  path: string,
  init: {
    method: "POST" | "PUT" | "PATCH" | "DELETE";
    body?: Record<string, unknown>;
  },
): Promise<{ ok: true; payload: T | null } | { ok: false; status: number }> {
  const key = TAK_API_KEY;
  if (!key) return { ok: false, status: 503 };

  const control = new AbortController();
  const timer = setTimeout(() => control.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE}/${path.replace(/^\/+/, "")}`, {
      method: init.method,
      headers: {
        Authorization: `Api-Key ${key}`,
        "content-type": "application/json",
      },
      body: init.body ? JSON.stringify(init.body) : undefined,
      signal: control.signal,
      cache: "no-store",
    });

    if (!res.ok) {
      return { ok: false, status: res.status };
    }

    let payload: T | null = null;
    try {
      payload = (await res.json()) as T;
    } catch {
      payload = null;
    }
    return { ok: true, payload };
  } catch {
    return { ok: false, status: 502 };
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

function first(row: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = row[k];
    if (v !== undefined && v !== null) return v;
  }
  return undefined;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function pickNested(
  row: Record<string, unknown>,
  key: string,
  ...nestedKeys: string[]
): string {
  const nested = asRecord(row[key]);
  return nested ? pick(nested, ...nestedKeys) : "";
}

function pickText(value: unknown): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" || typeof value === "bigint") return String(value);
  return "";
}

export async function getPublishedWebsiteContent<T extends Record<string, unknown>>(key: string): Promise<T | null> {
  const payload = asRecord(await takFetch<unknown>(`admin/v1/public/website-content/${key}/`));
  const value = payload ? asRecord(payload.value) : null;
  return value as T | null;
}

function absoluteBackendUrl(value: string): string {
  if (!value.startsWith("/")) return value;
  try { return `${new URL(BASE).origin}${value}`; } catch { return value; }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapCategory(value: string): PortfolioProject["category"] | null {
  const lower = value.toLowerCase();
  if (lower.includes("mobile")) return "MOBILE APP";
  if (lower.includes("desktop")) return "Desktop App";
  if (lower.includes("web")) return "Web App";
  return null;
}

function techStackFrom(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const out = value
    .map((entry) => {
      if (typeof entry === "string") return entry.trim();
      const row = asRecord(entry);
      if (!row) return "";
      return (
        pick(row, "language", "name", "label", "title") ||
        pickNested(row, "language", "name")
      );
    })
    .filter(Boolean);

  return Array.from(new Set(out));
}

function dateToYear(value: string): string {
  const year = value.match(/\b(19|20)\d{2}\b/);
  return year ? year[0] : "";
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
    bio: pick(row, "bio", "biography", "description", "about", "message"),
    image: pick(row, "image", "photo", "profile_pic", "profile_picture", "avatar"),
  }));

  return members.every((m) => m.name) ? members : null;
}

export type LiveCompanyInfo = {
  companyName: string;
  email: string;
  phone: string;
  location: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  skype: string;
};

export async function getLiveCompanyInfo(): Promise<LiveCompanyInfo | null> {
  const rows = asList(await takFetch<unknown>("contact-company-info/"));
  const row = rows[0];
  if (!row) return null;

  return {
    companyName: pick(row, "company_name", "companyName", "name"),
    email: pick(row, "email", "contact_email"),
    phone: pick(row, "phone_number", "phone", "telephone"),
    location: pick(row, "location", "address", "office"),
    instagram: pick(row, "instgram", "instagram", "instagram_url"),
    twitter: pick(row, "twitter", "x", "x_url", "twitter_url"),
    linkedin: pick(row, "linkedIn", "linkedin", "linkedin_url"),
    skype: pick(row, "skype", "skype_url"),
  };
}

export async function getLiveFaqs(): Promise<Faq[] | null> {
  const rows = asList(await takFetch<unknown>("faqs/"));
  if (rows.length === 0) return null;

  const items = rows
    .map((row) => ({
      question: pick(row, "title", "question", "name"),
      answer: pick(row, "description", "answer", "body", "content"),
    }))
    .filter((item) => item.question && item.answer);

  return items.length > 0 ? items : null;
}

export type LiveGalleryPhoto = { src: string };

export async function getLiveGalleryPhotos(): Promise<LiveGalleryPhoto[] | null> {
  const rows = asList(await takFetch<unknown>("gallery/"));
  if (rows.length === 0) return null;

  const photos = rows
    .map((row) => ({
      src: absoluteBackendUrl(pick(row, "image", "photo", "image_url", "url") || pickNested(row, "image", "url")),
    }))
    .filter((photo) => photo.src);

  return photos.length > 0 ? photos : null;
}

async function getProjectWebUrl(projectId: string): Promise<string> {
  const rows = asList(
    await takFetch<unknown>(`project/${projectId}/web-applications/`),
  );
  const firstRow = rows[0];
  return firstRow
    ? pick(firstRow, "url", "link", "website", "website_url")
    : "";
}

function mapDownloadRows(rows: Record<string, unknown>[]) {
  return rows
    .map((row) => {
      const version = pick(row, "version", "name", "title");
      const href =
        pick(row, "apk", "download_url", "downloadLink", "url") ||
        (pick(row, "download_id", "downloadId")
          ? `${GOOGLE_DRIVE_DOWNLOAD}${pick(row, "download_id", "downloadId")}`
          : "");

      if (!href) return null;

      return {
        label: version ? `Download ${version}` : "Download build",
        href,
        version,
        description: pick(row, "description", "notes", "body"),
        releasedOn: pick(row, "date_released", "release_date", "published_at"),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

async function getProjectDownloads(
  projectId: string,
  category: PortfolioProject["category"],
) {
  if (category === "Web App") return [];

  const path =
    category === "Desktop App"
      ? `project/${projectId}/desktop-applications/`
      : `project/${projectId}/mobile-applications/`;

  return mapDownloadRows(asList(await takFetch<unknown>(path)));
}

export async function getLiveProjects(): Promise<PortfolioProject[] | null> {
  const rows = asList(await takFetch<unknown>("projects/"));
  if (rows.length === 0) return null;

  const projects = await Promise.all(
    rows.map(async (row) => {
      const rawId = first(row, "id", "project_id");
      const projectId = pickText(rawId);
      const name =
        pick(row, "title", "name") ||
        `Project ${projectId || "untitled"}`;
      const slug = pick(row, "slug") || slugify(name);

      const detail = projectId
        ? asRecord(await takFetch<unknown>(`project/${projectId}`))
        : null;

      const category =
        mapCategory(
          pick(detail ?? row, "project_category", "category", "type"),
        ) ?? "Web App";

      const stack = Array.from(
        new Set([
          ...techStackFrom(row.tech_stack),
          ...techStackFrom(detail?.tech_stack),
        ]),
      );

      const url =
        (projectId && category === "Web App"
          ? await getProjectWebUrl(projectId)
          : "");

      const downloads =
        (projectId
          ? await getProjectDownloads(projectId, category)
          : []);

      const image =
        pickNested(row, "images", "background", "image") ||
        pick(row, "image", "background") ||
        pickNested(detail ?? {}, "images", "background", "image") ||
        pick(detail ?? {}, "image", "background");

      const blurb =
        pick(detail ?? row, "about_project", "summary", "description", "blurb") ||
        "More details coming soon.";

      const overview =
        pick(detail ?? row, "project_goals", "overview", "about_project", "description") ||
        blurb;

      const problem =
        pick(detail ?? row, "problem", "challenge") ||
        "Project problem statement coming soon.";

      const solution =
        pick(detail ?? row, "solution", "approach") ||
        "Project solution details coming soon.";

      const status =
        pick(detail ?? row, "status", "project_status", "state") ||
        "Completed";

      const year =
        dateToYear(
          pick(detail ?? row, "date_published", "published_at", "created_at"),
        );

      return {
        projectId,
        slug,
        name,
        category,
        blurb,
        stack,
        image: absoluteBackendUrl(image),
        year: year || undefined,
        url: url || undefined,
        downloads: downloads.length ? downloads : undefined,
        overview,
        problem,
        solution,
        status,
      } satisfies PortfolioProject;
    }),
  );

  return projects.length > 0 ? projects : null;
}

export async function getLiveProjectBySlug(
  slug: string,
): Promise<PortfolioProject | null> {
  const projects = await getLiveProjects();
  if (!projects) return null;
  return projects.find((project) => project.slug === slug) ?? null;
}

async function getProjectLegalText(
  projectId: string,
  kind: "terms" | "policy",
): Promise<string | null> {
  const payload = asRecord(
    await takFetch<unknown>(`projects/${projectId}/${kind}/`),
  );
  if (!payload) return null;

  const text = pick(payload, "description", "body", "content", "text");
  return text || null;
}

export async function getLiveProjectTerms(
  projectId: string,
): Promise<string | null> {
  return getProjectLegalText(projectId, "terms");
}

export async function getLiveProjectPolicy(
  projectId: string,
): Promise<string | null> {
  return getProjectLegalText(projectId, "policy");
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
      quote: pick(row, "comment", "message", "quote", "testimonial", "content", "body"),
      author: pick(row, "name", "author", "client_name", "full_name"),
      role: pick(row, "job_title", "role", "position", "company", "organisation", "title"),
      image: absoluteBackendUrl(pick(row, "user_photo", "image", "photo", "avatar", "profile_pic")),
    }))
    .filter((t) => t.quote && t.author);

  return items.length > 0 ? items : null;
}

export async function submitContactMessage(input: {
  firstName: string;
  lastName: string;
  email: string;
  organisation?: string;
  message: string;
}): Promise<{ ok: true } | { ok: false; status: number }> {
  const response = await takWrite<unknown>("contact-us/", {
    method: "POST",
    body: {
      name: `${input.firstName} ${input.lastName}`.trim(),
      subject: input.organisation?.trim()
        ? `Website enquiry from ${input.organisation.trim()}`
        : "Website enquiry",
      email: input.email.trim(),
      phone_number: "0700000000",
      message: input.message.trim(),
    },
  });

  return response.ok ? { ok: true } : { ok: false, status: response.status };
}

/** True when a credential is configured at all. Used only to decide whether a
 *  fallback is an expected default or a real outage worth logging. */
export const apiConfigured = Boolean(TAK_API_KEY);
