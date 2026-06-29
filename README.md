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

### Local Supabase

This repo includes a Supabase CLI project for local testing. It uses an
AtlasMind-specific port range so it can run beside other local Supabase
projects:

```text
API:    http://127.0.0.1:55321
DB:     postgresql://postgres:postgres@127.0.0.1:55322/postgres
Studio: http://127.0.0.1:55323
Email:  http://127.0.0.1:55324
```

Start the local stack:

```bash
npx supabase start
```

The first run can take a while because Docker pulls the Supabase images. Copy
the `API_URL`, `ANON_KEY`, and `SERVICE_ROLE_KEY` from the CLI output into
`.env.local`, then set `ADMIN_EMAILS` to the local admin email you want to use.

Stop only this project's local stack:

```bash
npx supabase stop --project-id atlasmind212
```

The local schema is managed through `supabase/migrations/` and mirrors
`supabase/schema.sql` for the lead, contact, guide, and guide storage setup.

## Environment variables

Create a `.env.local` file by copying `.env.example`. Ensure the following keys are populated:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=you@example.com

RESEND_API_KEY=
CONTACT_NOTIFICATION_FROM=AtlasMind212 <onboarding@resend.dev>
CONTACT_NOTIFICATION_TO=zouhirassad@gmail.com
```

- `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` are only used on the server side and must never be exposed or prefixed with `NEXT_PUBLIC_`.
- `ADMIN_EMAILS` is a comma-separated allowlist for the private guide CMS. Create matching Supabase Auth users manually in the Supabase dashboard.
- For first email tests, use Resend's default sender: `AtlasMind212 <onboarding@resend.dev>`. Resend only allows this sender to email the address associated with your Resend account.
- For production delivery to other recipients, `CONTACT_NOTIFICATION_FROM` must match a verified sender address or domain configured in your Resend account.

## AI Guides CMS

The private CMS lives at `/admin/guides` and is protected by Supabase Auth plus the `ADMIN_EMAILS` allowlist. Log in at `/admin/login` with a Supabase Auth email/password account whose email appears in `ADMIN_EMAILS`.

The public guide library lives at `/blog`. Each published guide also has:

```text
/blog/[slug]
/blog/[slug]/download
```

Run `supabase/schema.sql` after pulling this feature. It creates:

- `public.guides` with RLS enabled.
- A public read policy for rows where `status = 'published'`.
- A public Supabase Storage bucket named `guide-assets`.
- A storage read policy for files in `guide-assets`.

Guide mutations use server actions and the server-only service role key after the signed-in user is verified as an admin. Do not expose the service role key in browser code.

## Email Diagnostics

You can verify email notification delivery using the server-only diagnostic script:

```bash
npm run email:test
```

This runs a direct API test via Resend using the environment variables in `.env.local` without creating duplicate rows in the database.

## Resend Domain Verification Setup

To send from your own domain in production:

1. Log in to your Resend account and navigate to **Domains**.
2. Add your domain (e.g., `atlasmind212.com`).
3. Set the provided DNS records (MX, SPF, DKIM, TXT) on your DNS provider.
4. Once verified, configure your environment variables to use this domain.

## Vercel

Import the repository in Vercel, add all the environment variables listed above (Supabase, `ADMIN_EMAILS`, and Resend variables), and deploy. The default Next.js build command is supported without changes.
