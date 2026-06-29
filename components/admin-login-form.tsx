"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function AdminLoginForm({ redirectTo = "/admin/guides" }: { redirectTo?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const supabase = createBrowserSupabaseClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  const unauthorized = searchParams.get("error") === "unauthorized";

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border bg-card/95 p-6 shadow-xl sm:p-8" noValidate>
      <FieldGroup>
        <Field data-invalid={Boolean(error || unauthorized)}>
          <FieldLabel htmlFor="admin-email">Email</FieldLabel>
          <Input id="admin-email" name="email" type="email" autoComplete="email" required className="h-12" />
        </Field>
        <Field data-invalid={Boolean(error || unauthorized)}>
          <FieldLabel htmlFor="admin-password">Password</FieldLabel>
          <Input id="admin-password" name="password" type="password" autoComplete="current-password" required className="h-12" />
          <FieldError>
            {error || (unauthorized ? "This account is signed in, but it is not allowed to manage AtlasMind guides." : "")}
          </FieldError>
        </Field>
        <Button type="submit" size="lg" disabled={isSubmitting} className="h-12">
          {isSubmitting ? <LoaderCircle data-icon="inline-start" className="animate-spin" /> : <LogIn data-icon="inline-start" />}
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </FieldGroup>
    </form>
  );
}
