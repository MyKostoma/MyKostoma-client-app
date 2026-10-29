"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Bell,
  CheckCheck,
  X,
  Check,
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
  onMarkSelectedAsRead: (ids: string[]) => void;
  onMarkAllAsRead: () => void;
  onRemoveNotification: (id: string) => void;
  onClearAll: () => void;
  onRestoreMock: () => void;
}

export function NotificationModal({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkSelectedAsRead,
  onMarkAllAsRead,
  onRemoveNotification,
  onClearAll,
  onRestoreMock,
}: NotificationModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => notifications.some((n) => n.id === id))
    );
  }, [notifications]);

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
  const allSelected =
    notifications.length > 0 && selectedIds.length === notifications.length;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(notifications.map((n) => n.id));
    }
  };

  const handleMarkSelected = () => {
    if (selectedIds.length === 0) return;
    onMarkSelectedAsRead(selectedIds);
    setSelectedIds([]);
  };

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notifications-modal-title"
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-border bg-card text-foreground shadow-xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-border/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Bell className="size-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="notifications-modal-title"
                  className="text-base font-bold tracking-tight text-foreground"
                >
                  Notifications
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-error text-white text-[10px] font-bold">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground">
                Stay updated on your bookings and messages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllAsRead}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-primary hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <CheckCheck className="size-3.5" />
                <span>Mark all as read</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close notifications modal"
              className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Selection & Bulk Actions Toolbar */}
        {notifications.length > 0 && (
          <div className="px-5 py-2.5 bg-secondary/40 border-b border-border/60 flex items-center justify-between gap-2 text-xs">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none text-muted-foreground hover:text-foreground">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="size-3.5 rounded border-border accent-primary cursor-pointer"
              />
              <span className="font-medium">
                {selectedIds.length > 0
                  ? `${selectedIds.length} selected`
                  : "Select all"}
              </span>
            </label>

            <div className="flex items-center gap-3">
              {selectedIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleMarkSelected}
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer"
                >
                  <Check className="size-3.5" />
                  <span>Mark selected as read</span>
                </button>
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
          </div>
        )}

        {/* Notifications List or Empty State */}
        <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-border/60">
          {notifications.length === 0 ? (
            <div className="py-14 px-6 flex flex-col items-center text-center">
              <div className="size-20 rounded-full bg-secondary flex items-center justify-center mb-4 text-muted-foreground">
                <BellOff className="size-8 stroke-[1.75]" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                No notifications yet
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs mt-1.5 leading-relaxed">
                You&apos;re all caught up! When you receive booking updates,
                new quotes, or messages, they will appear here.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={onRestoreMock}
                className="mt-5 h-8 px-3.5 text-xs font-semibold rounded-lg"
              >
                Load sample notifications
              </Button>
            </div>
          ) : (
            notifications.map((notif) => {
              const isSelected = selectedIds.includes(notif.id);
              const isUnread = !notif.read;

              return (
                <div
                  key={notif.id}
                  onClick={() => toggleSelect(notif.id)}
                  className={cn(
                    "p-4 sm:px-5 flex items-start gap-3.5 transition-colors cursor-pointer",
                    isUnread
                      ? "bg-primary/5 hover:bg-primary/10"
                      : "bg-card hover:bg-secondary/40",
                    isSelected &&
                      "ring-1 ring-inset ring-primary/30 bg-primary/10"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(notif.id)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Select notification ${notif.title ?? notif.message}`}
                    className="mt-1 size-4 rounded border-border accent-primary cursor-pointer shrink-0"
                  />

                  <div className="mt-0.5">{getTypeIcon(notif.type)}</div>

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
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkAsRead(notif.id);
                          }}
                          className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveNotification(notif.id);
                        }}
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
    </div>
  );
}