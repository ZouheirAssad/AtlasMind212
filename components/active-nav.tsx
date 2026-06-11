"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/site-data";

export function ActiveNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return navItems.map((item) => {
    const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "relative flex min-h-11 items-center rounded-xl font-medium transition-colors duration-200",
          mobile ? "px-4 py-3 text-lg" : "px-3 py-2 text-sm",
          active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
        )}
      >
        {item.label}
        {!mobile && active && <span className="absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-primary" />}
      </Link>
    );
  });
}
