import { LegalLayout } from "@/components/legal-layout";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "Imprint" };

export default function ImprintPage() {
  const sections = [
    { id: "provider", title: "Provider information", body: <p>Website owner details, legal name, and business address must be added before public launch.</p> },
    { id: "contact", title: "Contact", body: <p>hello@atlasmind212.com</p> },
    { id: "responsibility", title: "Responsible for content", body: <p>To be completed by the website owner before public launch.</p> },
  ];
  return <><PageHero eyebrow="Legal" title="Imprint" description="Provider information for AtlasMind212." /><LegalLayout sections={sections} /></>;
}
