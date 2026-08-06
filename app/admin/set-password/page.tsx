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
    <section className="min-h-screen bg-[#f7f6ff] py-16 sm:py-24">
      <Container className="grid min-h-[40rem] gap-0 border bg-white shadow-[0_18px_60px_rgb(34_25_85/0.1)] lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="flex max-w-xl flex-col justify-center bg-primary p-8 text-white sm:p-12">
          <Badge className="mb-5 bg-white text-primary hover:bg-white">Admin invite</Badge>
          <div className="mb-5 flex size-14 items-center justify-center bg-white/12 text-white">
            <KeyRound className="size-6" />
          </div>
          <h1 className="font-display text-5xl leading-tight tracking-[-0.04em] sm:text-6xl">
            Set your admin password
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/78">
            Finish the invite setup to manage AtlasMind guides from the private CMS.
          </p>
        </div>
        <div className="flex items-center p-7 sm:p-12"><AdminSetPasswordForm /></div>
      </Container>
    </section>
  );
}
