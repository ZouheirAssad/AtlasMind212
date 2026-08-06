import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { PageHero } from "@/components/page-hero";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AtlasMind212 handles information submitted through this website.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy",
    description: "How AtlasMind212 handles information submitted through this website.",
    url: absoluteUrl("/privacy"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy",
    description: "How AtlasMind212 handles information submitted through this website.",
  },
};

export default function PrivacyPage() {
  const sections = [
    { id: "collection", title: "Information we collect", body: <p>We collect the name, email address, project type, and message you choose to submit through our forms.</p> },
    { id: "use", title: "How information is used", body: <p>Information is used to deliver requested resources, respond to inquiries, and improve AtlasMind212 content and services.</p> },
    { id: "storage", title: "Storage and processors", body: <p>Form submissions are stored using Supabase. Hosting and site delivery may be provided by Vercel. These providers process data according to their own privacy terms.</p> },
    { id: "rights", title: "Your rights", body: <p>You may request access, correction, or deletion of your personal data by contacting hello@atlasmind212.com.</p> },
    { id: "updates", title: "Updates", body: <p>This policy may be updated as the service changes. Last updated: June 11, 2026.</p> },
  ];
  return <><PageHero eyebrow="Legal" title="Privacy Policy" description="How AtlasMind212 handles information submitted through this website." /><LegalLayout sections={sections} /></>;
}
