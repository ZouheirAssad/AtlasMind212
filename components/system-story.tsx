"use client";

import { m, useReducedMotion } from "motion/react";
import { PanelsTopLeft, Bot, Rocket, Workflow } from "lucide-react";

const chapters = [
  { number: "01", title: "Launch", description: "Deploy a high-performance business website to establish your presence.", icon: PanelsTopLeft },
  { number: "02", title: "Integrate", description: "Connect smart AI assistants to CRM, spreadsheets, and databases.", icon: Bot },
  { number: "03", title: "Automate", description: "Set up background workflows with n8n to handle repetitive tasks.", icon: Workflow },
  { number: "04", title: "Scale", description: "Optimize performance, report metrics, and scale your operations.", icon: Rocket },
];

export function SystemStory() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">One connected method</p>
        <h2 className="mt-5 text-balance text-5xl tracking-[-0.045em] sm:text-6xl">From learning tools to building momentum.</h2>
        <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">Each chapter ends in a useful output. No endless setup, no tool collecting.</p>
      </div>
      <div className="flex flex-col gap-5">
        {chapters.map((chapter, index) => {
          const Icon = chapter.icon;
          return (
            <m.article
              key={chapter.title}
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.58, delay: index * 0.04 }}
              className="group min-h-64 rounded-[2rem] border bg-card p-7 shadow-[0_18px_55px_rgb(0_0_0/0.22)] sm:p-9"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-sm text-muted-foreground">{chapter.number}</span>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105"><Icon className="size-5" /></span>
              </div>
              <h3 className="mt-12 font-display text-4xl">{chapter.title}</h3>
              <p className="mt-3 max-w-lg text-lg leading-8 text-muted-foreground">{chapter.description}</p>
            </m.article>
          );
        })}
      </div>
    </div>
  );
}
