import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes, publicRoutes, authRoutes } from "@/lib/route-config";
import { getDefaultDashboard } from "@/lib/default-dashboard";
import { normalizeRole } from "@/lib/role-utils";
import { isMockAuthEnabled } from "@/features/auth/services/authHelpers";
import type { UserRole } from "@/types/user";

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";
const USER_ROLE_COOKIE = "user_role";
const VERIFY_DEADLINE_MS = 5000;
const REFRESH_CACHE_TTL_MS = 5000;

interface RefreshedTokens {
  accessToken: string;
  refreshToken: string;
}

type RefreshOutcome =
  | { status: "ok"; tokens: RefreshedTokens }
  | { status: "unauthenticated" }
  | { status: "retriable_error" };

const inFlightRefreshes = new Map<string, Promise<RefreshOutcome>>();
const recentRefreshes = new Map<
  string,
  { tokens: RefreshedTokens; expiresAt: number }
>();

type VerifiedSession =
  | {
      status: "authenticated";
      role: UserRole | null;
      refreshedTokens?: RefreshedTokens;
    }
  | {
      status: "unauthenticated";
      role: null;
    }
  | {
      status: "retriable_error";
      role: null;
      refreshedTokens?: RefreshedTokens;
    };

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

function getDecodedCookie(request: NextRequest, name: string): string | null {
  const rawValue = request.cookies.get(name)?.value;
  if (!rawValue || rawValue === "undefined" || rawValue === "null") {
    return null;
  }
  try {
    const decoded = decodeURIComponent(rawValue);
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

function parseRefreshPayload(payload: unknown): RefreshedTokens | null {
  if (typeof payload !== "object" || payload === null) return null;
  const record = payload as Record<string, unknown>;
  const data =
    typeof record.data === "object" && record.data !== null
      ? (record.data as Record<string, unknown>)
      : record;

  if (
    typeof data.access_token === "string" &&
    typeof data.refresh_token === "string"
  ) {
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  }

  if (
    typeof data.accessToken === "string" &&
    typeof data.refreshToken === "string"
  ) {
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }

  return null;
}

function isCredentialErrorStatus(status: number): boolean {
  return status === 401 || status === 403;
}

async function fetchJsonWithDeadline(
  url: string,
  init: RequestInit,
  deadlineMs = VERIFY_DEADLINE_MS
): Promise<{ ok: true; status: number; data: unknown } | { ok: false; status: number } | { ok: false; status: null }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), deadlineMs);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      return { ok: false, status: response.status };
    }

    const data: unknown = await response.json();
    return { ok: true, status: response.status, data };
  } catch {
    return { ok: false, status: null };
  } finally {
    clearTimeout(timeoutId);
  }
}

async function refreshSessionTokens(
  apiBaseUrl: string,
  refreshToken: string
): Promise<RefreshOutcome> {
  const cached = recentRefreshes.get(refreshToken);
  if (cached) {
    if (cached.expiresAt > Date.now()) {
      return { status: "ok", tokens: cached.tokens };
    }
    recentRefreshes.delete(refreshToken);
  }

  const existing = inFlightRefreshes.get(refreshToken);
  if (existing) {
    return existing;
  }

  const refreshPromise = (async (): Promise<RefreshOutcome> => {
    const refreshResult = await fetchJsonWithDeadline(
      `${apiBaseUrl}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!refreshResult.ok) {
      if (
        refreshResult.status !== null &&
        isCredentialErrorStatus(refreshResult.status)
      ) {
        return { status: "unauthenticated" };
      }
      return { status: "retriable_error" };
    }

    const tokens = parseRefreshPayload(refreshResult.data);
    if (!tokens) {
      return { status: "unauthenticated" };
    }

    recentRefreshes.set(refreshToken, {
      tokens,
      expiresAt: Date.now() + REFRESH_CACHE_TTL_MS,
    });
    const cleanupTimer = setTimeout(() => {
      recentRefreshes.delete(refreshToken);
    }, REFRESH_CACHE_TTL_MS);
    if (typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
      cleanupTimer.unref();
    }

    return { status: "ok", tokens };
  })().finally(() => {
    inFlightRefreshes.delete(refreshToken);
  });

  inFlightRefreshes.set(refreshToken, refreshPromise);
  return refreshPromise;
}

async function verifySession(request: NextRequest): Promise<VerifiedSession> {
  const token = getDecodedCookie(request, ACCESS_TOKEN_COOKIE);
  const apiBaseUrl = resolveApiBaseUrl().replace(/\/$/, "");

  if (token) {
    if (
      process.env.NODE_ENV !== "production" &&
      isMockAuthEnabled() &&
      token.startsWith("mk_access_")
    ) {
      const mockRole = normalizeRole(
        getDecodedCookie(request, USER_ROLE_COOKIE)
      );
      return { status: "authenticated", role: mockRole ?? null };
    }

    const meResult = await fetchJsonWithDeadline(`${apiBaseUrl}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (meResult.ok) {
      return {
        status: "authenticated",
        role: extractRoleFromPayload(meResult.data),
      };
    }

    if (meResult.status === null || !isCredentialErrorStatus(meResult.status)) {
      return { status: "retriable_error", role: null };
    }
  }

  const refreshToken = getDecodedCookie(request, REFRESH_TOKEN_COOKIE);
  if (!refreshToken) {
    return { status: "unauthenticated", role: null };
  }

  const refreshed = await refreshSessionTokens(apiBaseUrl, refreshToken);
  if (refreshed.status !== "ok") {
    return { status: refreshed.status, role: null };
  }

  const retryMeResult = await fetchJsonWithDeadline(`${apiBaseUrl}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${refreshed.tokens.accessToken}`,
    },
  });

  if (retryMeResult.ok) {
    return {
      status: "authenticated",
      role: extractRoleFromPayload(retryMeResult.data),
      refreshedTokens: refreshed.tokens,
    };
  }

  if (
    retryMeResult.status === null ||
    !isCredentialErrorStatus(retryMeResult.status)
  ) {
    return {
      status: "retriable_error",
      role: null,
      refreshedTokens: refreshed.tokens,
    };
  }

  return { status: "unauthenticated", role: null };
}

