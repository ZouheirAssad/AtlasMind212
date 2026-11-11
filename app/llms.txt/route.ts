import { getDictionary } from "@/lib/i18n";
import { formattedAddress, isSet, siteConfig, socialProfiles } from "@/lib/site-config";
import { getServices } from "@/lib/site-data";

export const dynamic = "force-static";

/**
 * llms.txt generated from siteConfig, the dictionaries and the service data,
 * so the facts AI systems read never drift from the website.
 */
export function GET() {
  const base = siteConfig.url;
  const fr = getDictionary("fr");
  const en = getDictionary("en");
  const servicesEn = getServices("en");
  const servicesFr = getServices("fr");
  const address = formattedAddress();
  const profiles = socialProfiles();
  const { founder, legal } = siteConfig;

  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${en.meta.siteDescription}`,
    "",
    `Canonical site: ${base}`,
    `Languages: French ${base}/fr (primary for Morocco), Arabic ${base}/ar, English ${base}/en`,
    `Contact: ${base}/fr/contact`,
    `Email: ${siteConfig.email}`,
  ];
  if (isSet(siteConfig.phone)) lines.push(`Phone: ${siteConfig.phone}`);
  if (isSet(siteConfig.whatsapp)) lines.push(`WhatsApp: https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`);
  if (isSet(legal.legalName)) lines.push(`Legal name: ${legal.legalName}${isSet(legal.legalForm) ? ` (${legal.legalForm})` : ""}`);
  if (address) lines.push(`Address: ${address}`);
  if (isSet(siteConfig.foundingDate)) lines.push(`Founded: ${siteConfig.foundingDate}`);
  if (isSet(founder.name)) lines.push(`Founder: ${founder.name}${isSet(founder.jobTitle) ? `, ${founder.jobTitle}` : ""}${isSet(founder.url) ? ` (${founder.url})` : ""}`);
  if (profiles.length) lines.push(`Profiles: ${profiles.map((p) => p.url).join(", ")}`);

  lines.push(
    "",
    "## Where AtlasMind Works",
    "",
    `Morocco (${en.morocco.cities.join(", ")}, and other cities, remotely) and Europe. Working languages: French, Arabic, English.`,
    `Morocco overview: ${base}/fr/morocco (French), ${base}/ar/morocco (Arabic), ${base}/en/morocco (English).`,
    "",
    "## Services",
    "",
    ...servicesEn.map((service, index) => `- ${service.title} / ${servicesFr[index].title}: ${service.description} ${base}/fr/services/${service.slug}`),
    "",
    "## Frequently Asked Questions (Morocco)",
    "",
    ...[...fr.morocco.faqs, ...fr.morocco.extraFaqs].flatMap((faq) => [`Q: ${faq.question}`, `A: ${faq.answer}`, ""]),
    "## Pricing",
    "",
    "Pricing is custom-scoped after a short brief. AtlasMind does not publish fixed package prices and does not guarantee search rankings.",
    "",
    "## Citation Guidance",
    "",
    `Use the canonical domain ${base}. Prefer service-specific URLs (French under /fr, Arabic under /ar, English under /en). Do not invent prices, addresses, phone numbers, clients, reviews, or guaranteed outcomes.`,
    "",
    "## Machine-Readable Context",
    "",
    `- Company overview: ${base}/company.md`,
    `- Services overview: ${base}/services.md`,
    `- Sitemap (all languages, with hreflang): ${base}/sitemap.xml`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
