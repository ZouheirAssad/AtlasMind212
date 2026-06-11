"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const goals = [
  { id: "create", label: "Create", command: "atlasmind init content-system", lines: ["research sources connected", "content engine configured", "publishing queue ready"] },
  { id: "automate", label: "Automate", command: "atlasmind deploy workflow", lines: ["trigger mapped", "n8n nodes connected", "error handling active"] },
  { id: "build", label: "Build", command: "atlasmind launch product", lines: ["prototype generated", "conversion path tested", "deployment ready"] },
] as const;

export function InteractiveTerminal() {
  const [active, setActive] = useState<(typeof goals)[number]["id"]>("create");
  const reduceMotion = useReducedMotion();
  const selected = goals.find((goal) => goal.id === active)!;

  return (
    <div className="terminal-glow overflow-hidden rounded-[2rem] border border-primary/20 bg-black/95 text-foreground backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4 sm:px-6">
        <span className="size-2.5 rounded-full bg-primary" />
        <span className="size-2.5 rounded-full bg-cyan-300" />
        <span className="size-2.5 rounded-full bg-accent" />
        <span className="ml-3 font-mono text-xs text-white/45">atlasmind / live system</span>
      </div>
      <div className="flex min-h-[28rem] flex-col p-6 sm:p-9">
        <div className="mb-8 grid grid-cols-3 gap-2" role="tablist" aria-label="Choose your AI goal">
          {goals.map((goal) => (
            <button
              key={goal.id}
              role="tab"
              aria-selected={active === goal.id}
              onClick={() => setActive(goal.id)}
              className={cn(
                "min-h-11 cursor-pointer rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200",
                active === goal.id ? "border-primary bg-primary text-primary-foreground shadow-[0_0_24px_rgb(0_200_245/0.18)]" : "border-white/12 bg-white/5 text-white/60 hover:border-primary/35 hover:bg-white/10 hover:text-white",
              )}
            >
              {goal.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <m.div
            key={selected.id}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.24 }}
            className="flex flex-1 flex-col justify-center gap-7"
          >
            <div className="flex items-center gap-3 font-mono text-sm text-primary">
              <Sparkles className="size-4" />
              {selected.command}
            </div>
            <div className="flex flex-col gap-4 font-mono text-sm sm:text-base">
              {selected.lines.map((line, index) => (
                <m.div
                  key={line}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.12 + index * 0.1 }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <Check className="size-4 text-primary" />
                  <span>&gt; {line}</span>
                </m.div>
              ))}
            </div>
          </m.div>
        </AnimatePresence>
        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="font-mono text-xs text-white/35">Choose a goal to preview the system.</p>
        </div>
      </div>
    </div>
  );
}
