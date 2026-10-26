import { baseApi, type RefreshResponse } from "@/store/api";
import {
  setCredentials,
  logout,
  updateTokens,
  setPendingVerification,
  clearPendingVerification,
} from "@/store/slices/authSlice";
import { setActivePerspective } from "@/store/slices/uiSlice";
import type { User, UserRole, ServiceCategoryId } from "@/types/user";
import { setAuthCookies, clearAuthCookies } from "@/lib/cookies";
import { normalizeRole } from "@/lib/role-utils";

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  identifier: string;
  password: string;
  role: UserRole;
  category?: ServiceCategoryId | null;
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

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const primaryRole =
            normalizeRole(data.data.role) ??
            normalizeRole(data.data.roles?.at(-1)) ??
            "consumer";
          const normalizedRoles =
            data.data.roles && data.data.roles.length > 0
              ? data.data.roles.map((r) => normalizeRole(r) ?? primaryRole)
              : [primaryRole];

          const normalizedUser: User = {
            ...data.data,
            role: primaryRole,
            roles: normalizedRoles,
          };

          dispatch(
            setCredentials({
              user: normalizedUser,
              tokens: {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
              },
            })
          );
          dispatch(setActivePerspective(primaryRole));
          setAuthCookies(data.access_token, data.refresh_token, primaryRole);
        } catch {
          // Handled by caller
        }
      },
    }),

    register: builder.mutation<{ message?: string; data?: User }, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            setPendingVerification({
              identifier: arg.identifier,
              role: arg.role,
              fullName: arg.fullName,
              category: arg.category ?? null,
              flow: "register",
            })
          );
          dispatch(setActivePerspective(arg.role));
        } catch {
          // Handled by caller
        }
      },
    }),

    verifyAccount: builder.mutation<Partial<AuthResponse>, VerifyAccountRequest>({
      query: (body) => ({
        url: "/auth/verify",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.data && data.access_token && data.refresh_token) {
            const primaryRole =
              normalizeRole(data.data.role) ??
              normalizeRole(data.data.roles?.at(-1)) ??
              "consumer";
            const normalizedUser: User = {
              ...data.data,
              role: primaryRole,
              roles: [primaryRole],
              verified: true,
            };
            dispatch(
              setCredentials({
                user: normalizedUser,
                tokens: {
                  accessToken: data.access_token,
                  refreshToken: data.refresh_token,
                },
              })
            );
            dispatch(setActivePerspective(primaryRole));
            setAuthCookies(data.access_token, data.refresh_token, primaryRole);
          } else {
            dispatch(clearPendingVerification());
          }
        } catch {
          // Handled by caller
        }
      },
    }),

    resendVerificationCode: builder.mutation<void, ResendCodeRequest>({
      query: (body) => ({
        url: "/auth/resend-code",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            setPendingVerification({
              identifier: arg.identifier,
              role: "consumer",
              flow: "reset-password",
            })
          );
        } catch {
          // Handled by caller
        }
      },
    }),

    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearPendingVerification());
        } catch {
          // Handled by caller
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout());
          clearAuthCookies();
          dispatch(baseApi.util.resetApiState());
        }
      },
    }),

    getMe: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),

    refreshToken: builder.mutation<RefreshResponse, { refreshToken: string }>({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            updateTokens({
              refreshToken: data.refresh_token,
              accessToken: data.access_token,
            })
          );
        } catch {
          dispatch(logout());
          clearAuthCookies();
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyAccountMutation,
  useResendVerificationCodeMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetMeQuery,
  useRefreshTokenMutation,
} = authApi;

