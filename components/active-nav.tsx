"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/site-data";

export function ActiveNav({ mobile = false, inverse = false }: { mobile?: boolean; inverse?: boolean }) {
  const pathname = usePathname();

  return (
    <div className={cn("flex", mobile ? "w-full flex-col" : "items-center gap-2")}>
      {navItems.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const link = (
          <Link
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex min-h-11 items-center font-semibold uppercase tracking-[0.04em] transition-colors",
              mobile
                ? "w-full justify-center border-b border-black/15 px-5 py-3 text-sm"
                : "px-3 text-[0.78rem]",
              inverse && !mobile
                ? active ? "text-white" : "text-white/82 hover:text-white"
                : active ? "text-primary" : "text-foreground/72 hover:text-primary",
            )}
          >
            {item.label}
            {!mobile && active && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-primary-display" />}
          </Link>
        );

        return mobile ? <SheetClose key={item.href} asChild>{link}</SheetClose> : <div key={item.href}>{link}</div>;
      })}
    </div>
  );
}
