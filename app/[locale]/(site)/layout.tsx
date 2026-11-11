import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollProgress } from "@/components/scroll-progress";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { isLocale } from "@/lib/i18n";

export default async function SiteLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
      <WhatsAppButton />
    </>
  );
}
