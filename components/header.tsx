import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ActiveNav } from "@/components/active-nav";
import { Container } from "@/components/container";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-[#07111f]/88 shadow-[0_10px_35px_rgb(0_0_0/0.18)] backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="AtlasMind212 home">
          <span className="overflow-hidden rounded-xl bg-[#050816] shadow-sm transition-transform duration-200 group-hover:-rotate-2 group-hover:scale-105">
            <Image src="/atlasmind-logo.png" alt="" width={44} height={44} className="size-11 object-cover" priority />
          </span>
          <span className="text-lg font-bold tracking-[-0.03em]">
            AtlasMind<span className="text-primary">212</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          <ActiveNav />
        </nav>
        <div className="hidden lg:block">
          <Button asChild>
            <Link href="/contact">Start a project <ArrowUpRight data-icon="inline-end" /></Link>
          </Button>
        </div>
        <div className="lg:hidden"><MobileNav /></div>
      </Container>
    </header>
  );
}
