"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Check, Clock3, Gauge, Search } from "lucide-react";
import { ResponsiveDetail } from "@/components/responsive-detail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { workflows } from "@/lib/site-data";
import { ToolBadge } from "@/components/tool-badge";
import { brandRegistry } from "@/lib/brand-registry";

const categories = ["All", ...new Set(workflows.map((workflow) => workflow.category))];

export function WorkflowExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const category = searchParams.get("category") ?? "All";
  const selected = workflows.find((workflow) => workflow.slug === searchParams.get("workflow"));

  function updateParams(updates: Record<string, string | null>, mode: "push" | "replace" = "replace") {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => value ? params.set(key, value) : params.delete(key));
    router[mode](`${pathname}?${params.toString()}`, { scroll: false });
  }

  const filtered = useMemo(() => workflows.filter((workflow) => {
    const matchesCategory = category === "All" || workflow.category === category;
    const search = query.toLowerCase();
    const toolNames = workflow.tools.map((slug) => brandRegistry[slug]?.displayName ?? slug);
    const matchesQuery = !search || [workflow.title, workflow.description, ...toolNames].join(" ").toLowerCase().includes(search);
    return matchesCategory && matchesQuery;
  }), [category, query]);

  return (
    <>
      <div className="mb-10 rounded-[2rem] border bg-card p-4 shadow-[0_16px_50px_rgb(0_0_0/0.24)] sm:p-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              updateParams({ q: event.target.value || null });
            }}
            placeholder="Search workflows or tools"
            aria-label="Search workflows"
            className="h-12 rounded-xl pl-12"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Workflow categories">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => updateParams({ category: item === "All" ? null : item }, "push")}
              aria-pressed={category === item}
              className={cn("min-h-11 cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors", category === item ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary/40 hover:bg-secondary")}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="mb-6 text-sm text-muted-foreground" aria-live="polite">{filtered.length} workflow{filtered.length === 1 ? "" : "s"} found</p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((workflow) => {
          const Icon = workflow.icon;
          return (
            <Card key={workflow.slug} className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary"><Icon className="size-5" /></span>
                  <Badge variant="outline">{workflow.category}</Badge>
                </div>
                <CardTitle className="pt-3 text-2xl">{workflow.title}</CardTitle>
                <CardDescription className="text-base leading-7">{workflow.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1.5"><Gauge className="size-3.5" /> {workflow.difficulty}</Badge>
                  <Badge variant="secondary" className="flex items-center gap-1.5"><Clock3 className="size-3.5" /> {workflow.estimatedTime}</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {workflow.tools.map((toolSlug) => (
                    <ToolBadge key={toolSlug} slug={toolSlug} />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="ghost" onClick={() => updateParams({ workflow: workflow.slug }, "push")} className="-ml-3 text-primary">
                  View blueprint <ArrowRight data-icon="inline-end" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {filtered.length === 0 && <div className="rounded-3xl border bg-card p-10 text-center"><h2 className="text-2xl">No matching workflows.</h2><p className="mt-2 text-muted-foreground">Try a broader search or another category.</p></div>}
      {selected && (
        <ResponsiveDetail open onOpenChange={(open) => !open && updateParams({ workflow: null })} title={selected.title} description={selected.outcome}>
          <div className="flex flex-col gap-7">
            <div className="flex flex-wrap gap-2">
              {selected.tools.map((toolSlug) => (
                <ToolBadge key={toolSlug} slug={toolSlug} interactive />
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Info label="Difficulty" value={selected.difficulty} />
              <Info label="Estimated time" value={selected.estimatedTime} />
            </div>
            <div><h3 className="font-semibold">Before you start</h3><ul className="mt-3 flex flex-col gap-2">{selected.prerequisites.map((item) => <li key={item} className="flex gap-2 text-muted-foreground"><Check className="mt-1 size-4 shrink-0 text-primary" />{item}</li>)}</ul></div>
            <div><h3 className="font-semibold">Workflow steps</h3><ol className="mt-4 flex flex-col gap-3">{selected.steps.map((step, index) => <li key={step} className="flex gap-4 rounded-2xl bg-secondary/45 p-4"><span className="font-mono text-xs text-primary">0{index + 1}</span><span>{step}</span></li>)}</ol></div>
          </div>
        </ResponsiveDetail>
      )}
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border bg-background p-4"><p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p><p className="mt-2 font-semibold">{value}</p></div>;
}

