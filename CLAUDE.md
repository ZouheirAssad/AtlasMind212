# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

AtlasMind212 — a single Next.js 16 App Router site combining public marketing surfaces (pages, services, blog/AI guides, contact + lead intake) with a private admin CMS (guides, admins, analytics). Backend: Supabase (Postgres + Auth + Storage), Resend (transactional email), Vercel (hosting + Web Analytics).

**No test suite, no CI workflow.** Correctness is verified with lint + production build + manual browser checks.

Authoritative companion docs in this repo — read alongside this file:
- `AGENTS.md` — stable contributor guide (boundaries, checklist).
- `Memory.md` — living context log (current routes, env vars, design state, quality baseline, known boundaries). **Update this when architecture, deployment, design decisions, quality baselines, or known limitations change.**
- `design-system/MASTER.md` — visual source of truth (tokens, motion, imagery, accessibility).

## Commands

Use **npm** with the committed `package-lock.json` — do not switch package managers.

```bash
npm install            # install dependencies
npm run dev            # Next.js dev server
npm run lint           # eslint .
npm run build          # production build — also the ONLY typecheck (no separate tsc script)
npm run start          # serve the production build
npm run email:test     # Resend delivery diagnostic: npx tsx --env-file=.env.local scripts/test-email.ts
npm audit --omit=dev   # release vulnerability check
```

Local Supabase is its own CLI project (`atlasmind212`, ports: API 55321 / DB 55322 / Studio 55323 / email 55324):

```bash
npx supabase start
npx supabase stop --project-id atlasmind212
```

Before testing form/guide submissions: run `supabase/schema.sql` against a remote project, or apply `supabase/migrations/` locally. There is no single-test command because there are no tests — verify changes with `npm run lint`, `npm run build`, and browser checks of affected routes at mobile + desktop widths (inspect the console).

## Architecture

### Three Supabase clients — pick the right one or you introduce a security bug

`lib/supabase/*` defines four clients with deliberately different trust levels:

- **`createAdminClient()`** (`server.ts`, `server-only`, service-role key) — bypasses RLS. Used by API route handlers and admin server actions for all privileged writes (leads, contact_messages, guides, analytics_events, storage). **Never** expose this key with a `NEXT_PUBLIC_` prefix.
- **`createServerSupabaseClient()`** (`server.ts`, `server-only`, anon key, cookie-bound) — reads the signed-in user's session in Server Components / server actions (`supabase.auth.getUser()`). Session-refresh cookie writes happen in the proxy, not Server Components (which can read but not always write cookies).
- **`createPublicClient()`** (`public.ts`, `server-only`, anon key) — server-side public reads that respect RLS (e.g. published guides). Gracefully returns empty on a missing `guides` table (`PGRST205`).
- **`createBrowserSupabaseClient()`** (`client.ts`, `"use client"`, anon key) — browser auth only (admin login form).

All clients throw at construction if env vars are missing or still contain placeholders (`your-project`, `your-anon-key`, `your-service-role-key`).

### Admin authorization — two layers, both must hold

1. **`proxy.ts`** (repo root) is the request-time gate. Next.js 16 deprecated `middleware.ts` in favor of `proxy.ts` exporting `function proxy` — this repo uses the new convention, so there is intentionally no `middleware.ts`. It matches `/admin/:path*`: redirects unauthenticated/non-admin users to `/admin/login?next=...`, and bounces already-admin users off `/admin/login` to `/admin/guides`.
2. **`requireAdminUser()`** (`lib/admin-auth.ts`, `server-only`) is called at the top of every admin server action. It checks `hasAdminAccess()` (`lib/admin.ts`): true if the user's email is in the `ADMIN_EMAILS` env allowlist **or** their Supabase `app_metadata.role === "admin"`. **Never rely on the proxy gate alone** — server actions re-verify.

Admins are bootstrapped via `ADMIN_EMAILS` or invited from `/admin/admins` (which sets `app_metadata.role = "admin"`; invite links route through `/admin/set-password`).

### Public writes use the service role by design

`POST /api/leads` and `POST /api/contact` validate with Zod then write via `createAdminClient()`. **RLS has no public insert policies for `leads`/`contact_messages` — this is intentional.** Do not add public insert policies; the service-role route handlers are the write path. Contact submissions also fire a Resend notification (`lib/email/contact-notification.ts`); email failure is logged but still returns success so a stored message is not duplicated on resubmit. Both routes call `recordAnalyticsEvent()` after a successful write.

### Server actions (admin mutations) follow one pattern

`app/admin/guides/actions.ts` (guide CRUD + `signOutAdmin`) and `app/admin/admins/actions.ts` (`inviteAdmin`):

`"use server"` → `await requireAdminUser()` → Zod-parse (`lib/validations.ts`) → `createAdminClient()` write → `revalidatePath(...)` → `redirect()` to the list page with `?message=` or `?error=` flash params.

Guide file uploads go to the private `guide-assets` Storage bucket; size/MIME limits are constants in `lib/guides.ts` (`GUIDE_THUMBNAIL_*`, `GUIDE_PDF_*`). Orphaned uploads are rolled back if the DB insert fails. `next.config.ts` raises the server-action body limit to `35mb` for these uploads. Public pages receive only short-lived signed URLs generated by the server-only service role client; raw storage paths are never sent to the browser.

