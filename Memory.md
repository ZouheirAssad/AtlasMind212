# AtlasMind212 Project Memory

## Product

AtlasMind212 builds high-performance business websites, connects custom AI
assistants, and automates background workflows.

## Current MVP

Public routes:

- `/`
- `/services`
- `/services/[slug]`
- `/blog`
- `/blog/[slug]`
- `/blog/[slug]/download`
- `/about`
- `/contact`
- `/privacy`
- `/imprint`

The homepage includes an interactive goal terminal, a before/after system
comparison, a connected implementation story, and service cards.

## Data And APIs

- Static product data lives in `lib/site-data.ts`.
- Canonical site metadata is centralized through `lib/site-config.ts` and
  `NEXT_PUBLIC_SITE_URL`.
- SEO/GEO helpers live in `lib/seo.tsx`; public pages use route metadata and
  JSON-LD for organization, website, services, FAQs, breadcrumbs, and guide
  documents.
- Machine-readable AI context files are served from `public/llms.txt`,
  `public/services.md`, and `public/company.md`.
- `app/robots.ts` and `app/sitemap.ts` provide crawler directives and dynamic
  sitemap entries for static pages, service detail pages, and published guides.
- A typed brand registry mapping 18 slugs to SVG assets, official brand colors, and URLs is in `lib/brand-registry.ts` (used for background constellation).
- `POST /api/leads` validates submissions and writes to `public.leads`.
- `POST /api/contact` validates submissions, writes to
  `public.contact_messages`, then sends a Resend notification email.
  Email failure is logged server-side but still returns success to the user
  so the stored message is not duplicated on resubmit.
- Published AI guides are stored in `public.guides` and rendered on `/blog`.
  Each guide has a shareable page at `/blog/[slug]` and a direct PDF redirect
  at `/blog/[slug]/download`.
- Guide thumbnails and PDFs live in the public Supabase Storage bucket
  `guide-assets`.
- The private CMS at `/admin/guides` uses Supabase Auth plus the server-only
  `ADMIN_EMAILS` allowlist. Guide mutations are server actions that verify the
  signed-in admin before using the service role client.
- SQL setup is documented in `supabase/schema.sql`.
- Supabase writes use a server-only service role client.
- Local Supabase testing is configured as its own CLI project,
  `atlasmind212`, with API `55321`, database `55322`, Studio `55323`, and
  email inbox `55324`. The local migration lives in `supabase/migrations/`
  and mirrors `supabase/schema.sql`.
- The active Supabase project initialized for AtlasMind contact/lead tables is
  `oxupwsbvkgcwyzktsvwm` (`https://oxupwsbvkgcwyzktsvwm.supabase.co`).
- Contact notification email is handled by `lib/email/contact-notification.ts`
  (server-only, Resend SDK).

Required environment variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_EMAILS
RESEND_API_KEY
CONTACT_NOTIFICATION_TO
CONTACT_NOTIFICATION_FROM
```

## Design State

The active design direction is dark editorial technology:

- Background: Atlas Night `#020617`
- Deep surface: `#07111F`
- Elevated surface: `#0B1626`
- Primary: Electric Cyan `#00C8F5`
- Glow and focus: Neon Cyan `#38DDFB`
- Main text: `#F8FAFC`
- Muted text: `#94A3B8`
- Accent: Atlas Red `#F0323D`
- Border: `#1E3A4A`

The site uses a responsive Atlas Network wallpaper and five generated dark 3D
editorial illustrations in `public/images`. Typography uses Calistoga, Inter,
and JetBrains Mono. Motion respects `prefers-reduced-motion`.

Official brand logos (`public/brands/`) render in their vendor colors inside dark rounded tiles (`#0B1626`, border `#1E3A4A`, radius `16px`) for visual harmony. Backgrounds feature a sparse, non-interactive logo constellation (`components/logo-constellation.tsx`) at 12% opacity with responsive viewport filtering (fewer nodes on mobile).

## Quality Baseline

As of June 11, 2026:

- ESLint passes.
- The Next.js production build passes.
- `npm audit --omit=dev` reports zero vulnerabilities.
- All public routes were checked at 375x812, 768x1024, 1024x768, and 1440x900.
- No tested route had horizontal overflow or broken project images.
- Homepage terminal, mobile navigation, workflow/tool filtering, URL detail
  state, Escape dismissal, and client-side form validation were exercised.

Additional SEO/GEO verification on July 1, 2026:

- ESLint passes.
- The Next.js production build passes.
- `npm audit --omit=dev` reports zero vulnerabilities.
- Local route checks pass for `/robots.txt`, `/sitemap.xml`, `/llms.txt`,
  `/services.md`, `/company.md`, and the three service detail pages.

## Deployment

The project is prepared for Vercel. The production canonical domain is
`https://atlasmind212.com`; set `NEXT_PUBLIC_SITE_URL` to that value. Add all
environment variables in the Vercel project settings (`NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
`CONTACT_NOTIFICATION_TO`, `CONTACT_NOTIFICATION_FROM`), run
`supabase/schema.sql` before testing form submissions against a production
Supabase project, and verify the Resend sender domain
before production delivery. Local first-pass tests can use
`AtlasMind212 <onboarding@resend.dev>` for `CONTACT_NOTIFICATION_FROM`, but
Resend only permits that sender to email the Resend account address.
`supabase/schema.sql` grants `service_role` insert/select access for
`public.leads` and `public.contact_messages`; no public insert policies are
intended. It also creates `public.guides`, grants public select access only to
published guide rows through RLS, and creates the public `guide-assets` storage
bucket for guide thumbnails/PDFs.

## Known Boundaries

- Workflow and tool content is static TypeScript data.
- Guide/blog content is managed through Supabase, not static TypeScript.
- Lead delivery records data in Supabase; lead email notification is not
  implemented (contact form only).
- Lighthouse scores have not been recorded yet.
