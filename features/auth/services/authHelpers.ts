import type { User, UserRole } from "@/types/user";
import type {
  AuthResponse,
  MockResult,
  PendingVerification,
  RegisterRequest,
} from "@/features/auth/types";

export const delay = (ms = 700) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const MOCK_INVALID_CODE = "529014";

export const formatCountdownTime = (s: number) =>
  `00:${String(s).padStart(2, "0")}`;

/**
 * Mock auth is enabled only when explicitly toggled on, or when no backend API
 * base URL is configured yet. Never used as a silent catch fallback.
 */
export function isMockAuthEnabled(): boolean {
  if (process.env.NODE_ENV === "production") return false;
  if (process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "true") return true;
  if (process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "false") return false;
  return (
    !process.env.NEXT_PUBLIC_API_BASE_URL &&
    !process.env.NEXT_PUBLIC_PRODUCTION_API
  );
}

export interface MockAccountRecord {
  user: User;
  password: string;
}

export const MOCK_ACCOUNTS: MockAccountRecord[] = [
  {
    password: "Password123!",
    user: {
      id: "usr_mock_consumer_1",
      fullName: "Alex Morgan",
      firstName: "Alex",
      lastName: "Morgan",
      email: "consumer@mykostoma.com",
      identifier: "consumer@mykostoma.com",
      role: "consumer",
      roles: ["consumer"],
      category: null,
      verified: true,
      active: true,
    },
  },
  {
    password: "Password123!",
    user: {
      id: "usr_mock_pro_1",
      fullName: "Jordan Taylor",
      firstName: "Jordan",
      lastName: "Taylor",
      email: "pro@mykostoma.com",
      identifier: "pro@mykostoma.com",
      role: "professional",
      roles: ["professional"],
      category: "plumbing",
      verified: true,
      active: true,
    },
  },
];

// In-memory store for users registered during a local mock session.
const registeredMockAccounts = new Map<string, MockAccountRecord>();

function findMockAccount(identifier: string): MockAccountRecord | undefined {
  const normalized = identifier.trim().toLowerCase();
  return (
    registeredMockAccounts.get(normalized) ??
    MOCK_ACCOUNTS.find(
      (account) =>
        account.user.identifier.toLowerCase() === normalized ||
        account.user.email?.toLowerCase() === normalized
    )
  );
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
      params.fullName || params.identifier.split("@")[0] || "MyKostoma User",
    identifier: params.identifier,
    role: params.role,
    roles: [params.role],
    category: (params.category as User["category"]) ?? null,
    verified: true,
    active: true,
  };
}

export function extractApiErrorMessage(err: unknown, fallback: string): string {
  if (typeof err === "object" && err !== null) {
    const record = err as Record<string, unknown>;
    if (typeof record.data === "object" && record.data !== null) {
      const data = record.data as Record<string, unknown>;
      if (typeof data.message === "string" && data.message.trim()) {
        return data.message;
      }
      if (typeof data.error === "string" && data.error.trim()) {
        return data.error;
      }
    }
    if (typeof record.message === "string" && record.message.trim()) {
      return record.message;
    }
  }
  return fallback;
}

export type MockAuthSuccess = { ok: true; response: AuthResponse };
export type MockLoginResult = MockAuthSuccess | { ok: false; message: string };

export async function mockLogin(payload: {
  identifier: string;
  password: string;
}): Promise<MockLoginResult> {
  await delay();
  const account = findMockAccount(payload.identifier);
  if (!account || account.password !== payload.password) {
    return {
      ok: false,
      message: "Invalid email/phone or password.",
    };
  }
  if (!account.user.verified) {
    return {
      ok: false,
      message: "Please verify your account before logging in.",
    };
  }

  return {
    ok: true,
    response: {
      data: account.user,
      access_token: `mk_access_${Date.now()}`,
      refresh_token: `mk_refresh_${Date.now()}`,
    },
  };
}

export async function mockRegister(
  payload: RegisterRequest
): Promise<MockResult> {
  await delay();
  const normalized = payload.identifier.trim().toLowerCase();
  if (findMockAccount(normalized)) {
    return {
      ok: false,
      message: "An account with this email or phone already exists.",
    };
  }

  registeredMockAccounts.set(normalized, {
    password: payload.password,
    user: {
      ...buildMockAuthenticatedUser({
        fullName: payload.fullName,
        identifier: payload.identifier.trim(),
        role: payload.role,
        category: payload.category ?? null,
      }),
      verified: false,
    },
  });

  return { ok: true };
}

export async function mockVerifyCode(
  code: string,
  pending?: PendingVerification | null
): Promise<MockLoginResult> {
  await delay();
  if (code === MOCK_INVALID_CODE || code.trim().length < 6) {
    return {
      ok: false,
      message:
        "The code you entered is incorrect or has expired. Please try again.",
    };
  }

  const normalized = pending?.identifier?.trim().toLowerCase();
  const existing = normalized ? registeredMockAccounts.get(normalized) : undefined;
  const user: User = existing
    ? { ...existing.user, verified: true }
    : buildMockAuthenticatedUser({
        fullName: pending?.fullName ?? "MyKostoma User",
        identifier: pending?.identifier ?? "consumer@mykostoma.com",
        role: pending?.role ?? "consumer",
        category: pending?.category ?? null,
      });

  if (existing && normalized) {
    registeredMockAccounts.set(normalized, { ...existing, user });
  }

  return {
    ok: true,
    response: {
      data: user,
      access_token: `mk_access_${Date.now()}`,
      refresh_token: `mk_refresh_${Date.now()}`,
    },
  };
}

export async function mockResendCode(): Promise<MockResult> {
  await delay(400);
  return { ok: true };
}

export async function mockSendResetCode(
  identifier: string
): Promise<MockResult> {
  await delay();
  if (!identifier.trim()) {
    return { ok: false, message: "Please enter your email or phone." };
  }
  return { ok: true };
}

export async function mockResetPassword(password: string): Promise<MockResult> {
  await delay();
  if (password.length < 8) {
    return {
      ok: false,
      message: "Password must be at least 8 characters long.",
    };
  }
  return { ok: true };
}
