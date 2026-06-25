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

export function ContactForm() {
  const searchParams = useSearchParams();
  const projectOptions = [
    { value: "Business Website", label: "Business website" },
    { value: "AI Integration", label: "AI integration" },
    { value: "AI Automation", label: "AI automation" },
  ];
  const queryMap: Record<string, string> = {
    "business-website": "Business Website",
    "ai-integration": "AI Integration",
    "ai-automation": "AI Automation",
  };
  const initialProject = queryMap[searchParams.get("project") ?? ""] ?? "";
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
      <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-3xl border bg-card p-8 text-center shadow-xl">
        <CheckCircle2 className="size-10 text-primary" />
        <h2 className="text-3xl font-semibold">Your message is on its way.</h2>
        <p className="max-w-md text-muted-foreground">Thanks for the context. Your message was sent and stored — we read every submission and reply with a direct, useful answer, usually within 2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border bg-card p-6 shadow-xl sm:p-10" noValidate>
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
          <FieldDescription>Pick the closest fit — it helps us route your message to the right person.</FieldDescription>
          <input type="hidden" {...register("projectType")} />
          <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Choose a project type">
            {projectOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={projectType === option.value}
                onClick={() => setValue("projectType", option.value, { shouldDirty: true })}
                className={`min-h-14 cursor-pointer rounded-2xl border p-4 text-left text-sm font-semibold transition-all ${projectType === option.value ? "border-primary bg-primary text-primary-foreground shadow-[0_10px_28px_rgb(0_200_245/0.16)]" : "bg-background hover:border-primary/40 hover:bg-secondary/40"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </Field>
        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <FieldDescription>Tell us what you want to build, improve, or automate. The more context, the better the first reply.</FieldDescription>
          <Textarea id="message" placeholder="Tell us what you want to build, improve, or automate." rows={7} aria-invalid={Boolean(errors.message)} {...register("message")} />
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