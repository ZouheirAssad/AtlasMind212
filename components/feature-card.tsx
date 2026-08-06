import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <Card className="group relative h-full overflow-hidden transition-colors duration-200 hover:border-primary/45">
      <div className="absolute inset-y-0 left-0 w-1 bg-primary-display" />
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <span className="flex size-12 items-center justify-center rounded-sm bg-secondary text-primary">
            <Icon className="size-5" />
          </span>
          {meta && <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{meta}</span>}
        </div>
        <CardTitle className="pt-3 text-2xl tracking-[-0.03em]">{title}</CardTitle>
        <CardDescription className="text-base leading-7">{description}</CardDescription>
      </CardHeader>
      {href ? (
        <CardFooter className="mt-auto">
          <Link href={href} className="flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">
            {ctaLabel} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </CardFooter>
      ) : <CardContent />}
    </Card>
  );
}
