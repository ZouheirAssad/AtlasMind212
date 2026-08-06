import { Container } from "@/components/container";

export function LegalLayout({ sections }: { sections: Array<{ id: string; title: string; body: React.ReactNode }> }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="grid max-w-6xl gap-12 lg:grid-cols-[0.28fr_0.72fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">On this page</p>
          <nav className="mt-4 flex flex-col border-y">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className="flex min-h-11 items-center border-b py-2 text-sm text-muted-foreground transition-colors last:border-0 hover:text-primary">{section.title}</a>)}</nav>
        </aside>
        <div>
          {sections.map((section) => <section id={section.id} key={section.id} className="scroll-mt-28 border-t py-9 first:border-t-0 first:pt-0"><h2 className="text-3xl">{section.title}</h2><div className="mt-5 max-w-3xl leading-8 text-muted-foreground">{section.body}</div></section>)}
        </div>
      </Container>
    </section>
  );
}