### Validation is centralized

All input schemas live in `lib/validations.ts` (Zod): `leadSchema`, `contactSchema`, `guideMetadataSchema`, `adminInviteSchema`, plus inferred types. Add new schemas here — don't inline Zod in routes/actions.

### Static vs. dynamic content

- **Static product content** (nav, workflows, tools, services) lives in `lib/site-data.ts` — TypeScript, **not the database.**
- **Blog/guide content** is DB-managed via the admin CMS (`public.guides` + Supabase Storage `guide-assets`), surfaced through `lib/guides.ts`. Public guide reads return a `Guide` type that never includes raw storage paths; hard-gated PDF downloads require a server-signed `download_unlocked_{slug}` cookie set by `POST /api/leads`.
- **Brand logos**: registering a new tool/workflow brand requires all three — an entry in `lib/brand-registry.ts` (slug → SVG + official color + URL), the SVG under `public/brands/`, and an update to `public/brands/manifest.md`. Logos render in vendor colors inside dark rounded tiles; the background constellation (`components/logo-constellation.tsx`) stays at ~12% opacity (fewer nodes on mobile).

### Site config & SEO/GEO

- `lib/site-config.ts` is the single source for canonical URL/name/description; `NEXT_PUBLIC_SITE_URL` drives `metadataBase` (in `app/layout.tsx`), canonical, and social-preview URLs. Use `absoluteUrl()` for fully-qualified URLs.
- `lib/seo.tsx` exports the `<JsonLd>` component and JSON-LD builders (organization, website, services, FAQs, breadcrumbs, guides). `app/robots.ts` and `app/sitemap.ts` emit crawler directives and a dynamic sitemap covering static pages, service detail pages, and published guides.
- Machine-readable AI context is served from `public/llms.txt`, `public/services.md`, `public/company.md`.

### Analytics — privacy-safe, dual-write

`lib/analytics/events.ts` (`recordAnalyticsEvent`, `server-only`) writes each event to **both** `public.analytics_events` (Supabase, service role) and Vercel Analytics (`@vercel/analytics/server` `track()`) via `Promise.allSettled`, so one failing sink never blocks the other. It captures path, route, UTM params, and guide identity — **never** raw IP or email. Events: `guide_downloaded` (tracked at `/blog/[slug]/download`), `lead_submitted`, `contact_submitted`.

`/admin/analytics` (`lib/analytics/dashboard.ts`) merges Supabase business logs with the Vercel Web Analytics API; each source is wrapped in a timeout so a slow/dead source degrades gracefully rather than failing the dashboard. Optional Vercel Web Analytics Drains POST to `/api/vercel/analytics-drain`, gated by `VERCEL_ANALYTICS_DRAIN_SECRET`, and store privacy-safe rows in `public.vercel_analytics_events`.

## Styling & Design

- **Tailwind v4** via `@tailwindcss/postcss`, configured entirely in `app/globals.css` — there is **no `tailwind.config.*`** file. Design tokens are CSS custom properties.
- **shadcn/ui** (new-york style) primitives in `components/ui/`; composed site components in `components/`. `components.json` aliases `@/components`, `@/lib`, `@/hooks`.
- **`design-system/MASTER.md` is the visual source of truth**: dark editorial technology. Atlas Night `#020617`, navy surfaces (`#07111F` / `#0B1626`), Electric Cyan `#00C8F5` for functional emphasis, Neon Cyan `#38DDFB` for focus/glow, Atlas Red `#F0323D` used sparingly (never large surfaces). Typography: Calistoga (display), Inter (body), JetBrains Mono (technical), loaded via `next/font` in `app/layout.tsx`.
- Motion uses the `motion` package behind `components/motion-provider.tsx` and **must respect `prefers-reduced-motion`**. Avoid purple gradients, neon overload, large red surfaces, generic AI imagery, stretched brand logos, and third-party runtime logo dependencies.
- Keep pages as Server Components unless they need forms, nav state, motion, filters, dialogs, or sheets — then add `"use client"` on line 1.

## Environment variables

Copy `.env.example` → `.env.local`. Required:

```
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY      # server-only — never NEXT_PUBLIC_
ADMIN_EMAILS                   # comma-separated bootstrap admin allowlist
RESEND_API_KEY                  # server-only
CONTACT_NOTIFICATION_TO
CONTACT_NOTIFICATION_FROM
```

Optional (Vercel Web Analytics dashboard): `VERCEL_ANALYTICS_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID` **or** `VERCEL_TEAM_SLUG`, `VERCEL_ANALYTICS_DRAIN_SECRET`.

## Conventions & constraints

- Do not change API routes or `supabase/schema.sql` without documenting migration and compatibility impact.
- `next.config.ts` permanently redirects `www.atlasmind212.com` → `atlasmind212.com`, and only optimizes remote Supabase images when the Supabase URL is a local host (local dev uses `unoptimized`).
- Path alias `@/*` → repo root (`tsconfig.json`). File layout favors many small, cohesive modules.

## Known boundaries

- Workflow/tool content is static TypeScript; guide/blog content is DB-managed.
- Leads are stored in Supabase but **no lead email notification is implemented** (contact form only).
- No Lighthouse scores recorded; no automated tests.