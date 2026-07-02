# AGENTS.md

## Project

AtlasMind212 is a single Next.js App Router marketing site for AI education,
workflow/tool libraries, services, lead capture, and contact intake.

## Commands

- Use npm with the committed `package-lock.json`; do not switch package managers.
- `npm install` installs dependencies.
- `npm run dev` starts Next.js locally.
- `npm run lint` runs ESLint over the repo.
- `npm run build` is the only configured typecheck/production verification.
- `npm audit --omit=dev` is part of the documented release check.
- There is no test script or CI workflow in this repo; verify changes with lint
  and build, plus browser checks for rendered UI.

## App Boundaries

- Public App Router pages live in `app/*/page.tsx` (marketing, services,
  blog/guides, contact, legal pages such as `about`, `privacy`, `imprint`).
- Private admin CMS routes live under `app/admin/*`
  (`admin/guides`, `admin/admins`, `admin/analytics`, `admin/login`,
  `admin/set-password`); admin mutations happen in server actions
  (`app/admin/guides/actions.ts`, `app/admin/admins/actions.ts`).
- API routes are `app/api/contact/route.ts`, `app/api/leads/route.ts`, and
  `app/api/vercel/analytics-drain/route.ts`.
- Keep static pages as Server Components unless they need forms, navigation
  state, motion, filters, dialogs, or sheets.
- Shared navigation, workflow, tool, and service content lives in
  `lib/site-data.ts`.
- Tool/workflow brand slugs must exist in `lib/brand-registry.ts` and map to
  local SVGs under `public/brands/`; update `public/brands/manifest.md` for new
  brand assets.
- Reusable shadcn/Radix-style primitives live in `components/ui`; composed site
  components live in `components`.

## Data And API

- Setup requires `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and server-only `SUPABASE_SERVICE_ROLE_KEY`.
- Run `supabase/schema.sql` before testing form submissions against Supabase.
- API writes use `createAdminClient()` from `lib/supabase/server.ts` and the
  service role key; never expose it with a `NEXT_PUBLIC_` prefix.
- Keep request validation in `lib/validations.ts` with Zod before database
  writes.
- `supabase/schema.sql` enables RLS for `public.leads` and
  `public.contact_messages`; public insert policies are intentionally absent
  because writes use the service role route handlers.

## Styling And Design

- Tailwind CSS v4 is configured through `app/globals.css` and
  `@tailwindcss/postcss`; there is no `tailwind.config.*` file.
- Treat `design-system/MASTER.md` as the visual source of truth: Atlas Night
  `#020617`, navy surfaces, Electric Cyan for functional emphasis, sparse Atlas
  Red only.
- Preserve visible focus states, 44px minimum touch targets, keyboard access,
  and reduced-motion behavior.
- Use `next/image` for project imagery with stable dimensions and useful alt
  text.
- Avoid purple gradients, neon overload, large red surfaces, generic AI imagery,
  stretched brand logos, and third-party runtime logo dependencies.

## Workflow Notes

- For UI changes, check affected routes at mobile and desktop widths and inspect
  the browser console.
- Do not change API routes or `supabase/schema.sql` without documenting migration
  and compatibility impact.
- Update `Memory.md` when architecture, deployment requirements, major design
  decisions, quality baselines, or known limitations change.
