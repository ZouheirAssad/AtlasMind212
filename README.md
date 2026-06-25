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

Create a `.env.local` file by copying `.env.example`. Ensure the following keys are populated:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=
CONTACT_NOTIFICATION_FROM=AtlasMind212 <onboarding@resend.dev>
CONTACT_NOTIFICATION_TO=zouhirassad@gmail.com
```

- `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` are only used on the server side and must never be exposed or prefixed with `NEXT_PUBLIC_`.
- For first email tests, use Resend's default sender: `AtlasMind212 <onboarding@resend.dev>`. Resend only allows this sender to email the address associated with your Resend account.
- For production delivery to other recipients, `CONTACT_NOTIFICATION_FROM` must match a verified sender address or domain configured in your Resend account.

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

Import the repository in Vercel, add all the environment variables listed above (both Supabase and Resend variables), and deploy. The default Next.js build command is supported without changes.
