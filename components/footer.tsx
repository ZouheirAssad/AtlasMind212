import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { navItems, services } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-[#5b45d6] py-14 text-white sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="max-w-md">
            <Link href="/" className="flex min-h-11 w-fit items-center text-3xl font-extrabold tracking-[-0.055em]">
              AtlasMind<span className="text-accent">212</span>
            </Link>
            <p className="mt-5 leading-7 text-white/78">
              Business websites, useful AI integrations, and reliable workflow automation built for real operations.
            </p>
            <div className="mt-7 space-y-3 text-sm text-white/85">
              <a href={`mailto:${siteConfig.email}`} className="flex min-h-11 items-center gap-3 hover:text-accent"><Mail className="size-5" /> {siteConfig.email}</a>
              <span className="flex min-h-11 items-center gap-3"><MapPin className="size-5" /> Europe · Working remotely</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Explore</p>
            <div className="mt-4 flex flex-col">
              {navItems.map((item) => <Link key={item.href} href={item.href} className="flex min-h-11 w-fit items-center text-white/78 hover:text-white">{item.label}</Link>)}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Services</p>
            <div className="mt-4 flex flex-col">
              {services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="flex min-h-11 w-fit items-center text-white/78 hover:text-white">{service.title}</Link>)}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-white/68 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} AtlasMind212. All rights reserved.</p>
          <div className="flex gap-6"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/imprint" className="hover:text-white">Imprint</Link></div>
        </div>
      </Container>
    </footer>
  );
}
