"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, Bell, Sun, Moon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import {
  selectTheme,
  setTheme,
  selectUnreadNotificationsCount,
} from "@/store/slices/uiSlice";
import type { TopBarProps } from "./types";

export function DashboardTopBar({
  title,
  subtitle,
  breadcrumbs,
  onMenuClick,
  actions,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  onSearchClick,
  showSearch = true,
  showNotifications = true,
  showThemeToggle = true,
  showUserMenu = true,
  className,
  children,
}: TopBarProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const currentTheme = useAppSelector(selectTheme);
  const unreadNotifs = useAppSelector(selectUnreadNotificationsCount);

  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, [currentTheme]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      dispatch(setTheme("dark"));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      dispatch(setTheme("light"));
    }
  };

  const displayName =
    user?.fullName ||
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
    user?.email ||
    "User";

  const userInitial =
    user?.firstName?.[0]?.toUpperCase() ||
    user?.fullName?.[0]?.toUpperCase() ||
    "U";

  return (
    <header
      className={cn(
        "h-16 px-4 md:px-6 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-xs select-none sticky top-0 z-20 shrink-0",
        className
      )}
    >
      {/* Left: Mobile Menu Trigger + Title / Breadcrumbs */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open mobile menu"
            className="lg:hidden p-2 -ml-1 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div className="flex flex-col min-w-0">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.label}>
                  {idx > 0 && <ChevronRight className="h-3 w-3 shrink-0" />}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-foreground transition-colors truncate max-w-[120px]"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-semibold truncate max-w-[120px]">
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          ) : (
            <>
              {title && (
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground truncate leading-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-xs text-muted-foreground truncate hidden sm:block mt-0.5">
                  {subtitle}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right: Actions, Search, Notifications, Theme, User */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Custom Actions Slot */}
        {actions && <div className="flex items-center gap-2">{actions}</div>}

        {/* Search Trigger */}
        {showSearch && (
          <>
            <button
              type="button"
              onClick={onSearchClick}
              aria-label="Search"
              className="hidden md:flex items-center gap-2.5 rounded-xl border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-secondary transition-colors cursor-pointer"
            >
              <Search className="h-3.5 w-3.5" />
              <span>{searchPlaceholder}</span>
              <kbd className="ml-2 rounded-md bg-card border border-border px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground shadow-2xs">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={onSearchClick}
              aria-label="Open search"
              className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
            >
              <Search className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Notifications */}
        {showNotifications && (
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
          >
            <Bell className="h-4.5 w-4.5" />
            {unreadNotifs > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
            )}
          </Link>
        )}

        {/* Theme Toggle */}
        {showThemeToggle && (
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
          >
            {isDark ? (
              <Sun className="h-4.5 w-4.5 text-amber-400" />
            ) : (
              <Moon className="h-4.5 w-4.5" />
            )}
          </button>
        )}

        {/* User Summary / Profile Link */}
        {showUserMenu && (
          <Link
            href="/profile"
            aria-label="Go to profile"
            className="flex items-center gap-2 pl-1 group cursor-pointer"
          >
            {user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatarUrl}
                alt={displayName}
                className="h-8 w-8 rounded-lg object-cover border border-border group-hover:border-primary/50 transition-colors"
              />
            ) : (
              <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20 group-hover:bg-primary/20 transition-colors">
                {userInitial}
              </div>
            )}
          </Link>
        )}

        {children}
      </div>
    </header>
  );
}

