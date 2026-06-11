import Image from "next/image";
import { Suspense } from "react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { WorkflowExplorer } from "@/components/workflow-explorer";

export const metadata = { title: "AI Workflows" };

export default function WorkflowsPage() {
  return (
    <>
      <PageHero eyebrow="Workflow library" title="AI workflows you can actually follow." description="Searchable, step-by-step systems for creating, researching, automating, and growing." />
      <section className="relative overflow-hidden bg-neutral-surface py-16 sm:py-24">
        {/* Soft grid + grain overlay */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container className="relative">
          <Reveal className="mb-14 grid items-center gap-8 overflow-hidden rounded-[2rem] border border-primary/20 bg-[#07111f] p-6 text-foreground shadow-[0_24px_70px_rgb(0_0_0/0.26)] sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="p-2 sm:p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Blueprint, not inspiration</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">See the tools, time, prerequisites, and steps before you start.</h2>
            </div>
            <Image src="/images/workflow-blueprint-night.webp" alt="A dark 3D automation blueprint with connected cyan workflow stages" width={1536} height={1024} loading="eager" className="aspect-[3/2] w-full rounded-2xl border border-primary/15 object-cover" />
          </Reveal>
          <Suspense fallback={<div className="min-h-96 rounded-3xl bg-secondary/30" />}><WorkflowExplorer /></Suspense>
        </Container>
      </section>
    </>
  );
}
