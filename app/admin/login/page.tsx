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
    <section className="min-h-screen bg-[#f7f6ff] py-16 sm:py-24">
      <Container className="grid min-h-[40rem] gap-0 border bg-white shadow-[0_18px_60px_rgb(34_25_85/0.1)] lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="flex max-w-xl flex-col justify-center bg-primary p-8 text-white sm:p-12">
          <Badge className="mb-5 bg-white text-primary hover:bg-white">Owner access</Badge>
          <div className="mb-5 flex size-14 items-center justify-center bg-white/12 text-white">
            <LockKeyhole className="size-6" />
          </div>
          <h1 className="font-display text-5xl leading-tight tracking-[-0.04em] sm:text-6xl">
            AtlasMind guide CMS
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/78">
            Sign in with the Supabase admin account to upload, publish, and manage downloadable guides.
          </p>
        </div>
        <div className="flex items-center p-7 sm:p-12"><Suspense fallback={<div className="min-h-80 w-full border bg-card" />}><AdminLoginForm redirectTo={redirectTo} /></Suspense></div>
      </Container>
    </section>
  );
}
