import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGuideThumbnailUrl, type Guide } from "@/lib/guides";

export function GuideCard({ guide, priority = false }: { guide: Guide; priority?: boolean }) {
  const thumbnailUrl = getGuideThumbnailUrl(guide);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-card/94 shadow-[0_18px_55px_rgb(0_0_0/0.24)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_24px_60px_rgb(0_200_245/0.1)]">
      <Link href={`/blog/${guide.slug}`} className="relative block aspect-square overflow-hidden bg-secondary" aria-label={`View ${guide.title}`}>
        <Image
          src={thumbnailUrl}
          alt={guide.thumbnail_alt || ""}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/72 to-transparent" />
      </Link>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-primary">
          <FileText className="size-4" />
          PDF Guide
        </div>
        <div className="flex-1">
          <h2 className="text-balance font-display text-3xl leading-tight tracking-[-0.035em]">
            <Link href={`/blog/${guide.slug}`} className="transition-colors hover:text-primary">
              {guide.title}
            </Link>
          </h2>
          <p className="mt-4 line-clamp-4 text-sm leading-7 text-muted-foreground">{guide.description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="h-11">
            <Link href={`/blog/${guide.slug}`}>
              View guide <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <Link href={`/blog/${guide.slug}/download`}>
              <Download data-icon="inline-start" /> Download PDF
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
