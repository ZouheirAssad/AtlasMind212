"use client";

import { useState } from "react";
import { CheckCircle2, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/components/i18n/i18n-provider";
import type { Guide } from "@/lib/guides";

type GatedDownloadFormProps = {
  guide: Guide;
  isHardGated?: boolean;
};

export function GatedDownloadForm({ guide, isHardGated = false }: GatedDownloadFormProps) {
  const { dict, href } = useI18n();
  const t = dict.gatedForm;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const downloadUrl = href(`/blog/${guide.slug}/download`);

  function triggerDownload() {
    const iframe = document.createElement("iframe");
    iframe.hidden = true;
    iframe.setAttribute("aria-hidden", "true");
    iframe.src = downloadUrl;
    document.body.appendChild(iframe);
    window.setTimeout(() => iframe.remove(), 60_000);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          contentSlug: guide.slug,
          contentTitle: guide.title,
          source: "gated-download",
        }),
      });

      if (!response.ok) {
        throw new Error(t.genericError);
      }

      setTimeout(() => {
        triggerDownload();
        setSuccess(true);
        setLoading(false);
      }, 150);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.genericError);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <article className="border-s-4 border-primary bg-[var(--surface-raised)] p-6 text-center sm:p-8">
        <CheckCircle2 className="size-10 mx-auto text-primary" />
        <h3 className="mt-4 font-display text-2xl text-primary">{t.successTitle}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{t.successText}</p>
        <Button type="button" variant="outline" className="mt-5 h-11" onClick={triggerDownload}>
          <Download data-icon="inline-start" /> {t.downloadAgain}
        </Button>
      </article>
    );
  }

  return (
    <article className="border border-border bg-card p-6 shadow-[0_12px_40px_rgb(64_68_71/0.08)] sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center bg-secondary text-primary">
          <Download className="size-5" />
        </span>
        <div>
          <h3 className="text-xl font-semibold">{t.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{t.subtitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="gate-name" className="block text-xs font-mono uppercase tracking-[0.12em] text-muted-foreground mb-2">
            {t.name}
          </label>
          <Input
            id="gate-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            disabled={loading}
            className="h-12 bg-background/55"
          />
        </div>

        <div>
          <label htmlFor="gate-email" className="block text-xs font-mono uppercase tracking-[0.12em] text-muted-foreground mb-2">
            {t.email}
          </label>
          <Input
            id="gate-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            dir="ltr"
            disabled={loading}
            className="h-12 bg-background/55"
          />
        </div>

        {error && (
          <div role="alert" className="border border-destructive/40 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3 pt-2">
          <Button type="submit" disabled={loading} size="lg" className="h-12 w-full">
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin me-2" /> {t.processing}
              </>
            ) : (
              <>
                <Download data-icon="inline-start" /> {t.submit}
              </>
            )}
          </Button>

          {!isHardGated && (
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => {
                triggerDownload();
                setSuccess(true);
              }}
              className="h-12 w-full"
            >
              {t.skip}
            </Button>
          )}
        </div>
      </form>
      <p className="mt-4 text-[0.7rem] text-center text-muted-foreground">
        {t.privacy}
      </p>
    </article>
  );
}
