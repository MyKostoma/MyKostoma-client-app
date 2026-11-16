"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import {
  selectTheme,
  setTheme,
  selectNotifications,
  selectUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearNotifications,
  resetMockNotifications,
} from "@/store/slices/uiSlice";
import { NotificationModal } from "@/components/modals/notification-modal";

export interface TopBarUtilitiesProps {
  showNotifications?: boolean;
  showThemeToggle?: boolean;
  showUserMenu?: boolean;
  className?: string;
}

export function TopBarUtilities({
  showNotifications = true,
  showThemeToggle = true,
  showUserMenu = true,
  className,
}: TopBarUtilitiesProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const currentTheme = useAppSelector(selectTheme);
  const notifications = useAppSelector(selectNotifications);
  const unreadNotifs = useAppSelector(selectUnreadNotificationsCount);

  const [isDark, setIsDark] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, [currentTheme]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {}
      dispatch(setTheme("dark"));
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {}
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
    <div className={cn("flex items-center gap-1.5 sm:gap-2", className)}>
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
    </div>
  );
}

