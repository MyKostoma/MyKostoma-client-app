"use client";

import * as React from "react";
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
  selectUnreadMessagesCount,
  selectUnreadNotificationsCount,
  setGlobalSearchQuery,
  setTheme,
} from "@/store/slices/uiSlice";
import { RoleDisplayNames } from "@/types/user";
import { useState, useEffect } from "react";

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
      <div className="container px-3 sm:px-4 lg:px-6 xl:px-0 py-5 flex items-center justify-between">
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

        <div className="flex items-center gap-3">
          {/* add the theme toggle icon here */}

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
            className="transition-colors shadow-2xs border-0 bg-transparent shadow-none"
          >
          </Button>

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
      </div>
    </header>
  );
}

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
  const storeNotificationCount = useAppSelector(selectUnreadNotificationsCount);
  const storeUnreadMessagesCount = useAppSelector(selectUnreadMessagesCount);
  const storeSearchQuery = useAppSelector(selectGlobalSearchQuery);

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
    notificationCount ?? storeNotificationCount ?? 0;
  const resolvedHasUnreadMessages =
    hasUnreadMessages ?? storeUnreadMessagesCount > 0;

  const [internalSearch, setInternalSearch] = useState(
    searchValue ?? storeSearchQuery ?? ""
  );

  useEffect(() => {
    if (searchValue !== undefined) {
      setInternalSearch(searchValue);
    }
  }, [searchValue]);

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

  return (
    <header
      className={cn(
        "w-full rounded-2xl border border-border bg-card px-4 py-3 shadow-2xs transition-colors",
        "flex items-center justify-between gap-4",
        className
      )}
    >
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
            value={searchValue !== undefined ? searchValue : internalSearch}
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
        <button
          type="button"
          onClick={onMessagesClick}
          aria-label="Messages"
          className="relative size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
        >
          <MessageSquare className="size-4.5" />
          {resolvedHasUnreadMessages && (
            <span
              className="absolute top-2 right-2 size-2 rounded-full bg-error ring-2 ring-card animate-pulse"
              aria-label="Unread messages"
            />
          )}
        </button>

        <button
          type="button"
          onClick={onNotificationsClick}
          aria-label="Notifications"
          className="relative size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
        >
          <Bell className="size-4.5" />
          {resolvedNotificationCount > 0 && (
            <span className="absolute -top-1 -right-0.5 size-4 rounded-full bg-error text-white font-bold text-[10px] leading-none flex items-center justify-center shadow-xs ring-2 ring-card">
              {resolvedNotificationCount > 9 ? "9+" : resolvedNotificationCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onSettingsClick}
          aria-label="Settings"
          className="size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
        >
          <Settings className="size-4.5" />
        </button>

        <div
          onClick={onProfileClick}
          role="button"
          tabIndex={0}
          className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-border/70 hover:opacity-90 transition-opacity cursor-pointer select-none"
        >
          <div className="flex flex-col text-right hidden sm:flex">
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

          <ChevronDown className="size-4 text-muted-foreground shrink-0" />
        </div>
      </div>
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
