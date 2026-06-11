import { Container } from "@/components/container";

export function LegalLayout({ sections }: { sections: Array<{ id: string; title: string; body: React.ReactNode }> }) {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid max-w-5xl gap-12 lg:grid-cols-[0.32fr_0.68fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">On this page</p>
          <nav className="mt-4 flex flex-col gap-1">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className="flex min-h-11 items-center rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">{section.title}</a>)}</nav>
        </aside>
        <div className="flex flex-col gap-5">
          {sections.map((section) => <section id={section.id} key={section.id} className="scroll-mt-28 rounded-3xl border bg-card p-7 sm:p-9"><h2 className="text-3xl">{section.title}</h2><div className="mt-4 leading-8 text-muted-foreground">{section.body}</div></section>)}
        </div>
      </Container>
    </section>
  );
}
