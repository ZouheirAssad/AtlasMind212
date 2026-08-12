import Image from "next/image";
import { cn } from "@/lib/utils";

const brandAssets = {
  mark: {
    src: "/atlasmind-mark.png",
    width: 512,
    height: 512,
  },
  lockup: {
    src: "/atlasmind-logo.png",
    width: 936,
    height: 600,
  },
  wordmark: {
    src: "/atlasmind-wordmark.png",
    width: 896,
    height: 88,
  },
  wordmarkInverse: {
    src: "/atlasmind-wordmark-inverse.png",
    width: 896,
    height: 88,
  },
} as const;

export type BrandLogoProps = {
  variant: keyof typeof brandAssets;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ variant, className, priority = false }: BrandLogoProps) {
  const asset = brandAssets[variant];

  return (
    <Image
      src={asset.src}
      alt=""
      width={asset.width}
      height={asset.height}
      className={cn("object-contain", className)}
      priority={priority}
    />
  );
}
