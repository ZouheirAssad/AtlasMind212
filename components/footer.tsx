import Link from "next/link";
import { Container } from "@/components/container";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t bg-[#020617]/96 py-14 text-foreground backdrop-blur-sm sm:py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex max-w-md flex-col gap-5">
            <Link href="/" className="flex min-h-11 w-fit items-center text-2xl font-bold tracking-[-0.04em]">
              AtlasMind<span className="text-primary">212</span>
            </Link>
            <p className="leading-7 text-muted-foreground">
              High-performance business websites, AI integrations, and background automations designed for growing operations.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Explore
            </p>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex min-h-11 w-fit items-center text-muted-foreground hover:text-primary">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Services
            </p>
            <Link href="/services#business-website" className="flex min-h-11 w-fit items-center text-muted-foreground hover:text-primary">
              Business Website
            </Link>
            <Link href="/services#ai-integration" className="flex min-h-11 w-fit items-center text-muted-foreground hover:text-primary">
              AI Integration
            </Link>
            <Link href="/services#ai-automation" className="flex min-h-11 w-fit items-center text-muted-foreground hover:text-primary">
              AI Automation
            </Link>
          </div>
        </div>
        <Separator className="my-10 bg-border" />
        <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AtlasMind212. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/imprint" className="hover:text-primary transition-colors">Imprint</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
