"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ActiveNav } from "@/components/active-nav";
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
      overlay ? "absolute text-white" : "sticky border-b bg-white/94 text-foreground backdrop-blur-xl",
    )}>
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex min-h-11 items-center gap-3" aria-label="AtlasMind212 home">
          <span className={cn("grid size-10 place-items-center overflow-hidden", overlay && "bg-white/92")}>
            <Image src="/atlasmind-logo.png" alt="" width={40} height={40} className="size-10 object-cover" priority />
          </span>
          <span className="text-lg font-extrabold tracking-[-0.04em]">
            AtlasMind<span className={overlay ? "text-accent" : "text-primary"}>212</span>
          </span>
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
