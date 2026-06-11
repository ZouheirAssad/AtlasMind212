import { Suspense } from "react";
import { Clock3, Mail, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="What do you want to build smarter?" description="Share the project, workflow, or bottleneck. A little context is enough to start." />
      <section className="relative overflow-hidden bg-neutral-surface py-16 sm:py-24">
        {/* Soft grid + grain overlay */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container className="relative grid gap-12 lg:grid-cols-[0.58fr_1.42fr]">
          <Reveal className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Sparkles className="size-6" /></span>
            <div><p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Good fit</p><h2 className="mt-3 text-4xl tracking-[-0.035em]">AI workflows, n8n builds, content systems, and practical tool strategy.</h2></div>
            <div className="flex items-start gap-3"><Mail className="mt-1 size-5 text-primary" /><div><p className="font-semibold">Email</p><p className="text-muted-foreground">hello@atlasmind212.com</p></div></div>
            <div className="flex items-start gap-3"><Clock3 className="mt-1 size-5 text-primary" /><div><p className="font-semibold">Response time</p><p className="text-muted-foreground">Usually within 2 business days.</p></div></div>
          </Reveal>
          <Reveal delay={0.08}><Suspense fallback={<div className="min-h-[36rem] rounded-3xl bg-secondary/30" />}><ContactForm /></Suspense></Reveal>
        </Container>
      </section>
    </>
  );
}
