import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { FeatureCard } from "@/components/feature-card";
import { InteractiveTerminal } from "@/components/interactive-terminal";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SystemComparison } from "@/components/system-comparison";
import { SystemStory } from "@/components/system-story";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-data";
import { LogoConstellation } from "@/components/logo-constellation";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream py-16 sm:py-24 lg:py-28">
        {/* Layered technical grid and restrained cyan atmosphere. */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y" />
        <div className="absolute inset-0 -z-10 bg-glow-dual opacity-80 mask-fade-y" />
        <LogoConstellation />
        <Container className="relative grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
          <Reveal className="flex flex-col items-start gap-7">
            <Badge>AI services for real work</Badge>
            <h1 className="text-balance text-6xl leading-[0.94] tracking-[-0.055em] sm:text-7xl lg:text-[6.25rem]">
              Build Smarter <span className="text-primary">With AI.</span>
            </h1>
            <p className="max-w-xl text-2xl font-semibold leading-9">High-performance business websites with AI built in.</p>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">We build conversion-focused websites, connect intelligent AI assistants to your business tools, and automate your repetitive workflows.</p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="lg" className="h-12 px-6"><Link href="/contact">Start a project <ArrowRight data-icon="inline-end" /></Link></Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-6"><Link href="/services">View services</Link></Button>
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-muted-foreground">
              <span><strong className="text-foreground">Website creation</strong></span>
              <span><strong className="text-foreground">AI assistant integrations</strong></span>
              <span><strong className="text-foreground">Workflow automation</strong></span>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="relative">
            {/* Controlled cyan halo behind the technical panel. */}
            <div className="ambient-glow-dark-to-coral" />
            <InteractiveTerminal />
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-blush py-20 sm:py-28">
        {/* Low-contrast technical texture. */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container className="relative grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <Reveal>
            <SectionHeading eyebrow="The shift" title="More tools do not create better work." description="Clarity comes from connecting the right systems around one useful outcome." />
            <div className="relative mt-8 overflow-hidden rounded-[2rem] border">
              <Image src="/images/home-ai-system-night.webp" alt="A dark 3D AI system connecting research, coding, automation, content, and growth" width={1536} height={1024} className="aspect-[3/2] w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.08}><SystemComparison /></Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-neutral-surface py-20 sm:py-28">
        {/* Low-contrast technical texture. */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-60" />
        <Container className="relative"><SystemStory /></Container>
      </section>

      <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
        {/* Low-contrast technical texture. */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-60" />
        <Container className="relative">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Core Services" title="Implement what actually works." description="Focused AI solutions built to solve real bottlenecks and drive business results." />
            <Button asChild variant="outline"><Link href="/services">All services <ArrowRight data-icon="inline-end" /></Link></Button>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.06}>
                <FeatureCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  meta={service.timeline}
                  href={`/services/${service.slug}`}
                  ctaLabel="View service details"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-blush py-20 sm:py-28">
        {/* Low-contrast technical texture. */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container className="relative">
          <Reveal>
            <SectionHeading eyebrow="Our Process" title="How we build together." description="A clear, predictable roadmap from diagnosing the problem to handing over a production-ready system." />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Diagnose", "Map current processes, systems, constraints, and define the most valuable outcome."],
              ["02", "Build", "Implement and refine the website, assistant, or automation in focused, visible sprints."],
              ["03", "Hand over", "Thoroughly test, set up error alerts, and compile clear documentation for your team."],
            ].map(([number, title, description], index) => (
              <Reveal key={number} delay={index * 0.05}>
                <div className="rounded-3xl border bg-card p-7 shadow-lg">
                  <span className="font-mono text-sm text-primary">{number}</span>
                  <h3 className="mt-8 font-display text-2xl">{title}</h3>
                  <p className="mt-3 text-muted-foreground">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-primary/15 bg-[#07111f]/94 py-20 text-foreground sm:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-background via-transparent to-primary/10" />
        <div className="absolute inset-0 -z-10 paper-grain opacity-25" />
        <div className="absolute inset-0 -z-10 bg-glow-lime opacity-80 mask-fade-y" />
        <Container className="relative flex flex-col items-center gap-7 text-center">
          <Reveal className="flex flex-col items-center gap-7">
            <Badge className="bg-accent text-accent-foreground">Your next move</Badge>
            <h2 className="text-balance max-w-4xl text-5xl tracking-[-0.045em] sm:text-7xl">Start one useful project this week.</h2>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">Ready to upgrade your website, integrate AI assistants, or automate repetitive workflows? Let&apos;s connect.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12"><Link href="/contact">Start a project <ArrowRight data-icon="inline-end" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="h-12"><Link href="/services">Explore services</Link></Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
