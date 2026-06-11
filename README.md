# AtlasMind212 MVP

Next.js App Router website for AtlasMind212.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Add the Supabase project URL, anon key, and service role key.
3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. Install and start:

```bash
npm install
npm run dev
```

## Environment variables

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY` is only imported by server-side API routes and must
never be prefixed with `NEXT_PUBLIC_`.

## Vercel

Import the repository in Vercel, add the three environment variables, and
deploy. The default Next.js build command is supported without changes.
