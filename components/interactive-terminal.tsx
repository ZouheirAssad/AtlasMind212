"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const goals = [
  {
    id: "website",
    label: "Website",
    command: "atlasmind launch website",
    lines: [
      { text: "responsive layout generated", href: "/services/business-website" },
      { text: "lead captures configured", href: "/services/business-website" },
      { text: "seo basics validated", href: "/services/business-website" },
    ],
  },
  {
    id: "integration",
    label: "Integration",
    command: "atlasmind connect assistant",
    lines: [
      { text: "website assistant initialized", href: "/services/ai-integration" },
      { text: "crm syncing established", href: "/services/ai-integration" },
      { text: "internal tool APIs mapped", href: "/services/ai-integration" },
    ],
  },
  {
    id: "automation",
    label: "Automation",
    command: "atlasmind deploy automation",
    lines: [
      { text: "n8n/Make trigger set", href: "/services/ai-automation" },
      { text: "error alerts activated", href: "/services/ai-automation" },
      { text: "handover docs compiled", href: "/services/ai-automation" },
    ],
  },
] as const;

type GoalId = (typeof goals)[number]["id"];

const SPINNER = [
  "\u280B",
  "\u2819",
  "\u2839",
  "\u2838",
  "\u283C",
  "\u2834",
  "\u2826",
  "\u2827",
  "\u2807",
  "\u280F",
] as const;

const HELP_ENTRIES = [
  { cmd: "website", desc: "Launch a business website build" },
  { cmd: "integration", desc: "Connect a website AI assistant" },
  { cmd: "automation", desc: "Deploy background workflow automations" },
  { cmd: "clear", desc: "Clear the terminal" },
  { cmd: "help", desc: "Show this help message" },
] as const;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Phase = "typing" | "processing" | "revealing" | "complete";

