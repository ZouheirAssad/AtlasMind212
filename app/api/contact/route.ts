import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { sendContactNotification } from "@/lib/email/contact-notification";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again." },
        { status: 400 },
      );
    }
    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      project_type: parsed.data.projectType || null,
      message: parsed.data.message,
    });
    if (error) throw error;

    // The message is safely stored. Email delivery is best-effort: if it
    // fails we log server-side but still return success so the user does not
    // resubmit and create a duplicate row.
    try {
      await sendContactNotification({
        name: parsed.data.name,
        email: parsed.data.email,
        projectType: parsed.data.projectType,
        message: parsed.data.message,
        submittedAt: new Date().toISOString(),
      });
    } catch (emailError) {
      console.error(
        "[SERVER] Contact notification email failed to deliver:",
        emailError,
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Contact submission failed:", error);
    const message = error instanceof Error ? error.message : "";
    const isConfigError =
      /environment variables (are not configured|still contain placeholder values)/i.test(
        message,
      );
    if (isConfigError) {
      // In development this surfaces the real problem quickly; in production it
      // still protects secrets while giving maintainers an actionable server log.
      console.error(
        "Invalid Supabase server environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL points at the real project and SUPABASE_SERVICE_ROLE_KEY is the project's server-only service role key.",
      );
    }
    return NextResponse.json(
      { error: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}
