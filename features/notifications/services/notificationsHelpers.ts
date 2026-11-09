import type {
  NotificationFilterTab,
  NotificationItem,
} from "../types";

/**
 * Filter notifications list according to active tab.
 */
export function filterNotifications(
  items: NotificationItem[],
  tab: NotificationFilterTab
): NotificationItem[] {
  switch (tab) {
    case "unread":
      return items.filter((item) => !item.read && !item.archived);
    case "archive":
      return items.filter((item) => item.archived);
    case "all":
    default:
      return items.filter((item) => !item.archived);
  }
}

/**
 * Calculate tab badge counts for notifications.
 */
export function calculateNotificationCounts(items: NotificationItem[]): {
  all: number;
  unread: number;
  archive: number;
} {
  return {
    all: items.filter((item) => !item.archived).length,
    unread: items.filter((item) => !item.read && !item.archived).length,
    archive: items.filter((item) => item.archived).length,
  };
}
