"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ChevronRight, HelpCircle, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  removeNotification,
  resetMockNotifications,
  selectNotifications,
  selectUnreadNotificationsCount,
} from "@/store/slices/uiSlice";
import { NotificationModal } from "@/components/modals/notification-modal";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";
import type { VerificationTopBarProps } from "../types";

export function VerificationTopBar({
  title,
  breadcrumbs,
  highlightLastPrimary = false,
  onHelpCenter,
  onMenuClick,
  className,
}: VerificationTopBarProps) {
  const router = useRouter();
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const unreadNotifs = useAppSelector(selectUnreadNotificationsCount);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  const handleHelpClick = () => {
    if (onHelpCenter) {
      onHelpCenter();
      return;
    }
    router.push("/messages");
  };

  return (
    <div
      className={cn(
        "h-16 px-4 md:px-6 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-xs select-none sticky top-0 z-20 shrink-0 gap-3",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {effectiveMenuClick && (
          <button
            type="button"
            onClick={effectiveMenuClick}
            aria-label="Open mobile menu"
            className="lg:hidden p-2 -ml-1 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer shrink-0"
          >
            <Menu className="size-5" />
          </button>
        )}

        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs sm:text-sm min-w-0 overflow-hidden"
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <div
                  key={`${crumb.label}-${idx}`}
                  className="flex items-center gap-1.5 min-w-0"
                >
                  {idx > 0 && (
                    <ChevronRight
                      aria-hidden="true"
                      className="size-3.5 text-muted-foreground/60 shrink-0"
                    />
                  )}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="font-medium text-muted-foreground hover:text-foreground transition-colors truncate"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        "font-semibold truncate",
                        isLast && highlightLastPrimary
                          ? "text-primary"
                          : "text-foreground"
                      )}
                    >
                      {crumb.label}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        ) : (
          <h1 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight truncate leading-tight">
            {title || "Verification"}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
        <div className="relative">
          <button
            type="button"
            data-notification-trigger="true"
            onClick={() => setNotificationModalOpen((prev) => !prev)}
            aria-label="Notifications"
            aria-expanded={notificationModalOpen}
            className="relative size-9 rounded-xl border border-border bg-card hover:bg-secondary/60 text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
          >
            <Bell className="size-4" />
            {unreadNotifs > 0 && (
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
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

        <button
          type="button"
          onClick={handleHelpClick}
          className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border border-border bg-card hover:bg-secondary/60 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
        >
          <HelpCircle className="size-3.5 text-muted-foreground" />
          <span>Help Center</span>
        </button>
      </div>
    </div>
  );
}
