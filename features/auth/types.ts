import type { User, UserRole, ServiceCategoryId } from "@/types/user";

export type Role = "consumer" | "professional";

export type RegisterStep = "role" | "details" | "category";

export interface RegisterDetails {
  fullName: string;
  identifier: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface PendingVerification {
  identifier: string;
  role: UserRole;
  fullName?: string;
  category?: ServiceCategoryId | string | null;
  flow: "register" | "reset-password";
}

export interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  pendingVerification: PendingVerification | null;
  registrationRole: UserRole | null;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  identifier: string;
  password: string;
  role: UserRole;
  category?: ServiceCategoryId | string | null;
}

export interface VerifyAccountRequest {
  identifier: string;
  code: string;
}

export interface ResendCodeRequest {
  identifier: string;
}

export interface ForgotPasswordRequest {
  identifier: string;
}

export interface ResetPasswordRequest {
  identifier?: string;
  code?: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  data: User;
  access_token: string;
  refresh_token: string;
}

export type MockResult = { ok: true } | { ok: false; message: string };
