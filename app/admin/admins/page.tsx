import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, UserPlus } from "lucide-react";
import { inviteAdmin } from "@/app/admin/admins/actions";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { requireAdminUser } from "@/lib/admin-auth";
import { listAdminAccounts } from "@/lib/admin-users";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Admin Users",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

type AdminsPageProps = {
  searchParams: Promise<{ message?: string; error?: string }>;
};

const sourceLabel = {
  env: "Env allowlist",
  role: "Admin role",
  both: "Env + role",
} as const;

export default async function AdminsPage({ searchParams }: AdminsPageProps) {
  const [, accounts, params] = await Promise.all([
    requireAdminUser(),
    listAdminAccounts(),
    searchParams,
  ]);

  return (
    <section className="relative overflow-hidden bg-neutral-surface py-16 sm:py-24">
      <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
      <Container className="space-y-8">
        <Button asChild variant="outline">
          <Link href="/admin/guides">
            <ArrowLeft data-icon="inline-start" /> Back to guides
          </Link>
        </Button>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-5">Private CMS</Badge>
            <h1 className="font-display text-5xl tracking-[-0.04em] sm:text-6xl">Admin users</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Invite trusted editors who can upload, edit, publish, and delete AtlasMind guides.
            </p>
          </div>
        </div>

        {(params.message || params.error) && (
          <div
            role={params.error ? "alert" : "status"}
            className={`rounded-2xl border p-4 text-sm font-semibold ${
              params.error
                ? "border-destructive/40 bg-destructive/10 text-destructive"
                : "border-primary/40 bg-primary/10 text-primary"
            }`}
          >
            {params.error ?? params.message}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <form action={inviteAdmin} className="rounded-3xl border bg-card/94 p-6 shadow-xl sm:p-8">
            <div className="mb-7 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                <UserPlus className="size-5" />
              </span>
              <div>
                <h2 className="text-2xl font-semibold">Add admin</h2>
                <p className="text-sm text-muted-foreground">Existing users are promoted; new users receive an invite email.</p>
              </div>
            </div>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="admin-invite-email">Email</FieldLabel>
                <Input id="admin-invite-email" name="email" type="email" autoComplete="email" required className="h-12" />
                <FieldDescription>
                  Admins can manage every guide, including published content and uploaded files.
                </FieldDescription>
              </Field>
              <Button type="submit" size="lg" className="h-12">
                <UserPlus data-icon="inline-start" /> Invite admin
              </Button>
            </FieldGroup>
          </form>

          <div className="rounded-3xl border bg-card/94 p-6 shadow-xl sm:p-8">
            <div className="mb-7 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <h2 className="text-2xl font-semibold">Current admins</h2>
                <p className="text-sm text-muted-foreground">{accounts.length} account{accounts.length === 1 ? "" : "s"} with CMS access.</p>
              </div>
            </div>

            {accounts.length ? (
              <div className="divide-y divide-border rounded-2xl border">
                {accounts.map((account) => (
                  <div key={account.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{account.email}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Added {new Date(account.createdAt).toLocaleDateString("en", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                      {sourceLabel[account.source]}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed bg-secondary/30 p-8 text-center text-sm text-muted-foreground">
                No Supabase Auth users currently match the admin rules.
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
