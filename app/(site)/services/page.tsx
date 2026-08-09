import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd, breadcrumbJsonLd, servicesItemListJsonLd } from "@/lib/seo";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Software Development & Technical Consulting",
  description: "Explore web development, backend and API development, technical consulting, LLM integration, and workflow automation services from AtlasMind212.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Software Development & Technical Consulting | AtlasMind212", description: "Web applications, backend systems, technical consulting, LLM integrations, and workflow automation delivered with a clear scope and handoff.", url: "/services", type: "website" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]), servicesItemListJsonLd(services)]} />
      <PageHero
        variant="split"
        eyebrow="Implementation services"
        title="Software built around how your business works."
        description="From web applications and backend systems to focused consulting, integrations, and automation—with a clear scope and documented ownership."
        image={{ src: "/images/editorial-services-v2.webp", alt: "A web product builder reviewing interface sketches at a studio desk" }}
        imagePosition="right"
      />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="max-w-5xl">
            <h2 className="text-balance text-4xl leading-[1.08] sm:text-6xl">Choose the focused capability that moves your product or operation forward.</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.slug} delay={index * 0.05}>
                  <Link href={`/services/${service.slug}`} className="group flex h-full flex-col border border-border bg-white p-7 shadow-[0_10px_35px_rgb(34_25_85/0.07)] transition-colors hover:border-primary">
                    <div className="flex items-center justify-between gap-4"><Icon className="size-7 shrink-0 text-primary" /><span className="text-right text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{service.engagement}</span></div>
                    <h3 className="mt-14 text-3xl font-bold group-hover:text-primary">{service.title}</h3>
                    <p className="mt-4 flex-1 leading-7 text-muted-foreground">{service.description}</p>
                    <span className="mt-8 flex min-h-11 items-center gap-2 font-bold text-primary">View service <ArrowRight className="size-4" /></span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#f7f6ff] py-20 sm:py-28">
        <Container className="space-y-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} className="grid gap-10 border-t pt-12 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <div className="flex size-14 items-center justify-center bg-primary text-white"><Icon className="size-6" /></div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-primary">Service {String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-3 text-4xl sm:text-5xl">{service.title}</h2>
                  <p className="mt-5 max-w-lg leading-7 text-muted-foreground">{service.bestFor}</p>
                </div>
                <div>
                  <p className="text-lg leading-8">{service.definition}</p>
                  <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {service.deliverables.slice(0, 6).map((item) => <div key={item} className="flex items-start gap-3 border-t pt-4"><Check className="mt-1 size-4 shrink-0 text-primary" /><span>{item}</span></div>)}
                  </div>
                  <Button asChild className="mt-9"><Link href={`/services/${service.slug}`}>Full service details <ArrowRight /></Link></Button>
                </div>
              </Reveal>
            );
          })}
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container className="flex flex-col gap-8 border-y py-12 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Next step</p><h2 className="mt-3 text-4xl">Tell us what you need to build or improve.</h2></div>
          <Button asChild size="lg"><Link href="/contact">Book a project conversation <ArrowRight /></Link></Button>
        </Container>
      </section>
    </>
  );
}
