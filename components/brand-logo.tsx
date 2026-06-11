"use client";

import { useState } from "react";
import Image from "next/image";
import { brandRegistry } from "@/lib/brand-registry";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  slug: string;
  size?: number;
  className?: string;
  variant?: "inline" | "tile";
  ariaHidden?: boolean;
}

export function BrandLogo({
  slug,
  size = 24,
  className,
  variant = "inline",
  ariaHidden = true,
}: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);
  const brand = brandRegistry[slug];

  if (!brand || hasError) {
    const Fallback = brand?.fallbackIcon || brandRegistry.chatgpt.fallbackIcon;
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center text-muted-foreground",
          variant === "tile" && "size-12 rounded-2xl bg-[#0B1626] border border-[#1E3A4A]/40",
          className
        )}
        aria-hidden={ariaHidden}
      >
        <Fallback className={cn("size-5", variant === "inline" && `w-[${size}px] h-[${size}px]`)} />
      </span>
    );
  }

  const imageElement = (
    <Image
      src={brand.logoPath}
      alt={ariaHidden ? "" : brand.displayName}
      width={size}
      height={size}
      className={cn("object-contain transition-opacity duration-300", variant === "tile" && "size-6")}
      onError={() => setHasError(true)}
      aria-hidden={ariaHidden}
      priority
    />
  );

  if (variant === "tile") {
    return (
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B1626] border border-[#1E3A4A]/40 shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all group-hover:border-primary/30",
          className
        )}
      >
        {imageElement}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center justify-center shrink-0", className)}>
      {imageElement}
    </span>
  );
}
