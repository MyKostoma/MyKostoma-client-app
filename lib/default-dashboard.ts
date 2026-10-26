import type { UserRole } from "@/types/user";
import { normalizeRole } from "@/lib/role-utils";

export function getDefaultDashboard(role: UserRole | string | null | undefined): string {
  const normalized = normalizeRole(role);
  switch (normalized) {
    case "professional":
      return "/pro/overview";
    case "consumer":
      return "/dashboard";
    default:
      return "/";
  }
}

