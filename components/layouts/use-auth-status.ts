"use client";

import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "@/store/hooks";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/store/slices/authSlice";
import { hasAuthTokenCookie } from "@/lib/cookies";

/**
 * Resolves the client authentication state from Redux and auth cookies
 * in a hydration-safe way (returns `false` until mounted unless overridden).
 */
export function useAuthStatus(isAuthenticatedOverride?: boolean) {
  const storeIsAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);

  const [mounted, setMounted] = useState(false);
  const [hasAuthCookie, setHasAuthCookie] = useState(false);

  const refreshAuthCookie = useCallback(() => {
    setHasAuthCookie(hasAuthTokenCookie());
  }, []);

  useEffect(() => {
    setMounted(true);
    refreshAuthCookie();
  }, [refreshAuthCookie, storeIsAuthenticated, currentUser]);

  const isAuthenticated =
    isAuthenticatedOverride !== undefined
      ? isAuthenticatedOverride
      : mounted &&
        (Boolean(storeIsAuthenticated) ||
          Boolean(currentUser) ||
          hasAuthCookie);

  return {
    mounted,
    hasAuthCookie,
    setHasAuthCookie,
    storeIsAuthenticated,
    currentUser,
    isAuthenticated,
  };
}
