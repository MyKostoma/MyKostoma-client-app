import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes, publicRoutes, authRoutes } from "@/lib/route-config";
import { getDefaultDashboard } from "@/lib/default-dashboard";
import { normalizeRole } from "@/lib/role-utils";
import type { UserRole } from "@/types/user";

const ACCESS_TOKEN_COOKIE = "access_token";
const USER_ROLE_COOKIE = "user_role";

function matchPath(pattern: string, path: string): boolean {
  if (pattern.endsWith("*")) {
    const prefix = pattern.slice(0, -1);
    if (path === prefix || path.startsWith(prefix)) return true;
  }
  const regexPattern = pattern
    .replace(/\//g, "\\/")
    .replace(/:path\*/g, ".*")
    .replace(/:\w+/g, "[^/]+");
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(path);
}

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => {
    if (pathname === route) return true;
    if (route.endsWith("*")) {
      const prefix = route.slice(0, -1);
      return pathname.startsWith(prefix);
    }
    return false;
  });
}

function getUserRole(request: NextRequest): UserRole | null {
  const role = request.cookies.get(USER_ROLE_COOKIE)?.value;
  return normalizeRole(role) ?? null;
}

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  return (
    !!token && token !== "undefined" && token !== "null" && token.length > 0
  );
}

function hasRequiredRole(
  userRole: UserRole | null,
  requiredRoles: UserRole[]
): boolean {
  if (requiredRoles.length === 0) return true;
  if (!userRole) return false;
  return requiredRoles.includes(userRole);
}

function createUnauthorizedRedirect(
  request: NextRequest,
  redirectPath: string,
  storePath = true
): NextResponse {
  const response = NextResponse.redirect(new URL(redirectPath, request.url));

  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  response.cookies.delete(USER_ROLE_COOKIE);

  if (storePath && request.nextUrl.pathname !== redirectPath) {
    response.cookies.set("redirect_after_login", request.nextUrl.pathname, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 5,
    });
  }

  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    process.env.NODE_ENV === "development" &&
    process.env.BYPASS_AUTH === "true"
  ) {
    return NextResponse.next();
  }

  const isPublic = isPublicRoute(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const authenticated = isAuthenticated(request);
  const userRole = getUserRole(request);

  if (isPublic) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (authenticated) {
      const redirectUrl = getDefaultDashboard(userRole);
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.next();
  }

  for (const route of protectedRoutes) {
    if (matchPath(route.path, pathname)) {
      if (!authenticated) {
        const redirectUrl = route.redirectTo || "/login";
        return createUnauthorizedRedirect(request, redirectUrl, true);
      }

      if (!hasRequiredRole(userRole, route.roles)) {
        const fallbackUrl = getDefaultDashboard(userRole);
        return NextResponse.redirect(new URL(fallbackUrl, request.url));
      }

      return NextResponse.next();
    }
  }

  const protectedPrefixes = [
    "/dashboard",
    "/home",
    "/pro",
    "/my-bookings",
    "/my-shop",
    "/earnings",
  ];
  const needsProtection = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (needsProtection && !authenticated) {
    return createUnauthorizedRedirect(request, "/login", true);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\.png$|api).*)"],
};
