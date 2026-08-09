import Image from "next/image";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type HeroImage = { src: string; alt: string };

export function PageHero({
  eyebrow,
  title,
  description,
  variant = "minimal",
  image,
  imagePosition = "center",
  compact = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  variant?: "photo" | "split" | "minimal";
  image?: HeroImage;
  imagePosition?: "left" | "center" | "right";
  compact?: boolean;
  showConstellation?: boolean;
}) {
  if (variant === "photo" && image) {
    return (
      <section className="relative min-h-[36rem] overflow-hidden bg-black text-white sm:min-h-[44rem]">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className={cn("object-cover", imagePosition === "left" && "object-left", imagePosition === "right" && "object-right")} />
        <div className="photo-overlay absolute inset-0" />
        <Container className="relative flex min-h-[36rem] items-end pb-14 pt-32 sm:min-h-[44rem] sm:pb-20">
          <Reveal className="w-full min-w-0 max-w-6xl">
            <Badge className="mb-6 max-w-full whitespace-normal bg-white text-left text-black">{eyebrow}</Badge>
            <h1 className="max-w-5xl text-balance text-5xl leading-[0.95] sm:text-7xl lg:max-w-2xl lg:text-[5rem]">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88 sm:text-2xl sm:leading-9">{description}</p>
          </Reveal>
        </Container>
      </section>
    );
  }

  if (variant === "split" && image) {
    return (
      <section className="border-b bg-[#0a0a0a] text-white">
        <Container className="grid min-h-[38rem] gap-0 px-0 lg:grid-cols-2 lg:px-10">
          <Reveal className="flex min-w-0 flex-col justify-center px-5 py-20 sm:px-8 lg:px-0 lg:pr-16">
            <Badge className="mb-6">{eyebrow}</Badge>
            <h1 className="text-balance text-5xl leading-[0.96] text-display-violet sm:text-7xl">{title}</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/78">{description}</p>
          </Reveal>
          <div className="relative min-h-[28rem] lg:min-h-full">
            <Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className={cn("object-cover", imagePosition === "left" && "object-left", imagePosition === "right" && "object-right")} />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={cn("border-b bg-[#f7f6ff]", compact ? "py-14 sm:py-20" : "py-20 sm:py-28")}>
      <Container>
        <Reveal className="max-w-5xl">
          <Badge variant="secondary">{eyebrow}</Badge>
          <h1 className="mt-6 text-balance text-5xl leading-[0.98] text-display-violet sm:text-7xl lg:text-8xl">{title}</h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-muted-foreground">{description}</p>
        </Reveal>
      </Container>
    </section>
  );
}
