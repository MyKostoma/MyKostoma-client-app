"use client";

import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Package,
  Wallet,
  Star,
  BadgeCheck,
  AlertCircle,
  Bell,
  Archive,
  ArchiveRestore,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NotificationCategory } from "@/features/notifications/types";
import type { NotificationCardProps } from "./types";

function getCategoryIcon(category: NotificationCategory) {
  switch (category) {
    case "quote_received":
      return (
        <div className="size-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
          <FileText className="size-5" />
        </div>
      );
    case "quote_accepted":
      return (
        <div className="size-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
          <CheckCircle2 className="size-5" />
        </div>
      );
    case "order_status":
      return (
        <div className="size-10 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
          <Package className="size-5" />
        </div>
      );
    case "payment":
      return (
        <div className="size-10 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
          <Wallet className="size-5" />
        </div>
      );
    case "review":
      return (
        <div className="size-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
          <Star className="size-5 fill-amber-500" />
        </div>
      );
    case "verification":
      return (
        <div className="size-10 rounded-full bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
          <BadgeCheck className="size-5" />
        </div>
      );
    case "dispute":
      return (
        <div className="size-10 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0">
          <AlertCircle className="size-5" />
        </div>
      );
    case "message":
    case "general":
    default:
      return (
        <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Bell className="size-5" />
        </div>
      );
  }
}

export function NotificationCard({
  notification,
  onMarkAsRead,
  onArchive,
  onUnarchive,
  className,
}: NotificationCardProps) {
  const isUnread = !notification.read;

  return (
    <div
      className={cn(
        "p-4 sm:p-5 flex items-start gap-3.5 sm:gap-4 transition-colors group",
        isUnread
          ? "bg-card hover:bg-secondary/30"
          : "bg-card/60 hover:bg-secondary/20",
        className
      )}
    >
      {/* Icon or Avatar */}
      <div className="relative shrink-0 mt-0.5">
        {notification.senderAvatar ? (
          <img
            src={notification.senderAvatar}
            alt={notification.senderName || "Sender"}
            className="size-10 rounded-full object-cover border border-border"
          />
        ) : (
          getCategoryIcon(notification.category)
        )}
        {isUnread && (
          <span
            className="sm:hidden absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-blue-500 ring-2 ring-card"
            title="Unread"
          />
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h2
              className={cn(
                "text-sm sm:text-base leading-snug",
                isUnread
                  ? "font-bold text-foreground"
                  : "font-semibold text-foreground/85"
              )}
            >
              {notification.title}
            </h2>
            {isUnread && (
              <span
                className="hidden sm:inline-block size-2 rounded-full bg-blue-500 shrink-0"
                title="Unread"
              />
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {notification.timeAgo}
            </span>

            {/* Archive / Unarchive Action */}
            {notification.archived ? (
              onUnarchive && (
                <button
                  type="button"
                  onClick={() => onUnarchive(notification.id)}
                  aria-label="Move to inbox"
                  title="Move to inbox"
                  className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-foreground transition-all cursor-pointer rounded"
                >
                  <ArchiveRestore className="size-3.5" />
                </button>
              )
            ) : (
              onArchive && (
                <button
                  type="button"
                  onClick={() => onArchive(notification.id)}
                  aria-label="Archive notification"
                  title="Archive notification"
                  className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-foreground transition-all cursor-pointer rounded"
                >
                  <Archive className="size-3.5" />
                </button>
              )
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
          {notification.description}
        </p>

        {/* Actions Row */}
        {isUnread && (
          <div className="flex items-center gap-4 mt-2.5 pt-0.5">
            {notification.action && (
              notification.action.href ? (
                <Link
                  href={notification.action.href}
                  className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-hover hover:underline transition-colors"
                >
                  {notification.action.label}
                </Link>
              ) : (
                <button
                  type="button"
                  className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-hover hover:underline transition-colors cursor-pointer"
                >
                  {notification.action.label}
                </button>
              )
            )}

            {onMarkAsRead && (
              <button
                type="button"
                onClick={() => onMarkAsRead(notification.id)}
                className="text-xs sm:text-sm font-normal text-muted-foreground hover:text-foreground hover:underline transition-colors cursor-pointer"
              >
                Mark as read
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationCard;
