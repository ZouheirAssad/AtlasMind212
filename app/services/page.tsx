import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock3, Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoConstellation } from "@/components/logo-constellation";
import { services } from "@/lib/site-data";

export const metadata = { title: "AI Services & Implementation" };

export default function ServicesPage() {
  return (
    <>
      {/* Premium Technical B2B Hero */}
      <section className="relative overflow-hidden border-b border-border/40 bg-background/40 py-16 sm:py-24 backdrop-blur-[2px]">
        {/* Background layers with soft grid, grain and dual soft glow */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y" />
        <div className="absolute inset-0 -z-10 bg-glow-dual opacity-70 mask-fade-y" />
        <LogoConstellation />

        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7 flex flex-col gap-6">
              <Badge variant="secondary" className="w-fit font-mono text-[10px] tracking-widest uppercase">
                Implementation Services
              </Badge>
              <h1 className="font-display text-balance text-5xl font-normal leading-[1.1] text-foreground sm:text-6xl md:text-7xl">
                Turn AI ideas into <span className="text-primary">working systems</span>.
              </h1>
              <p className="max-w-xl text-lg sm:text-xl leading-8 text-muted-foreground font-sans">
                We build high-performance business websites, connect custom AI assistants, and automate background workflows with fixed timelines and guaranteed outcomes.
              </p>

              <ul className="grid gap-3 text-sm text-muted-foreground font-mono">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Fixed-scope delivery in 2â€“5 weeks
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Direct engineer-to-client partnership
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Production-grade Supabase & n8n setups
                </li>
              </ul>

              <div className="mt-2 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="bg-primary text-background hover:bg-cyan-glow transition-all duration-300">
                  <Link href="/contact">Book project</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="#services-list">Explore services</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5 relative" delay={0.1}>
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

      {/* Service Comparison Band */}
      <section className="border-b border-border/40 bg-[#07111F]/30 py-10 backdrop-blur-sm">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Business Website",
                focus: "Lead Capture & Performance",
                timeline: "2â€“3 weeks",
                target: "#business-website",
                desc: "High-performance web presence ready to convert."
              },
              {
                title: "AI Integration",
                focus: "Customer & CRM Sync",
                timeline: "2â€“4 weeks",
                target: "#ai-integration",
                desc: "Smart assistants embedded and connected."
              },
              {
                title: "AI Automation",
                focus: "Ops & Workflow Speed",
                timeline: "3â€“5 weeks",
                target: "#ai-automation",
                desc: "Background tasks running on n8n / APIs."
              }
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <Link
                  href={item.target}
                  className="group relative flex h-full flex-col gap-2 rounded-2xl border border-border/40 bg-[#0b1626]/40 p-6 transition-all duration-300 hover:border-primary/40 hover:bg-[#0b1626]/80"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider bg-secondary/80 px-2 py-0.5 rounded border border-border/20">
                      {item.timeline}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed mt-2">
                    {item.desc}
                  </p>
                  <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-primary opacity-80 group-hover:opacity-100">
                    <span>{item.focus}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">â†’</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Services List Section */}
      <section id="services-list" className="relative overflow-hidden bg-neutral-surface py-16 sm:py-24">
        {/* Soft grid + grain overlay */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />

        <Container className="relative">
          <div className="flex flex-col gap-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const num = String(index + 1).padStart(2, "0");
              return (
                <Reveal key={service.slug} delay={index * 0.05}>
                  <div
                    id={service.slug}
                    className="scroll-mt-28 rounded-[2rem] border border-border/40 bg-[#07111F] p-8 shadow-[0_24px_65px_rgb(0_0_0/0.28)] transition-all duration-300 hover:border-primary/30 sm:p-10 lg:p-12 relative overflow-hidden"
                  >
                    {/* Corner gradient glow */}
                    <div className="absolute top-0 right-0 -z-10 h-64 w-64 bg-gradient-to-br from-primary/5 to-transparent blur-3xl rounded-full" />

                    {/* Header Row */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex items-start gap-5">
                        <div className="flex flex-col items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-accent/80 tracking-wider">
                            {num}
                          </span>
                          <span className="flex size-14 items-center justify-center rounded-2xl bg-[#0b1626] border border-border/60 text-primary shadow-inner">
                            <Icon className="size-6" />
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">Service Module</span>
                          <h2 className="text-3xl font-display font-normal text-foreground mt-1">{service.title}</h2>
                          <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-2xl font-sans">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-start lg:items-end gap-2 shrink-0 self-start">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Guaranteed Timeline</span>
                        <span className="flex items-center gap-2 rounded-full border border-border/50 bg-[#0B1626] px-4 py-2 text-sm font-mono text-foreground font-medium shadow-sm">
                          <Clock3 className="size-4 text-primary" /> {service.timeline}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="mt-10 grid gap-8 border-t border-border/30 pt-10 lg:grid-cols-12">
                      {/* Left: Deliverables */}
                      <div className="space-y-4 lg:col-span-7">
                        <h4 className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Deliverables & Specs</h4>
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {service.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-3 rounded-2xl bg-[#0B1626]/60 border border-border/20 p-4">
                              <Check className="size-4 shrink-0 text-primary mt-0.5" />
                              <span className="text-sm font-medium text-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Best Fit & Outcome */}
                      <div className="flex flex-col justify-between gap-6 bg-[#0B1626]/40 border border-border/30 rounded-2xl p-6 lg:p-8 lg:col-span-5">
                        <div className="space-y-5">
                          <div>
                            <h4 className="font-mono text-[10px] uppercase tracking-wider text-primary/80">Best Fit For</h4>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-sans">
                              {service.bestFor}
                            </p>
                          </div>
                          <div className="border-t border-border/20 pt-4">
                            <h4 className="font-mono text-[10px] uppercase tracking-wider text-accent/80">Target Outcome</h4>
                            <p className="mt-2 text-sm leading-relaxed text-foreground/90 font-medium font-sans">
                              {service.outcome}
                            </p>
                          </div>
                        </div>

                        {/* CTA button */}
                        <div className="flex justify-end pt-4 border-t border-border/20">
                          <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-background hover:bg-cyan-glow transition-all duration-300">
                            <Link href={`/contact?project=${service.slug}`}>
                              Book {service.title} project <ArrowRight className="size-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Engagement / Process Section */}
          <Reveal className="mt-24 border-t border-border/30 pt-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Our Process</span>
              <h2 className="mt-3 text-3xl font-display font-normal text-foreground sm:text-4xl">
                A simple path from concept to production
              </h2>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-prose mx-auto">
                We avoid long consulting engagements. We deliver production-grade systems in focused, practical milestones.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Scope & Align",
                  description: "We map your current processes, identify friction points, and define the exact target outcomes and deliverables.",
                },
                {
                  number: "02",
                  title: "Iterative Build",
                  description: "We develop in weekly sprints with visible checkpoints. You see progress on a staging environment at every step.",
                },
                {
                  number: "03",
                  title: "Smooth Handover",
                  description: "We handle database RLS, deployment, and documentation, ensuring your team has full ownership of the completed system.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="group relative rounded-2xl border border-border/40 bg-[#07111F]/30 p-8 hover:border-primary/20 hover:bg-[#07111F]/70 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider bg-secondary/80 px-2.5 py-1 rounded border border-border/20">
                      Phase {step.number}
                    </span>
                    <CheckCircle2 className="size-5 text-primary/80 group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="mt-8 text-xl font-display font-normal text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
