import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { LogoConstellation } from "@/components/logo-constellation";

export function PageHero({
  eyebrow,
  title,
  description,
  showConstellation = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  showConstellation?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b bg-background/46 py-20 backdrop-blur-[2px] sm:py-28">
      {/* Background layer with soft grid, grain and dual soft glow */}
      <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y" />
      <div className="absolute inset-0 -z-10 bg-glow-dual opacity-70 mask-fade-y" />
      {showConstellation && <LogoConstellation />}
      <Container>
        <Reveal className="flex max-w-4xl flex-col gap-6">
          <Badge variant="secondary">{eyebrow}</Badge>
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
            {title}
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-muted-foreground">
            {description}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

