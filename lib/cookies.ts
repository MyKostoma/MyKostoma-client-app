import type { UserRole } from "@/types/user";

const COOKIE_OPTIONS = {
  path: "/",
  secure: process.env.NEXT_PUBLIC_SECURE_COOKIES === "true",
  sameSite: "lax" as const,
  maxAgeSeconds:
    Number(process.env.NEXT_PUBLIC_SESSION_MAX_AGE_SECONDS) || 60 * 60 * 24,
};

/**
 * Set auth cookies after login or verification
 * Call this after successful authentication to enable proxy route protection
 */
export function setAuthCookies(
  accessToken: string,
  refreshToken: string,
  role: UserRole
): void {
  if (typeof document === "undefined") return;
  const secure = COOKIE_OPTIONS.secure ? "secure;" : "";
  const maxAge = `max-age=${COOKIE_OPTIONS.maxAgeSeconds};`;
  document.cookie = `access_token=${accessToken}; path=${COOKIE_OPTIONS.path}; ${maxAge} ${secure} samesite=${COOKIE_OPTIONS.sameSite}`;
  document.cookie = `refresh_token=${refreshToken}; path=${COOKIE_OPTIONS.path}; ${maxAge} ${secure} samesite=${COOKIE_OPTIONS.sameSite}`;
  document.cookie = `user_role=${role}; path=${COOKIE_OPTIONS.path}; ${maxAge} ${secure} samesite=${COOKIE_OPTIONS.sameSite}`;
}

/**
 * Clear auth cookies on logout
 */
export function clearAuthCookies(): void {
  if (typeof document === "undefined") return;
  const expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `access_token=; path=/; ${expires}`;
  document.cookie = `refresh_token=; path=/; ${expires}`;
  document.cookie = `user_role=; path=/; ${expires}`;
  document.cookie = `redirect_after_login=; path=/; ${expires}`;
}

/**
 * Get redirect path stored before login
 */
export function getRedirectAfterLogin(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/redirect_after_login=([^;]+)/);
  if (match) {
    document.cookie =
      "redirect_after_login=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    return decodeURIComponent(match[1]);
  }
  return null;
}

