import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Code2, Layers3, Workflow } from "lucide-react";
import { Container } from "@/components/container";
import { FeatureCard } from "@/components/feature-card";
import { InteractiveTerminal } from "@/components/interactive-terminal";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SystemComparison } from "@/components/system-comparison";
import { SystemStory } from "@/components/system-story";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { workflows } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream py-16 sm:py-24 lg:py-28">
        {/* Layered technical grid and restrained cyan atmosphere. */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y" />
        <div className="absolute inset-0 -z-10 bg-glow-dual opacity-80 mask-fade-y" />
        <Container className="relative grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
          <Reveal className="flex flex-col items-start gap-7">
            <Badge>AI systems for real work</Badge>
            <h1 className="text-balance text-6xl leading-[0.94] tracking-[-0.055em] sm:text-7xl lg:text-[6.25rem]">
              Build Smarter <span className="text-primary">With AI.</span>
            </h1>
            <p className="max-w-xl text-2xl font-semibold leading-9">Stop collecting tools. Start building systems.</p>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">Simple AI workflows, tool guides, automation ideas, and step-by-step tutorials that help you create, build, and grow faster.</p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="lg" className="h-12 px-6"><Link href="/free-guide">Get the Free AI Guide <ArrowRight data-icon="inline-end" /></Link></Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-6"><Link href="/workflows">Explore AI Workflows</Link></Button>
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-muted-foreground">
              <span><strong className="text-foreground">Beginner friendly</strong></span>
              <span><strong className="text-foreground">System focused</strong></span>
              <span><strong className="text-foreground">Built to use</strong></span>
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
            <SectionHeading eyebrow="The shift" title="More tools do not create better work." description="Clarity comes from connecting the right tools around one useful outcome." />
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
            <SectionHeading eyebrow="Featured workflows" title="Start with a working blueprint." description="Clear combinations of tools, steps, and outcomes you can adapt." />
            <Button asChild variant="outline"><Link href="/workflows">View all workflows <ArrowRight data-icon="inline-end" /></Link></Button>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workflows.slice(0, 3).map((workflow, index) => <Reveal key={workflow.slug} delay={index * 0.06}><FeatureCard {...workflow} meta={workflow.category} href={`/workflows?workflow=${workflow.slug}`} /></Reveal>)}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden px-3 py-3 sm:px-6">
        <div className="absolute -inset-1 -z-10 rounded-[2.6rem] bg-gradient-to-tr from-primary/10 to-primary/30 opacity-60 blur-xl" />
        <Container className="relative overflow-hidden rounded-[2.5rem] border border-primary/25 bg-[#07111f]/96 py-14 text-foreground shadow-[0_30px_90px_rgb(0_0_0/0.32)] sm:py-20">
          <div className="absolute -right-20 -top-24 size-64 rounded-full bg-primary/15 blur-2xl" />
          <div className="absolute inset-0 -z-10 paper-grain opacity-20" />
          <Reveal className="relative grid gap-10 px-2 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex max-w-3xl flex-col gap-5">
              <Badge className="bg-accent text-accent-foreground">Free 2026 guide</Badge>
              <h2 className="text-balance text-4xl tracking-[-0.035em] sm:text-6xl">Build your first AI stack without the overwhelm.</h2>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">The core tools, what each one is good at, and how to connect them into your first useful system.</p>
            </div>
            <Button asChild size="lg" variant="secondary" className="h-12"><Link href="/free-guide">Get the free guide <ArrowRight data-icon="inline-end" /></Link></Button>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-blush py-20 sm:py-28">
        {/* Low-contrast technical texture. */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container className="relative">
          <Reveal><SectionHeading eyebrow="What AtlasMind212 helps with" title="Use AI across the whole workflow." description="Learn the tool, build the asset, automate the repetition, and turn it into growth." /></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Use AI tools", description: "Choose the right assistant for the job.", icon: Bot },
              { title: "Build with code", description: "Create faster with Claude Code and Codex.", icon: Code2 },
              { title: "Automate work", description: "Connect repetitive steps with n8n.", icon: Workflow },
              { title: "Create systems", description: "Turn scattered tasks into one repeatable process.", icon: Layers3 },
            ].map((item, index) => <Reveal key={item.title} delay={index * 0.05}><FeatureCard {...item} /></Reveal>)}
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
            <h2 className="text-balance max-w-4xl text-5xl tracking-[-0.045em] sm:text-7xl">Build one useful AI system this week.</h2>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">Start with a free guide, copy a workflow, or bring AtlasMind212 into your project.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12"><Link href="/free-guide">Get the guide <ArrowRight data-icon="inline-end" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="h-12"><Link href="/services">Explore services</Link></Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
