import { NextResponse } from "next/server";
import { recordAnalyticsEvent } from "@/lib/analytics/events";
import { createAdminClient } from "@/lib/supabase/server";
import {
  createDownloadUnlockValue,
  getDownloadUnlockCookieName,
} from "@/lib/download-cookie";
import { leadSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const parsed = leadSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check your name and email." }, { status: 400 });
    }
    const supabase = createAdminClient();
    const source = parsed.data.source || "free-guide";
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      source,
      content_slug: parsed.data.contentSlug || null,
      content_title: parsed.data.contentTitle || null,
    });
    if (error) throw error;
    await recordAnalyticsEvent({
      eventName: "lead_submitted",
      request,
      route: "/api/leads",
      metadata: {
        source,
        contentSlug: parsed.data.contentSlug || null,
        contentTitle: parsed.data.contentTitle || null,
      },
    });

    const response = NextResponse.json({ ok: true }, { status: 201 });

    if (parsed.data.contentSlug) {
      const cookieName = getDownloadUnlockCookieName(parsed.data.contentSlug);
      response.cookies.set(cookieName, createDownloadUnlockValue(parsed.data.contentSlug), {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days so they can return and redownload
        httpOnly: true,
        sameSite: "lax",
      });
    }

    return response;
  } catch (error) {
    console.error("Lead submission failed:", error);
    return NextResponse.json({ error: "Unable to save your details right now." }, { status: 500 });
  }
}
