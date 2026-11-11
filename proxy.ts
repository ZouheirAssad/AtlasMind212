import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import { LOCALE_COOKIE, defaultLocale, isLocale, matchAcceptLanguage, type Locale } from "@/lib/i18n/config";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return adminGate(request);
  }

  return localeRouting(request);
}

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Public site routing. Every page lives under a locale prefix (`/fr`, `/en`,
 * `/ar`). An unprefixed URL (e.g. `/` or an old `/about` link) redirects to the
 * visitor's language: the remembered choice (cookie) first, then the device /
 * browser language (Accept-Language), otherwise French.
 */
function localeRouting(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (isLocale(firstSegment)) {
    const response = NextResponse.next();
    // Remember the language the visitor is reading (also covers the switcher).
    if (request.cookies.get(LOCALE_COOKIE)?.value !== firstSegment) {
      response.cookies.set(LOCALE_COOKIE, firstSegment, { path: "/", maxAge: LOCALE_COOKIE_MAX_AGE, sameSite: "lax" });
    }
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url, 307);
  // The target depends on the visitor, so shared caches must not store it.
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

function preferredLocale(request: NextRequest): Locale {
  const remembered = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(remembered)) return remembered;
  return matchAcceptLanguage(request.headers.get("accept-language")) ?? defaultLocale;
}

async function adminGate(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  const user = data.user;
  const pathname = request.nextUrl.pathname;
  const isAdminLogin = pathname === "/admin/login";
  const isAdminSetPassword = pathname === "/admin/set-password";
  const hasAdminAccess = Boolean(user && isAdminEmail(user.email));

  // Invite password setup is an unauthenticated bootstrap flow — the page
  // itself renders a "missing active session" message when there is no session,
  // so do not gate it behind admin access.
  if (pathname.startsWith("/admin") && !isAdminLogin && !isAdminSetPassword && !hasAdminAccess) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/login";
    redirectUrl.searchParams.set("next", pathname);
    if (user) redirectUrl.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(redirectUrl);
  }

  if (isAdminLogin && hasAdminAccess) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/guides";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  // Everything except API routes, Next internals, metadata routes and static
  // files (anything with an extension, e.g. /images/x.webp, /llms.txt).
  matcher: ["/((?!api|_next/static|_next/image|_vercel|robots\\.txt|sitemap\\.xml|.*\\..*).*)"],
};
