import type { UserRole } from "@/types/user";

/**
 * Route protection configuration
 */
export interface RouteConfig {
  path: string;
  roles: UserRole[];
  redirectTo?: string;
}

/**
 * Protected routes - order matters, first match wins
 */
export const protectedRoutes: RouteConfig[] = [
  // Professional workspace routes
  {
    path: "/pro",
    roles: ["professional"],
    redirectTo: "/login",
  },
  {
    path: "/pro/:path*",
    roles: ["professional"],
    redirectTo: "/login",
  },
  {
    path: "/dashboard*",
    roles: ["professional"],
    redirectTo: "/login",
  },
  {
    path: "/my-shop*",
    roles: ["professional"],
    redirectTo: "/login",
  },
  {
    path: "/earnings*",
    roles: ["professional"],
    redirectTo: "/login",
  },
  {
    path: "/verification*",
    roles: ["professional"],
    redirectTo: "/login",
  },

  // Consumer workspace routes
  {
    path: "/home*",
    roles: ["consumer"],
    redirectTo: "/login",
  },
  {
    path: "/search",
    roles: ["consumer"],
    redirectTo: "/login",
  },
  {
    path: "/search*",
    roles: ["consumer"],
    redirectTo: "/login",
  },
  {
    path: "/my-bookings*",
    roles: ["consumer"],
    redirectTo: "/login",
  },
  {
    path: "/saved-items*",
    roles: ["consumer"],
    redirectTo: "/login",
  },

  // Shared authenticated routes (both consumer & professional)
  {
    path: "/requests*",
    roles: ["consumer", "professional"],
    redirectTo: "/login",
  },
  {
    path: "/reels*",
    roles: ["consumer", "professional"],
    redirectTo: "/login",
  },
  {
    path: "/quotations*",
    roles: ["consumer", "professional"],
    redirectTo: "/login",
  },
  {
    path: "/orders*",
    roles: ["consumer", "professional"],
    redirectTo: "/login",
  },
  {
    path: "/messages*",
    roles: ["consumer", "professional"],
    redirectTo: "/login",
  },
  {
    path: "/settings*",
    roles: ["consumer", "professional"],
    redirectTo: "/login",
  },
  {
    path: "/profile*",
    roles: ["consumer", "professional"],
    redirectTo: "/login",
  },
  {
    path: "/shop*",
    roles: ["consumer", "professional"],
    redirectTo: "/login",
  },
  {
    path: "/wallet*",
    roles: ["consumer", "professional"],
    redirectTo: "/login",
  },
];

/**
 * Public routes - no auth required
 */
export const publicRoutes = [
  "/",
  "/category*",
  "/form-system*",
  "/navigation-system*",
  "/no-access",
  "/reels*",
  "/shop",
  
];

/**
 * Auth routes - redirect to role default page if already logged in
 */
export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-account",
];

/**
 * Dashboard / Workspace route configuration.
 * Add any new dashboard or workspace routes here to:
 * 1. Exclude them from the (internal-routes) Header and Footer
 * 2. Configure their default DashboardLayout title and top-bar behavior
 */
export interface DashboardRouteConfig {
  /** Route path or prefix pattern (supports trailing `*`, e.g. `/requests*`) */
  path: string;
  /** Default title displayed in the dashboard top bar */
  title: string;
  /** Allowed roles for reference / route guard alignment */
  roles?: UserRole[];
  /** Optional flag to enable the sticky dashboard footer on this route */
  showFooter?: boolean;
}

export const dashboardRoutes: DashboardRouteConfig[] = [
  {
    path: "/dashboard*",
    title: "Dashboard",
    roles: ["consumer", "professional"],
  },
  {
    path: "/requests*",
    title: "My Requests",
    roles: ["consumer", "professional"],
  },
  {
    path: "/quotations*",
    title: "Quotations",
    roles: ["consumer", "professional"],
  },
  {
    path: "/orders*",
    title: "My Orders",
    roles: ["consumer", "professional"],
  },
  {
    path: "/wallet*",
    title: "Wallet",
    roles: ["consumer", "professional"],
    showFooter: true,
  },
  {
    path: "/bookings*",
    title: "My Bookings",
    roles: ["consumer"],
  },
  {
    path: "/my-bookings*",
    title: "My Bookings",
    roles: ["consumer"],
  },
  {
    path: "/saved*",
    title: "Saved Items",
    roles: ["consumer"],
  },
  {
    path: "/saved-items*",
    title: "Saved Items",
    roles: ["consumer"],
  },
  {
    path: "/my-shop*",
    title: "My Shop",
    roles: ["professional"],
  },
  {
    path: "/reels*",
    title: "Reels Console",
    roles: ["professional"],
  },
  {
    path: "/reels-console*",
    title: "Reels Console",
    roles: ["professional"],
  },
  {
    path: "/earnings*",
    title: "Earnings & Payouts",
    roles: ["professional"],
  },
  {
    path: "/verification*",
    title: "Verification",
    roles: ["professional"],
  },
  {
    path: "/messages*",
    title: "Messages",
    roles: ["consumer", "professional"],
  },
  {
    path: "/notifications*",
    title: "Notifications",
    roles: ["consumer", "professional"],
  },
  {
    path: "/settings*",
    title: "Settings",
    roles: ["consumer", "professional"],
  },
];

/**
 * Matches a pathname against a route pattern (supports `*` wildcard suffix and `:path*`).
 */
export function matchRoutePattern(pathname: string, pattern: string): boolean {
  const normalizedPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (pattern.endsWith("/:path*")) {
    const base = pattern.slice(0, -7);
    return normalizedPath === base || normalizedPath.startsWith(`${base}/`);
  }

  if (pattern.endsWith("*")) {
    const base = pattern.slice(0, -1);
    return normalizedPath === base || normalizedPath.startsWith(`${base}/`);
  }

  return normalizedPath === pattern;
}

/**
 * Returns the matching DashboardRouteConfig for a given pathname, if any.
 */
export function getDashboardRouteConfig(
  pathname: string
): DashboardRouteConfig | undefined {
  return dashboardRoutes.find((route) =>
    matchRoutePattern(pathname, route.path)
  );
}

/**
 * Checks whether a pathname belongs to a configured dashboard/workspace route.
 */
export function isDashboardRoute(pathname: string): boolean {
  return Boolean(getDashboardRouteConfig(pathname));
}

/**
 * Resolves the default page title for a dashboard route from `dashboardRoutes`.
 */
export function getDashboardPageTitle(pathname: string): string {
  const matched = getDashboardRouteConfig(pathname);
  return matched?.title ?? "Dashboard";
}
