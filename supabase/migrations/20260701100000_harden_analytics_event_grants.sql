revoke all privileges on table public.analytics_events from anon, authenticated, service_role;
revoke all privileges on table public.vercel_analytics_events from anon, authenticated, service_role;

grant insert, select on table public.analytics_events to service_role;
grant insert, select on table public.vercel_analytics_events to service_role;
