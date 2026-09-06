import { NextResponse } from "next/server";
import { submitContactMessage } from "@/lib/tak-api";

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const body = (await request.json().catch(() => null)) as
    | {
        firstName?: string;
        lastName?: string;
        email?: string;
        organisation?: string;
        message?: string;
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

  const result = await submitContactMessage({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    organisation: body.organisation,
    message: body.message,
  });

  if (!result.ok) {
    console.error("Contact submission failed", {
      requestId,
      upstreamStatus: result.status,
    });
    return NextResponse.json(
      {
        error:
          "We could not send your message right now. Email info@takkinship.com instead.",
      },
      { status: result.status, headers: { "X-Request-ID": requestId } },
    );
  }

  return NextResponse.json(
    { ok: true },
    { headers: { "X-Request-ID": requestId } },
  );
}
