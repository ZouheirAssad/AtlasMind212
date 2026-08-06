"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const adminItems = [
  { href: "/admin/guides", label: "Guides", icon: BookOpen },
  { href: "/admin/admins", label: "Admins", icon: ShieldCheck },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthScreen = pathname === "/admin/login" || pathname === "/admin/set-password";

  if (isAuthScreen) return <main id="main-content">{children}</main>;

  return (
    <div className="min-h-screen bg-[#f7f7fa]">
      <header className="border-b bg-white">
        <div className="mx-auto flex min-h-20 max-w-[96rem] flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <Link href="/admin/guides" className="flex min-h-11 items-center gap-3 font-bold tracking-[-0.03em]">
            <Image src="/atlasmind-logo.png" alt="" width={38} height={38} className="size-9 object-cover" />
            <span>AtlasMind212 <span className="font-medium text-muted-foreground">Admin</span></span>
          </Link>
          <nav aria-label="Admin navigation" className="flex flex-wrap gap-1">
            {adminItems.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-2 border-b-2 px-4 text-sm font-semibold transition-colors",
                    active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" /> {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main id="main-content">{children}</main>
    </div>
  );
}
