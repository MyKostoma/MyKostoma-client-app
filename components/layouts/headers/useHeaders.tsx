"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/store/slices/authSlice";
import { clearAuthCookies } from "@/lib/cookies";
import { baseApi } from "@/store/api/baseApi";
import {
  selectGlobalSearchQuery,
  selectNotifications,
  selectUnreadMessagesCount,
  setGlobalSearchQuery,
  setTheme,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearNotifications,
  resetMockNotifications,
} from "@/store/slices/uiSlice";
import { RoleDisplayNames } from "@/types/user";

export interface UseHeadersOptions {
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void | Promise<void>;
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
  notificationCount?: number;
  hasUnreadMessages?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onSearchSubmit?: (val: string) => void;
  onNotificationsClick?: () => void;
  onMessagesClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

export function useHeaders(options: UseHeadersOptions = {}) {
  const {
    isAuthenticated: isAuthenticatedProp,
    onLogin,
    onRegister,
    onLogout,
    userName,
    userRole,
    avatarUrl,
    notificationCount,
    hasUnreadMessages,
    searchValue,
    onSearchChange,
    onSearchSubmit,
    onNotificationsClick,
    onMessagesClick,
    onSettingsClick,
    onProfileClick,
  } = options;

  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeIsAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const notifications = useAppSelector(selectNotifications);
  const storeUnreadMessagesCount = useAppSelector(selectUnreadMessagesCount);
  const storeSearchQuery = useAppSelector(selectGlobalSearchQuery);

  const [hasAuthCookie, setHasAuthCookie] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileUserDropdownOpen, setMobileUserDropdownOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);

