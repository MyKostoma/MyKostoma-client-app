"use client";

import * as React from "react";
import Link from "next/link";
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

export interface LandingNavbarProps extends React.HTMLAttributes<HTMLElement> {
  logoHref?: string;
  onLogin?: () => void;
  onRegister?: () => void;
}

export function LandingNavbar({
  logoHref = "/",
  onLogin,
  onRegister,
  className,
  ...props
}: LandingNavbarProps) {
  const [isDark, setIsDark] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);

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

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
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
        </div>
      </div>
    </header>
  );
}

export interface AppHeaderProps {
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
  notificationCount?: number;
  hasUnreadMessages?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onNotificationsClick?: () => void;
  onMessagesClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  className?: string;
}

export function AppHeader({
  userName = "Alex Morgan",
  userRole = "PREMIUM CONSUMER",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  notificationCount = 3,
  hasUnreadMessages = true,
  searchPlaceholder = "Search services, professionals...",
  searchValue,
  onSearchChange,
  onNotificationsClick,
  onMessagesClick,
  onSettingsClick,
  onProfileClick,
  className,
}: AppHeaderProps) {
  const [internalSearch, setInternalSearch] = React.useState(searchValue || "");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalSearch(e.target.value);
    onSearchChange?.(e.target.value);
  };

  return (
    <header
      className={cn(
        "w-full rounded-2xl border border-border bg-card px-4 py-3 shadow-2xs transition-colors",
        "flex items-center justify-between gap-4",
        className
      )}
    >
      <div className="flex items-center gap-3 shrink-0">
        <div className="size-9 rounded-lg bg-primary flex items-center justify-center text-white shadow-xs">
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="4" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.9" />
            <rect x="13" y="4" width="7" height="7" rx="2" fill="currentColor" />
            <rect x="4" y="13" width="7" height="7" rx="2" fill="currentColor" />
            <rect x="13" y="13" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.75" />
          </svg>
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground select-none">
          MyKostoma
        </span>
      </div>

      <div className="relative flex-1 max-w-md hidden md:flex items-center">
        <Search className="absolute left-3.5 size-4 text-muted-foreground/70 pointer-events-none" />
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
      </div>

      <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
        <button
          type="button"
          onClick={onMessagesClick}
          aria-label="Messages"
          className="relative size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
        >
          <MessageSquare className="size-4.5" />
          {hasUnreadMessages && (
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
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-0.5 size-4 rounded-full bg-error text-white font-bold text-[10px] leading-none flex items-center justify-center shadow-xs ring-2 ring-card">
              {notificationCount > 9 ? "9+" : notificationCount}
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
              {userName}
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase leading-tight mt-0.5">
              {userRole}
            </span>
          </div>

          <div className="relative">
            <img
              src={avatarUrl}
              alt={userName}
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
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
  notificationCount?: number;
  hasUnreadMessages?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
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
