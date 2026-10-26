export type UserRole = "consumer" | "professional";

export type ServiceCategoryId =
  | "plumbing"
  | "electrical"
  | "cleaning"
  | "beauty-wellness"
  | "beauty-spa"
  | "tutoring"
  | "event-planning"
  | "mechanic"
  | "it-support"
  | "painting"
  | string;

export interface User {
  id: string | number;
  fullName: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  identifier: string;
  role: UserRole;
  roles: UserRole[];
  category?: ServiceCategoryId | null;
  avatarUrl?: string;
  verified: boolean;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
}

export interface CreateUserInput {
  fullName: string;
  identifier: string;
  password: string;
  role: UserRole;
  category?: ServiceCategoryId | null;
}

export interface UpdateUserInput {
  id: string | number;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  category?: ServiceCategoryId | null;
  avatarUrl?: string;
}

export const RoleDisplayNames: Record<UserRole, string> = {
  consumer: "Consumer",
  professional: "Professional",
};

export const RoleCategories = {
  CONSUMER: ["consumer"],
  PROFESSIONAL: ["professional"],
} as const;

