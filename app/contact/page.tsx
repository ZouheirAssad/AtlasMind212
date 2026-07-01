import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckCircle2, Clock3, Mail, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact AtlasMind212",
  description:
    "Contact AtlasMind212 to scope a business website, AI assistant integration, or workflow automation project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact AtlasMind212",
    description:
      "Scope a business website, AI assistant integration, or workflow automation project.",
    url: absoluteUrl("/contact"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact AtlasMind212",
    description:
      "Scope a business website, AI assistant integration, or workflow automation project.",
  },
};

const projectFit = [
  "Business websites that load fast and convert clearly.",
  "AI assistants connected to your docs, data, and tools.",
  "Background automations that remove manual busywork.",
];

const nextSteps = [
  {
    title: "We review",
    description:
      "Your message lands in our inbox. We read the context and goals before anything else.",
  },
  {
    title: "We reply",
    description:
      "You get a direct, no-template response from a human - usually within 2 business days.",
  },
  {
    title: "We scope",
    description:
      "If the fit is right, we send a short recommendation with next steps and a timeline.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us the bottleneck."
        description="Share the project, workflow, or blocker. A little context is enough to start - we read every message and reply with a direct, useful answer."
      />
      <section className="relative overflow-hidden bg-neutral-surface py-16 sm:py-24">
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container className="relative grid gap-12 lg:grid-cols-[0.58fr_1.42fr]">
          <Reveal className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Sparkles className="size-6" />
            </span>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                Good fit
              </p>
              <h2 className="mt-3 text-4xl tracking-[-0.035em]">
                AI workflows, n8n builds, content systems, and practical tool strategy.
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {projectFit.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary/30 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                What happens next
              </p>
              <ol className="mt-5 flex flex-col gap-5">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-secondary font-mono text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-4 border-t border-border/40 pt-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 size-5 text-primary" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted-foreground">hello@atlasmind212.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-1 size-5 text-primary" />
                <div>
                  <p className="font-semibold">Response time</p>
                  <p className="text-muted-foreground">Usually within 2 business days.</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Suspense fallback={<div className="min-h-[36rem] rounded-3xl bg-secondary/30" />}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
