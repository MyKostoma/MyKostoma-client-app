import {
  createSlice,
  type PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import type { User, UserRole } from "@/types/user";
import { normalizeRole } from "@/lib/role-utils";
import { setAuthCookies, clearAuthCookies } from "@/lib/cookies";
import { setActivePerspective } from "./uiSlice";
import { baseApi, type RefreshResponse } from "../api/baseApi";
import type {
  AuthResponse,
  AuthState,
  ForgotPasswordRequest,
  LoginRequest,
  PendingVerification,
  RegisterRequest,
  ResendCodeRequest,
  ResetPasswordRequest,
  Tokens,
  VerifyAccountRequest,
} from "@/features/auth/types";

export type { Tokens, PendingVerification, AuthState };

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  pendingVerification: null,
  registrationRole: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setCredentials: (
      state,
      action: PayloadAction<{ user: User; tokens: Tokens }>
    ) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      state.pendingVerification = null;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    updateTokens: (state, action: PayloadAction<Tokens>) => {
      state.tokens = action.payload;
    },

    setPendingVerification: (
      state,
      action: PayloadAction<PendingVerification | null>
    ) => {
      state.pendingVerification = action.payload;
    },

    clearPendingVerification: (state) => {
      state.pendingVerification = null;
    },

    setRegistrationRole: (state, action: PayloadAction<UserRole | null>) => {
      state.registrationRole = action.payload;
    },

    clearRegistrationRole: (state) => {
      state.registrationRole = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      state.pendingVerification = null;
      state.registrationRole = null;
    },
  },
});

export const {
  setLoading,
  setCredentials,
  updateUser,
  updateTokens,
  setPendingVerification,
  clearPendingVerification,
  setRegistrationRole,
  clearRegistrationRole,
  setError,
  clearError,
  logout,
} = authSlice.actions;

function resolveNormalizedUser(user: User): User | null {
  const primaryRole =
    normalizeRole(user.role) ?? normalizeRole(user.roles?.at(-1));
  if (!primaryRole) return null;

  const normalizedRoles =
    user.roles && user.roles.length > 0
      ? user.roles.map((r) => normalizeRole(r) ?? primaryRole)
      : [primaryRole];

  return {
    ...user,
    role: primaryRole,
    roles: normalizedRoles,
  };
}

export const authEndpoints = baseApi.injectEndpoints({
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
          const normalizedUser = resolveNormalizedUser(data.data);
          if (!normalizedUser) return;

          dispatch(
            setCredentials({
              user: normalizedUser,
              tokens: {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
              },
            })
          );
          dispatch(setActivePerspective(normalizedUser.role));
          setAuthCookies(
            data.access_token,
            data.refresh_token,
            normalizedUser.role
          );
        } catch {
          // Handled by caller
        }
      },
    }),

    register: builder.mutation<
      { message?: string; data?: User },
      RegisterRequest
    >({
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

    verifyAccount: builder.mutation<
      Partial<AuthResponse>,
      VerifyAccountRequest
    >({
      query: (body) => ({
        url: "/auth/verify",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.data && data.access_token && data.refresh_token) {
            const normalizedUser = resolveNormalizedUser({
              ...data.data,
              verified: true,
            });
            if (!normalizedUser) return;

            dispatch(
              setCredentials({
                user: normalizedUser,
                tokens: {
                  accessToken: data.access_token,
                  refreshToken: data.refresh_token,
                },
              })
            );
            dispatch(setActivePerspective(normalizedUser.role));
            setAuthCookies(
              data.access_token,
              data.refresh_token,
              normalizedUser.role
            );
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
  overrideExisting: false,
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
} = authEndpoints;

export const selectRawUser = (state: { auth: AuthState }) => state.auth.user;

export const selectCurrentUser = createSelector([selectRawUser], (user) => {
  if (!user) return null;
  const primaryRole = normalizeRole(user.role) ?? user.role;
  const normalizedRoles =
    user.roles && user.roles.length > 0
      ? user.roles.map((r) => normalizeRole(r) ?? primaryRole)
      : [primaryRole];

  return {
    ...user,
    role: primaryRole,
    roles: normalizedRoles,
  };
});

export const selectUserRole = createSelector(
  [selectCurrentUser],
  (user): UserRole | null => user?.role ?? null
);

export const selectTokens = (state: { auth: AuthState }) => state.auth.tokens;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectIsLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectPendingVerification = (state: { auth: AuthState }) =>
  state.auth.pendingVerification;
export const selectRegistrationRole = (state: { auth: AuthState }) =>
  state.auth.registrationRole;

export default authSlice.reducer;
