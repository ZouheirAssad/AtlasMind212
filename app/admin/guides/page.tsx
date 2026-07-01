import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, Eye, FileText, LogOut, Pencil, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { requireAdminUser } from "@/lib/admin-auth";
import { getGuidePdfUrl, getGuideThumbnailUrl, listAdminGuides, type Guide } from "@/lib/guides";
import { createGuide, deleteGuide, signOutAdmin, toggleGuideStatus, updateGuide } from "@/app/admin/guides/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Guide CMS",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

type AdminGuidesPageProps = {
  searchParams: Promise<{ message?: string; error?: string }>;
};

function StatusSelect({ defaultValue }: { defaultValue?: Guide["status"] }) {
  return (
    <select
      name="status"
      defaultValue={defaultValue ?? "draft"}
      className="h-12 w-full rounded-md border border-input bg-background/55 px-3 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <option value="draft">Draft</option>
      <option value="published">Published</option>
    </select>
  );
}

function GuideFields({ guide }: { guide?: Guide }) {
  return (
    <FieldGroup>
      {guide && <input type="hidden" name="id" value={guide.id} />}
      <div className="grid gap-5 lg:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={guide ? `title-${guide.id}` : "title"}>Title</FieldLabel>
          <Input id={guide ? `title-${guide.id}` : "title"} name="title" defaultValue={guide?.title} required className="h-12" />
        </Field>
        <Field>
          <FieldLabel htmlFor={guide ? `slug-${guide.id}` : "slug"}>Slug</FieldLabel>
          <Input id={guide ? `slug-${guide.id}` : "slug"} name="slug" defaultValue={guide?.slug} placeholder="auto-generated-from-title" className="h-12" />
          <FieldDescription>Lowercase letters, numbers, and hyphens. Leave empty to generate from title.</FieldDescription>
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor={guide ? `description-${guide.id}` : "description"}>Description</FieldLabel>
        <Textarea id={guide ? `description-${guide.id}` : "description"} name="description" defaultValue={guide?.description} rows={4} required />
      </Field>
      <Field>
        <FieldLabel htmlFor={guide ? `thumbnail-alt-${guide.id}` : "thumbnail-alt"}>Thumbnail alt text</FieldLabel>
        <Input id={guide ? `thumbnail-alt-${guide.id}` : "thumbnail-alt"} name="thumbnailAlt" defaultValue={guide?.thumbnail_alt ?? ""} className="h-12" />
      </Field>
      <div className="grid gap-5 lg:grid-cols-3">
        <Field>
          <FieldLabel htmlFor={guide ? `status-${guide.id}` : "status"}>Status</FieldLabel>
          <StatusSelect defaultValue={guide?.status} />
        </Field>
        <Field>
          <FieldLabel htmlFor={guide ? `thumbnail-${guide.id}` : "thumbnail"}>Thumbnail</FieldLabel>
          <Input id={guide ? `thumbnail-${guide.id}` : "thumbnail"} name="thumbnail" type="file" accept="image/jpeg,image/png,image/webp" required={!guide} className="h-12 pt-2.5" />
          <FieldDescription>{guide ? "Optional. Upload a new image to replace the current thumbnail." : "JPG, PNG, or WebP up to 5 MB."}</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor={guide ? `pdf-${guide.id}` : "pdf"}>Guide PDF</FieldLabel>
          <Input id={guide ? `pdf-${guide.id}` : "pdf"} name="pdf" type="file" accept="application/pdf" required={!guide} className="h-12 pt-2.5" />
          <FieldDescription>{guide ? "Optional. Upload a new PDF to replace the current download." : "PDF up to 25 MB."}</FieldDescription>
        </Field>
      </div>
    </FieldGroup>
  );
}

