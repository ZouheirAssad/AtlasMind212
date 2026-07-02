-- Fix CMS monetization review findings and the Supabase 42703 / undefined_column drift.
-- This migration is idempotent and safe to re-run.

-- Ensure all CMS columns exist on public.guides
alter table public.guides
  add column if not exists content_type text not null default 'article' check (content_type in ('article', 'guide')),
  add column if not exists article_body text,
  add column if not exists meta_title text,
  add column if not exists meta_description text,
  add column if not exists canonical_slug text,
  add column if not exists has_affiliate_links boolean not null default false,
  add column if not exists is_sponsored boolean not null default false,
  add column if not exists sponsor_name text,
  add column if not exists disclosure_note text,
  add column if not exists gate_type text not null default 'hard' check (gate_type in ('hard', 'soft', 'none'));

-- Ensure nullable asset paths (older schema may have enforced not-null)
alter table public.guides alter column thumbnail_path drop not null;
alter table public.guides alter column pdf_path drop not null;

-- Add a public-safe generated flag so public queries never need to select the raw pdf_path.
alter table public.guides
  add column if not exists has_pdf boolean generated always as (pdf_path is not null) stored;

-- Backfill legacy PDF-only rows so they are labeled guides, not articles.
update public.guides
set content_type = 'guide'
where pdf_path is not null
  and (article_body is null or trim(article_body) = '')
  and content_type = 'article';

-- Ensure lead-attribution columns exist on public.leads
alter table public.leads
  add column if not exists content_slug text,
  add column if not exists content_title text;

create index if not exists leads_content_slug_idx on public.leads (content_slug);

-- Make the guide-assets storage bucket private. Service-role reads bypass RLS,
-- so the API/admin can still create short-lived signed URLs for thumbnails and PDFs.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'guide-assets',
  'guide-assets',
  false,
  26214400,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Drop the public read policy if it exists. Public pages must use server-controlled
-- signed URLs; raw object paths are no longer exposed to clients.
do $$
begin
  if exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Guide assets are publicly readable'
  ) then
    drop policy "Guide assets are publicly readable"
      on storage.objects;
  end if;
end
$$;
