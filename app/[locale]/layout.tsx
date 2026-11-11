import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { I18nProvider } from "@/components/i18n/i18n-provider";
import { MotionProvider } from "@/components/motion-provider";
import { inter, notoSansArabic } from "@/lib/fonts";
import { getDictionary, getDirection, isLocale, locales, localizedMetadata } from "@/lib/i18n";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import "../globals.css";

type LocaleLayoutProps = Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    ...localizedMetadata({
      locale,
      path: "/",
      description: dict.meta.siteDescription,
      ogTitle: dict.meta.defaultTitle,
      ogDescription: dict.meta.shortDescription,
    }),
    title: { default: dict.meta.defaultTitle, template: "%s | AtlasMind" },
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: dict.meta.defaultTitle,
      description: dict.meta.shortDescription,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: "/images/editorial-home-hero-v2.webp", alt: dict.home.heroAlt }],
    },
    twitter: { card: "summary_large_image", images: ["/images/editorial-home-hero-v2.webp"] },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={cn(inter.variable, locale === "ar" && notoSansArabic.variable)}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <JsonLd data={[organizationJsonLd(locale), websiteJsonLd(locale)]} />
        <a href="#main-content" className="skip-link">{dict.common.skipToContent}</a>
        <I18nProvider locale={locale} dict={dict}>
          <MotionProvider>{children}</MotionProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
