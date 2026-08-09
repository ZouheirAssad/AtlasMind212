import type { Metadata } from "next";
import { Suspense } from "react";
import { Check, Clock3, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact AtlasMind212",
  description:
    "Contact AtlasMind212 to scope a web development, backend, technical consulting, LLM integration, or workflow automation project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact AtlasMind212",
    description:
      "Scope a web development, backend, technical consulting, LLM integration, or workflow automation project.",
    url: absoluteUrl("/contact"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact AtlasMind212",
    description:
      "Scope a web development, backend, technical consulting, LLM integration, or workflow automation project.",
  },
};

const projectFit = [
  "Websites and web applications built around a clear goal.",
  "Backend services and integrations that connect real systems.",
  "Technical decisions, LLM features, and workflows that need a practical delivery path.",
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
        compact
        eyebrow="Contact"
        title="Tell us what you need to build."
        description="Share the product, system, workflow, or blocker. A little context is enough to start—we read every message and reply with a direct, useful answer."
      />
      <section className="bg-white py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
          <Reveal className="order-2 flex flex-col gap-10 lg:order-1 lg:sticky lg:top-28 lg:self-start">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                Good fit
              </p>
              <h2 className="mt-4 text-4xl leading-[1.08]">
                Software and consulting built around a real business or product need.
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {projectFit.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-7 text-muted-foreground">
                    <Check className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l-4 border-primary-display bg-[#f7f6ff] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                What happens next
              </p>
              <ol className="mt-5 flex flex-col gap-5">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center bg-primary text-xs font-semibold text-white">
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

          <Reveal className="order-1 lg:order-2" delay={0.08}>
            <Suspense fallback={<div className="min-h-[36rem] border bg-secondary/30" />}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
