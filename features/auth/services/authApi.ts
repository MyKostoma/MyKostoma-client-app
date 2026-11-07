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
import { getRoleDestination } from "@/lib/role-utils";
import { baseApi } from "@/store/api/baseApi";
import {
  buildMockAuthenticatedUser,
  inferRoleFromIdentifier,
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

  const handleLogin = useCallback(
    async (payload: LoginRequest) => {
      setLoading(true);
      try {
        await loginMutation(payload).unwrap();
        const role = inferRoleFromIdentifier(payload.identifier);
        const redirectPath =
          getRedirectAfterLogin() ?? getDefaultDashboard(role);
        router.push(redirectPath);
        return { ok: true as const };
      } catch {
        const res = await mockLogin(payload);
        if (res.ok) {
          const inferredRole = inferRoleFromIdentifier(payload.identifier);
          const mockAccessToken = `mk_access_${Date.now()}`;
          const mockRefreshToken = `mk_refresh_${Date.now()}`;
          const user = buildMockAuthenticatedUser({
            identifier: payload.identifier,
            role: inferredRole,
          });

          dispatch(
            setCredentials({
              user,
              tokens: {
                accessToken: mockAccessToken,
                refreshToken: mockRefreshToken,
              },
            })
          );
          dispatch(setActivePerspective(inferredRole));
          setAuthCookies(mockAccessToken, mockRefreshToken, inferredRole);

          const redirectPath =
            getRedirectAfterLogin() ?? getDefaultDashboard(inferredRole);
          router.push(redirectPath);
        }
        return res;
      } finally {
        setLoading(false);
      }
    },
    [dispatch, loginMutation, router]
  );

  const handleRegister = useCallback(
    async (payload: RegisterDetails & { role: Role; category: string | null }) => {
      setLoading(true);
      try {
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
      } catch {
        const res = await mockRegister(payload);
        if (res.ok) {
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
        }
        return res;
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
      const detectedRole =
        pendingVerification?.role ?? currentUser?.role ?? "consumer";
      setLoading(true);
      try {
        await verifyAccountMutation({
          identifier:
            pendingVerification?.identifier ??
            currentUser?.identifier ??
            "user@mykostoma.com",
          code,
        }).unwrap();
        return { ok: true as const };
      } catch {
        const res = await mockVerifyCode(code);
        if (res.ok) {
          const mockAccessToken = `mk_access_${Date.now()}`;
          const mockRefreshToken = `mk_refresh_${Date.now()}`;
          const verifiedUser = buildMockAuthenticatedUser({
            id: currentUser?.id ? String(currentUser.id) : undefined,
            fullName:
              pendingVerification?.fullName ??
              currentUser?.fullName ??
              "MyKostoma User",
            identifier:
              pendingVerification?.identifier ??
              currentUser?.identifier ??
              "user@mykostoma.com",
            role: detectedRole,
            category:
              pendingVerification?.category ?? currentUser?.category ?? null,
          });
          dispatch(
            setCredentials({
              user: verifiedUser,
              tokens: {
                accessToken: mockAccessToken,
                refreshToken: mockRefreshToken,
              },
            })
          );
          dispatch(setActivePerspective(detectedRole));
          setAuthCookies(mockAccessToken, mockRefreshToken, detectedRole);
        }
        return res;
      } finally {
        setLoading(false);
      }
    },
    [currentUser, dispatch, pendingVerification, verifyAccountMutation]
  );

  const handleResendCode = useCallback(async () => {
    try {
      await resendCodeMutation({
        identifier:
          pendingVerification?.identifier ??
          currentUser?.identifier ??
          "user@mykostoma.com",
      }).unwrap();
      return { ok: true as const };
    } catch {
      return mockResendCode();
    }
  }, [currentUser, pendingVerification, resendCodeMutation]);

  const handleForgotPassword = useCallback(
    async (identifier: string) => {
      setLoading(true);
      try {
        await forgotPasswordMutation({ identifier }).unwrap();
        router.push("/reset-password");
        return { ok: true as const };
      } catch {
        const res = await mockSendResetCode(identifier);
        if (res.ok) {
          dispatch(
            setPendingVerification({
              identifier,
              role: "consumer",
              flow: "reset-password",
            })
          );
          router.push("/reset-password");
        }
        return res;
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
        await resetPasswordMutation({ password }).unwrap();
        router.push("/login");
        return { ok: true as const };
      } catch {
        const res = await mockResetPassword(password);
        if (res.ok) {
          dispatch(clearPendingVerification());
          router.push("/login");
        }
        return res;
      } finally {
        setLoading(false);
      }
    },
    [dispatch, resetPasswordMutation, router]
  );

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      dispatch(logout());
      clearAuthCookies();
      dispatch(baseApi.util.resetApiState());
    }
    router.push("/login");
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
