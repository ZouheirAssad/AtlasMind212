import Image from "next/image";
import { Compass, GraduationCap, Repeat2 } from "lucide-react";
import { Container } from "@/components/container";
import { FeatureCard } from "@/components/feature-card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About AtlasMind212" title="AI education for builders, not spectators." description="AtlasMind212 makes modern AI tools easier to understand, connect, and put to work." />
      <section className="relative overflow-hidden bg-blush py-16 sm:py-24">
        {/* Soft grid + grain overlay */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container className="relative">
          <Reveal className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Image src="/images/about-atlas-night.webp" alt="A dark 3D knowledge atlas connecting tools, ideas, and outcomes with cyan routes" width={1536} height={1024} loading="eager" className="aspect-[3/2] w-full rounded-[2rem] border border-primary/20 object-cover shadow-[0_24px_70px_rgb(0_0_0/0.3)]" />
            <div><p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">The point of the map</p><h2 className="mt-5 text-5xl tracking-[-0.04em]">The goal is not to use more AI. It is to do better work.</h2><div className="mt-6 flex flex-col gap-4 text-lg leading-8 text-muted-foreground"><p>AtlasMind212 focuses on the layer between learning about an AI tool and getting a useful result from it.</p><p>That means clear explanations, realistic workflows, and systems that can be repeated.</p></div></div>
          </Reveal>
          <div className="mt-20 grid gap-5 md:grid-cols-3">
            <Reveal><FeatureCard title="Clear direction" description="Understand what matters, what can wait, and where to start." icon={Compass} /></Reveal>
            <Reveal delay={0.06}><FeatureCard title="Beginner friendly" description="Technical ideas explained without stripping away the useful detail." icon={GraduationCap} /></Reveal>
            <Reveal delay={0.12}><FeatureCard title="System focused" description="Every tool earns its place by contributing to a repeatable outcome." icon={Repeat2} /></Reveal>
          </div>
          <Reveal className="mt-20 rounded-[2rem] border border-primary/20 bg-[#07111f] p-8 text-foreground shadow-[0_24px_70px_rgb(0_0_0/0.25)] sm:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">How AtlasMind212 thinks</p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[["01", "Start with the outcome"], ["02", "Use the fewest useful tools"], ["03", "Make the process repeatable"]].map(([number, text]) => <div key={number} className="border-l border-white/15 pl-5"><p className="font-mono text-xs text-white/45">{number}</p><p className="mt-3 font-display text-3xl">{text}</p></div>)}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
