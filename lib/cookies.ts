import type { UserRole } from "@/types/user";

const COOKIE_OPTIONS = {
  path: "/",
  secure:
    process.env.NEXT_PUBLIC_SECURE_COOKIES !== undefined
      ? process.env.NEXT_PUBLIC_SECURE_COOKIES === "true"
      : process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAgeSeconds:
    Number(process.env.NEXT_PUBLIC_SESSION_MAX_AGE_SECONDS) || 60 * 60 * 24,
};

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${escapedName}=([^;]+)`));
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

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
  document.cookie = `access_token=${encodeURIComponent(accessToken)}; path=${COOKIE_OPTIONS.path}; ${maxAge} ${secure} samesite=${COOKIE_OPTIONS.sameSite}`;
  document.cookie = `refresh_token=${encodeURIComponent(refreshToken)}; path=${COOKIE_OPTIONS.path}; ${maxAge} ${secure} samesite=${COOKIE_OPTIONS.sameSite}`;
  document.cookie = `user_role=${encodeURIComponent(role)}; path=${COOKIE_OPTIONS.path}; ${maxAge} ${secure} samesite=${COOKIE_OPTIONS.sameSite}`;
}

/**
 * Read decoded auth tokens from document cookies
 */
export function getAuthTokensFromCookies(): {
  accessToken: string | null;
  refreshToken: string | null;
} {
  return {
    accessToken: readCookie("access_token"),
    refreshToken: readCookie("refresh_token"),
  };
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
  const match = document.cookie.match(/(?:^|;\s*)redirect_after_login=([^;]+)/);
  if (match) {
    document.cookie =
      "redirect_after_login=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    try {
      const decoded = decodeURIComponent(match[1]);
      if (
        decoded.startsWith("/") &&
        !decoded.startsWith("//") &&
        !decoded.startsWith("/\\")
      ) {
        return decoded;
      }
    } catch {
      return null;
    }
  }
  return null;
}

