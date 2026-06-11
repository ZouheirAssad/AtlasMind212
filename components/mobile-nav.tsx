"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { ActiveNav } from "@/components/active-nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open navigation" className="size-11 rounded-xl"><Menu /></Button>
      </SheetTrigger>
      <SheetContent className="w-[88vw] bg-background p-0">
        <SheetHeader className="border-b p-6 text-left">
          <SheetTitle className="font-display text-2xl">Build smarter.</SheetTitle>
          <SheetDescription className="sr-only">Navigate to the main AtlasMind212 pages.</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
          <ActiveNav mobile />
          <SheetClose asChild>
            <Button asChild size="lg" className="mt-4 h-12"><Link href="/free-guide">Get the free guide</Link></Button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
