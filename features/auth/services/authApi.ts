"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  authEndpoints,
  clearPendingVerification,
  clearRegistrationRole,
  logout,
  selectCurrentUser,
  selectPendingVerification,
  selectRegistrationRole,
  setCredentials,
  setPendingVerification,
  setRegistrationRole,
  useForgotPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResendVerificationCodeMutation,
  useResetPasswordMutation,
  useVerifyAccountMutation,
  useGetMeQuery,
  useRefreshTokenMutation,
} from "@/store/slices/authSlice";
import { setActivePerspective } from "@/store/slices/uiSlice";
import {
  clearAuthCookies,
  getRedirectAfterLogin,
  setAuthCookies,
} from "@/lib/cookies";
import { getDefaultDashboard } from "@/lib/default-dashboard";
import { getRoleDestination, normalizeRole } from "@/lib/role-utils";
import { baseApi } from "@/store/api/baseApi";
import {
  extractApiErrorMessage,
  isMockAuthEnabled,
  mockLogin,
  mockRegister,
  mockResendCode,
  mockResetPassword,
  mockSendResetCode,
  mockVerifyCode,
} from "./authHelpers";
import type {
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterDetails,
  RegisterRequest,
  ResendCodeRequest,
  ResetPasswordRequest,
  Role,
  VerifyAccountRequest,
} from "../types";

export const authApi = authEndpoints;

export {
  useLoginMutation,
  useRegisterMutation,
  useVerifyAccountMutation,
  useResendVerificationCodeMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetMeQuery,
  useRefreshTokenMutation,
};

export type {
  LoginRequest,
  RegisterRequest,
  VerifyAccountRequest,
  ResendCodeRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthResponse,
};

