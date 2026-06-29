create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  source text default 'free-guide',
  created_at timestamptz default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  project_type text,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists public.guides (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  thumbnail_path text not null,
  thumbnail_alt text,
  pdf_path text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.leads enable row level security;
alter table public.contact_messages enable row level security;
alter table public.guides enable row level security;

grant insert, select on table public.leads to service_role;
grant insert, select on table public.contact_messages to service_role;
grant select on table public.guides to anon, authenticated;
grant select, insert, update, delete on table public.guides to service_role;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'guides'
      and policyname = 'Published guides are publicly readable'
  ) then
    create policy "Published guides are publicly readable"
      on public.guides
      for select
      to anon, authenticated
      using (status = 'published');
  end if;
end
$$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'guide-assets',
  'guide-assets',
  true,
  26214400,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Guide assets are publicly readable'
  ) then
    create policy "Guide assets are publicly readable"
      on storage.objects
      for select
      to anon, authenticated
      using (bucket_id = 'guide-assets');
  end if;
end
$$;

-- API writes use the server-only service role key, so no public insert policy is required.
