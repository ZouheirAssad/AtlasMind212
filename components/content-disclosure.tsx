import type { Guide } from "@/lib/guides";

type ContentDisclosureProps = {
  guide: Guide;
  className?: string;
};

export function ContentDisclosure({ guide, className }: ContentDisclosureProps) {
  if (!guide.is_sponsored && !guide.has_affiliate_links) return null;

  return (
    <aside
      className={`rounded-2xl border border-border bg-secondary/40 p-5 text-sm text-muted-foreground ${className ?? ""}`}
    >
      {guide.is_sponsored && (
        <p className="mb-3 last:mb-0">
          <span className="mr-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Sponsored Content:
          </span>
          This content is sponsored by {guide.sponsor_name || "one of our partners"}.{" "}
          {guide.disclosure_note || "We receive compensation for presenting this content."}
        </p>
      )}
      {guide.has_affiliate_links && (
        <p className="last:mb-0">
          <span className="mr-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Affiliate Links:
          </span>
          This post contains affiliate links. If you make a purchase through these links, we may earn a commission at no
          additional cost to you. {guide.disclosure_note}
        </p>
      )}
    </aside>
  );
}
