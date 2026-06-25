import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

interface ConstellationItem {
  slug: string;
  position: string; // Tailwind class positioning, e.g. "top-[15%] left-[8%]"
  desktopOnly: boolean;
}

const CONSTELLATION_ITEMS: ConstellationItem[] = [];

export function LogoConstellation() {
  return (
    <div
      className="absolute inset-0 -z-20 pointer-events-none select-none overflow-hidden animate-fade-in"
      aria-hidden="true"
    >
      {/* Soft overlay gradient to ensure high readability and contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/40 to-[#020617] opacity-80" />

      {CONSTELLATION_ITEMS.map(({ slug, position, desktopOnly }) => (
        <div
          key={slug}
          className={cn(
            "absolute transition-transform duration-500 hover:scale-105",
            position,
            desktopOnly ? "hidden lg:block" : "block"
          )}
        >
          {/* Constellation nodes - low opacity tiles */}
          <div className="flex items-center justify-center p-3 rounded-2xl bg-[#07111F]/20 border border-[#1E3A4A]/10 opacity-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] backdrop-blur-[1px]">
            <BrandLogo slug={slug} size={32} variant="inline" ariaHidden={true} />
          </div>
        </div>
      ))}
    </div>
  );
}

