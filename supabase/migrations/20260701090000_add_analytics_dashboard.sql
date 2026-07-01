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

alter table public.analytics_events enable row level security;
alter table public.vercel_analytics_events enable row level security;

grant insert, select on table public.analytics_events to service_role;
grant insert, select on table public.vercel_analytics_events to service_role;

-- Analytics writes and reads are service-role only; no public policies are intended.
