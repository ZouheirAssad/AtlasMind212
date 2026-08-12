import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  meta,
  ctaLabel = "Learn more",
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  meta?: string;
  ctaLabel?: string;
}) {
  const content = (
    <>
      <div className="absolute inset-y-0 left-0 w-1 bg-primary-display" />
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <span className="flex size-12 items-center justify-center rounded-sm bg-secondary text-primary">
            <Icon className="size-5" />
          </span>
          {meta && <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{meta}</span>}
        </div>
        <CardTitle className="pt-3 text-2xl tracking-[-0.03em]"><h3>{title}</h3></CardTitle>
        <CardDescription className="text-base leading-7">{description}</CardDescription>
      </CardHeader>
      {href ? (
        <CardFooter className="mt-auto">
          <span className="flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">
            {ctaLabel} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </CardFooter>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="group block h-full rounded-md">
        <Card className="relative h-full overflow-hidden transition-[border-color,box-shadow] duration-200 group-hover:border-primary/60 group-hover:shadow-[0_14px_42px_rgb(64_68_71/0.13)] group-focus-visible:border-primary">
          {content}
        </Card>
      </Link>
    );
  }

  return <Card className="relative h-full overflow-hidden">{content}</Card>;
}
