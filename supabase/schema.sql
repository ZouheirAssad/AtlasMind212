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

alter table public.leads enable row level security;
alter table public.contact_messages enable row level security;

grant insert, select on table public.leads to service_role;
grant insert, select on table public.contact_messages to service_role;

-- API writes use the server-only service role key, so no public insert policy is required.
