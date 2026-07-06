import { NextResponse, type NextRequest } from "next/server";

// The `[locale]` segment serves both languages from a single set of route files.
// English lives at the root (no prefix) and Turkish under /tr, so requests are
// mapped to the internal /en or /tr segment here.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy /en URLs canonicalize to the root.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url);
  }

  // Turkish is served directly by the [locale] segment.
  if (pathname === "/tr" || pathname.startsWith("/tr/")) {
    return NextResponse.next();
  }

  // Everything else is English at the root: rewrite onto the /en segment.
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
