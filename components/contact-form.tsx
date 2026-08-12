"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validations";

const projectOptions = [
  { value: "Web Development", label: "Web development" },
  { value: "Backend & API Development", label: "Backend & API development" },
  { value: "Technical Consulting", label: "Technical consulting" },
  { value: "LLM Integration & AI Consulting", label: "LLM integration & AI consulting" },
  { value: "Workflow Automation", label: "Workflow automation" },
] as const;

const projectQueryMap: Record<string, string> = {
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
  const searchParams = useSearchParams();
  const initialProject = projectQueryMap[searchParams.get("project") ?? ""] ?? "";
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, setValue, control, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
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
      const data = await response.json().catch(() => null);
      setServerError(data?.error ?? "Something went wrong. Please try again.");
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center gap-4 border bg-card p-8 text-center shadow-[0_12px_40px_rgb(64_68_71/0.08)]">
        <CheckCircle2 className="size-10 text-primary" />
        <h2 className="text-3xl font-semibold">Your message is on its way.</h2>
        <p className="max-w-md text-muted-foreground">Thanks for the context. Your message was sent and stored — we read every submission and reply with a direct, useful answer, usually within 2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border bg-card p-6 shadow-[0_12px_40px_rgb(64_68_71/0.08)] sm:p-10" noValidate>
      <FieldGroup>
        <div className="grid gap-7 sm:grid-cols-2">
          <Field data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor="contact-name">Name</FieldLabel>
            <Input id="contact-name" placeholder="Your name" aria-invalid={Boolean(errors.name)} {...register("name")} />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="contact-email">Email</FieldLabel>
            <Input id="contact-email" type="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} {...register("email")} />
            <FieldError errors={[errors.email]} />
          </Field>
        </div>
        <Field>
          <FieldLabel>Project type</FieldLabel>
          <FieldDescription>Pick the closest fit—it helps us understand your project before the first reply.</FieldDescription>
          <input type="hidden" {...register("projectType")} />
          <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Choose a project type">
            {projectOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={projectType === option.value}
                onClick={() => setValue("projectType", option.value, { shouldDirty: true })}
                className={`min-h-14 cursor-pointer rounded-sm border p-4 text-left text-sm font-semibold transition-colors ${projectType === option.value ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary hover:bg-secondary"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </Field>
        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <FieldDescription>Tell us what you want to build, improve, integrate, or automate. The more context, the better the first reply.</FieldDescription>
          <Textarea id="message" placeholder="Tell us about the product, system, or workflow." rows={7} aria-invalid={Boolean(errors.message)} {...register("message")} />
          <FieldError errors={[errors.message]} />
        </Field>
        {serverError && <p role="alert" className="text-sm text-destructive">{serverError}</p>}
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? <LoaderCircle data-icon="inline-start" className="animate-spin" /> : <Send data-icon="inline-start" />}
          {isSubmitting ? "Sending your message…" : "Send your message"}
        </Button>
        <p className="text-xs text-muted-foreground">We reply with a real answer — no automated funnels or sales scripts. Your details are only used to respond to this message.</p>
      </FieldGroup>
    </form>
  );
}