function applyRefreshedCookies(
  response: NextResponse,
  tokens: RefreshedTokens | undefined,
  role: UserRole | null
): NextResponse {
  if (!tokens) return response;

  const secure =
    process.env.NEXT_PUBLIC_SECURE_COOKIES !== undefined
      ? process.env.NEXT_PUBLIC_SECURE_COOKIES === "true"
      : process.env.NODE_ENV === "production";
  const maxAge =
    Number(process.env.NEXT_PUBLIC_SESSION_MAX_AGE_SECONDS) || 60 * 60 * 24;

  const cookieBase = {
    path: "/",
    httpOnly: false,
    secure,
    sameSite: "lax" as const,
    maxAge,
  };

  response.cookies.set(
    ACCESS_TOKEN_COOKIE,
    encodeURIComponent(tokens.accessToken),
    cookieBase
  );
  response.cookies.set(
    REFRESH_TOKEN_COOKIE,
    encodeURIComponent(tokens.refreshToken),
    cookieBase
  );
  if (role) {
    response.cookies.set(USER_ROLE_COOKIE, encodeURIComponent(role), cookieBase);
  }

  return response;
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
  response.cookies.delete(REFRESH_TOKEN_COOKIE);
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
  const session = await verifySession(request);

  if (isAuthRoute) {
    if (session.status === "authenticated") {
      const redirectUrl = getDefaultDashboard(session.role);
      return applyRefreshedCookies(
        NextResponse.redirect(new URL(redirectUrl, request.url)),
        session.refreshedTokens,
        session.role
      );
    }
    return NextResponse.next();
  }

  const createRetriableErrorResponse = () =>
    applyRefreshedCookies(
      new NextResponse("Authentication service temporarily unavailable", {
        status: 503,
        headers: { "Retry-After": "5" },
      }),
      session.status === "retriable_error" ? session.refreshedTokens : undefined,
      null
    );

  for (const route of protectedRoutes) {
    if (matchPath(route.path, pathname)) {
      if (session.status === "retriable_error") {
        return createRetriableErrorResponse();
      }

      if (session.status === "unauthenticated") {
        const redirectUrl = route.redirectTo || "/login";
        return createUnauthorizedRedirect(request, redirectUrl, true);
      }

      if (!hasRequiredRole(session.role, route.roles)) {
        const fallbackUrl = getDefaultDashboard(session.role);
        return applyRefreshedCookies(
          NextResponse.redirect(new URL(fallbackUrl, request.url)),
          session.refreshedTokens,
          session.role
        );
      }

      return applyRefreshedCookies(
        NextResponse.next(),
        session.refreshedTokens,
        session.role
      );
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

  if (needsProtection) {
    if (session.status === "retriable_error") {
      return createRetriableErrorResponse();
    }
    if (session.status === "unauthenticated") {
      return createUnauthorizedRedirect(request, "/login", true);
    }
  }

  return applyRefreshedCookies(
    NextResponse.next(),
    session.status === "authenticated" ? session.refreshedTokens : undefined,
    session.status === "authenticated" ? session.role : null
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\.png$|api).*)"],
};