    const hasToken = document.cookie
      .split(";")
      .some(
        (c) =>
          c.trim().startsWith("access_token=") &&
          c.trim().split("=")[1]?.length > 0 &&
          c.trim().split("=")[1] !== "null" &&
          c.trim().split("=")[1] !== "undefined"
      );
    setHasAuthCookie(hasToken);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
          setIsDark(true);
        } else {
          document.documentElement.classList.remove("dark");
          setIsDark(false);
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    try {
      const seeded = sessionStorage.getItem("mykostoma_mock_notifs_seeded_v1");
      if (!seeded && notifications.length === 0) {
        dispatch(resetMockNotifications());
        sessionStorage.setItem("mykostoma_mock_notifs_seeded_v1", "true");
      }
    } catch {}
  }, [dispatch, notifications.length]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(e.target as Node)
      ) {
        setDesktopDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isUserLoggedIn =
    isAuthenticatedProp !== undefined
      ? isAuthenticatedProp
      : mounted &&
        (Boolean(storeIsAuthenticated) ||
          Boolean(currentUser) ||
          hasAuthCookie);

  const handleLogout = useCallback(async () => {
    try {
      if (onLogout) {
        await onLogout();
      } else {
        router.push("/login");
      }
    } finally {
      dispatch(logout());
      clearAuthCookies();
      dispatch(baseApi.util.resetApiState());
      setHasAuthCookie(false);
      setMobileMenuOpen(false);
      setDesktopDropdownOpen(false);
      setMobileUserDropdownOpen(false);
    }
  }, [dispatch, onLogout, router]);

  const handleLogin = useCallback(() => {
    setMobileMenuOpen(false);
    if (onLogin) {
      onLogin();
    } else {
      router.push("/login");
    }
  }, [onLogin, router]);

  const handleRegister = useCallback(() => {
    setMobileMenuOpen(false);
    if (onRegister) {
      onRegister();
    } else {
      router.push("/register");
    }
  }, [onRegister, router]);

  const toggleTheme = useCallback(() => {
    setIsDark((prevDark) => {
      const nextDark = !prevDark;
      const nextTheme = nextDark ? "dark" : "light";
      dispatch(setTheme(nextTheme));
      if (nextDark) {
        document.documentElement.classList.add("dark");
        try {
          localStorage.setItem("theme", "dark");
        } catch {}
      } else {
        document.documentElement.classList.remove("dark");
        try {
          localStorage.setItem("theme", "light");
        } catch {}
      }
      return nextDark;
    });
  }, [dispatch]);

  const [internalSearch, setInternalSearch] = useState(
    searchValue ?? storeSearchQuery ?? ""
  );

  useEffect(() => {
    if (searchValue !== undefined) {
      setInternalSearch(searchValue);
    } else {
      setInternalSearch(storeSearchQuery ?? "");
    }
  }, [searchValue, storeSearchQuery]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInternalSearch(val);
      dispatch(setGlobalSearchQuery(val));
      onSearchChange?.(val);
    },
    [dispatch, onSearchChange]
  );

  const handleSearchSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      const currentVal =
        searchValue !== undefined ? searchValue : internalSearch;
      const query = currentVal.trim();
      dispatch(setGlobalSearchQuery(query));
      setMobileMenuOpen(false);
      if (onSearchSubmit) {
        onSearchSubmit(query);
      } else {
        if (query) {
          router.push(`/search?q=${encodeURIComponent(query)}`);
        } else {
          router.push("/search");
        }
      }
    },
    [internalSearch, onSearchSubmit, router, searchValue, dispatch]
  );

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const resolvedNotificationCount =
    notificationCount ?? unreadNotificationsCount;
  const resolvedHasUnreadMessages =
    hasUnreadMessages ?? storeUnreadMessagesCount > 0;

  const resolvedUserName = userName ?? currentUser?.fullName ?? "Alex Morgan";
  const resolvedUserRole =
    userRole ??
    (currentUser?.role
      ? RoleDisplayNames[currentUser.role].toUpperCase()
      : "PREMIUM CONSUMER");
  const resolvedAvatarUrl =
    avatarUrl ??
    currentUser?.avatarUrl ??
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  const handleBellClick = useCallback(() => {
    setNotificationModalOpen((prev) => !prev);
    onNotificationsClick?.();
  }, [onNotificationsClick]);

  const handleDashboardNavigate = useCallback(() => {
    setDesktopDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/dashboard");
  }, [router]);

  const handleProfileNavigate = useCallback(() => {
    setDesktopDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onProfileClick) {
      onProfileClick();
    } else {
      router.push("/profile");
    }
  }, [onProfileClick, router]);

  const handleMessagesNavigate = useCallback(() => {
    setMobileMenuOpen(false);
    if (onMessagesClick) {
      onMessagesClick();
    } else {
      router.push("/messages");
    }
  }, [onMessagesClick, router]);

  const handleSettingsNavigate = useCallback(() => {
    setMobileMenuOpen(false);
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      router.push("/settings");
    }
  }, [onSettingsClick, router]);

  const markAsRead = useCallback(
    (id: string) => dispatch(markNotificationAsRead(id)),
    [dispatch]
  );
  const markAllAsRead = useCallback(
    () => dispatch(markAllNotificationsAsRead()),
    [dispatch]
  );
  const removeNotif = useCallback(
    (id: string) => dispatch(removeNotification(id)),
    [dispatch]
  );
  const clearAllNotifs = useCallback(
    () => dispatch(clearNotifications()),
    [dispatch]
  );
  const restoreMock = useCallback(
    () => dispatch(resetMockNotifications()),
    [dispatch]
  );

  return {
    router,
    dispatch,
    currentUser,
    storeIsAuthenticated,
    isUserLoggedIn,
    hasAuthCookie,
    handleLogout,
    handleLogin,
    handleRegister,
    isDark,
    mounted,
    toggleTheme,
    internalSearch,
    setInternalSearch,
    handleSearch,
    handleSearchSubmit,
    notifications,
    unreadNotificationsCount,
    resolvedNotificationCount,
    resolvedHasUnreadMessages,
    notificationModalOpen,
    setNotificationModalOpen,
    handleBellClick,
    markAsRead,
    markAllAsRead,
    removeNotif,
    clearAllNotifs,
    restoreMock,
    resolvedUserName,
    resolvedUserRole,
    resolvedAvatarUrl,
    handleDashboardNavigate,
    handleProfileNavigate,
    handleMessagesNavigate,
    handleSettingsNavigate,
    mobileMenuOpen,
    setMobileMenuOpen,
    desktopDropdownOpen,
    setDesktopDropdownOpen,
    mobileUserDropdownOpen,
    setMobileUserDropdownOpen,
    desktopDropdownRef,
  };
}

export default useHeaders;

