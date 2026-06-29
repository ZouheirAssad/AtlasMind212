import type { Metadata } from "next";
import { Calistoga, Inter, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MotionProvider } from "@/components/motion-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const calistoga = Calistoga({ subsets: ["latin"], variable: "--font-calistoga", weight: "400", display: "swap" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "AtlasMind212 — Business Websites, AI Integration & Automation",
    template: "%s | AtlasMind212",
  },
  description:
    "AtlasMind212 builds high-performance business websites, connects custom AI assistants, and automates background workflows.",
  metadataBase: new URL("https://atlasmind212.com"),
  openGraph: {
    title: "AtlasMind212 — Business Websites, AI Integration & Automation",
    description: "High-performance business websites, AI integration, and workflow automation.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${calistoga.variable} ${jetBrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <MotionProvider>
          <ScrollProgress />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
