"use client";

import { m, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle2, CircleX, Network } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const views = {
  before: { label: "Tool chaos", items: ["14 disconnected subscriptions", "Prompts saved in random docs", "Manual copy and paste", "No reliable outcome"] },
  after: { label: "Connected system", items: ["A focused five-tool stack", "Reusable instructions", "Automated handoffs", "One clear outcome"] },
} as const;

export function SystemComparison() {
  const [view, setView] = useState<keyof typeof views>("before");
  const reduceMotion = useReducedMotion();
  const active = views[view];

  return (
    <div className="overflow-hidden rounded-[2rem] border bg-card shadow-[0_25px_70px_rgb(0_0_0/0.28)]">
      <div className="grid grid-cols-2 border-b p-2">
        {(Object.keys(views) as Array<keyof typeof views>).map((key) => (
          <button
            key={key}
            onClick={() => setView(key)}
            aria-pressed={view === key}
            className={cn("min-h-11 cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition-colors", view === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary")}
          >
            {views[key].label}
          </button>
        ))}
      </div>
      <m.div
        key={view}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.28 }}
        className={cn("min-h-[22rem] p-7 sm:p-9", view === "after" ? "bg-primary/8" : "bg-secondary/35")}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className={cn("flex size-14 items-center justify-center rounded-2xl", view === "after" ? "bg-primary text-primary-foreground" : "bg-background")}>
            {view === "after" ? <Network className="size-6" /> : <CircleX className="size-6 text-primary" />}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{view === "after" ? "system online" : "friction detected"}</span>
        </div>
        <div className="flex flex-col gap-4">
          {active.items.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border bg-background/75 p-4">
              {view === "after" ? <CheckCircle2 className="size-5 shrink-0 text-primary" /> : <ArrowRight className="size-5 shrink-0 text-muted-foreground" />}
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </m.div>
    </div>
  );
}
