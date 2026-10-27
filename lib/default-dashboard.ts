import type { UserRole } from "@/types/user";
import { normalizeRole } from "@/lib/role-utils";

export function getDefaultDashboard(role: UserRole | string | null | undefined): string {
  const normalized = normalizeRole(role);
  switch (normalized) {
    case "professional":
      return "/dashboard";
    case "consumer":
      return "/home";
    default:
      return "/";
  }
}
