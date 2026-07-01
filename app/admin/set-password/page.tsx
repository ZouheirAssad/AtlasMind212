import type { Metadata } from "next";
import { KeyRound } from "lucide-react";
import { AdminSetPasswordForm } from "@/components/admin-set-password-form";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Set Admin Password",
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

export default function AdminSetPasswordPage() {
  return (
    <section className="relative overflow-hidden bg-neutral-surface py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="max-w-xl">
          <Badge className="mb-5">Admin invite</Badge>
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border bg-secondary text-primary">
            <KeyRound className="size-6" />
          </div>
          <h1 className="font-display text-5xl leading-tight tracking-[-0.04em] sm:text-6xl">
            Set your admin password
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Finish the invite setup to manage AtlasMind guides from the private CMS.
          </p>
        </div>
        <AdminSetPasswordForm />
      </Container>
    </section>
  );
}
