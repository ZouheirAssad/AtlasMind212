import type { NextConfig } from "next";

const supabaseImageUrl = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;

  try {
    return new URL(url);
  } catch {
    return null;
  }
})();

const isLocalSupabaseImageHost =
  supabaseImageUrl?.hostname === "127.0.0.1" ||
  supabaseImageUrl?.hostname === "localhost" ||
  supabaseImageUrl?.hostname === "::1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "35mb",
    },
  },
  images: {
    unoptimized: isLocalSupabaseImageHost,
    remotePatterns: supabaseImageUrl
      ? [
          {
            protocol: supabaseImageUrl.protocol.replace(":", "") as "http" | "https",
            hostname: supabaseImageUrl.hostname,
            port: supabaseImageUrl.port,
            pathname: "/storage/v1/object/public/guide-assets/**",
          },
          {
            protocol: supabaseImageUrl.protocol.replace(":", "") as "http" | "https",
            hostname: supabaseImageUrl.hostname,
            port: supabaseImageUrl.port,
            pathname: "/storage/v1/object/sign/guide-assets/**",
          },
        ]
      : [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          // Framing/plugin/base restrictions only; script sources are not
          // locked down because Next.js inline scripts would need nonces.
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/services/business-website",
        destination: "/services/web-development",
        permanent: true,
      },
      {
        source: "/:locale(en|fr|ar)/services/business-website",
        destination: "/:locale/services/web-development",
        permanent: true,
      },
      {
        source: "/services/ai-integration",
        destination: "/services/llm-integration-ai-consulting",
        permanent: true,
      },
      {
        source: "/:locale(en|fr|ar)/services/ai-integration",
        destination: "/:locale/services/llm-integration-ai-consulting",
        permanent: true,
      },
      {
        source: "/services/ai-automation",
        destination: "/services/workflow-automation",
        permanent: true,
      },
      {
        source: "/:locale(en|fr|ar)/services/ai-automation",
        destination: "/:locale/services/workflow-automation",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.atlasmind212.com" }],
        destination: "https://atlasmind212.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
