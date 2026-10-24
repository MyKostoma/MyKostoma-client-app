/**
 * Mock auth handlers. Replace the bodies with real API calls once the
 * backend is wired up; the call signatures can stay the same.
 */

export type MockResult = { ok: true } | { ok: false; message: string };

const delay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

/** The code the verify screen treats as "incorrect" (mirrors the Figma error state). */
export const MOCK_INVALID_CODE = "529014";

export async function mockLogin(payload: {
  identifier: string;
  password: string;
}): Promise<MockResult> {
  console.log("[mock] login", payload.identifier);
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
  console.log("[mock] register", { ...payload, password: "***" });
  await delay();
  return { ok: true };
}

export async function mockVerifyCode(code: string): Promise<MockResult> {
  console.log("[mock] verify code", code);
  await delay();
  if (code === MOCK_INVALID_CODE) {
    return {
      ok: false,
      message: "The code you entered is incorrect or has expired. Please try again.",
    };
  }
  return { ok: true };
}

export async function mockResendCode(): Promise<MockResult> {
  console.log("[mock] resend code");
  await delay(400);
  return { ok: true };
}

export async function mockSendResetCode(identifier: string): Promise<MockResult> {
  console.log("[mock] send reset code", identifier);
  await delay();
  return { ok: true };
}

export async function mockResetPassword(password: string): Promise<MockResult> {
  console.log("[mock] reset password", password.length);
  await delay();
  return { ok: true };
}
