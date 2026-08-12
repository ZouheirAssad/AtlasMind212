"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ActiveNav } from "@/components/active-nav";
import { BrandLogo } from "@/components/brand-logo";
import { Container } from "@/components/container";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const overlay = pathname === "/" || pathname === "/about";

  return (
    <header className={cn(
      "inset-x-0 top-0 z-40",
      overlay ? "absolute border-b border-white/10 bg-black/20 text-white backdrop-blur-sm" : "sticky border-b bg-white/94 text-foreground backdrop-blur-xl",
    )}>
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex min-h-11 items-center gap-3" aria-label="AtlasMind home">
          <span className="grid size-11 place-items-center overflow-hidden">
            <BrandLogo variant="mark" className="size-10" priority />
          </span>
          <BrandLogo
            variant={overlay ? "wordmarkInverse" : "wordmark"}
            className="h-auto w-32 sm:w-36"
            priority
          />
        </Link>
        <nav className="hidden items-center lg:flex" aria-label="Main navigation">
          <ActiveNav inverse={overlay} />
        </nav>
        <div className="hidden lg:block">
          <Button asChild variant={overlay ? "secondary" : "default"} size="sm">
            <Link href="/contact">Start a project</Link>
          </Button>
        </div>
        <div className="lg:hidden"><MobileNav inverse={overlay} /></div>
      </Container>
    </header>
  );
}
