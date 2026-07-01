import "server-only";

import { redirect } from "next/navigation";
import { hasAdminAccess } from "@/lib/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function requireAdminUser() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data.user;

  if (error || !user || !hasAdminAccess(user)) {
    redirect("/admin/login");
  }

  return user;
}
