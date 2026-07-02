-- Alter public.guides to add content CMS fields and relax constraints
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

alter table public.guides alter column thumbnail_path drop not null;
alter table public.guides alter column pdf_path drop not null;

-- Alter public.leads to attribute downloads/articles
alter table public.leads
  add column if not exists content_slug text,
  add column if not exists content_title text;

create index if not exists leads_content_slug_idx on public.leads (content_slug);
