import type {
  NotificationFilterTab,
  NotificationItem,
} from "@/features/notifications/types";

export interface NotificationsHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export interface NotificationsTabsProps {
  activeTab: NotificationFilterTab;
  onTabChange: (tab: NotificationFilterTab) => void;
  counts?: {
    all: number;
    unread: number;
    archive: number;
  };
  className?: string;
}

export interface NotificationCardProps {
  notification: NotificationItem;
  onMarkAsRead?: (id: string) => void;
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  className?: string;
}

export interface NotificationsEmptyStateProps {
  activeTab: NotificationFilterTab;
  onActionClick?: () => void;
  className?: string;
}

export interface NotificationsErrorStateProps {
  onRetry?: () => void;
  className?: string;
}
