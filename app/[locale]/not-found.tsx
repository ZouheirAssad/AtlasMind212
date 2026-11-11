"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { useI18n } from "@/components/i18n/i18n-provider";
import { Button } from "@/components/ui/button";

export default function LocaleNotFound() {
  const { dict, href } = useI18n();

  return (
    <main id="main-content">
      <section className="bg-[var(--surface-raised)] py-24 sm:py-32">
        <Container className="max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">404</p>
          <h1 className="mt-5 text-5xl leading-[1.02] text-display-brand sm:text-7xl">{dict.notFound.title}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{dict.notFound.text}</p>
          <Button asChild size="lg" className="mt-8"><Link href={href("/")}>{dict.notFound.back}</Link></Button>
        </Container>
      </section>
    </main>
  );
}
