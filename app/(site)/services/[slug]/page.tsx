import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { getServiceBySlug, services } from "@/lib/site-data";

type ServicePageProps = { params: Promise<{ slug: string }> };

const servicePhotos = {
  "business-website": { src: "/images/editorial-services.webp", alt: "A digital builder reviewing a business website project" },
  "ai-integration": { src: "/images/editorial-home-hero.webp", alt: "Two professionals reviewing a connected AI implementation" },
  "ai-automation": { src: "/images/editorial-workflow.webp", alt: "A consultant mapping an automation workflow on a whiteboard" },
} as const;

export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })); }

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };
  const photo = servicePhotos[service.slug];
  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.seoTitle, description: service.metaDescription, url: `/services/${service.slug}`, type: "website", images: [{ url: photo.src, alt: photo.alt }] },
    twitter: { card: "summary_large_image", title: service.seoTitle, description: service.metaDescription, images: [photo.src] },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const photo = servicePhotos[service.slug];
  const Icon = service.icon;
  const relatedServices = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <JsonLd data={[serviceJsonLd(service), faqJsonLd(service.faqs), breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: service.title, href: `/services/${service.slug}` }])]} />
      <article>
        <section className="bg-[#f7f6ff] py-16 sm:py-24">
          <Container>
            <Button asChild variant="outline"><Link href="/services"><ArrowLeft /> All services</Link></Button>
            <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-center">
              <Reveal>
                <div className="flex items-center gap-4"><span className="grid size-14 place-items-center bg-primary text-white"><Icon className="size-6" /></span><Badge variant="secondary">{service.timeline}</Badge></div>
                <h1 className="mt-8 text-balance text-5xl leading-[0.98] sm:text-7xl">{service.seoTitle}</h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{service.definition}</p>
                <Button asChild size="lg" className="mt-8"><Link href={`/contact?project=${service.slug}`}>Book this project <ArrowRight /></Link></Button>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="relative editorial-lines">
                  <Image src={photo.src} alt={photo.alt} width={1536} height={1024} priority sizes="(max-width: 1024px) 100vw, 45vw" className="aspect-[4/3] w-full object-cover" />
                </div>
                <p className="border-x border-b bg-white p-6 leading-7 text-muted-foreground"><strong className="text-foreground">Best fit:</strong> {service.audience}</p>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <Container className="grid gap-14 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Use cases</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Where this service helps.</h2>
              <ul className="mt-8 divide-y border-y">{service.useCases.map((item) => <li key={item} className="flex items-start gap-3 py-4 leading-7 text-muted-foreground"><Check className="mt-1 size-4 shrink-0 text-primary" />{item}</li>)}</ul>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Deliverables</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">What gets built.</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">{service.deliverables.map((item) => <div key={item} className="border-l-4 border-primary-display bg-[#f7f6ff] p-5 font-semibold">{item}</div>)}</div>
            </Reveal>
          </Container>
        </section>

        <section className="bg-[#f7f6ff] py-20 sm:py-28">
          <Container>
            <Reveal className="max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Process</p><h2 className="mt-4 text-5xl sm:text-6xl">A practical path to production.</h2></Reveal>
            <div className="mt-12 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => <Reveal key={step.title} delay={index * 0.04}><article className="h-full border-t py-7 lg:border-l lg:border-t-0 lg:px-7"><span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-8 text-2xl font-bold">{step.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{step.description}</p></article></Reveal>)}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Outcomes</p><h2 className="mt-4 text-4xl sm:text-5xl">What improves after handoff.</h2><ul className="mt-8 space-y-4">{service.outcomes.map((item) => <li key={item} className="flex items-start gap-3 leading-7 text-muted-foreground"><Check className="mt-1 size-4 shrink-0 text-primary" />{item}</li>)}</ul></Reveal>
            <Reveal delay={0.08}><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">FAQ</p><div className="mt-5 divide-y border-y">{service.faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="min-h-11 cursor-pointer list-none text-lg font-bold">{faq.question}</summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{faq.answer}</p></details>)}</div></Reveal>
          </Container>
        </section>

        <section className="bg-[#f7f6ff] py-14">
          <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Next step</p><h2 className="mt-2 text-3xl">Scope a {service.title.toLowerCase()} project.</h2></div><Button asChild size="lg"><Link href={`/contact?project=${service.slug}`}>Contact AtlasMind212 <ArrowRight /></Link></Button></Container>
        </section>
        <section className="bg-white py-10"><Container><p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Related services</p><div className="mt-5 flex flex-wrap gap-3">{relatedServices.map((item) => <Button key={item.slug} asChild variant="outline"><Link href={`/services/${item.slug}`}>{item.title}</Link></Button>)}</div></Container></section>
      </article>
    </>
  );
}
