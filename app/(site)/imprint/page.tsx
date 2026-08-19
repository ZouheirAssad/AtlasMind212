import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { PageHero } from "@/components/page-hero";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Provider information for AtlasMind.",
  alternates: { canonical: "/imprint" },
  openGraph: {
    title: "Imprint",
    description: "Provider information for AtlasMind.",
    url: absoluteUrl("/imprint"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Imprint",
    description: "Provider information for AtlasMind.",
  },
};

export default function ImprintPage() {
  const sections = [
    { id: "provider", title: "Provider information", body: <p>Website owner details, legal name, and business address must be added before public launch.</p> },
    { id: "contact", title: "Contact", body: <p>contact@atlasmind212.com</p> },
    { id: "responsibility", title: "Responsible for content", body: <p>To be completed by the website owner before public launch.</p> },
  ];
  return <><PageHero eyebrow="Legal" title="Imprint" description="Provider information for AtlasMind." /><LegalLayout sections={sections} /></>;
}
