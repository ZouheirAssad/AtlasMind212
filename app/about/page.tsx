import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About AtlasMind212",
  description:
    "Learn how AtlasMind212 builds reliable business websites, AI integrations, and workflow automations with clear scopes and documented handoff.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About AtlasMind212",
    description:
      "Reliable business websites, AI integrations, and workflow automations built with clear scopes and documented handoff.",
    url: absoluteUrl("/about"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About AtlasMind212",
    description:
      "Reliable business websites, AI integrations, and workflow automations built with clear scopes and documented handoff.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Philosophy"
        title="AI implementation built for reliability."
        description="We build high-performance business websites, integrate custom AI assistants, and deploy background automations with guaranteed timelines and clean handoff."
      />

      {/* Concise Credibility Band */}
      <section className="border-b border-border/40 bg-[#07111F]/30 py-8 backdrop-blur-sm">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Fixed-Scope Delivery",
                desc: "Guaranteed timelines and scopes mapped before writing code. No budget creep."
              },
              {
                title: "Production-Grade Tech",
                desc: "Websites built with Next.js, secure APIs, and n8n background workflows."
              },
              {
                title: "Documented Handoff",
                desc: "Every database RLS policy, workflow model, and sync route documented for your team."
              }
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="flex flex-col gap-1 border-l border-primary/20 pl-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">{item.title}</span>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-blush py-16 sm:py-24">
        {/* Soft grid + grain overlay */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container className="relative">
          {/* Main image / story section */}
          <Reveal className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Image
              src="/images/about-atlas-night.webp"
              alt="A dark 3D knowledge atlas connecting tools, ideas, and outcomes with cyan routes"
              width={1536}
              height={1024}
              loading="eager"
              className="aspect-[3/2] w-full rounded-[2rem] border border-primary/20 object-cover shadow-[0_24px_70px_rgb(0_0_0/0.3)]"
            />
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Core Belief</p>
              <h2 className="mt-5 text-4xl sm:text-5xl font-display font-normal leading-tight text-foreground">
                Smarter operations, not more complexity.
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground font-sans">
                <p>
                  At AtlasMind212, we believe technology should be an asset, not a source of confusion. Large AI transformations often fail because they are abstract, expensive, and disconnected from daily operations.
                </p>
                <p>
                  We focus strictly on the implementation layer. We replace vague promises with predictable, high-performance business websites, focused AI assistants, and automated background syncs that run without manual supervision.
                </p>
                <p>
                  Our goal is to build simple, robust systems that do exactly what you expect them to do, ensuring your team has full ownership of the completed setups from day one.
                </p>
              </div>
            </div>
          </Reveal>

          {/* "How Trust is Built" Process */}
          <div className="mt-24 border-t border-border/30 pt-16">
            <div className="max-w-2xl mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">Our Principles</span>
              <h2 className="mt-3 text-3xl font-display font-normal text-foreground sm:text-4xl">
                How Trust is Built
              </h2>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-prose">
                {"Trust isn't declared; it's engineered. We structure every phase of our work around transparency, verification, and clear boundaries."}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Diagnose first",
                  desc: "We analyze your actual operations and bottlenecks before proposing a single line of code. We don't sell generic templates."
                },
                {
                  step: "02",
                  title: "Simplest useful system",
                  desc: "We build the most direct, minimal system needed to achieve the target outcome. Less complexity means higher reliability."
                },
                {
                  step: "03",
                  title: "Visible checkpoints",
                  desc: "You can track progress live on a staging site. Every week brings a tangible, functional deployment you can test."
                },
                {
                  step: "04",
                  title: "Documented ownership",
                  desc: "We hand over a fully documented setup. You own the code, the accounts, and the API keys. No vendor lock-in."
                }
              ].map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="rounded-2xl border border-border/40 bg-[#07111F]/50 p-6 hover:border-primary/20 hover:bg-[#07111F]/90 transition-all duration-300 h-full flex flex-col justify-start">
                    <span className="font-mono text-xs font-bold text-primary/80 uppercase tracking-widest bg-secondary/80 px-2 py-0.5 rounded border border-border/20 w-fit">
                      {item.step}
                    </span>
                    <h3 className="mt-6 text-lg font-display font-normal text-foreground">{item.title}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* comparative "Good Fit" Qualification panels */}
          <div className="mt-24 border-t border-border/30 pt-16">
            <div className="max-w-2xl mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-primary/80">Qualification</span>
              <h2 className="mt-3 text-3xl font-display font-normal text-foreground sm:text-4xl">
                Is AtlasMind212 right for you?
              </h2>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-prose">
                We believe in starting alignment early. Here is a clear breakdown of who we serve best, and when we are not the right partner.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Left Column: Good Fit */}
              <Reveal className="rounded-3xl border border-border/40 bg-[#07111F]/40 p-8 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">Good Fit If:</h3>
                </div>
                <ul className="space-y-4 flex-grow">
                  {[
                    "You need a conversion-focused marketing site built with Next.js & Tailwind.",
                    "You want to connect AI assistants that fetch live data from your internal sheets, CRM, or document stores.",
                    "You are looking to replace manual file transfers and spreadsheets with automated n8n background workflows.",
                    "You value speed, fixed-scope agreements, and direct communication with technical builders."
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="size-4 shrink-0 text-primary mt-1" />
                      <span className="text-sm text-muted-foreground leading-relaxed font-sans">{text}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Right Column: Not a Good Fit */}
              <Reveal className="rounded-3xl border border-border/40 bg-[#07111F]/40 p-8 h-full flex flex-col" delay={0.1}>
                <div className="flex items-center gap-2 mb-6">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-accent">Not a Good Fit If:</h3>
                </div>
                <ul className="space-y-4 flex-grow">
                  {[
                    "You want a custom-trained large language model (LLM) built from scratch (we implement and connect models, we do not train base models).",
                    "You are looking for general business consulting or broad digital strategy rather than concrete system building.",
                    "You prefer fluid, open-ended scopes where requirements shift weekly without timeline adjustments.",
                    "You need 24/7 custom application support SLA agreements (we build and hand over maintainable setups, we do not run round-the-clock IT helpdesks)."
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <X aria-hidden="true" className="size-4 shrink-0 text-accent mt-1" />
                      <span className="text-sm text-muted-foreground leading-relaxed font-sans">{text}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          {/* bottom CTA Band */}
          <Reveal className="mt-24 rounded-[2rem] border border-primary/20 bg-[#07111F] p-8 text-center shadow-[0_24px_70px_rgb(0_0_0/0.25)] sm:p-12 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-primary/5 blur-3xl rounded-full" />

            <span className="font-mono text-xs uppercase tracking-widest text-primary">Get Started</span>
            <h2 className="mt-4 font-display text-3xl font-normal sm:text-4xl text-foreground">
              Ready to build?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground font-sans">
              Explore our structured services or book a scoping call to align on your project.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-primary text-background hover:bg-cyan-glow transition-all duration-300">
                <Link href="/contact">Book scoping call</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/services">View services</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