function GuideEditor({ guide }: { guide: Guide }) {
  const thumbnailUrl = getGuideThumbnailUrl(guide);

  return (
    <article className="overflow-hidden rounded-3xl border bg-card/94 shadow-xl">
      <div className="grid gap-0 lg:grid-cols-[18rem_1fr]">
        <div className="relative min-h-64 bg-secondary">
          <Image src={thumbnailUrl} alt={guide.thumbnail_alt || ""} fill sizes="(min-width: 1024px) 18rem, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={guide.status === "published" ? "default" : "secondary"}>
                  {guide.status === "published" ? "Published" : "Draft"}
                </Badge>
                <span className="font-mono text-xs text-muted-foreground">/{guide.slug}</span>
              </div>
              <h2 className="mt-3 font-display text-3xl tracking-[-0.03em]">{guide.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{guide.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {guide.status === "published" && (
                <Button asChild variant="outline" size="sm">
                  <Link href={`/blog/${guide.slug}`} target="_blank">
                    <Eye data-icon="inline-start" /> View
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" size="sm">
                <Link href={getGuidePdfUrl(guide)} target="_blank">
                  <Download data-icon="inline-start" /> PDF
                </Link>
              </Button>
              <form action={toggleGuideStatus}>
                <input type="hidden" name="id" value={guide.id} />
                <Button type="submit" variant="secondary" size="sm">
                  {guide.status === "published" ? "Unpublish" : "Publish"}
                </Button>
              </form>
              <form action={deleteGuide}>
                <input type="hidden" name="id" value={guide.id} />
                <Button type="submit" variant="destructive" size="sm">
                  <Trash2 data-icon="inline-start" /> Delete
                </Button>
              </form>
            </div>
          </div>
          <details className="rounded-2xl border bg-secondary/40 p-5">
            <summary className="flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-primary">
              <Pencil className="size-4" /> Edit guide
            </summary>
            <form action={updateGuide} className="mt-6">
              <GuideFields guide={guide} />
              <Button type="submit" size="lg" className="mt-7 h-12">
                Save changes
              </Button>
            </form>
          </details>
        </div>
      </div>
    </article>
  );
}

export default async function AdminGuidesPage({ searchParams }: AdminGuidesPageProps) {
  const [user, guides, params] = await Promise.all([
    requireAdminUser(),
    listAdminGuides(),
    searchParams,
  ]);

  return (
    <section className="relative overflow-hidden bg-neutral-surface py-16 sm:py-24">
      <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
      <Container className="space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-5">Private CMS</Badge>
            <h1 className="font-display text-5xl tracking-[-0.04em] sm:text-6xl">AI Guides</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Upload TikTok guide PDFs, publish them as shareable cards, and manage the public guide library.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/admins">
                <ShieldCheck data-icon="inline-start" /> Admins
              </Link>
            </Button>
            <form action={signOutAdmin}>
              <Button type="submit" variant="outline">
                <LogOut data-icon="inline-start" /> Sign out {user.email}
              </Button>
            </form>
          </div>
        </div>

        {(params.message || params.error) && (
          <div
            role={params.error ? "alert" : "status"}
            className={`rounded-2xl border p-4 text-sm font-semibold ${
              params.error
                ? "border-destructive/40 bg-destructive/10 text-destructive"
                : "border-primary/40 bg-primary/10 text-primary"
            }`}
          >
            {params.error ?? params.message}
          </div>
        )}

        <div className="rounded-3xl border bg-card/94 p-6 shadow-xl sm:p-8">
          <div className="mb-7 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Plus className="size-5" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold">Create a guide</h2>
              <p className="text-sm text-muted-foreground">New guides can be saved as drafts or published immediately.</p>
            </div>
          </div>
          <form action={createGuide}>
            <GuideFields />
            <Button type="submit" size="lg" className="mt-7 h-12">
              <FileText data-icon="inline-start" /> Create guide
            </Button>
          </form>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Existing guides</h2>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {guides.length} total
            </span>
          </div>
          {guides.length ? (
            <div className="space-y-5">
              {guides.map((guide) => (
                <GuideEditor key={guide.id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed bg-card/70 p-10 text-center text-muted-foreground">
              No guides yet. Upload the first PDF and thumbnail above.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
