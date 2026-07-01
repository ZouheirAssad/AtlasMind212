import crypto from "crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DrainEvent = Record<string, unknown>;

function hmacSha1(data: Buffer, secret: string) {
  return crypto.createHmac("sha1", secret).update(data).digest("hex");
}

function signaturesMatch(expected: string, received: string | null) {
  if (!received) return false;

  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(received, "hex");
  return (
    expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

function textValue(value: unknown, maxLength = 500) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, maxLength) : null;
}

function parseEventData(value: unknown) {
  if (!value) return {};
  const parsed = typeof value === "string" ? parseJson(value) : value;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

  return Object.fromEntries(
    Object.entries(parsed as Record<string, unknown>)
      .filter(([, entry]) => ["string", "number", "boolean"].includes(typeof entry) || entry === null)
      .map(([key, entry]) => [
        key.slice(0, 255),
        typeof entry === "string" ? entry.slice(0, 255) : entry,
      ]),
  );
}

function parseJson(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

function parseDrainPayload(rawBody: string) {
  const trimmed = rawBody.trim();
  if (!trimmed) return [];

  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    const parsed = parseJson(trimmed);
    return Array.isArray(parsed) ? parsed : parsed ? [parsed] : [];
  }

  return trimmed
    .split(/\r?\n/)
    .map((line) => parseJson(line))
    .filter(Boolean);
}

function toEventRow(event: DrainEvent) {
  const timestamp = typeof event.timestamp === "number" ? event.timestamp : Date.now();

  return {
    occurred_at: new Date(timestamp).toISOString(),
    event_type: textValue(event.eventType, 80) ?? "unknown",
    event_name: textValue(event.eventName, 255),
    path: textValue(event.path, 500),
    route: textValue(event.route, 500),
    referrer: textValue(event.referrer, 500),
    query_params: textValue(event.queryParams, 1000),
    country: textValue(event.country, 16),
    region: textValue(event.region, 80),
    device_type: textValue(event.deviceType, 80),
    os_name: textValue(event.osName, 120),
    browser_name: textValue(event.clientName, 120),
    environment: textValue(event.vercelEnvironment, 80),
    deployment: textValue(event.deployment, 255),
    event_data: parseEventData(event.eventData),
    raw_metadata: {
      schema: textValue(event.schema, 80),
    },
  };
}

export async function POST(request: Request) {
  const signatureSecret = process.env.VERCEL_ANALYTICS_DRAIN_SECRET;
  if (!signatureSecret) {
    return NextResponse.json(
      { code: "not_configured", error: "Vercel Analytics Drain secret is not configured." },
      { status: 503 },
    );
  }

  const rawBody = await request.text();
  const rawBodyBuffer = Buffer.from(rawBody, "utf-8");
  const expectedSignature = hmacSha1(rawBodyBuffer, signatureSecret);

  if (!signaturesMatch(expectedSignature, request.headers.get("x-vercel-signature"))) {
    return NextResponse.json(
      { code: "invalid_signature", error: "Signature did not match." },
      { status: 403 },
    );
  }

  const rows = parseDrainPayload(rawBody)
    .filter((event): event is DrainEvent => Boolean(event) && typeof event === "object" && !Array.isArray(event))
    .map(toEventRow);

  if (!rows.length) {
    return NextResponse.json({ ok: true, inserted: 0 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("vercel_analytics_events").insert(rows);
  if (error) {
    console.error("[analytics] Vercel drain insert failed:", error);
    return NextResponse.json(
      { code: "insert_failed", error: "Unable to store drain events." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, inserted: rows.length });
}
