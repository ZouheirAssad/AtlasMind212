"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { leadSchema, type LeadInput } from "@/lib/validations";

export function LeadForm() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", email: "" },
  });

  async function onSubmit(values: LeadInput) {
    setServerError("");
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setServerError(data?.error ?? "Something went wrong. Please try again.");
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-3xl border bg-card p-8 text-center">
        <CheckCircle2 className="size-10 text-primary" />
        <h3 className="text-2xl font-semibold">You&apos;re on the list.</h3>
        <p className="max-w-sm text-muted-foreground">Check your inbox for the Beginner AI Stack 2026 guide.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border bg-card p-6 shadow-xl sm:p-8" noValidate>
      <FieldGroup>
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="lead-name">Name</FieldLabel>
          <Input id="lead-name" placeholder="Your name" aria-invalid={Boolean(errors.name)} {...register("name")} />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor="lead-email">Email</FieldLabel>
          <Input id="lead-email" type="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} {...register("email")} />
          <FieldError errors={[errors.email]} />
        </Field>
        {serverError && <p role="alert" className="text-sm text-destructive">{serverError}</p>}
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <LoaderCircle data-icon="inline-start" className="animate-spin" /> : <ArrowRight data-icon="inline-end" />}
          {isSubmitting ? "Sending..." : "Send me the free guide"}
        </Button>
        <p className="text-center text-xs leading-5 text-muted-foreground">No spam. Just useful AI systems and tutorials. Unsubscribe anytime.</p>
      </FieldGroup>
    </form>
  );
}
