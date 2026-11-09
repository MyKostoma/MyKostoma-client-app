"use client";

import { CheckCheck } from "lucide-react";
import { useNotificationsService } from "./services/notificationsApi";
import { NotificationsHeader } from "@/components/notifications/notifications-header";
import { NotificationsTabs } from "@/components/notifications/notifications-tabs";
import { NotificationCard } from "@/components/notifications/notification-card";
import { NotificationsEmptyState } from "@/components/notifications/notifications-empty-state";
import { NotificationsErrorState } from "@/components/notifications/notifications-error-state";
import type { NotificationItem } from "./types";

export interface NotificationsViewProps {
  initialData?: NotificationItem[];
}

export function NotificationsView({ initialData }: NotificationsViewProps) {
  const {
    notifications,
    activeTab,
    counts,
    isFailed,
    setActiveTab,
    markAsRead,
    markAllAsRead,
    archiveNotification,
    unarchiveNotification,
    retry,
  } = useNotificationsService(initialData);

  const hasUnread = counts.unread > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <NotificationsHeader />

        {hasUnread && activeTab !== "archive" && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer self-start sm:self-auto"
          >
            <CheckCheck className="size-4" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <NotificationsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      {/* Main Content Area */}
      {isFailed ? (
        <NotificationsErrorState onRetry={retry} />
      ) : notifications.length === 0 ? (
        <NotificationsEmptyState activeTab={activeTab} />
      ) : (
        <div className="rounded-2xl border border-border bg-card divide-y divide-border/70 overflow-hidden shadow-xs">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              onArchive={archiveNotification}
              onUnarchive={unarchiveNotification}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationsView;
