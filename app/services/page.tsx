import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ServiceSelector } from "@/components/service-selector";

export const metadata = { title: "AI Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Implementation services" title="Turn AI ideas into a working system." description="Focused, practical help for building workflows that fit your business and remain simple enough to use." />
      <section className="relative overflow-hidden bg-neutral-surface py-16 sm:py-24">
        {/* Soft grid + grain overlay */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container className="relative">
          <Reveal className="mb-16 grid items-center gap-8 overflow-hidden rounded-[2rem] border border-primary/20 bg-[#07111f] p-6 text-foreground shadow-[0_24px_70px_rgb(0_0_0/0.26)] lg:grid-cols-2">
            <Image src="/images/services-studio-night.webp" alt="A dark 3D AI implementation studio connected by cyan system routes" width={1536} height={1024} loading="eager" className="aspect-[3/2] w-full rounded-2xl border border-primary/15 object-cover" />
            <div className="p-3 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Designed around your work</p>
              <h2 className="mt-5 text-4xl sm:text-5xl">No oversized transformation program. Just the right system, built clearly.</h2>
            </div>
          </Reveal>
          <ServiceSelector />
          <Reveal className="mt-20">
            <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-primary">How engagement works</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                ["01", "Diagnose", "Map the current process, constraints, and most valuable outcome."],
                ["02", "Build", "Create the workflow in focused stages with visible checkpoints."],
                ["03", "Hand over", "Test, document, and make sure the system is maintainable."],
              ].map(([number, title, description]) => (
                <div key={number} className="rounded-3xl border bg-card p-7">
                  <div className="flex items-center justify-between"><span className="font-mono text-sm text-primary">{number}</span><CheckCircle2 className="size-5 text-primary" /></div>
                  <h3 className="mt-10 font-display text-3xl">{title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
