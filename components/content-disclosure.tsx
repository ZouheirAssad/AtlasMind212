import type { Guide } from "@/lib/guides";
import { format, getDictionary, type Locale } from "@/lib/i18n";

type ContentDisclosureProps = {
  guide: Guide;
  locale: Locale;
  className?: string;
};

export function ContentDisclosure({ guide, locale, className }: ContentDisclosureProps) {
  if (!guide.is_sponsored && !guide.has_affiliate_links) return null;
  const t = getDictionary(locale).disclosure;

  return (
    <aside
      className={`border-s-4 border-primary-display bg-secondary/55 p-5 text-sm text-muted-foreground ${className ?? ""}`}
    >
      {guide.is_sponsored && (
        <p className="mb-3 last:mb-0">
          <span className="me-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            {t.sponsoredLabel}
          </span>
          {format(t.sponsoredText, { sponsor: guide.sponsor_name || t.sponsorFallback })}{" "}
          {guide.disclosure_note || t.sponsoredNoteFallback}
        </p>
      )}
      {guide.has_affiliate_links && (
        <p className="last:mb-0">
          <span className="me-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            {t.affiliateLabel}
          </span>
          {t.affiliateText} {guide.disclosure_note}
        </p>
      )}
    </aside>
  );
}
