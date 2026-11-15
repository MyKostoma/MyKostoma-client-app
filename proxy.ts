import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes, publicRoutes, authRoutes } from "@/lib/route-config";
import { getDefaultDashboard } from "@/lib/default-dashboard";
import { normalizeRole } from "@/lib/role-utils";
import type { UserRole } from "@/types/user";

const ACCESS_TOKEN_COOKIE = "access_token";
const USER_ROLE_COOKIE = "user_role";

interface VerifiedSession {
  authenticated: boolean;
  role: UserRole | null;
}

function resolveApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_ENV === "test") {
    return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";
  }

  if (process.env.NODE_ENV === "production") {
    return (
      process.env.NEXT_PUBLIC_PRODUCTION_API ??
      process.env.NEXT_PUBLIC_API_BASE_URL ??
      "http://localhost:3000/api"
    );
  }

  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";
}

function getAccessToken(request: NextRequest): string | null {
  const rawToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  if (!rawToken || rawToken === "undefined" || rawToken === "null") {
    return null;
  }
  try {
    const decoded = decodeURIComponent(rawToken);
    return decoded && decoded !== "undefined" && decoded !== "null"
      ? decoded
      : null;
  } catch {
    return null;
  }
}

function extractRoleFromPayload(payload: unknown): UserRole | null {
  if (typeof payload !== "object" || payload === null) return null;
  const record = payload as Record<string, unknown>;
  const userObj =
    typeof record.data === "object" && record.data !== null
      ? (record.data as Record<string, unknown>)
      : record;

  const directRole =
    typeof userObj.role === "string" ? normalizeRole(userObj.role) : undefined;
  if (directRole) return directRole;

  if (Array.isArray(userObj.roles) && userObj.roles.length > 0) {
    const lastRole = userObj.roles[userObj.roles.length - 1];
    if (typeof lastRole === "string") {
      return normalizeRole(lastRole) ?? null;
    }
  }

  return null;
}

async function verifySession(request: NextRequest): Promise<VerifiedSession> {
  const token = getAccessToken(request);
  if (!token) {
    return { authenticated: false, role: null };
  }

  try {
    const apiBaseUrl = resolveApiBaseUrl().replace(/\/$/, "");
    const response = await fetch(`${apiBaseUrl}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { authenticated: false, role: null };
    }

    const payload: unknown = await response.json();
    return {
      authenticated: true,
      role: extractRoleFromPayload(payload),
    };
  } catch {
    return { authenticated: false, role: null };
  }
}

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

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    process.env.NODE_ENV === "development" &&
    process.env.BYPASS_AUTH === "true"
  ) {
    return NextResponse.next();
  }

  const isPublic = isPublicRoute(pathname);
  if (isPublic) {
    return NextResponse.next();
  }

  const isAuthRoute = authRoutes.includes(pathname);
  const { authenticated, role: userRole } = await verifySession(request);

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
