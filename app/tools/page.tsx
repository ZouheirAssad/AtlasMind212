import { Suspense } from "react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ToolExplorer } from "@/components/tool-explorer";

export const metadata = { title: "AI Tools" };

export default function ToolsPage() {
  return (
    <>
      <PageHero eyebrow="Curated tool stack" title="Know what each AI tool is for." description="Search by job or category, then see exactly where each tool fits in a practical workflow." />
      <section className="relative overflow-hidden bg-blush py-16 sm:py-24">
        {/* Soft grid + grain overlay */}
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container className="relative"><Suspense fallback={<div className="min-h-96 rounded-3xl bg-secondary/30" />}><ToolExplorer /></Suspense></Container>
      </section>
    </>
  );
}
