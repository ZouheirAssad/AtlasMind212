# AtlasMind212 Project Memory

## Product

AtlasMind212 is an AI education and workflow brand focused on AI tools, Claude
Code, n8n automation, content systems, business ideas, and beginner-friendly
tutorials.

## Current MVP

Public routes:

- `/`
- `/free-guide`
- `/workflows`
- `/tools`
- `/services`
- `/about`
- `/contact`
- `/privacy`
- `/imprint`

The homepage includes an interactive goal terminal, a before/after system
comparison, workflow cards, a connected learning story, guide promotion, and
service CTAs. Workflow and tool libraries support search, category filters,
shareable query parameters, and responsive detail panels.

## Data And APIs

- Static product data lives in `lib/site-data.ts`.
- A typed brand registry mapping 18 slugs to SVG assets, official brand colors, and URLs is in `lib/brand-registry.ts`.
- Tools and workflows in `lib/site-data.ts` reference these stable brand slugs instead of display name strings.
- `POST /api/leads` validates submissions and writes to `public.leads`.
- `POST /api/contact` validates submissions and writes to
  `public.contact_messages`.
- SQL setup is documented in `supabase/schema.sql`.
- Supabase writes use a server-only service role client.

Required environment variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
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

## Deployment

The project is prepared for Vercel. Add all three environment variables in the
Vercel project settings and run `supabase/schema.sql` before testing form
submissions against a production Supabase project.

## Known Boundaries

- Workflow and tool content is static TypeScript data.
- Lead delivery currently records data in Supabase; email delivery is not
  implemented.
- Lighthouse scores have not been recorded yet.
