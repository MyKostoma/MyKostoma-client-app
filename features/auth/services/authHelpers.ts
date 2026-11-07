import type { User, UserRole } from "@/types/user";
import type { MockResult } from "@/features/auth/types";

export const delay = (ms = 700) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const MOCK_INVALID_CODE = "529014";

export const formatCountdownTime = (s: number) =>
  `00:${String(s).padStart(2, "0")}`;

export function inferRoleFromIdentifier(identifier: string): UserRole {
  return identifier.toLowerCase().includes("pro") ? "professional" : "consumer";
}

export function buildMockAuthenticatedUser(params: {
  id?: string;
  fullName?: string;
  identifier: string;
  role: UserRole;
  category?: string | null;
}): User {
  return {
    id: params.id ?? `usr_${Date.now()}`,
    fullName:
      params.fullName || params.identifier.split("@")[0] || "Alex Morgan",
    identifier: params.identifier,
    role: params.role,
    roles: [params.role],
    category: (params.category as User["category"]) ?? null,
    verified: true,
    active: true,
  };
}

export async function mockLogin(payload: {
  identifier: string;
  password: string;
}): Promise<MockResult> {
  void payload;
  await delay();
  return { ok: true };
}

export async function mockRegister(payload: {
  fullName: string;
  identifier: string;
  password: string;
  role: "consumer" | "professional";
  category?: string | null;
}): Promise<MockResult> {
  void payload;
  await delay();
  return { ok: true };
}

export async function mockVerifyCode(code: string): Promise<MockResult> {
  await delay();
  if (code === MOCK_INVALID_CODE) {
    return {
      ok: false,
      message:
        "The code you entered is incorrect or has expired. Please try again.",
    };
  }
  return { ok: true };
}

export async function mockResendCode(): Promise<MockResult> {
  await delay(400);
  return { ok: true };
}

export async function mockSendResetCode(
  identifier: string
): Promise<MockResult> {
  void identifier;
  await delay();
  return { ok: true };
}

export async function mockResetPassword(password: string): Promise<MockResult> {
  void password;
  await delay();
  return { ok: true };
}
