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

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  occurred_at timestamptz not null default now(),
  path text,
  route text,
  guide_id uuid,
  guide_slug text,
  guide_title text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.vercel_analytics_events (
  id uuid primary key default gen_random_uuid(),
  received_at timestamptz not null default now(),
  occurred_at timestamptz not null,
  event_type text not null,
  event_name text,
  path text,
  route text,
  referrer text,
  query_params text,
  country text,
  region text,
  device_type text,
  os_name text,
  browser_name text,
  environment text,
  deployment text,
  event_data jsonb not null default '{}'::jsonb,
  raw_metadata jsonb not null default '{}'::jsonb
);

create index if not exists analytics_events_occurred_at_idx
  on public.analytics_events (occurred_at desc);
create index if not exists analytics_events_event_name_idx
  on public.analytics_events (event_name);
create index if not exists analytics_events_guide_slug_idx
  on public.analytics_events (guide_slug);
create index if not exists vercel_analytics_events_occurred_at_idx
  on public.vercel_analytics_events (occurred_at desc);
create index if not exists vercel_analytics_events_event_type_idx
  on public.vercel_analytics_events (event_type);
create index if not exists vercel_analytics_events_path_idx
  on public.vercel_analytics_events (path);

alter table public.leads enable row level security;
alter table public.contact_messages enable row level security;
alter table public.guides enable row level security;
alter table public.analytics_events enable row level security;
alter table public.vercel_analytics_events enable row level security;

revoke all privileges on table public.analytics_events from anon, authenticated, service_role;
revoke all privileges on table public.vercel_analytics_events from anon, authenticated, service_role;

grant insert, select on table public.leads to service_role;
grant insert, select on table public.contact_messages to service_role;
grant select on table public.guides to anon, authenticated;
grant select, insert, update, delete on table public.guides to service_role;
grant insert, select on table public.analytics_events to service_role;
grant insert, select on table public.vercel_analytics_events to service_role;

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
