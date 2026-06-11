"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { ResponsiveDetail } from "@/components/responsive-detail";
import { BrandLogo } from "@/components/brand-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toolCategories, tools, workflows } from "@/lib/site-data";

const categories = ["All", ...toolCategories];

export function ToolExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const category = searchParams.get("category") ?? "All";
  const selected = tools.find((tool) => tool.slug === searchParams.get("tool"));

  function updateParams(updates: Record<string, string | null>, mode: "push" | "replace" = "replace") {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => value ? params.set(key, value) : params.delete(key));
    router[mode](`${pathname}?${params.toString()}`, { scroll: false });
  }

  const filtered = useMemo(() => tools.filter((tool) => {
    const matchesCategory = category === "All" || tool.category === category;
    const search = query.toLowerCase();
    const matchesQuery = !search || [tool.name, tool.description, ...tool.bestFor].join(" ").toLowerCase().includes(search);
    return matchesCategory && matchesQuery;
  }), [category, query]);

  return (
    <>
      <div className="mb-10 rounded-[2rem] border bg-card p-4 shadow-[0_16px_50px_rgb(0_0_0/0.24)] sm:p-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(event) => { setQuery(event.target.value); updateParams({ q: event.target.value || null }); }} placeholder="Search by tool or use case" aria-label="Search tools" className="h-12 rounded-xl pl-12" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Tool categories">
          {categories.map((item) => (
            <button key={item} onClick={() => updateParams({ category: item === "All" ? null : item }, "push")} aria-pressed={category === item} className={cn("min-h-11 cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors", category === item ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary/40 hover:bg-secondary")}>{item}</button>
          ))}
        </div>
      </div>
      <p className="mb-6 text-sm text-muted-foreground" aria-live="polite">{filtered.length} tool{filtered.length === 1 ? "" : "s"} found</p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => {
          return (
            <Card key={tool.slug} className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <BrandLogo slug={tool.slug} variant="tile" className="size-12" />
                  <Badge variant="outline">{tool.level}</Badge>
                </div>
                <CardTitle className="pt-3 text-2xl">{tool.name}</CardTitle>
                <CardDescription className="text-base leading-7">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">{tool.bestFor.slice(0, 2).map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}</CardContent>
              <CardFooter className="mt-auto"><Button variant="ghost" onClick={() => updateParams({ tool: tool.slug }, "push")} className="-ml-3 text-primary">See where it fits <ArrowRight data-icon="inline-end" /></Button></CardFooter>
            </Card>
          );
        })}
      </div>
      {selected && (
        <ResponsiveDetail
          open
          onOpenChange={(open) => !open && updateParams({ tool: null })}
          title={selected.name}
          description={selected.description}
          logo={<BrandLogo slug={selected.slug} size={36} variant="inline" className="size-9" />}
        >
          <div className="flex flex-col gap-7">
            <div><p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Best for</p><div className="mt-3 flex flex-wrap gap-2">{selected.bestFor.map((item) => <Badge key={item}>{item}</Badge>)}</div></div>
            <div className="rounded-2xl border bg-secondary/35 p-5"><p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Learning level</p><p className="mt-2 text-xl font-semibold">{selected.level}</p></div>
            <div>
              <h3 className="flex items-center gap-2 font-semibold"><Sparkles className="size-4 text-primary" /> Related workflows</h3>
              <div className="mt-4 flex flex-col gap-3">
                {selected.relatedWorkflows.length ? selected.relatedWorkflows.map((slug) => {
                  const workflow = workflows.find((item) => item.slug === slug);
                  return workflow ? <a key={slug} href={`/workflows?workflow=${slug}`} className="flex min-h-14 items-center rounded-2xl border p-4 font-medium transition-colors hover:bg-secondary">{workflow.title}</a> : null;
                }) : <p className="text-muted-foreground">A dedicated workflow is coming soon.</p>}
              </div>
            </div>
          </div>
        </ResponsiveDetail>
      )}
    </>
  );
}
