"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { m } from "motion/react";
import { services } from "@/lib/site-data";

interface ServicesDropdownProps {
  onClose: () => void;
  id?: string;
  labelledBy?: string;
}

export function ServicesDropdown({ onClose, id, labelledBy }: ServicesDropdownProps) {
  return (
    <m.div
      id={id}
      role="menu"
      aria-labelledby={labelledBy}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 z-50 mt-3 w-[480px] -translate-x-1/2 rounded-2xl border border-primary/15 bg-[#07111F]/96 p-4 shadow-[0_24px_50px_rgb(0_0_0/0.4)] backdrop-blur-xl"
      onMouseLeave={onClose}
    >
      {/* Accent glow line at top */}
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />

      <div className="flex flex-col gap-2">
        <p className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Implementation Services</p>
        <div className="grid gap-1">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onClick={onClose}
                role="menuitem"
                className="group flex items-start gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-secondary/45 focus-visible:outline-none focus-visible:bg-secondary/45"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-foreground transition-colors group-hover:text-primary">{service.title}</span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                      <Clock className="size-3" /> {service.timeline}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-normal line-clamp-2">{service.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-3 border-t border-primary/10 pt-3 px-3 flex items-center justify-between">
        <Link
          href="/services"
          onClick={onClose}
          role="menuitem"
          className="text-xs font-semibold text-foreground/80 hover:text-primary focus-visible:outline-none focus-visible:text-primary"
        >
          All services
        </Link>
        <span className="text-[11px] text-muted-foreground">Ready to start?</span>
        <Link
          href="/contact"
          onClick={onClose}
          role="menuitem"
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:underline"
        >
          Book a discovery call <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </m.div>
  );
}
