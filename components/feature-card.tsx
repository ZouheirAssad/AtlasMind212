import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolBadge } from "@/components/tool-badge";

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  meta,
  tools,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  meta?: string;
  tools?: readonly string[];
}) {
  return (
    <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_24px_60px_rgb(0_200_245/0.1)]">
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
            <Icon className="size-5" />
          </span>
          {meta && <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{meta}</span>}
        </div>
        <CardTitle className="pt-3 text-2xl tracking-[-0.03em]">{title}</CardTitle>
        <CardDescription className="text-base leading-7">{description}</CardDescription>
        {tools && tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-4">
            {tools.map((toolSlug) => (
              <ToolBadge key={toolSlug} slug={toolSlug} interactive={!!href} />
            ))}
          </div>
        )}
      </CardHeader>
      {href ? (
        <CardFooter className="mt-auto">
          <Link href={href} className="flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">
            Explore workflow <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </CardFooter>
      ) : <CardContent />}
    </Card>
  );
}

