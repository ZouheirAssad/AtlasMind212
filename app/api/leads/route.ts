import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const parsed = leadSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check your name and email." }, { status: 400 });
    }
    const supabase = createAdminClient();
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      source: "free-guide",
    });
    if (error) throw error;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Lead submission failed:", error);
    return NextResponse.json({ error: "Unable to save your details right now." }, { status: 500 });
  }
}
