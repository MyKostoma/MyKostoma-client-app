import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { User, UserRole, ServiceCategoryId } from "@/types/user";
import { normalizeRole } from "@/lib/role-utils";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface PendingVerification {
  identifier: string;
  role: UserRole;
  fullName?: string;
  category?: ServiceCategoryId | null;
  flow: "register" | "reset-password";
}

export interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  pendingVerification: PendingVerification | null;
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  pendingVerification: null,
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
  setError,
  clearError,
  logout,
} = authSlice.actions;

// Selectors
export const selectRawUser = (state: { auth: AuthState }) => state.auth.user;

export const selectCurrentUser = createSelector([selectRawUser], (user) => {
  if (!user) return null;
  const primaryRole = normalizeRole(user.role) ?? "consumer";
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

export default authSlice.reducer;

