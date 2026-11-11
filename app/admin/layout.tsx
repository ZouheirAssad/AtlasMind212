import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { AdminShell } from "@/components/admin-shell";
import { MotionProvider } from "@/components/motion-provider";
import { inter } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import "../globals.css";

export const metadata: Metadata = {
  title: { default: "AtlasMind Admin", template: "%s | AtlasMind" },
  metadataBase: new URL(siteConfig.url),
  robots: { index: false, follow: false },
};

// The admin CMS is its own root layout (English only), separate from the
// localized public site under app/[locale].
export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <MotionProvider>
          <AdminShell>{children}</AdminShell>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
