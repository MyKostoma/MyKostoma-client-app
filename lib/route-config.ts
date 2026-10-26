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
    path: "/overview",
    roles: ["professional"],
    redirectTo: "/login",
  },
  {
    path: "/my-shop*",
    roles: ["professional"],
    redirectTo: "/login",
  },
  {
    path: "/reels-console*",
    roles: ["professional"],
    redirectTo: "/login",
  },
  {
    path: "/earnings*",
    roles: ["professional"],
    redirectTo: "/login",
  },

  // Consumer workspace routes
  {
    path: "/dashboard*",
    roles: ["consumer"],
    redirectTo: "/login",
  },
  {
    path: "/find-pros*",
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
];

/**
 * Auth routes - redirect to role dashboard if already logged in
 */
export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-account",
];

