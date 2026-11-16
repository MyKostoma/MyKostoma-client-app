"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { Menu, Bell, ChevronRight } from "lucide-react";
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
import type { TopBarProps } from "./types";

export function DashboardTopBar({
  title,
  subtitle,
  breadcrumbs,
  onMenuClick,
  actions,
  showNotifications = true,
  className,
  children,
}: TopBarProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const currentTheme = useAppSelector(selectTheme);
  const notifications = useAppSelector(selectNotifications);
  const unreadNotifs = useAppSelector(selectUnreadNotificationsCount);

  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

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
                <Fragment key={crumb.label}>
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
                </Fragment>
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

      {/* Right: Actions, Notifications, Theme, User */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Custom Actions Slot */}
        {actions && <div className="flex items-center gap-2">{actions}</div>}

        {/* Notifications */}
        {showNotifications && (
          <div className="relative">
            <button
              type="button"
              data-notification-trigger="true"
              onClick={() => setNotificationModalOpen((prev) => !prev)}
              aria-label="Notifications"
              aria-expanded={notificationModalOpen}
              className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
              )}
            </button>

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
        )}
        {children}
      </div>
    </header>
  );
}

export default DashboardTopBar;
