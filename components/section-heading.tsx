import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
      <h2 className="text-balance text-4xl leading-[1.02] text-display-brand sm:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="text-balance text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
