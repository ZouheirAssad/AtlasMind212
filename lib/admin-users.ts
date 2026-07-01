import "server-only";

import type { User } from "@supabase/supabase-js";
import { hasAdminAccess, hasAdminRole, isAdminEmail } from "@/lib/admin";
import { absoluteUrl } from "@/lib/site-config";
import { createAdminClient } from "@/lib/supabase/server";

export type AdminAccount = {
  id: string;
  email: string;
  createdAt: string;
  source: "role" | "env" | "both";
};

export type InviteAdminResult =
  | { status: "already-admin"; email: string }
  | { status: "promoted"; email: string }
  | { status: "invited"; email: string };

function adminSource(user: User): AdminAccount["source"] | null {
  const fromRole = hasAdminRole(user);
  const fromEnv = isAdminEmail(user.email);

  if (fromRole && fromEnv) return "both";
  if (fromRole) return "role";
  if (fromEnv) return "env";

  return null;
}

function withAdminRole(appMetadata: User["app_metadata"]) {
  return {
    ...appMetadata,
    role: "admin",
  };
}

async function listAllAuthUsers() {
  const supabase = createAdminClient();
  const users: User[] = [];

  for (let page = 1; page < 100; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: 1000,
    });

    if (error) throw error;

    users.push(...data.users);

    if (!data.nextPage) break;
  }

  return users;
}

export async function listAdminAccounts(): Promise<AdminAccount[]> {
  const users = await listAllAuthUsers();

  return users
    .map((user) => {
      const source = adminSource(user);
      if (!source || !user.email) return null;

      return {
        id: user.id,
        email: user.email,
        createdAt: user.created_at,
        source,
      };
    })
    .filter((account): account is AdminAccount => Boolean(account))
    .sort((a, b) => a.email.localeCompare(b.email));
}

export async function findAuthUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = await listAllAuthUsers();

  return users.find((user) => user.email?.trim().toLowerCase() === normalizedEmail) ?? null;
}

export async function inviteOrPromoteAdmin(email: string): Promise<InviteAdminResult> {
  const normalizedEmail = email.trim().toLowerCase();
  const supabase = createAdminClient();
  const existingUser = await findAuthUserByEmail(normalizedEmail);

  if (existingUser) {
    if (hasAdminAccess(existingUser)) {
      return { status: "already-admin", email: normalizedEmail };
    }

    const { error } = await supabase.auth.admin.updateUserById(existingUser.id, {
      app_metadata: withAdminRole(existingUser.app_metadata),
    });

    if (error) throw error;

    return { status: "promoted", email: normalizedEmail };
  }

  const { data, error } = await supabase.auth.admin.inviteUserByEmail(normalizedEmail, {
    redirectTo: absoluteUrl("/admin/set-password"),
  });

  if (error) throw error;

  if (data.user) {
    const { error: updateError } = await supabase.auth.admin.updateUserById(data.user.id, {
      app_metadata: withAdminRole(data.user.app_metadata),
    });

    if (updateError) throw updateError;
  }

  return { status: "invited", email: normalizedEmail };
}
