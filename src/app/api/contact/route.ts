import { NextResponse } from "next/server";
import { submitContactMessage } from "@/lib/tak-api";

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const startedAt = performance.now();
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "This endpoint accepts JSON only." }, { status: 415 });
  }
  if (process.env.NODE_ENV === "production") {
    const allowedOrigins = new Set(["https://takkinship.com", "https://www.takkinship.com"]);
    if (!allowedOrigins.has(request.headers.get("origin") || "")) {
      return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
    }
  }
  const body = (await request.json().catch(() => null)) as
    | {
        firstName?: string;
        lastName?: string;
        email?: string;
        organisation?: string;
        message?: string;
        website?: string;
        startedAt?: number;
        turnstileToken?: string;
      }
    | null;

  if (
    !body?.firstName?.trim() ||
    !body?.lastName?.trim() ||
    !body?.email?.trim() ||
    !body?.message?.trim()
  ) {
    return NextResponse.json(
      { error: "Please complete every required field." },
      { status: 400 },
    );
  }

  if (
    body.firstName.length > 100 ||
    body.lastName.length > 100 ||
    (body.organisation?.length ?? 0) > 150 ||
    body.email.length > 254 ||
    body.message.length > 5000
  ) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
  }

  // Return a normal-looking response to honeypot bots so they do not adapt.
  const elapsed = Date.now() - Number(body.startedAt || 0);
  if (body.website?.trim() || !Number.isFinite(elapsed) || elapsed < 1500) {
    return NextResponse.json({ ok: true, requestId });
  }

  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const clientIp = forwardedFor.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "";
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();
  let turnstileVerified = false;
  if (turnstileSecret) {
    const token = body.turnstileToken?.trim();
    if (!token) {
      return NextResponse.json({ error: "Please complete the security check." }, { status: 400 });
    }
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ secret: turnstileSecret, response: token, remoteip: clientIp }),
      cache: "no-store",
    }).then((response) => response.json()).catch(() => null) as
      | { success?: boolean; hostname?: string; action?: string }
      | null;
    const allowedHosts = new Set(["takkinship.com", "www.takkinship.com"]);
    turnstileVerified = Boolean(
      verification?.success &&
      verification.action === "contact" &&
      verification.hostname &&
      allowedHosts.has(verification.hostname),
    );
    if (!turnstileVerified) {
      return NextResponse.json({ error: "The security check failed. Please try again." }, { status: 400 });
    }
  }

  const result = await submitContactMessage({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    organisation: body.organisation,
    message: body.message,
    clientIp,
    userAgent: request.headers.get("user-agent") || "",
    turnstileVerified,
  });

  if (!result.ok) {
    console.error("Contact submission failed", {
      requestId,
      status: result.status,
      durationMs: Math.round(performance.now() - startedAt),
    });
    return NextResponse.json(
      {
        error:
          "We could not send your message right now. Email info@takkinship.com instead.",
        requestId,
      },
      { status: result.status, headers: { "X-Request-ID": requestId } },
    );
  }

  console.info("Contact submission completed", {
    requestId,
    durationMs: Math.round(performance.now() - startedAt),
  });
  return NextResponse.json(
    { ok: true, requestId },
    { headers: { "X-Request-ID": requestId } },
  );
}
