import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, Download, Eye, FileText, LogOut, Pencil, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { requireAdminUser } from "@/lib/admin-auth";
import {
  getAdminGuidePdfUrl,
  getGuideThumbnailUrl,
  listAdminGuidesRecoverable,
  type AdminGuide,
} from "@/lib/guides";
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

function StatusSelect({ defaultValue }: { defaultValue?: AdminGuide["status"] }) {
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

function ContentTypeSelect({ defaultValue }: { defaultValue?: AdminGuide["content_type"] }) {
  return (
    <select
      name="contentType"
      defaultValue={defaultValue ?? "article"}
      className="h-12 w-full rounded-md border border-input bg-background/55 px-3 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <option value="article">Article</option>
      <option value="guide">Guide</option>
    </select>
  );
}

function GateTypeSelect({ defaultValue }: { defaultValue?: AdminGuide["gate_type"] }) {
  return (
    <select
      name="gateType"
      defaultValue={defaultValue ?? "hard"}
      className="h-12 w-full rounded-md border border-input bg-background/55 px-3 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <option value="hard">Hard Gated (Email Required)</option>
      <option value="soft">Soft Gated (Optional Email)</option>
      <option value="none">Not Gated (Direct Download)</option>
    </select>
  );
}

function GuideFields({ guide }: { guide?: AdminGuide }) {
  return (
    <FieldGroup>
      {guide && <input type="hidden" name="id" value={guide.id} />}

      <div className="border-b border-border pb-6 mb-6">
        <h3 className="text-sm font-mono uppercase tracking-[0.16em] text-primary mb-4">Basic Information</h3>
        <div className="grid gap-5 lg:grid-cols-2">
          <Field>
            <FieldLabel htmlFor={guide ? `title-${guide.id}` : "title"}>Title</FieldLabel>
            <Input id={guide ? `title-${guide.id}` : "title"} name="title" defaultValue={guide?.title} required className="h-12" />
          </Field>
          <Field>
            <FieldLabel htmlFor={guide ? `slug-${guide.id}` : "slug"}>Slug</FieldLabel>
            <Input id={guide ? `slug-${guide.id}` : "slug"} name="slug" defaultValue={guide?.slug} placeholder="auto-generated-from-title" className="h-12" />
            <FieldDescription>Lowercase letters, numbers, and hyphens. Leave empty to generate.</FieldDescription>
          </Field>
        </div>
        <div className="grid gap-5 lg:grid-cols-2 mt-4">
          <Field>
            <FieldLabel htmlFor={guide ? `contentType-${guide.id}` : "contentType"}>Content Type</FieldLabel>
            <ContentTypeSelect defaultValue={guide?.content_type} />
          </Field>
          <Field>
            <FieldLabel htmlFor={guide ? `status-${guide.id}` : "status"}>Status</FieldLabel>
            <StatusSelect defaultValue={guide?.status} />
          </Field>
        </div>
        <Field className="mt-4">
          <FieldLabel htmlFor={guide ? `description-${guide.id}` : "description"}>Short Description / Excerpt</FieldLabel>
          <Textarea id={guide ? `description-${guide.id}` : "description"} name="description" defaultValue={guide?.description} rows={3} required />
        </Field>
      </div>

      <div className="border-b border-border pb-6 mb-6">
        <h3 className="text-sm font-mono uppercase tracking-[0.16em] text-primary mb-4">Article Content (Markdown)</h3>
        <Field>
          <FieldLabel htmlFor={guide ? `articleBody-${guide.id}` : "articleBody"}>Article Body</FieldLabel>
          <Textarea id={guide ? `articleBody-${guide.id}` : "articleBody"} name="articleBody" defaultValue={guide?.article_body ?? ""} rows={10} placeholder="Write your article content here using standard Markdown syntax..." />
        </Field>
      </div>

      <div className="border-b border-border pb-6 mb-6">
        <h3 className="text-sm font-mono uppercase tracking-[0.16em] text-primary mb-4">Downloads & Assets</h3>
        <div className="grid gap-5 lg:grid-cols-2">
          <Field>
            <FieldLabel htmlFor={guide ? `thumbnail-${guide.id}` : "thumbnail"}>Thumbnail Image</FieldLabel>
            <Input id={guide ? `thumbnail-${guide.id}` : "thumbnail"} name="thumbnail" type="file" accept="image/jpeg,image/png,image/webp" className="h-12 pt-2.5" />
            <FieldDescription>{guide ? "Optional. Upload new to replace current." : "JPG, PNG, or WebP up to 5 MB."}</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor={guide ? `thumbnailAlt-${guide.id}` : "thumbnailAlt"}>Thumbnail Alt Text</FieldLabel>
            <Input id={guide ? `thumbnailAlt-${guide.id}` : "thumbnailAlt"} name="thumbnailAlt" defaultValue={guide?.thumbnail_alt ?? ""} className="h-12" placeholder="Describe thumbnail image" />
          </Field>
        </div>
        <div className="grid gap-5 lg:grid-cols-2 mt-4">
          <Field>
            <FieldLabel htmlFor={guide ? `pdf-${guide.id}` : "pdf"}>Guide PDF</FieldLabel>
            <Input id={guide ? `pdf-${guide.id}` : "pdf"} name="pdf" type="file" accept="application/pdf" className="h-12 pt-2.5" />
            <FieldDescription>{guide ? "Optional. Upload new to replace current PDF." : "PDF up to 25 MB."}</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor={guide ? `gateType-${guide.id}` : "gateType"}>Download Gate Type</FieldLabel>
            <GateTypeSelect defaultValue={guide?.gate_type} />
          </Field>
        </div>
      </div>

      <div className="border-b border-border pb-6 mb-6">
        <h3 className="text-sm font-mono uppercase tracking-[0.16em] text-primary mb-4">Monetization & Disclosures</h3>
        <div className="flex flex-wrap gap-6 mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="hasAffiliateLinks" defaultChecked={guide?.has_affiliate_links} className="size-5 rounded border-input bg-background/55 text-primary focus:ring-ring cursor-pointer" />
            <span className="text-sm font-semibold select-none">Has Affiliate Links</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="isSponsored" defaultChecked={guide?.is_sponsored} className="size-5 rounded border-input bg-background/55 text-primary focus:ring-ring cursor-pointer" />
            <span className="text-sm font-semibold select-none">Is Sponsored Content</span>
          </label>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Field>
            <FieldLabel htmlFor={guide ? `sponsorName-${guide.id}` : "sponsorName"}>Sponsor Name</FieldLabel>
            <Input id={guide ? `sponsorName-${guide.id}` : "sponsorName"} name="sponsorName" defaultValue={guide?.sponsor_name ?? ""} className="h-12" placeholder="e.g. Acme Corp" />
          </Field>
          <Field>
            <FieldLabel htmlFor={guide ? `disclosureNote-${guide.id}` : "disclosureNote"}>Custom Disclosure Note</FieldLabel>
            <Textarea id={guide ? `disclosureNote-${guide.id}` : "disclosureNote"} name="disclosureNote" defaultValue={guide?.disclosure_note ?? ""} rows={2} placeholder="Optional custom disclosure note..." />
          </Field>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-mono uppercase tracking-[0.16em] text-primary mb-4">SEO Metadata</h3>
        <div className="grid gap-5 lg:grid-cols-3">
          <Field>
            <FieldLabel htmlFor={guide ? `metaTitle-${guide.id}` : "metaTitle"}>Meta Title</FieldLabel>
            <Input id={guide ? `metaTitle-${guide.id}` : "metaTitle"} name="metaTitle" defaultValue={guide?.meta_title ?? ""} className="h-12" placeholder="Optional SEO title" />
          </Field>
          <Field>
            <FieldLabel htmlFor={guide ? `canonicalSlug-${guide.id}` : "canonicalSlug"}>Canonical Slug</FieldLabel>
            <Input id={guide ? `canonicalSlug-${guide.id}` : "canonicalSlug"} name="canonicalSlug" defaultValue={guide?.canonical_slug ?? ""} className="h-12" placeholder="Original slug if syndicating" />
          </Field>
          <Field>
            <FieldLabel htmlFor={guide ? `metaDescription-${guide.id}` : "metaDescription"}>Meta Description</FieldLabel>
            <Textarea id={guide ? `metaDescription-${guide.id}` : "metaDescription"} name="metaDescription" defaultValue={guide?.meta_description ?? ""} rows={2} placeholder="Optional SEO description (under 160 characters recommended)" />
          </Field>
        </div>
      </div>
    </FieldGroup>
  );
}

type GuideEditorProps = {
  guide: AdminGuide;
  thumbnailUrl: string;
  pdfUrl: string;
};

function GuideEditor({ guide, thumbnailUrl, pdfUrl }: GuideEditorProps) {
  return (
    <article className="overflow-hidden rounded-3xl border bg-card/94 shadow-xl">
      <div className="grid gap-0 lg:grid-cols-[18rem_1fr]">
        <div className="relative min-h-64 bg-secondary flex flex-col justify-center items-center p-6 border-b lg:border-b-0 lg:border-r">
          {thumbnailUrl ? (
            <Image src={thumbnailUrl} alt={guide.thumbnail_alt || ""} fill sizes="(min-width: 1024px) 18rem, 100vw" className="object-cover" />
          ) : (
            <div className="text-center space-y-2">
              <FileText className="size-12 mx-auto text-primary" />
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">{guide.content_type}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={guide.status === "published" ? "default" : "secondary"}>
                  {guide.status === "published" ? "Published" : "Draft"}
                </Badge>
                <Badge variant="outline" className="uppercase font-mono text-[0.65rem]">
                  {guide.content_type}
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
              {guide.pdf_path && pdfUrl && (
                <Button asChild variant="outline" size="sm">
                  <Link href={pdfUrl} target="_blank">
                    <Download data-icon="inline-start" /> PDF
                  </Link>
                </Button>
              )}
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
              <Pencil className="size-4" /> Edit content item
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
  const [user, guidesResult, params] = await Promise.all([
    requireAdminUser(),
    listAdminGuidesRecoverable(),
    searchParams,
  ]);
  const guides = guidesResult.status === "ok" ? guidesResult.guides : [];
  const cmsReadIssue = guidesResult.status === "ok" ? null : guidesResult;

  const guidesWithUrls = await Promise.all(
    guides.map(async (guide) => ({
      guide,
      thumbnailUrl: await getGuideThumbnailUrl(guide),
      pdfUrl: guide.pdf_path ? await getAdminGuidePdfUrl(guide) : "",
    })),
  );

  return (
    <section className="relative overflow-hidden bg-neutral-surface py-16 sm:py-24">
      <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
      <Container className="space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-5">Private CMS</Badge>
            <h1 className="font-display text-5xl tracking-[-0.04em] sm:text-6xl">Content CMS</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Manage SEO articles, guide downloads, monetization disclosures, and gated lead capture forms.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/analytics">
                <BarChart3 data-icon="inline-start" /> Analytics
              </Link>
            </Button>
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

        {cmsReadIssue ? (
          <div role="alert" className="rounded-3xl border border-destructive/40 bg-destructive/10 p-6 shadow-xl sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-destructive">CMS schema needs migration</p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground">Content management is paused.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{cmsReadIssue.message}</p>
            <p className="mt-5 rounded-2xl border bg-background/50 p-4 font-mono text-xs leading-6 text-muted-foreground">
              Required migration: supabase/migrations/20260702190000_fix_cms_monetization_columns.sql
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-3xl border bg-card/94 p-6 shadow-xl sm:p-8">
              <div className="mb-7 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Plus className="size-5" />
                </span>
                <div>
                  <h2 className="text-2xl font-semibold">Create a content item</h2>
                  <p className="text-sm text-muted-foreground">New articles or guides can be saved as drafts or published immediately.</p>
                </div>
              </div>
              <form action={createGuide}>
                <GuideFields />
                <Button type="submit" size="lg" className="mt-7 h-12">
                  <FileText data-icon="inline-start" /> Create content item
                </Button>
              </form>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">Existing content items</h2>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {guides.length} total
                </span>
              </div>
              {guidesWithUrls.length ? (
                <div className="space-y-5">
                  {guidesWithUrls.map(({ guide, thumbnailUrl, pdfUrl }) => (
                    <GuideEditor key={guide.id} guide={guide} thumbnailUrl={thumbnailUrl} pdfUrl={pdfUrl} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed bg-card/70 p-10 text-center text-muted-foreground">
                  No content items yet. Create the first article or guide above.
                </div>
              )}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