export function useAuthService() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const pendingVerification = useAppSelector(selectPendingVerification);
  const storedRegistrationRole = useAppSelector(selectRegistrationRole);

  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [verifyAccountMutation] = useVerifyAccountMutation();
  const [resendCodeMutation] = useResendVerificationCodeMutation();
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  const [resetPasswordMutation] = useResetPasswordMutation();
  const [logoutMutation] = useLogoutMutation();

  const [loading, setLoading] = useState(false);

  const applyAuthenticatedSession = useCallback(
    (authResponse: AuthResponse) => {
      const role =
        normalizeRole(authResponse.data.role) ??
        normalizeRole(authResponse.data.roles?.at(-1));
      if (!role) return null;

      dispatch(
        setCredentials({
          user: {
            ...authResponse.data,
            role,
            roles: [role],
          },
          tokens: {
            accessToken: authResponse.access_token,
            refreshToken: authResponse.refresh_token,
          },
        })
      );
      dispatch(setActivePerspective(role));
      setAuthCookies(
        authResponse.access_token,
        authResponse.refresh_token,
        role
      );
      return role;
    },
    [dispatch]
  );

  const handleLogin = useCallback(
    async (payload: LoginRequest) => {
      setLoading(true);
      try {
        if (isMockAuthEnabled()) {
          const res = await mockLogin(payload);
          if (!res.ok) return res;

          const role = applyAuthenticatedSession(res.response);
          if (!role) {
            return {
              ok: false as const,
              message: "Account role could not be determined.",
            };
          }

          const redirectPath =
            getRedirectAfterLogin() ?? getDefaultDashboard(role);
          router.push(redirectPath);
          return { ok: true as const };
        }

        const response = await loginMutation(payload).unwrap();
        const role =
          normalizeRole(response.data.role) ??
          normalizeRole(response.data.roles?.at(-1));
        if (!role) {
          return {
            ok: false as const,
            message:
              "Your account role could not be verified. Please contact support.",
          };
        }

        const redirectPath =
          getRedirectAfterLogin() ?? getDefaultDashboard(role);
        router.push(redirectPath);
        return { ok: true as const };
      } catch (err) {
        return {
          ok: false as const,
          message: extractApiErrorMessage(
            err,
            "Unable to log in. Please check your credentials."
          ),
        };
      } finally {
        setLoading(false);
      }
    },
    [applyAuthenticatedSession, loginMutation, router]
  );

  const handleRegister = useCallback(
    async (
      payload: RegisterDetails & { role: Role; category: string | null }
    ) => {
      setLoading(true);
      try {
        if (isMockAuthEnabled()) {
          const res = await mockRegister(payload);
          if (!res.ok) return res;

          dispatch(
            setPendingVerification({
              identifier: payload.identifier,
              role: payload.role,
              fullName: payload.fullName,
              category: payload.category,
              flow: "register",
            })
          );
          dispatch(clearRegistrationRole());
          dispatch(setActivePerspective(payload.role));
          router.push("/verify-account");
          return { ok: true as const };
        }

        await registerMutation({
          fullName: payload.fullName,
          identifier: payload.identifier,
          password: payload.password,
          role: payload.role,
          category: payload.category,
        }).unwrap();
        dispatch(clearRegistrationRole());
        router.push("/verify-account");
        return { ok: true as const };
      } catch (err) {
        return {
          ok: false as const,
          message: extractApiErrorMessage(
            err,
            "Registration failed. Please try again."
          ),
        };
      } finally {
        setLoading(false);
      }
    },
    [dispatch, registerMutation, router]
  );

  const handleSelectRegistrationRole = useCallback(
    (nextRole: Role) => {
      dispatch(setRegistrationRole(nextRole));
      dispatch(setActivePerspective(nextRole));
    },
    [dispatch]
  );

  const handleClearRegistrationRole = useCallback(() => {
    dispatch(clearRegistrationRole());
  }, [dispatch]);

  const handleVerifyCode = useCallback(
    async (code: string) => {
      const identifier =
        pendingVerification?.identifier ?? currentUser?.identifier;
      if (!identifier) {
        return {
          ok: false as const,
          message:
            "Verification session expired. Please register or log in again.",
        };
      }

      setLoading(true);
      try {
        if (isMockAuthEnabled()) {
          const res = await mockVerifyCode(code, pendingVerification);
          if (!res.ok) return res;

          const role = applyAuthenticatedSession(res.response);
          if (!role) {
            return {
              ok: false as const,
              message: "Account role could not be determined.",
            };
          }
          return { ok: true as const };
        }

        await verifyAccountMutation({ identifier, code }).unwrap();
        return { ok: true as const };
      } catch (err) {
        return {
          ok: false as const,
          message: extractApiErrorMessage(
            err,
            "The code you entered is incorrect or has expired. Please try again."
          ),
        };
      } finally {
        setLoading(false);
      }
    },
    [
      applyAuthenticatedSession,
      currentUser?.identifier,
      pendingVerification,
      verifyAccountMutation,
    ]
  );

  const handleResendCode = useCallback(async () => {
    const identifier =
      pendingVerification?.identifier ?? currentUser?.identifier;
    if (!identifier) {
      return {
        ok: false as const,
        message: "Verification session expired. Please try again.",
      };
    }

    try {
      if (isMockAuthEnabled()) {
        return mockResendCode();
      }
      await resendCodeMutation({ identifier }).unwrap();
      return { ok: true as const };
    } catch (err) {
      return {
        ok: false as const,
        message: extractApiErrorMessage(
          err,
          "Could not resend verification code."
        ),
      };
    }
  }, [currentUser?.identifier, pendingVerification?.identifier, resendCodeMutation]);

  const handleForgotPassword = useCallback(
    async (identifier: string) => {
      setLoading(true);
      try {
        if (isMockAuthEnabled()) {
          const res = await mockSendResetCode(identifier);
          if (!res.ok) return res;

          dispatch(
            setPendingVerification({
              identifier,
              flow: "reset-password",
            })
          );
          router.push("/reset-password");
          return { ok: true as const };
        }

        await forgotPasswordMutation({ identifier }).unwrap();
        router.push("/reset-password");
        return { ok: true as const };
      } catch (err) {
        return {
          ok: false as const,
          message: extractApiErrorMessage(
            err,
            "Unable to send reset code. Please try again."
          ),
        };
      } finally {
        setLoading(false);
      }
    },
    [dispatch, forgotPasswordMutation, router]
  );

  const handleResetPassword = useCallback(
    async (password: string) => {
      setLoading(true);
      try {
        if (isMockAuthEnabled()) {
          const res = await mockResetPassword(
            password,
            pendingVerification?.identifier
          );
          if (!res.ok) return res;

          dispatch(clearPendingVerification());
          router.push("/login");
          return { ok: true as const };
        }

        await resetPasswordMutation({ password }).unwrap();
        router.push("/login");
        return { ok: true as const };
      } catch (err) {
        return {
          ok: false as const,
          message: extractApiErrorMessage(
            err,
            "Unable to reset password. Please try again."
          ),
        };
      } finally {
        setLoading(false);
      }
    },
    [dispatch, pendingVerification?.identifier, resetPasswordMutation, router]
  );

  const handleLogout = useCallback(async () => {
    try {
      if (!isMockAuthEnabled()) {
        await logoutMutation().unwrap();
      }
    } catch {
      // Always clear local session even if the server logout request fails
    } finally {
      dispatch(logout());
      clearAuthCookies();
      dispatch(baseApi.util.resetApiState());
      router.push("/login");
    }
  }, [dispatch, logoutMutation, router]);

  const detectedRole =
    pendingVerification?.role ?? currentUser?.role ?? "consumer";
  const destinationMeta = getRoleDestination(detectedRole);

  return {
    loading,
    currentUser,
    pendingVerification,
    storedRegistrationRole,
    detectedRole,
    destinationMeta,
    handleLogin,
    handleRegister,
    handleSelectRegistrationRole,
    handleClearRegistrationRole,
    handleVerifyCode,
    handleResendCode,
    handleForgotPassword,
    handleResetPassword,
    handleLogout,
  };
}
