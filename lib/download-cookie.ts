import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const COOKIE_NAME_PREFIX = "download_unlocked_";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getCookieSecret() {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error("Server-only Supabase service role key is not configured; cannot sign download cookies.");
  }
  return secret;
}

function signValue(slug: string, timestampSeconds: number) {
  const secret = getCookieSecret();
  const payload = `${slug}:${timestampSeconds}`;
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createDownloadUnlockValue(slug: string) {
  const timestampSeconds = Math.floor(Date.now() / 1000);
  const signature = signValue(slug, timestampSeconds);
  return `${slug}:${timestampSeconds}:${signature}`;
}

export function verifyDownloadUnlockValue(slug: string, value: string | undefined) {
  if (!value) return false;

  const parts = value.split(":");
  if (parts.length !== 3) return false;

  const [tokenSlug, timestampStr, signature] = parts;
  if (tokenSlug !== slug) return false;

  const timestamp = Number(timestampStr);
  if (!Number.isFinite(timestamp)) return false;

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (timestamp + COOKIE_MAX_AGE_SECONDS < nowSeconds) return false;

  const expected = signValue(slug, timestamp);
  const signatureBuf = Buffer.from(signature, "hex");
  const expectedBuf = Buffer.from(expected, "hex");
  if (signatureBuf.length !== expectedBuf.length) return false;

  return timingSafeEqual(signatureBuf, expectedBuf);
}

export function getDownloadUnlockCookieName(slug: string) {
  return `${COOKIE_NAME_PREFIX}${slug}`;
}

export async function isDownloadUnlocked(slug: string, cookieStore: ReadonlyRequestCookies) {
  const name = getDownloadUnlockCookieName(slug);
  const value = cookieStore.get(name)?.value;
  return verifyDownloadUnlockValue(slug, value);
}
