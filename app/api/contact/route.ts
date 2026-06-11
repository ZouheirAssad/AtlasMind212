import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
    }
    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      project_type: parsed.data.projectType || null,
      message: parsed.data.message,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Contact submission failed:", error);
    return NextResponse.json({ error: "Unable to send your message right now." }, { status: 500 });
  }
}
