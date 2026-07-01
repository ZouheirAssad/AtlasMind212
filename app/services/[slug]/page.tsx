import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
} from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";
import { getServiceBySlug, services } from "@/lib/site-data";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return { title: "Service not found" };

  const path = `/services/${service.slug}`;

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: service.seoTitle,
      description: service.metaDescription,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: service.seoTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const Icon = service.icon;
  const relatedServices = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(service),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: service.title, href: `/services/${service.slug}` },
          ]),
        ]}
      />
      <article>
        <section className="relative overflow-hidden border-b border-border/40 bg-background/40 py-16 sm:py-24">
          <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y" />
          <div className="absolute inset-0 -z-10 bg-glow-dual opacity-70 mask-fade-y" />
          <Container className="relative">
            <Button asChild variant="outline" className="mb-8">
              <Link href="/services">
                <ArrowLeft data-icon="inline-start" /> All services
              </Link>
            </Button>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
              <Reveal className="max-w-4xl">
                <Badge variant="secondary" className="mb-6">
                  {service.timeline}
                </Badge>
                <span className="mb-5 flex size-14 items-center justify-center rounded-2xl border bg-secondary text-primary">
                  <Icon className="size-6" />
                </span>
                <h1 className="font-display text-balance text-5xl leading-tight tracking-[-0.045em] sm:text-7xl">
                  {service.seoTitle}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                  {service.definition}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="h-12">
                    <Link href={`/contact?project=${service.slug}`}>
                      Book this project <ArrowRight data-icon="inline-end" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12">
                    <Link href={absoluteUrl(`/services/${service.slug}`)}>
                      Share service URL
                    </Link>
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <aside className="rounded-2xl border bg-card/94 p-6 shadow-xl">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Best fit</p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.audience}</p>
                </aside>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-neutral-surface py-16 sm:py-24">
          <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-60" />
          <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Use cases</p>
              <h2 className="mt-3 text-4xl tracking-[-0.035em]">Where this service helps.</h2>
              <ul className="mt-8 grid gap-3">
                {service.useCases.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border bg-card/80 p-4">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-sm leading-6 text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Deliverables</p>
              <h2 className="mt-3 text-4xl tracking-[-0.035em]">What gets built.</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <div key={item} className="rounded-2xl border bg-card/80 p-4 text-sm font-medium">
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-blush py-16 sm:py-24">
          <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
          <Container>
            <Reveal className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Process</p>
              <h2 className="mt-3 text-4xl tracking-[-0.035em]">A practical path to production.</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.04}>
                  <div className="h-full rounded-2xl border bg-card/84 p-6">
                    <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-neutral-surface py-16 sm:py-24">
          <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Outcomes</p>
              <h2 className="mt-3 text-4xl tracking-[-0.035em]">What improves after handoff.</h2>
              <ul className="mt-8 grid gap-3">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">FAQ</p>
              <div className="mt-5 divide-y divide-border rounded-2xl border bg-card/90">
                {service.faqs.map((faq) => (
                  <details key={faq.question} className="group p-5">
                    <summary className="cursor-pointer list-none font-semibold text-foreground">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="border-t bg-[#07111f]/94 py-14">
          <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Next step</p>
              <h2 className="mt-2 text-3xl tracking-[-0.03em]">Scope a {service.title.toLowerCase()} project.</h2>
            </div>
            <Button asChild size="lg" className="h-12">
              <Link href={`/contact?project=${service.slug}`}>
                Contact AtlasMind212 <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </Container>
        </section>

        <section className="bg-background/60 py-12">
          <Container>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Related services</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {relatedServices.map((item) => (
                <Button key={item.slug} asChild variant="outline">
                  <Link href={`/services/${item.slug}`}>{item.title}</Link>
                </Button>
              ))}
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}
