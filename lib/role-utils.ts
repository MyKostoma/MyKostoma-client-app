import type { User, UserRole } from "@/types/user";
import { RoleDisplayNames } from "@/types/user";

export function normalizeRole(
  role: string | undefined | null
): UserRole | undefined {
  if (!role) return undefined;
  const cleaned = role.trim().toLowerCase().replace(/\s+/g, "_");
  if (
    cleaned === "professional" ||
    cleaned === "pro" ||
    cleaned === "service_provider" ||
    cleaned === "provider"
  ) {
    return "professional";
  }
  if (
    cleaned === "consumer" ||
    cleaned === "customer" ||
    cleaned === "client" ||
    cleaned === "user"
  ) {
    return "consumer";
  }
  return undefined;
}

export function isProfessional(user: Pick<User, "role" | "roles"> | null | undefined): boolean {
  if (!user) return false;
  return (
    normalizeRole(user.role) === "professional" ||
    Boolean(user.roles?.some((r) => normalizeRole(r) === "professional"))
  );
}

export function isConsumer(user: Pick<User, "role" | "roles"> | null | undefined): boolean {
  if (!user) return false;
  return (
    normalizeRole(user.role) === "consumer" ||
    Boolean(user.roles?.some((r) => normalizeRole(r) === "consumer"))
  );
}

export interface RoleDestinationMeta {
  href: string;
  destinationLabel: string;
  roleLabel: string;
}

export function getRoleDestination(role: UserRole | string | null | undefined): RoleDestinationMeta {
  const normalized = normalizeRole(role) ?? "consumer";
  if (normalized === "professional") {
    return {
      href: "/overview",
      destinationLabel: "Professional Workspace",
      roleLabel: RoleDisplayNames.professional,
    };
  }
  return {
    href: "/dashboard",
    destinationLabel: "Consumer Product Entry",
    roleLabel: RoleDisplayNames.consumer,
  };
}

