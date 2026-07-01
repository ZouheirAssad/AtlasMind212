type AdminCandidate = {
  email?: string | null;
  app_metadata?: Record<string, unknown> | null;
};

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false;

  return getAdminEmails().includes(email.trim().toLowerCase());
}

export function hasAdminRole(user?: AdminCandidate | null) {
  const appMetadata = user?.app_metadata;
  if (!appMetadata) return false;

  if (appMetadata.role === "admin") return true;

  const roles = appMetadata.roles;
  return Array.isArray(roles) && roles.includes("admin");
}

export function hasAdminAccess(user?: AdminCandidate | null) {
  return Boolean(user && (isAdminEmail(user.email) || hasAdminRole(user)));
}
