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
  description: "Learn how AtlasMind212 delivers web applications, backend systems, technical consulting, integrations, and workflow automation with clear scopes and documented handoff.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About AtlasMind212", description: "Reliable digital systems built with clear scopes and documented handoff.", url: absoluteUrl("/about"), type: "website" },
};

const principles = [
  ["01", "Diagnose first", "We map the real operational bottleneck before proposing technology."],
  ["02", "Build the useful minimum", "The smallest reliable system is usually the easiest one to own and improve."],
  ["03", "Show visible progress", "Working checkpoints replace abstract status reports and surprise launches."],
  ["04", "Hand over ownership", "Code, accounts, workflows, and operating notes belong to your team."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero variant="photo" eyebrow="About AtlasMind212" title="We bring useful digital projects into production." description="A focused development and consulting partner for web applications, backend systems, integrations, and automation." image={{ src: "/images/editorial-about-v2.webp", alt: "Three digital professionals planning a software project around a studio table" }} imagePosition="right" />

      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Core belief</p>
            <h2 className="mt-5 text-balance text-5xl leading-[1.02] text-display-violet sm:text-7xl">Smarter operations, not more complexity.</h2>
          </Reveal>
          <Reveal delay={0.08} className="space-y-5 text-lg leading-8 text-muted-foreground">
            <p>Technology should become a dependable part of daily work—not another system your team has to fight.</p>
            <p>AtlasMind212 works at the implementation layer: clarifying the useful outcome, connecting the required tools, testing the edge cases, and documenting how everything is owned.</p>
            <p>The goal is practical momentum through systems that do exactly what they are expected to do.</p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#f7f6ff] py-20 sm:py-28">
        <Container>
          <Reveal className="max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Our principles</p><h2 className="mt-5 text-5xl sm:text-6xl">How trust is built.</h2></Reveal>
          <div className="mt-12 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            {principles.map(([step, title, desc], index) => <Reveal key={step} delay={index * 0.04}><article className="h-full border-t py-7 md:border-l md:border-t-0 md:px-7"><span className="text-sm font-bold text-primary">{step}</span><h3 className="mt-9 text-2xl font-bold">{title}</h3><p className="mt-3 leading-7 text-muted-foreground">{desc}</p></article></Reveal>)}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative editorial-lines">
            <Image src="/images/editorial-consulting-v2.webp" alt="Two professionals evaluating a software architecture diagram on a whiteboard" width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[3/2] w-full object-cover" />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Working together</p>
            <h2 className="mt-5 text-5xl leading-[1.04]">Direct, practical, and easy to follow.</h2>
            <div className="mt-7 divide-y border-y">
              {["Fixed scopes and realistic timelines", "Direct access to the person building the work", "Production-safe implementation and testing", "Clear documentation and account ownership"].map((item) => <p key={item} className="py-4 text-lg font-semibold">{item}</p>)}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#f7f6ff] py-20 sm:py-28">
        <Container>
          <Reveal className="max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Qualification</p><h2 className="mt-5 text-5xl sm:text-6xl">Is AtlasMind212 right for you?</h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal className="border-t-4 border-primary bg-white p-8 shadow-[0_12px_40px_rgb(34_25_85/0.08)]"><h3 className="text-2xl font-bold">A strong fit when</h3><ul className="mt-6 space-y-4">{["You need a business website or focused web application.", "You need a backend, API, or integration between real systems.", "You want a practical technical recommendation before building.", "You value fixed scope, visible progress, and direct technical communication."].map((text) => <li key={text} className="flex items-start gap-3 leading-7 text-muted-foreground"><Check className="mt-1 size-4 shrink-0 text-primary" />{text}</li>)}</ul></Reveal>
            <Reveal delay={0.08} className="border-t-4 border-black bg-white p-8 shadow-[0_12px_40px_rgb(34_25_85/0.08)]"><h3 className="text-2xl font-bold">Not the right fit when</h3><ul className="mt-6 space-y-4">{["You need a base language model trained from scratch.", "You are looking only for broad strategy without implementation.", "Requirements must change continuously without timeline adjustments.", "You need a round-the-clock custom application support desk."].map((text) => <li key={text} className="flex items-start gap-3 leading-7 text-muted-foreground"><X className="mt-1 size-4 shrink-0 text-foreground" />{text}</li>)}</ul></Reveal>
          </div>
          <Reveal className="mt-16 flex flex-col gap-6 border-y py-10 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Get started</p><h2 className="mt-2 text-4xl">Ready to build something useful?</h2></div><div className="flex flex-wrap gap-3"><Button asChild size="lg"><Link href="/contact">Book a scoping call</Link></Button><Button asChild variant="outline" size="lg"><Link href="/services">View services</Link></Button></div></Reveal>
        </Container>
      </section>
    </>
  );
}
