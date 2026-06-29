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
        ]
      : [],
  },
};

export default nextConfig;
