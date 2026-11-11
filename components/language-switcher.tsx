"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n/i18n-provider";
import { localeLabels, locales, localizePath, stripLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  const { locale, dict } = useI18n();
  const { path } = stripLocale(usePathname() ?? "/");

  return (
    <div role="group" aria-label={dict.common.switchLanguage} className={cn("flex items-center gap-1", className)}>
      {locales.map((target) => {
        const active = target === locale;
        return (
          <Link
            key={target}
            href={localizePath(target, path)}
            hrefLang={target}
            lang={target}
            aria-current={active ? "true" : undefined}
            title={localeLabels[target].name}
            className={cn(
              "inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-2 text-xs font-bold transition-colors",
              inverse
                ? active ? "bg-white/15 text-white" : "text-white/75 hover:text-white"
                : active ? "bg-secondary text-primary" : "text-foreground/65 hover:text-primary",
            )}
          >
            <span aria-hidden="true">{localeLabels[target].short}</span>
            <span className="sr-only">{localeLabels[target].name}</span>
          </Link>
        );
      })}
    </div>
  );
}
