import type { Metadata } from "next";
import { Suspense } from "react";
import { LockKeyhole } from "lucide-react";
import { AdminLoginForm } from "@/components/admin-login-form";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Admin Login",
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

type AdminLoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const redirectTo = params.next?.startsWith("/admin") ? params.next : "/admin/guides";

  return (
    <section className="relative overflow-hidden bg-neutral-surface py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="max-w-xl">
          <Badge className="mb-5">Owner access</Badge>
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border bg-secondary text-primary">
            <LockKeyhole className="size-6" />
          </div>
          <h1 className="font-display text-5xl leading-tight tracking-[-0.04em] sm:text-6xl">
            AtlasMind guide CMS
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Sign in with the Supabase admin account to upload, publish, and manage downloadable AI guides.
          </p>
        </div>
        <Suspense fallback={<div className="min-h-80 rounded-3xl border bg-card/90" />}>
          <AdminLoginForm redirectTo={redirectTo} />
        </Suspense>
      </Container>
    </section>
  );
}
