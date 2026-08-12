import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Container } from "@/components/container";
import { navItems, services } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-[#404447] py-14 text-white sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="max-w-md">
            <Link href="/" aria-label="AtlasMind home" className="flex min-h-11 w-fit items-center gap-3">
              <BrandLogo variant="mark" className="size-11" />
              <BrandLogo variant="wordmarkInverse" className="h-auto w-44 sm:w-52" />
            </Link>
            <p className="mt-5 leading-7 text-white/78">
              Web applications, backend systems, and practical integrations built around how your business works.
            </p>
            <div className="mt-7 space-y-3 text-sm text-white/85">
              <a href={`mailto:${siteConfig.email}`} className="flex min-h-11 items-center gap-3 hover:text-white"><Mail className="size-5" /> {siteConfig.email}</a>
              <span className="flex min-h-11 items-center gap-3"><MapPin className="size-5" /> Europe · Working remotely</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">Explore</p>
            <div className="mt-4 flex flex-col">
              {navItems.map((item) => <Link key={item.href} href={item.href} className="flex min-h-11 min-w-11 w-fit items-center text-white/78 hover:text-white">{item.label}</Link>)}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">Services</p>
            <div className="mt-4 flex flex-col">
              {services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="flex min-h-11 w-fit items-center text-white/78 hover:text-white">{service.title}</Link>)}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-white/68 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} AtlasMind. All rights reserved.</p>
          <div className="flex gap-4"><Link href="/privacy" className="inline-flex min-h-11 min-w-11 items-center hover:text-white">Privacy</Link><Link href="/imprint" className="inline-flex min-h-11 min-w-11 items-center hover:text-white">Imprint</Link></div>
        </div>
      </Container>
    </footer>
  );
}
