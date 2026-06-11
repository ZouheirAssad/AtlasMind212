"use client";

import { brandRegistry } from "@/lib/brand-registry";
import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

interface ToolBadgeProps {
  slug: string;
  className?: string;
  interactive?: boolean;
}

export function ToolBadge({ slug, className, interactive = false }: ToolBadgeProps) {
  const brand = brandRegistry[slug];
  if (!brand) return null;

  const content = (
    <>
      <BrandLogo slug={slug} size={16} variant="inline" className="mr-1.5 size-4" ariaHidden={true} />
      <span className="text-xs font-semibold text-[#F8FAFC]">{brand.displayName}</span>
    </>
  );

  const baseClasses = cn(
    "inline-flex items-center rounded-full border border-[#1E3A4A]/50 bg-[#07111F] px-2.5 py-1 transition-all duration-200",
    interactive && "cursor-pointer hover:border-primary/40 hover:bg-[#0B1626] hover:shadow-[0_0_8px_rgba(0,200,245,0.15)]",
    className
  );

  if (interactive) {
    return (
      <a
        href={`/tools?tool=${slug}`}
        className={baseClasses}
        title={`Learn more about ${brand.displayName}`}
      >
        {content}
      </a>
    );
  }

  return <span className={baseClasses}>{content}</span>;
}
