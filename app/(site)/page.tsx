import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/container";
import { FeatureCard } from "@/components/feature-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[46rem] overflow-hidden bg-black text-white sm:min-h-[52rem]">
        <Image
          src="/images/editorial-home-hero.webp"
          alt="Two digital professionals reviewing a project together in a bright studio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="photo-overlay absolute inset-0" />
        <Container className="relative flex min-h-[46rem] items-end pb-16 pt-32 sm:min-h-[52rem] sm:pb-20">
          <Reveal className="max-w-6xl">
            <Badge className="mb-7 bg-white text-black">AI services for real work</Badge>
            <h1 className="max-w-5xl text-balance text-6xl leading-[0.9] sm:text-8xl lg:text-[7.4rem]">
              Build smarter <span className="text-accent">with AI.</span>
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-white/90 sm:text-2xl">
              High-performance business websites with useful AI and automation built in.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-primary-display text-white hover:bg-primary"><Link href="/contact">Start a project <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="secondary"><Link href="/services">View services</Link></Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="editorial-section py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">The shift</p>
            <h2 className="mt-5 text-balance text-5xl leading-[1.02] text-display-violet sm:text-7xl">
              More tools do not create better work.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Better work comes from connecting the right website, assistant, and workflow around one useful business outcome.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="relative editorial-lines">
            <Image
              src="/images/editorial-workflow.webp"
              alt="A consultant mapping a practical digital workflow with a colleague"
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="aspect-[3/2] w-full object-cover"
            />
          </Reveal>
        </Container>
      </section>

      <section className="editorial-section-tint py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Core services" title="From idea to a working system." description="Focused implementation for the parts of your business that should explain, answer, route, or run automatically." />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <FeatureCard title={service.title} description={service.description} icon={service.icon} meta={service.timeline} href={`/services/${service.slug}`} ctaLabel="View service" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="editorial-section py-20 sm:py-28">
        <Container>
          <Reveal className="grid gap-10 border-y py-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <SectionHeading eyebrow="How we work" title="Clear steps. Visible progress." />
            <div className="grid gap-0 md:grid-cols-3">
              {[
                ["01", "Diagnose", "Map the bottleneck, systems, constraints, and most valuable outcome."],
                ["02", "Build", "Implement in focused checkpoints that you can review and test."],
                ["03", "Hand over", "Verify the system and document ownership for your team."],
              ].map(([number, title, description]) => (
                <article key={number} className="border-t py-7 md:border-l md:border-t-0 md:px-7 md:py-0">
                  <span className="text-sm font-bold text-primary">{number}</span>
                  <h3 className="mt-8 text-2xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="editorial-section-tint py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-balance text-5xl leading-[1.02] sm:text-7xl">Start one useful project this week.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Bring the website, workflow, or operational bottleneck. We will help shape a practical next step.</p>
            <Button asChild size="lg" className="mt-8"><Link href="/contact">Start a conversation <ArrowRight /></Link></Button>
          </Reveal>
          <Reveal delay={0.08} className="border-l-4 border-primary-display bg-white p-8 shadow-[0_12px_40px_rgb(34_25_85/0.08)] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">A useful first scope</p>
            <ul className="mt-6 space-y-5">
              {["One clear business outcome", "The few systems that need to connect", "A fixed implementation path", "A maintainable handover"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg font-semibold"><Check className="size-5 text-primary" /> {item}</li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
