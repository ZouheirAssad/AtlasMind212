"use client";

import { m, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Clock3 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { services } from "@/lib/site-data";

export function ServiceSelector() {
  const [active, setActive] = useState<(typeof services)[number]["slug"]>(services[0].slug);
  const reduceMotion = useReducedMotion();
  const selected = services.find((service) => service.slug === active)!;
  const Icon = selected.icon;

  return (
    <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
      <div className="flex flex-col gap-2">
        {services.map((service) => {
          const ServiceIcon = service.icon;
          return (
            <button
              key={service.slug}
              onClick={() => setActive(service.slug)}
              aria-pressed={active === service.slug}
              className={cn("flex min-h-16 cursor-pointer items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200", active === service.slug ? "border-primary bg-primary text-primary-foreground shadow-[0_12px_32px_rgb(0_200_245/0.16)]" : "bg-card hover:border-primary/40 hover:bg-secondary/35")}
            >
              <ServiceIcon className="size-5 shrink-0" />
              <span className="font-semibold">{service.title}</span>
            </button>
          );
        })}
      </div>
      <m.div key={selected.slug} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-[2rem] border bg-card p-7 shadow-[0_24px_65px_rgb(0_0_0/0.28)] sm:p-10">
        <div className="flex items-start justify-between gap-6">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Icon className="size-6" /></span>
          <span className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm"><Clock3 className="size-4" /> {selected.timeline}</span>
        </div>
        <h2 className="mt-8 text-4xl">{selected.title}</h2>
        <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">{selected.description}</p>
        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Typical deliverables</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {selected.deliverables.map((item) => <li key={item} className="flex items-center gap-3 rounded-2xl bg-secondary/40 p-4"><Check className="size-4 shrink-0 text-primary" />{item}</li>)}
          </ul>
        </div>
        <Button asChild size="lg" className="mt-9"><Link href={`/contact?project=${selected.slug}`}>Discuss this service <ArrowRight data-icon="inline-end" /></Link></Button>
      </m.div>
    </div>
  );
}
