"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MessageSquare,
  Bell,
  Settings,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  LayoutDashboard,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import NotificationModal from "@/components/modals/notification-modal";

export interface LandingNavbarProps extends React.HTMLAttributes<HTMLElement> {
  logoHref?: string;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
}

export function LandingNavbar({
  logoHref = "/",
  onLogin,
  onRegister,
  onLogout,
  isAuthenticated: isAuthenticatedProp,
  className,
  ...props
}: LandingNavbarProps) {
  const dispatch = useAppDispatch();
  const storeIsAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const [hasAuthCookie, setHasAuthCookie] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const isUserLoggedIn =
    isAuthenticatedProp !== undefined
      ? isAuthenticatedProp
      : mounted &&
        (Boolean(storeIsAuthenticated) ||
          Boolean(currentUser) ||
          hasAuthCookie);

  const handleLogout = async () => {
    try {
      if (onLogout) {
        await onLogout();
      }
    } finally {
      dispatch(logout());
      clearAuthCookies();
      dispatch(baseApi.util.resetApiState());
      setHasAuthCookie(false);
      setMobileMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
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
  };

  return (
    <header
      className={cn(
        "w-full bg-card/90 backdrop-blur-md sticky top-0 z-50 transition-colors",
        className
      )}
      {...props}
    >
      <div className="container px-3 sm:px-4 lg:px-6 xl:px-0 py-4 sm:py-5 flex items-center justify-between">
        <Link
          href={logoHref}
          className="inline-flex items-center transition-opacity hover:opacity-90"
          aria-label="MyKostoma Home"
        >
          <img
            src="/mykostoma_full_logo.png"
            alt="MyKostoma"
            className="h-7 sm:h-8 w-auto object-contain dark:hidden select-none"
          />
          <img
            src="/mykostoma_full_logo_white.png"
            alt="MyKostoma"
            className="h-7 sm:h-8 w-auto object-contain hidden dark:block select-none"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme toggle stays visible on both mobile and desktop */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            aria-label={
              mounted && isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            leadingIcon={
              mounted && isDark ? (
                <Sun className="size-4 text-warning" />
              ) : (
                <Moon className="size-4 text-foreground" />
              )
            }
            className="transition-colors border-0 bg-transparent shadow-none"
          />

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isUserLoggedIn ? (
              <Button
                variant="default"
                size="sm"
                onClick={handleLogout}
                className="h-8 px-4 text-xs font-semibold rounded-md shadow-2xs"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={onLogin}
                  className="h-8 px-4 text-xs font-semibold rounded-md shadow-2xs"
                >
                  Login
                </Button>

                <Button
                  variant="default"
                  size="sm"
                  onClick={onRegister}
                  className="h-8 px-4 text-xs font-semibold rounded-md shadow-2xs"
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Hamburger / X Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden size-9 rounded-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/70 bg-card px-4 py-4 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-150">
          {isUserLoggedIn ? (
            <Button
              variant="default"
              size="sm"
              onClick={handleLogout}
              className="w-full h-10 text-xs font-semibold rounded-lg shadow-2xs justify-center"
            >
              Logout
            </Button>
          ) : (
            <div className="flex flex-col gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogin?.();
                }}
                className="w-full h-10 text-xs font-semibold rounded-lg justify-center"
              >
                Login
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRegister?.();
                }}
                className="w-full h-10 text-xs font-semibold rounded-lg shadow-2xs justify-center"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

/* ==========================================================================
   APP HEADER COMPONENT
   ========================================================================== */

export interface AppHeaderProps {
  logoHref?: string;
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
  className?: string;
}

export function AppHeader({
  logoHref = "/home",
  userName,
  userRole,
  avatarUrl,
  notificationCount,
  hasUnreadMessages,
  searchPlaceholder = "Search services, professionals...",
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onNotificationsClick,
  onMessagesClick,
  onSettingsClick,
  onProfileClick,
  className,
}: AppHeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const notifications = useAppSelector(selectNotifications);
  const storeUnreadMessagesCount = useAppSelector(selectUnreadMessagesCount);
  const storeSearchQuery = useAppSelector(selectGlobalSearchQuery);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileUserDropdownOpen, setMobileUserDropdownOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);

  // Ensure mock notifications are seeded if persisted store was previously empty
  useEffect(() => {
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);

    try {
      const seeded = sessionStorage.getItem("mykostoma_mock_notifs_seeded_v1");
      if (!seeded && notifications.length === 0) {
        dispatch(resetMockNotifications());
        sessionStorage.setItem("mykostoma_mock_notifs_seeded_v1", "true");
      }
    } catch {}
  }, [dispatch, notifications.length]);

  // Close desktop user dropdown when clicking outside
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

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

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
  const resolvedNotificationCount =
    notificationCount ?? unreadNotificationsCount;
  const resolvedHasUnreadMessages =
    hasUnreadMessages ?? storeUnreadMessagesCount > 0;

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalSearch(val);
    dispatch(setGlobalSearchQuery(val));
    onSearchChange?.(val);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const currentVal = searchValue !== undefined ? searchValue : internalSearch;
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
  };

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
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
  };

  const handleBellClick = () => {
    setNotificationModalOpen((prev) => !prev);
    onNotificationsClick?.();
  };

  const handleDashboardNavigate = () => {
    setDesktopDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/dashboard");
  };

  const handleProfileNavigate = () => {
    setDesktopDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onProfileClick) {
      onProfileClick();
    } else {
      router.push("/profile");
    }
  };

  const handleMessagesNavigate = () => {
    setMobileMenuOpen(false);
    if (onMessagesClick) {
      onMessagesClick();
    } else {
      router.push("/messages");
    }
  };

  const handleSettingsNavigate = () => {
    setMobileMenuOpen(false);
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      router.push("/settings");
    }
  };

  return (
    <header
      className={cn(
        "w-full rounded-2xl border border-border bg-card px-4 py-3 shadow-2xs transition-colors relative",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 lg:gap-8 flex-1 min-w-0">
          <Link
            href={logoHref}
            className="inline-flex items-center shrink-0 transition-opacity hover:opacity-90"
            aria-label="MyKostoma Home"
          >
            <img
              src="/mykostoma_full_logo.png"
              alt="MyKostoma"
              className="h-7 sm:h-8 w-auto object-contain dark:hidden select-none"
            />
            <img
              src="/mykostoma_full_logo_white.png"
              alt="MyKostoma"
              className="h-7 sm:h-8 w-auto object-contain hidden dark:block select-none"
            />
          </Link>

          <form
            role="search"
            onSubmit={handleSearchSubmit}
            className="relative flex-1 max-w-md hidden md:flex items-center"
          >
            <button
              type="submit"
              aria-label="Search"
              className="absolute left-3.5 size-4 text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer flex items-center justify-center p-0 border-0 bg-transparent"
            >
              <Search className="size-4" />
            </button>
            <input
              type="search"
              value={
                searchValue !== undefined ? searchValue : internalSearch
              }
              onChange={handleSearch}
              placeholder={searchPlaceholder}
              className={cn(
                "w-full h-10 pl-10 pr-4 text-sm rounded-lg bg-secondary text-foreground outline-none transition-all",
                "border border-transparent placeholder:text-muted-foreground/60",
                "hover:bg-secondary-hover focus:bg-card focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
              )}
            />
          </form>
        </div>

        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* Desktop Messages Icon */}
          <button
            type="button"
            onClick={handleMessagesNavigate}
            aria-label="Messages"
            className="hidden md:flex relative size-9 rounded-lg items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <MessageSquare className="size-4.5" />
            {resolvedHasUnreadMessages && (
              <span
                className="absolute top-2 right-2 size-2 rounded-full bg-error ring-2 ring-card animate-pulse"
                aria-label="Unread messages"
              />
            )}
          </button>

          {/* Notification Bell Icon & Popup Anchor */}
          <div className="relative">
            <button
              type="button"
              onClick={handleBellClick}
              aria-label="Notifications"
              aria-expanded={notificationModalOpen}
              className="relative size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <Bell className="size-4.5" />
              {resolvedNotificationCount > 0 && (
                <span className="absolute -top-1 -right-0.5 size-4 rounded-full bg-error text-white font-bold text-[10px] leading-none flex items-center justify-center shadow-xs ring-2 ring-card">
                  {resolvedNotificationCount > 9
                    ? "9+"
                    : resolvedNotificationCount}
                </span>
              )}
            </button>

            {/* Floating Notification Popup */}
            <NotificationModal
              isOpen={notificationModalOpen}
              onClose={() => setNotificationModalOpen(false)}
              notifications={notifications}
              onMarkAsRead={(id) => dispatch(markNotificationAsRead(id))}
              onMarkAllAsRead={() => dispatch(markAllNotificationsAsRead())}
              onRemoveNotification={(id) => dispatch(removeNotification(id))}
              onClearAll={() => dispatch(clearNotifications())}
              onRestoreMock={() => dispatch(resetMockNotifications())}
            />
          </div>

          {/* Desktop Settings Icon */}
          <button
            type="button"
            onClick={handleSettingsNavigate}
            aria-label="Settings"
            className="hidden md:flex size-9 rounded-lg items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <Settings className="size-4.5" />
          </button>

          {/* Desktop User Profile Dropdown */}
          <div ref={desktopDropdownRef} className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setDesktopDropdownOpen((prev) => !prev)}
              aria-expanded={desktopDropdownOpen}
              aria-haspopup="menu"
              className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-border/70 hover:opacity-90 transition-opacity cursor-pointer select-none bg-transparent"
            >
              <div className="flex flex-col text-right">
                <span className="text-xs sm:text-sm font-bold text-foreground tracking-tight leading-tight">
                  {resolvedUserName}
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase leading-tight mt-0.5">
                  {resolvedUserRole}
                </span>
              </div>

              <div className="relative">
                <img
                  src={resolvedAvatarUrl}
                  alt={resolvedUserName}
                  className="size-9 rounded-full object-cover ring-2 ring-primary/30 shadow-2xs"
                />
              </div>

              <ChevronDown
                className={cn(
                  "size-4 text-muted-foreground shrink-0 transition-transform duration-200",
                  desktopDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {desktopDropdownOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2.5 w-52 rounded-xl border border-border bg-card p-1.5 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleDashboardNavigate}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  <LayoutDashboard className="size-4 text-muted-foreground" />
                  <span>Dashboard</span>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleProfileNavigate}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  <User className="size-4 text-muted-foreground" />
                  <span>Profile</span>
                </button>

                <div className="my-1 border-t border-border/60" />

                <button
                  type="button"
                  role="menuitem"
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    {isDark ? (
                      <Sun className="size-4 text-warning" />
                    ) : (
                      <Moon className="size-4 text-muted-foreground" />
                    )}
                    <span>Switch Theme</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {isDark ? "Dark" : "Light"}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger / X Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden size-9 rounded-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-border/70 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* 1. User Details Header + Collapsible Dropdown */}
          <div className="rounded-xl bg-secondary/40 border border-border/60 overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileUserDropdownOpen((prev) => !prev)}
              aria-expanded={mobileUserDropdownOpen}
              className="w-full flex items-center justify-between gap-3 p-3 text-left hover:bg-secondary/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={resolvedAvatarUrl}
                  alt={resolvedUserName}
                  className="size-10 rounded-full object-cover ring-2 ring-primary/30 shadow-2xs shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-foreground tracking-tight leading-tight truncate">
                    {resolvedUserName}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase leading-tight mt-0.5 truncate">
                    {resolvedUserRole}
                  </span>
                </div>
              </div>

              <ChevronDown
                className={cn(
                  "size-4 text-muted-foreground shrink-0 transition-transform duration-200",
                  mobileUserDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {mobileUserDropdownOpen && (
              <div className="px-2 pb-2 pt-1 border-t border-border/60 space-y-1 bg-card/50">
                <button
                  type="button"
                  onClick={handleDashboardNavigate}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  <LayoutDashboard className="size-4 text-muted-foreground" />
                  <span>Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={handleProfileNavigate}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  <User className="size-4 text-muted-foreground" />
                  <span>Profile</span>
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    {isDark ? (
                      <Sun className="size-4 text-warning" />
                    ) : (
                      <Moon className="size-4 text-muted-foreground" />
                    )}
                    <span>Switch Theme</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {isDark ? "Dark" : "Light"}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* 2. Mobile Search Input */}
          <form
            role="search"
            onSubmit={handleSearchSubmit}
            className="relative flex items-center"
          >
            <button
              type="submit"
              aria-label="Search"
              className="absolute left-3.5 size-4 text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer flex items-center justify-center p-0 border-0 bg-transparent"
            >
              <Search className="size-4" />
            </button>
            <input
              type="search"
              value={
                searchValue !== undefined ? searchValue : internalSearch
              }
              onChange={handleSearch}
              placeholder={searchPlaceholder}
              className={cn(
                "w-full h-10 pl-10 pr-4 text-sm rounded-lg bg-secondary text-foreground outline-none transition-all",
                "border border-transparent placeholder:text-muted-foreground/60",
                "hover:bg-secondary-hover focus:bg-card focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
              )}
            />
          </form>

          {/* 3. Mobile Action Links (Icon + Text) */}
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={handleMessagesNavigate}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <MessageSquare className="size-4.5 text-muted-foreground" />
                <span>Message</span>
              </span>
              {resolvedHasUnreadMessages && (
                <span className="size-2 rounded-full bg-error" />
              )}
            </button>

            <button
              type="button"
              onClick={handleSettingsNavigate}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <Settings className="size-4.5 text-muted-foreground" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export type HeaderVariant = "landing" | "app";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  variant?: HeaderVariant;
  logoHref?: string;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
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

export function Header({ variant = "landing", ...props }: HeaderProps) {
  if (variant === "app") {
    return <AppHeader {...props} />;
  }
  return <LandingNavbar {...props} />;
}

export const Headers = Header;
export const LandingHeader = LandingNavbar;
export default Header;
