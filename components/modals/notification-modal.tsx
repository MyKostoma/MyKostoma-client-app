"use client";

import { useEffect } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Bell,
  CheckCheck,
  X,
  Trash2,
  BellOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Notification } from "@/store/slices/uiSlice";

export interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkSelectedAsRead?: (ids: string[]) => void;
  onMarkAllAsRead: () => void;
  onRemoveNotification: (id: string) => void;
  onClearAll: () => void;
  onRestoreMock: () => void;
  className?: string;
}

export function NotificationModal({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onRemoveNotification,
  onClearAll,
  onRestoreMock,
  className,
}: NotificationModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="size-4 text-success shrink-0" />;
      case "warning":
        return <AlertTriangle className="size-4 text-warning shrink-0" />;
      case "error":
        return <AlertTriangle className="size-4 text-error shrink-0" />;
      default:
        return <Info className="size-4 text-info shrink-0" />;
    }
  };

  return (
    <>
      {/* Backdrop overlay for closing on outside click */}
      <div
        className="fixed inset-0 z-40 bg-black/15 md:bg-transparent"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Notification Popup */}
      <div
        className={cn(
          "fixed top-18 right-3 left-3 sm:left-auto sm:right-4 sm:w-[380px]",
          "md:absolute md:top-full md:right-0 md:left-auto md:mt-2.5 md:w-[400px]",
          "z-50 rounded-2xl border border-border bg-card text-foreground shadow-xl overflow-hidden flex flex-col max-h-[50vh] pb-2",
          "animate-in fade-in zoom-in-95 duration-150",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notifications-modal-title"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-border/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Bell className="size-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <h2
                id="notifications-modal-title"
                className="text-sm font-bold tracking-tight text-foreground"
              >
                Notifications
              </h2>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-error text-white text-[10px] font-bold">
                  {unreadCount} new
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close notifications"
            className="size-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Actions Toolbar - "Mark all as read" where "Select all" was, plus "Clear all" */}
        {notifications.length > 0 && (
          <div className="px-4 py-2 bg-secondary/40 border-b border-border/60 flex items-center justify-between gap-2 text-xs">
            {unreadCount > 0 ? (
              <button
                type="button"
                onClick={onMarkAllAsRead}
                className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer"
              >
                <CheckCheck className="size-3.5" />
                <span>Mark all as read</span>
              </button>
            ) : (
              <span className="text-[11px] font-medium text-muted-foreground">
                All caught up
              </span>
            )}

            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-error transition-colors cursor-pointer"
            >
              <Trash2 className="size-3.5" />
              <span>Clear all</span>
            </button>
          </div>
        )}

        {/* Notifications List or Empty State */}
        <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-border/60 no-scrollbar">
          {notifications.length === 0 ? (
            <div className="py-12 px-5 flex flex-col items-center text-center">
              <div className="size-16 rounded-full bg-secondary flex items-center justify-center mb-3 text-muted-foreground">
                <BellOff className="size-7 stroke-[1.75]" />
              </div>
              <h3 className="text-sm font-bold text-foreground">
                No notifications yet
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs mt-1 leading-relaxed">
                You&apos;re all caught up! New notifications and updates will appear here.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={onRestoreMock}
                className="mt-4 h-8 px-3 text-xs font-semibold rounded-lg"
              >
                Load sample notifications
              </Button>
            </div>
          ) : (
            notifications.map((notif) => {
              const isUnread = !notif.read;

              return (
                <div
                  key={notif.id}
                  className={cn(
                    "p-3.5 sm:p-4 flex items-start gap-3 transition-colors",
                    isUnread
                      ? "bg-primary/5 hover:bg-primary/10"
                      : "bg-card hover:bg-secondary/40"
                  )}
                >
                  <div className="mt-0.5 shrink-0">{getTypeIcon(notif.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={cn(
                          "text-xs sm:text-sm leading-snug",
                          isUnread
                            ? "font-bold text-foreground"
                            : "font-medium text-foreground/85"
                        )}
                      >
                        {notif.title ?? "Notification"}
                      </p>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {isUnread && (
                          <span
                            className="size-2 rounded-full bg-primary shrink-0"
                            title="Unread"
                          />
                        )}
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {notif.timeLabel ?? "Just now"}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {notif.message}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      {isUnread && (
                        <button
                          type="button"
                          onClick={() => onMarkAsRead(notif.id)}
                          className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onRemoveNotification(notif.id)}
                        className="text-[11px] text-muted-foreground hover:text-error transition-colors cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default NotificationModal;
