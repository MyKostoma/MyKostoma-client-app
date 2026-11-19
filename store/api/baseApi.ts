import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import type { RootState } from "../index";
import { clearAuthCookies, setAuthCookies } from "@/lib/cookies";
import type { UserRole } from "@/types/user";

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

const mutex = new Mutex();

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isAuthErrorStatus(status: FetchBaseQueryError["status"]): boolean {
  return status === 401 || status === 403;
}

function shouldAttemptRefresh(
  result: { error?: FetchBaseQueryError },
  state: RootState
): boolean {
  if (!result.error || !state.auth.isAuthenticated) return false;
  return isAuthErrorStatus(result.error.status);
}

function parseRefreshPayload(data: unknown): RefreshResponse | null {
  if (!isObject(data)) return null;
  if (
    typeof data.access_token === "string" &&
    typeof data.refresh_token === "string"
  ) {
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
  }
  if (
    typeof data.accessToken === "string" &&
    typeof data.refreshToken === "string"
  ) {
    return {
      access_token: data.accessToken,
      refresh_token: data.refreshToken,
    };
  }
  return null;
}

const resolveApiUrl = () => {
  if (process.env.NEXT_PUBLIC_ENV === "test") {
    return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";
  }

  if (process.env.NODE_ENV === "production") {
    return (
      process.env.NEXT_PUBLIC_PRODUCTION_API ??
      process.env.NEXT_PUBLIC_API_BASE_URL ??
      "http://localhost:3000/api"
    );
  }

  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";
};

const baseQuery = fetchBaseQuery({
  baseUrl: resolveApiUrl(),
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.tokens?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "omit",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  const state = api.getState() as RootState;

  if (shouldAttemptRefresh(result, state)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const currentState = api.getState() as RootState;
        const refreshToken = currentState.auth.tokens?.refreshToken;
        const role: UserRole | undefined =
          currentState.auth.user?.role ?? currentState.auth.user?.roles?.at(-1);

        if (refreshToken) {
          const refreshResult = await baseQuery(
            {
              url: "/auth/refresh",
              method: "POST",
              body: { refreshToken },
            },
            api,
            extraOptions
          );

          const refreshedTokens = refreshResult.data
            ? parseRefreshPayload(refreshResult.data)
            : null;

          if (refreshedTokens) {
            api.dispatch({
              type: "auth/updateTokens",
              payload: {
                refreshToken: refreshedTokens.refresh_token,
                accessToken: refreshedTokens.access_token,
              },
            });
            if (role) {
              setAuthCookies(
                refreshedTokens.access_token,
                refreshedTokens.refresh_token,
                role
              );
            }

            result = await baseQuery(args, api, extraOptions);
          } else if (
            refreshResult.error &&
            isAuthErrorStatus(refreshResult.error.status)
          ) {
            api.dispatch({ type: "auth/logout" });
            clearAuthCookies();
          }
        } else {
          api.dispatch({ type: "auth/logout" });
          clearAuthCookies();
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Auth",
    "Profile",
    "Discover",
    "Category",
    "Service",
    "Professional",
    "Booking",
    "Request",
    "Requests",
    "Quotation",
    "Quotations",
    "Order",
    "Orders",
    "Shop",
    "Reel",
    "SavedItem",
    "Earning",
    "Wallet",
    "Verification",
    "Message",
    "Notification",
  ],
  endpoints: () => ({}),
});
