import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Guide } from "@/lib/guides";

export function GuideCard({ guide, thumbnailUrl, priority = false }: { guide: Guide; thumbnailUrl: string; priority?: boolean }) {
  const label = guide.content_type === "article" ? (guide.hasPdf ? "Article + guide" : "Article") : "PDF guide";

  return (
    <article className="group grid gap-0 border-b py-8 md:grid-cols-[15rem_1fr] md:gap-8">
      <Link href={`/blog/${guide.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-secondary" aria-label={`View ${guide.title}`}>
        {thumbnailUrl ? (
          <Image src={thumbnailUrl} alt={guide.thumbnail_alt || guide.title} fill sizes="(max-width: 768px) 100vw, 240px" priority={priority} className="object-cover transition-transform duration-300 group-hover:scale-[1.025]" />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[#f3f0ff] text-5xl font-bold text-primary-display">A</div>
        )}
      </Link>
      <div className="flex flex-col justify-center py-5 md:py-0">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{label}</p>
        <h2 className="mt-3 text-balance text-3xl leading-tight sm:text-4xl"><Link href={`/blog/${guide.slug}`} className="hover:text-primary">{guide.title}</Link></h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{guide.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild><Link href={`/blog/${guide.slug}`}>Open <ArrowUpRight /></Link></Button>
          {guide.hasPdf && <Button asChild variant="outline"><Link href={`/blog/${guide.slug}/download`}><Download /> PDF</Link></Button>}
        </div>
      </div>
    </article>
  );
}
