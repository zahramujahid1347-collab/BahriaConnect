import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require a signed-in resident
const residentRoutes = ["/dashboard", "/services", "/request"];

// Routes that require management access
const managementRoutes = ["/management"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static assets, auth pages, and manifest
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/manifest"
  ) {
    return NextResponse.next();
  }

  // Resident-only routes: redirect to sign up if not authenticated
  // (authentication is placeholder — plug in real session check here)
  const isAuthenticated = request.cookies.has("session_token");
  const isResidentRoute = residentRoutes.some((r) => pathname.startsWith(r));
  const isMgmtRoute = managementRoutes.some((r) => pathname.startsWith(r));

  if (isResidentRoute && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/register";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isMgmtRoute && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/register";
    url.searchParams.set("next", pathname);
    url.searchParams.set("role", "management");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon).*)"],
};
