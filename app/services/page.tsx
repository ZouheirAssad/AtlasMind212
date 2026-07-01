import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import { Container } from "@/components/container";
import { LogoConstellation } from "@/components/logo-constellation";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  JsonLd,
  breadcrumbJsonLd,
  servicesItemListJsonLd,
} from "@/lib/seo";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "AI Services & Implementation",
  description:
    "Explore AtlasMind212 services for business websites, AI assistant integrations, and AI workflow automation.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "AI Services & Implementation | AtlasMind212",
    description:
      "Explore AtlasMind212 services for business websites, AI assistant integrations, and AI workflow automation.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI Services & Implementation | AtlasMind212",
    description:
      "Explore AtlasMind212 services for business websites, AI assistant integrations, and AI workflow automation.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
          ]),
          servicesItemListJsonLd(services),
        ]}
      />

      <section className="relative overflow-hidden border-b border-border/40 bg-background/40 py-16 backdrop-blur-[2px] sm:py-24">
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y" />
        <div className="absolute inset-0 -z-10 bg-glow-dual opacity-70 mask-fade-y" />
        <LogoConstellation />

        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="flex flex-col gap-6 lg:col-span-7">
              <Badge variant="secondary" className="w-fit font-mono text-[10px] uppercase tracking-widest">
                Implementation Services
              </Badge>
              <h1 className="font-display text-balance text-5xl font-normal leading-[1.1] text-foreground sm:text-6xl md:text-7xl">
                Turn AI ideas into <span className="text-primary">working systems</span>.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                AtlasMind212 builds high-performance business websites, connects useful AI assistants, and automates repeatable workflows with practical scope and clean handoff.
              </p>
              <ul className="grid gap-3 font-mono text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Fixed-scope delivery in 2-5 weeks
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Direct engineer-to-client partnership
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Production-grade Supabase, AI, and automation setups
                </li>
              </ul>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="bg-primary text-background transition-all duration-300 hover:bg-cyan-glow">
                  <Link href="/contact">Book project</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="#services-list">Explore services</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal className="relative lg:col-span-5" delay={0.1}>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/10 opacity-30 blur-lg" />
              <Image
                src="/images/services-studio-night.webp"
                alt="A dark 3D AI implementation studio connected by cyan system routes"
                width={1536}
                height={1024}
                loading="eager"
                className="relative aspect-[4/3] w-full rounded-2xl border border-primary/20 object-cover shadow-[0_24px_70px_rgb(0_0_0/0.4)]"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-b border-border/40 bg-[#07111F]/30 py-10 backdrop-blur-sm">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col gap-2 rounded-2xl border border-border/40 bg-[#0b1626]/40 p-6 transition-all duration-300 hover:border-primary/40 hover:bg-[#0b1626]/80"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-mono text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {service.title}
                    </h2>
                    <span className="rounded border border-border/20 bg-secondary/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {service.timeline}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-primary opacity-80 group-hover:opacity-100">
                    <span>{service.shortTitle}</span>
                    <ArrowRight aria-hidden="true" className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="services-list" className="relative overflow-hidden bg-neutral-surface py-16 sm:py-24">
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container className="relative">
          <div className="flex flex-col gap-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const num = String(index + 1).padStart(2, "0");
              return (
                <Reveal key={service.slug} delay={index * 0.05}>
                  <article
                    id={service.slug}
                    className="relative scroll-mt-28 overflow-hidden rounded-[2rem] border border-border/40 bg-[#07111F] p-8 shadow-[0_24px_65px_rgb(0_0_0/0.28)] transition-all duration-300 hover:border-primary/30 sm:p-10 lg:p-12"
                  >
                    <div className="absolute right-0 top-0 -z-10 h-64 w-64 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex items-start gap-5">
                        <div className="flex flex-col items-center gap-2">
                          <span className="font-mono text-xs font-semibold tracking-wider text-accent/80">
                            {num}
                          </span>
                          <span className="flex size-14 items-center justify-center rounded-2xl border border-border/60 bg-[#0b1626] text-primary shadow-inner">
                            <Icon className="size-6" />
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">Service Module</span>
                          <h2 className="mt-1 text-3xl font-display font-normal text-foreground">{service.title}</h2>
                          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                            {service.definition}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-start gap-2 self-start lg:items-end">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Typical Timeline</span>
                        <span className="flex items-center gap-2 rounded-full border border-border/50 bg-[#0B1626] px-4 py-2 font-mono text-sm font-medium text-foreground shadow-sm">
                          <Clock3 className="size-4 text-primary" /> {service.timeline}
                        </span>
                      </div>
                    </div>

                    <div className="mt-10 grid gap-8 border-t border-border/30 pt-10 lg:grid-cols-12">
                      <div className="space-y-4 lg:col-span-7">
                        <h3 className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Deliverables & Specs</h3>
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {service.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-3 rounded-2xl border border-border/20 bg-[#0B1626]/60 p-4">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                              <span className="text-sm font-medium text-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-border/30 bg-[#0B1626]/40 p-6 lg:col-span-5 lg:p-8">
                        <div className="space-y-5">
                          <div>
                            <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary/80">Best Fit For</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {service.bestFor}
                            </p>
                          </div>
                          <div className="border-t border-border/20 pt-4">
                            <h3 className="font-mono text-[10px] uppercase tracking-wider text-accent/80">Target Outcome</h3>
                            <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/90">
                              {service.outcome}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 border-t border-border/20 pt-4 sm:flex-row sm:justify-end">
                          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                            <Link href={`/services/${service.slug}`}>
                              View full service <ArrowRight className="ml-1 size-4" />
                            </Link>
                          </Button>
                          <Button asChild size="lg" className="w-full bg-primary text-background transition-all duration-300 hover:bg-cyan-glow sm:w-auto">
                            <Link href={`/contact?project=${service.slug}`}>
                              Book project <ArrowRight className="ml-1 size-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
