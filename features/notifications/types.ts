export type NotificationFilterTab = "all" | "unread" | "archive";

export type NotificationCategory =
  | "quote_received"
  | "quote_accepted"
  | "message"
  | "order_status"
  | "payment"
  | "review"
  | "verification"
  | "dispute"
  | "general";

export interface NotificationAction {
  label: string;
  href?: string;
  actionKey?: "reply" | "viewQuote" | "viewReview" | "custom";
}

export interface NotificationItem {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  timeAgo: string;
  createdAt: string;
  read: boolean;
  archived: boolean;
  senderAvatar?: string;
  senderName?: string;
  action?: NotificationAction;
  metadata?: {
    orderId?: string;
    quoteId?: string;
    conversationId?: string;
    reviewId?: string;
    rating?: number;
    amount?: string;
  };
}

export type NotificationFetchStatus = "idle" | "loading" | "succeeded" | "failed";