type HistoryEntry =
  | { kind: "cmd"; text: string }
  | { kind: "error"; text: string }
  | { kind: "help" };

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmtTime(index: number): string {
  const s = 1 + index * 2;
  return `14:32:${String(s).padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function InteractiveTerminal() {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = !!prefersReducedMotion;

  /* Core state */
  const [active, setActive] = useState<GoalId>("website");
  const [collapsed, setCollapsed] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [inputValue, setInputValue] = useState("");

  /* Animation state — initialised eagerly so the first command types on mount */
  const [phase, setPhase] = useState<Phase>("typing");
  const [typedChars, setTypedChars] = useState(0);
  const [spinnerFrame, setSpinnerFrame] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [completionTime, setCompletionTime] = useState("1.4");
  const [runKey, setRunKey] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selected = goals.find((g) => g.id === active)!;

  /* ------ Animation orchestration ------ */

  const runCommand = useCallback(
    (goalId: GoalId) => {
      const goal = goals.find((g) => g.id === goalId)!;
      setActive(goalId);
      setRunKey((k) => k + 1);
      setCompletionTime((0.8 + Math.random() * 1.4).toFixed(1));

      if (reduceMotion) {
        setTypedChars(goal.command.length);
        setVisibleLines(goal.lines.length);
        setPhase("complete");
      } else {
        setTypedChars(0);
        setVisibleLines(0);
        setSpinnerFrame(0);
        setPhase("typing");
      }
    },
    [reduceMotion],
  );

  /* Typewriter */
  useEffect(() => {
    if (phase !== "typing") return;
    if (typedChars >= selected.command.length) {
      const t = setTimeout(() => setPhase("processing"), 150);
      return () => clearTimeout(t);
    }
    const delay = 500 / selected.command.length;
    const t = setTimeout(() => setTypedChars((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [phase, typedChars, selected.command]);

  /* Braille spinner */
  useEffect(() => {
    if (phase !== "processing") return;
    const spin = setInterval(
      () => setSpinnerFrame((f) => (f + 1) % SPINNER.length),
      80,
    );
    const end = setTimeout(() => setPhase("revealing"), 800);
    return () => {
      clearInterval(spin);
      clearTimeout(end);
    };
  }, [phase]);

  /* Staggered result reveal */
  useEffect(() => {
    if (phase !== "revealing") return;
    if (visibleLines >= selected.lines.length) {
      const t = setTimeout(() => setPhase("complete"), 150);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 150);
    return () => clearTimeout(t);
  }, [phase, visibleLines, selected.lines.length]);

  const isComplete = phase === "complete";

  /* Auto-scroll on content change */
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [history.length, isComplete, active, reduceMotion]);


  const handleSubmit = useCallback(() => {
    const raw = inputValue.trim().toLowerCase();
    if (!raw) return;
    setInputValue("");

    if (raw === "clear") {
      setHistory([]);
      return;
    }

    if (raw === "help") {
      setHistory((h) => [...h, { kind: "cmd", text: raw }, { kind: "help" }]);
      return;
    }

    const goal = goals.find((g) => g.id === raw);
    if (goal) {
      setHistory((h) => [...h, { kind: "cmd", text: raw }]);
      runCommand(goal.id as GoalId);
      return;
    }

    setHistory((h) => [
      ...h,
      { kind: "cmd", text: raw },
      {
        kind: "error",
        text: `command not found: ${raw}. Type help for available commands.`,
      },
    ]);
  }, [inputValue, runCommand]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const focusInput = () => {
    if (!collapsed) inputRef.current?.focus();
  };

  /* ------ Derived values ------ */

  const footerText =
    phase === "typing" || phase === "processing" || phase === "revealing"
      ? "Running\u2026"
      : history.length > 0
        ? "\u2191 to re-run \u00B7 Click any result to learn more"
        : "Type help for commands \u00B7 Click a tab to explore";

  /* ------ JSX ------ */

  return (
    <div
      className="terminal-glow overflow-hidden rounded-[2rem] border border-primary/20 bg-black/95 text-foreground backdrop-blur-xl"
      id="interactive-terminal"
    >
      {/* ---- Title bar with traffic lights ---- */}
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          className="size-2.5 cursor-pointer rounded-full bg-accent transition-all hover:brightness-125 focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Collapse terminal"
          title="Close"
        />
        <span className="size-2.5 rounded-full bg-yellow-400" title="Minimize" />
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="size-2.5 cursor-pointer rounded-full bg-emerald-400 transition-all hover:brightness-125 focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Restore terminal"
          title="Restore"
        />
        <span className="ml-3 font-mono text-xs text-white/45">
          atlasmind / live system
        </span>
      </div>

      {/* ---- Collapsible body ---- */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <m.div
            key="terminal-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* biome-ignore lint: the div captures clicks to focus input */}
            <div
              className="terminal-body relative flex min-h-[28rem] flex-col p-6 sm:p-9"
              onClick={focusInput}
              role="presentation"
            >
              {/* Goal tabs */}
              <div
                className="mb-6 grid grid-cols-3 gap-2"
                role="tablist"
                aria-label="Choose your AI goal"
              >
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    role="tab"
                    aria-selected={active === goal.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      runCommand(goal.id as GoalId);
                    }}
                    className={cn(
                      "min-h-11 cursor-pointer rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200",
                      active === goal.id
                        ? "border-primary bg-primary text-primary-foreground shadow-[0_0_24px_rgb(0_200_245/0.18)]"
                        : "border-white/12 bg-white/5 text-white/60 hover:border-primary/35 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>

              {/* Scrollable output area */}
              <div
                ref={scrollContainerRef}
                className="terminal-scroll flex flex-1 flex-col gap-3 overflow-y-auto"
              >
                {/* History entries */}
                {history.map((entry, i) => (
                  <div key={i} className="font-mono text-sm">
                    {entry.kind === "cmd" && (
                      <div className="flex items-center gap-2 text-primary">
                        <span className="font-bold text-primary/70">$</span>
                        <span>{entry.text}</span>
                      </div>
                    )}
                    {entry.kind === "error" && (
                      <p className="pl-5 text-accent/80">{entry.text}</p>
                    )}
                    {entry.kind === "help" && (
                      <div className="flex flex-col gap-1.5 pl-5 text-white/60">
                        <span className="text-white/40">
                          Available commands:
                        </span>
                        {HELP_ENTRIES.map((h) => (
                          <div key={h.cmd} className="flex gap-4">
                            <span className="w-20 text-primary">{h.cmd}</span>
                            <span>{h.desc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Active command + results */}
                <div className="flex flex-1 flex-col justify-center gap-5">
                  {/* Command line with typewriter */}
                  <div className="flex items-center gap-2 font-mono text-sm text-primary">
                    <span className="font-bold text-primary/70">$</span>
                    <span>{selected.command.slice(0, typedChars)}</span>
                    {phase === "typing" && (
                      <span className="terminal-cursor" aria-hidden="true">
                        █
                      </span>
                    )}
                  </div>

                  {/* Braille spinner */}
                  {phase === "processing" && (
                    <div className="flex items-center gap-3 font-mono text-sm">
                      <span className="text-primary">
                        {SPINNER[spinnerFrame]}
                      </span>
                      <span className="text-white/50">
                        Executing workflow…
                      </span>
                    </div>
                  )}

                  {/* Result lines (staggered reveal) */}
                  {(phase === "revealing" || phase === "complete") && (
                    <div className="flex flex-col gap-3 font-mono text-sm sm:text-base">
                      {selected.lines.map((line, index) => {
                        if (phase === "revealing" && index >= visibleLines)
                          return null;
                        return (
                          <m.div
                            key={`${runKey}-${line.text}`}
                            initial={
                              reduceMotion ? false : { opacity: 0, x: -8 }
                            }
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-3"
                          >
                            <Check className="size-4 shrink-0 text-emerald-400" />
                            <span className="text-xs text-white/30">
                              [{fmtTime(index)}]
                            </span>
                            <Link
                              href={line.href}
                              onClick={(e) => e.stopPropagation()}
                              className="text-white/70 transition-colors hover:text-primary hover:underline"
                            >
                              {line.text}
                            </Link>
                          </m.div>
                        );
                      })}

                      {/* Summary line */}
                      {phase === "complete" && (
                        <m.div
                          key={`${runKey}-summary`}
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: reduceMotion ? 0 : 0.15,
                          }}
                          className="mt-1 flex items-center gap-2 border-t border-white/5 pt-3 font-mono text-sm text-primary/70"
                        >
                          <span>✔</span>
                          <span>
                            {selected.lines.length} steps completed in{" "}
                            {completionTime}s
                          </span>
                        </m.div>
                      )}
                    </div>
                  )}
                </div>

              </div>

              {/* Input prompt */}
              <div className="mt-4 flex items-center gap-2 border-t border-white/8 pt-4 font-mono text-sm">
                <span className="font-bold text-primary/70">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 bg-transparent text-primary caret-primary outline-none placeholder:text-white/20"
                  aria-label="Terminal command input"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>

              {/* Context-aware footer */}
              <div className="mt-3 border-t border-white/10 pt-4">
                <AnimatePresence mode="wait">
                  <m.p
                    key={footerText}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-xs text-white/35"
                  >
                    {footerText}
                  </m.p>
                </AnimatePresence>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* ---- Collapsed state ---- */}
      <AnimatePresence>
        {collapsed && (
          <m.div
            key="collapsed-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center px-5 py-3"
          >
            <span className="font-mono text-xs text-white/45">
              Terminal collapsed — click{" "}
              <span className="text-emerald-400">●</span> to restore
            </span>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
