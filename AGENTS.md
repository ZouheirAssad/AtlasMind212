# AGENTS.md

## Project

AtlasMind212 is a Next.js App Router website for practical AI education,
workflows, tools, services, and lead generation.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS v4
- Supabase server-side client
- React Hook Form and Zod
- Motion for isolated client-side animation
- Lucide React and Radix-based UI primitives

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm audit --omit=dev
```

Run lint and the production build before considering a code change complete.
For rendered UI changes, verify the affected routes at mobile and desktop
widths and check the browser console.

## Architecture

- Keep pages and static content as Server Components where possible.
- Use Client Components only for forms, navigation, motion, filters, dialogs,
  sheets, and other interactive state.
- Put shared static workflow, tool, service, and navigation data in
  `lib/site-data.ts`.
- Put reusable UI primitives in `components/ui` and composed site components
  in `components`.
- Keep validation schemas in `lib/validations.ts`.
- Keep server-only Supabase access in `lib/supabase/server.ts`.

## Security

- Never commit `.env`, `.env.local`, credentials, access tokens, or Supabase
  keys.
- `SUPABASE_SERVICE_ROLE_KEY` must remain server-only and must never use the
  `NEXT_PUBLIC_` prefix.
- Validate all API input with Zod before database writes.
- Preserve Row Level Security on the documented Supabase tables.

## Design

- Treat `design-system/MASTER.md` as the visual source of truth.
- Use Atlas Night `#020617` for the canvas, navy surfaces, Electric Cyan for
  functional emphasis, and Atlas Red only for sparse accents.
- Preserve visible focus states, 44px minimum touch targets, keyboard access,
  and reduced-motion behavior.
- Use `next/image` for project imagery with stable dimensions and useful alt
  text.
- Avoid introducing purple gradients, neon overload, large red surfaces, or
  generic AI imagery.

## Editing

- Follow existing component patterns before adding abstractions.
- Keep changes scoped and avoid unrelated refactors.
- Do not change the public API routes or Supabase schema without documenting
  the migration and compatibility impact.
- Update `Memory.md` when architecture, deployment requirements, major design
  decisions, or known limitations change.
