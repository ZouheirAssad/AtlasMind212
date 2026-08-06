import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollProgress } from "@/components/scroll-progress";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
