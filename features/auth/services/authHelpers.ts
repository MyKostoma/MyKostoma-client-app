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

const MOCK_ACCOUNTS_STORAGE_KEY = "mk_mock_registered_accounts";

/**
 * Mock auth is enabled by default for preview/testing unless explicitly
 * disabled via NEXT_PUBLIC_USE_MOCK_AUTH="false".
 */
export function isMockAuthEnabled(): boolean {
  if (process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "false") return false;
  return true;
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

// Fallback in-memory store for SSR or restricted storage environments.
const registeredMockAccounts = new Map<string, MockAccountRecord>();

function readStoredMockAccounts(): Record<string, MockAccountRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(MOCK_ACCOUNTS_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null
      ? (parsed as Record<string, MockAccountRecord>)
      : {};
  } catch {
    return {};
  }
}

function writeStoredMockAccount(
  normalizedIdentifier: string,
  record: MockAccountRecord
): void {
  registeredMockAccounts.set(normalizedIdentifier, record);
  if (typeof window === "undefined") return;
  try {
    const current = readStoredMockAccounts();
    current[normalizedIdentifier] = record;
    window.localStorage.setItem(
      MOCK_ACCOUNTS_STORAGE_KEY,
      JSON.stringify(current)
    );
  } catch {
    // Ignore storage quota or privacy mode errors; in-memory map still holds it
  }
}

function findMockAccount(identifier: string): MockAccountRecord | undefined {
  const normalized = identifier.trim().toLowerCase();
  const stored = readStoredMockAccounts()[normalized];
  if (stored) {
    registeredMockAccounts.set(normalized, stored);
    return stored;
  }

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

  writeStoredMockAccount(normalized, {
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
  if (code.trim().length < 6) {
    return {
      ok: false,
      message:
        "The code you entered is incorrect or has expired. Please try again.",
    };
  }

  const normalized = pending?.identifier?.trim().toLowerCase();
  const existing = normalized ? findMockAccount(normalized) : undefined;
  const user: User = existing
    ? { ...existing.user, verified: true }
    : buildMockAuthenticatedUser({
        fullName: pending?.fullName ?? "MyKostoma User",
        identifier: pending?.identifier ?? "consumer@mykostoma.com",
        role: pending?.role ?? "consumer",
        category: pending?.category ?? null,
      });

  if (existing && normalized) {
    writeStoredMockAccount(normalized, { ...existing, user });
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

export async function mockResetPassword(
  password: string,
  identifier?: string
): Promise<MockResult> {
  await delay();
  if (password.length < 8) {
    return {
      ok: false,
      message: "Password must be at least 8 characters long.",
    };
  }
  if (identifier) {
    const normalized = identifier.trim().toLowerCase();
    const existing = findMockAccount(normalized);
    if (existing) {
      writeStoredMockAccount(normalized, {
        ...existing,
        password,
        user: { ...existing.user, verified: true },
      });
    }
  }
  return { ok: true };
}
