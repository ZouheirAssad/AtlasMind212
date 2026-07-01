"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function AdminSetPasswordForm() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function prepareSession() {
      const supabase = createBrowserSupabaseClient();
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError && !cancelled) setError(exchangeError.message);
      } else if (accessToken && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (sessionError && !cancelled) setError(sessionError.message);
      }

      if (code || accessToken) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      const { data } = await supabase.auth.getSession();

      if (!cancelled) {
        setIsReady(Boolean(data.session));
        setIsLoading(false);
      }
    }

    prepareSession();

    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setIsSubmitting(false);
      return;
    }

    const supabase = createBrowserSupabaseClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setIsSubmitting(false);
      return;
    }

    router.push("/admin/guides");
    router.refresh();
  }

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-card/95 p-6 shadow-xl sm:p-8">
        <div className="flex items-center gap-3 text-muted-foreground">
          <LoaderCircle className="size-5 animate-spin text-primary" />
          Preparing your invite...
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="rounded-3xl border bg-card/95 p-6 shadow-xl sm:p-8">
        <FieldError>
          {error || "This invite link is missing an active session. Request a new admin invite and open the latest email link."}
        </FieldError>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border bg-card/95 p-6 shadow-xl sm:p-8" noValidate>
      <FieldGroup>
        <Field data-invalid={Boolean(error)}>
          <FieldLabel htmlFor="admin-password">New password</FieldLabel>
          <Input id="admin-password" name="password" type="password" autoComplete="new-password" minLength={8} required className="h-12" />
          <FieldDescription>Use at least 8 characters.</FieldDescription>
          <FieldError>{error}</FieldError>
        </Field>
        <Button type="submit" size="lg" disabled={isSubmitting} className="h-12">
          {isSubmitting ? <LoaderCircle data-icon="inline-start" className="animate-spin" /> : <KeyRound data-icon="inline-start" />}
          {isSubmitting ? "Saving..." : "Save password"}
        </Button>
      </FieldGroup>
    </form>
  );
}
