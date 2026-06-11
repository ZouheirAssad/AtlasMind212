import Image from "next/image";
import { Check, Download, Layers3 } from "lucide-react";
import { Container } from "@/components/container";
import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "The Beginner AI Stack 2026" };

export default function FreeGuidePage() {
  return (
    <>
      <PageHero eyebrow="Free guide" title="The Beginner AI Stack 2026" description="A clear, practical starting point for using AI without subscribing to every tool on the internet." />
      <section className="relative overflow-hidden bg-blush py-16 sm:py-24">
        {/* Soft grid + grain overlay */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container className="relative grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] border border-primary/20 bg-[#07111f] p-4 shadow-[0_30px_80px_rgb(0_0_0/0.36)]">
              <Image src="/images/beginner-stack-cover-night.webp" alt="A dark guide cover with a connected cyan beginner AI tool stack" width={1024} height={1536} className="aspect-[2/3] w-full rounded-2xl object-cover" priority />
              <div className="absolute inset-x-8 bottom-8 rounded-2xl border border-primary/20 bg-[#07111f]/90 p-5 text-foreground backdrop-blur-lg">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">AtlasMind212 guide</p>
                <p className="mt-2 font-display text-3xl">The Beginner AI Stack 2026</p>
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col gap-10">
            <Reveal className="flex flex-col gap-7">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Layers3 className="size-6" /></span>
              <div><h2 className="text-4xl tracking-[-0.035em] sm:text-5xl">The small stack that covers the big jobs.</h2><p className="mt-4 text-lg leading-8 text-muted-foreground">Learn which tools to use for thinking, research, coding, automation, design, and video, plus where they fit together.</p></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Core AI tool map", "Beginner recommendations", "Creator and business stacks", "Your first useful workflow"].map((item) => <div key={item} className="flex items-start gap-3 rounded-2xl border bg-card p-4"><span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"><Check className="size-3.5" /></span><p className="font-medium">{item}</p></div>)}
              </div>
              <div className="flex items-center gap-3 rounded-2xl border bg-secondary/40 p-5"><Download className="size-5 text-primary" /><p className="text-sm text-muted-foreground">Delivered to your email after signup.</p></div>
            </Reveal>
            <Reveal delay={0.08}><LeadForm /></Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
