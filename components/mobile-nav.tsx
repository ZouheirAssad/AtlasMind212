"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { ActiveNav } from "@/components/active-nav";
import { BrandLogo } from "@/components/brand-logo";
import { useI18n } from "@/components/i18n/i18n-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function MobileNav({ inverse = false }: { inverse?: boolean }) {
  const { dict, href } = useI18n();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={dict.nav.open}
          className={cn("size-11 bg-transparent", inverse && "border-white/50 text-white hover:bg-white/10 hover:text-white")}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="gap-0 border-black/15 bg-white/94 p-0 backdrop-blur-xl">
        <SheetHeader className="border-b border-black/15 px-5 py-5 text-start">
          <SheetTitle className="flex min-h-11 items-center gap-3 text-xl tracking-[-0.03em]">
            <span className="grid size-11 place-items-center">
              <BrandLogo variant="mark" className="size-10" />
            </span>
            <BrandLogo variant="wordmark" className="h-auto w-36" />
          </SheetTitle>
          <SheetDescription className="sr-only">{dict.nav.mobileDescription}</SheetDescription>
        </SheetHeader>
        <nav aria-label={dict.nav.mobileAria}>
          <ActiveNav mobile />
          <div className="flex flex-col gap-4 p-5">
            <LanguageSwitcher className="justify-center" />
            <SheetClose asChild>
              <Button asChild size="lg" className="h-12 w-full"><Link href={href("/contact")}>{dict.common.startProject}</Link></Button>
            </SheetClose>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
