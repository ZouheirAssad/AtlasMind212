"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/components/i18n/i18n-provider";
import { createContactSchema, type ContactInput } from "@/lib/validations";

// Values stay in English so stored submissions and notifications are consistent across locales.
const projectOptions = [
  "Website Creation",
  "SEO & GEO",
  "Google Maps & Local SEO",
  "Web Development",
  "Backend & API Development",
  "Technical Consulting",
  "LLM Integration & AI Consulting",
  "Workflow Automation",
] as const;

const projectQueryMap: Record<string, string> = {
  "website-creation": "Website Creation",
  "seo-geo": "SEO & GEO",
  "google-maps-local-seo": "Google Maps & Local SEO",
  "web-development": "Web Development",
  "backend-api-development": "Backend & API Development",
  "technical-consulting": "Technical Consulting",
  "llm-integration-ai-consulting": "LLM Integration & AI Consulting",
  "workflow-automation": "Workflow Automation",
  "business-website": "Web Development",
  "ai-integration": "LLM Integration & AI Consulting",
  "ai-automation": "Workflow Automation",
};

export function ContactForm() {
  const { dict } = useI18n();
  const t = dict.contactForm;
  const schema = useMemo(() => createContactSchema(dict.validation), [dict.validation]);
  const searchParams = useSearchParams();
  const initialProject = projectQueryMap[searchParams.get("project") ?? ""] ?? "";
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, setValue, control, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", projectType: initialProject, message: "" },
  });
  const projectType = useWatch({ control, name: "projectType" });

  async function onSubmit(values: ContactInput) {
    setServerError("");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      setServerError(t.genericError);
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center gap-4 border bg-card p-8 text-center shadow-[0_12px_40px_rgb(64_68_71/0.08)]">
        <CheckCircle2 className="size-10 text-primary" />
        <h2 className="text-3xl font-semibold">{t.successTitle}</h2>
        <p className="max-w-md text-muted-foreground">{t.successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border bg-card p-6 shadow-[0_12px_40px_rgb(64_68_71/0.08)] sm:p-10" noValidate>
      <FieldGroup>
        <div className="grid gap-7 sm:grid-cols-2">
          <Field data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor="contact-name">{t.name}</FieldLabel>
            <Input id="contact-name" placeholder={t.namePlaceholder} aria-invalid={Boolean(errors.name)} {...register("name")} />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="contact-email">{t.email}</FieldLabel>
            <Input id="contact-email" type="email" placeholder={t.emailPlaceholder} dir="ltr" aria-invalid={Boolean(errors.email)} {...register("email")} />
            <FieldError errors={[errors.email]} />
          </Field>
        </div>
        <Field>
          <FieldLabel>{t.projectType}</FieldLabel>
          <FieldDescription>{t.projectTypeHelp}</FieldDescription>
          <input type="hidden" {...register("projectType")} />
          <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label={t.projectTypeAria}>
            {projectOptions.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={projectType === option}
                onClick={() => setValue("projectType", option, { shouldDirty: true })}
                className={`min-h-14 cursor-pointer rounded-sm border p-4 text-start text-sm font-semibold transition-colors ${projectType === option ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary hover:bg-secondary"}`}
              >
                {t.projectOptions[option]}
              </button>
            ))}
          </div>
        </Field>
        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor="message">{t.message}</FieldLabel>
          <FieldDescription>{t.messageHelp}</FieldDescription>
          <Textarea id="message" placeholder={t.messagePlaceholder} rows={7} aria-invalid={Boolean(errors.message)} {...register("message")} />
          <FieldError errors={[errors.message]} />
        </Field>
        {serverError && <p role="alert" className="text-sm text-destructive">{serverError}</p>}
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? <LoaderCircle data-icon="inline-start" className="animate-spin" /> : <Send data-icon="inline-start" />}
          {isSubmitting ? t.sending : t.send}
        </Button>
        <p className="text-xs text-muted-foreground">{t.privacyNote}</p>
      </FieldGroup>
    </form>
  );
}
