"use client";

import { useState } from "react";
import { CheckCircle2, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Guide } from "@/lib/guides";

type GatedDownloadFormProps = {
  guide: Guide;
  isHardGated?: boolean;
};

export function GatedDownloadForm({ guide, isHardGated = false }: GatedDownloadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const downloadUrl = `/blog/${guide.slug}/download`;

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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setTimeout(() => {
        triggerDownload();
        setSuccess(true);
        setLoading(false);
      }, 150);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <article className="rounded-3xl border border-primary/35 bg-primary/5 p-6 text-center sm:p-8">
        <CheckCircle2 className="size-10 mx-auto text-primary" />
        <h3 className="mt-4 font-display text-2xl text-primary">Download started</h3>
        <p className="mt-2 text-sm text-muted-foreground">Your PDF should appear in your browser downloads. You can start it again if needed.</p>
        <Button type="button" variant="outline" className="mt-5 h-11" onClick={triggerDownload}>
          <Download data-icon="inline-start" /> Download again
        </Button>
      </article>
    );
  }

  return (
    <article className="rounded-3xl border border-border bg-card/94 p-6 shadow-2xl sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Download className="size-5" />
        </span>
        <div>
          <h3 className="text-xl font-semibold">Download Gated PDF Guide</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Please provide your details to unlock this practical resource.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="gate-name" className="block text-xs font-mono uppercase tracking-[0.12em] text-muted-foreground mb-2">
            Name
          </label>
          <Input
            id="gate-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            disabled={loading}
            className="h-12 bg-background/55"
          />
        </div>

        <div>
          <label htmlFor="gate-email" className="block text-xs font-mono uppercase tracking-[0.12em] text-muted-foreground mb-2">
            Email address
          </label>
          <Input
            id="gate-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
            className="h-12 bg-background/55"
          />
        </div>

        {error && (
          <div role="alert" className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3 pt-2">
          <Button type="submit" disabled={loading} size="lg" className="h-12 w-full">
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" /> Processing...
              </>
            ) : (
              <>
                <Download data-icon="inline-start" /> Unlock & Download PDF
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
              Skip and download directly
            </Button>
          )}
        </div>
      </form>
      <p className="mt-4 text-[0.7rem] text-center text-muted-foreground">
        We respect your privacy. By downloading, you agree to receive occasional AI updates and resources. Unsubscribe at any time.
      </p>
    </article>
  );
}
