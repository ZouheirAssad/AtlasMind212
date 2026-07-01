"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin-auth";
import { inviteOrPromoteAdmin } from "@/lib/admin-users";
import { adminInviteSchema } from "@/lib/validations";

function redirectToAdmins(params: Record<string, string>): never {
  const searchParams = new URLSearchParams(params);
  redirect(`/admin/admins?${searchParams.toString()}`);
}

export async function inviteAdmin(formData: FormData) {
  await requireAdminUser();

  const parsed = adminInviteSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    redirectToAdmins({
      error: parsed.error.issues[0]?.message ?? "Please enter a valid admin email address.",
    });
  }

  try {
    const result = await inviteOrPromoteAdmin(parsed.data.email);

    revalidatePath("/admin/admins");

    if (result.status === "already-admin") {
      redirectToAdmins({ message: `${result.email} already has admin access.` });
    }

    if (result.status === "promoted") {
      redirectToAdmins({ message: `${result.email} can now manage guides.` });
    }

    redirectToAdmins({ message: `Invite sent to ${result.email}.` });
  } catch (error) {
    console.error("Unable to invite admin", error);
    redirectToAdmins({ error: "Unable to add this admin. Check the email and Supabase Auth settings." });
  }
}
