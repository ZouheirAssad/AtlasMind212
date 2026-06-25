"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, services } from "@/lib/site-data";
import { ServicesDropdown } from "@/components/services-dropdown";
import { SheetClose } from "@/components/ui/sheet";

export function ActiveNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex",
        mobile ? "flex-col gap-1 w-full" : "items-center gap-1"
      )}
      onMouseLeave={() => !mobile && setHoveredPath(null)}
    >
      {navItems.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const isServices = item.label === "Services";

        if (!mobile && isServices) {
          return (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href={item.href}
                onMouseEnter={() => setHoveredPath(item.href)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex min-h-11 items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200 z-10",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                <ChevronDown className={cn("size-3.5 transition-transform duration-200", dropdownOpen && "rotate-180")} />
                {hoveredPath === item.href && (
                  <m.span
                    layoutId="hover-pill"
                    className="absolute inset-0 rounded-xl bg-secondary/50"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                {active && (
                  <m.span
                    layoutId="active-line"
                    className="absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
              <AnimatePresence>
                {dropdownOpen && (
                  <ServicesDropdown onClose={() => setDropdownOpen(false)} />
                )}
              </AnimatePresence>
            </div>
          );
        }

        if (mobile && isServices) {
          return (
            <div key={item.href} className="w-full">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className={cn(
                  "flex w-full min-h-11 items-center justify-between rounded-xl px-4 py-3 text-lg font-medium transition-colors duration-200",
                  active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                )}
              >
                <span>{item.label}</span>
                <ChevronDown className={cn("size-5 transition-transform duration-200", mobileServicesOpen && "rotate-180")} />
              </button>
              <m.div
                initial={false}
                animate={{ height: mobileServicesOpen ? "auto" : 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-1 pl-4 pr-2 py-1">
                  {services.map((service) => (
                    <SheetClose key={service.slug} asChild>
                      <Link
                        href={`/services#${service.slug}`}
                        className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                      >
                        {service.title}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      href="/services"
                      className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-secondary/40"
                    >
                      View all services
                    </Link>
                  </SheetClose>
                </div>
              </m.div>
            </div>
          );
        }

        const navLink = (
          <Link
            href={item.href}
            onMouseEnter={() => !mobile && setHoveredPath(item.href)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex items-center rounded-xl font-medium transition-colors duration-200 z-10",
              mobile ? "px-4 py-3 text-lg w-full min-h-11" : "px-3 py-2 text-sm min-h-11",
              mobile && active ? "bg-secondary text-foreground" : "",
              !mobile && active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
            {!mobile && hoveredPath === item.href && (
              <m.span
                layoutId="hover-pill"
                className="absolute inset-0 rounded-xl bg-secondary/50"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            {!mobile && active && (
              <m.span
                layoutId="active-line"
                className="absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        );

        if (mobile) {
          return (
            <SheetClose key={item.href} asChild>
              {navLink}
            </SheetClose>
          );
        }

        return <div key={item.href}>{navLink}</div>;
      })}
    </div>
  );
}
