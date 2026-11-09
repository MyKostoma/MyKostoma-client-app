"use client";

import { useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { NotificationFilterTab } from "@/features/notifications/types";
import type { NotificationsTabsProps } from "./types";

interface TabOption {
  id: NotificationFilterTab;
  label: string;
}

const TABS: TabOption[] = [
  { id: "all", label: "All Notifications" },
  { id: "unread", label: "Unread" },
  { id: "archive", label: "Archive" },
];

export function NotificationsTabs({
  activeTab,
  onTabChange,
  counts,
  className,
}: NotificationsTabsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const scrollToTab = useCallback((tabId: NotificationFilterTab, smooth = true) => {
    const container = containerRef.current;
    const tabEl = tabRefs.current[tabId];
    if (!container || !tabEl) return;

    const scrollTarget =
      tabEl.offsetLeft - container.offsetWidth / 2 + tabEl.offsetWidth / 2;

    container.scrollTo({
      left: Math.max(0, scrollTarget),
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  const handleTabClick = (tabId: NotificationFilterTab) => {
    onTabChange(tabId);
    scrollToTab(tabId, true);
  };

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      scrollToTab(activeTab, true);
    });
    return () => cancelAnimationFrame(frameId);
  }, [activeTab, scrollToTab]);

  return (
    <div
      className={cn(
        "w-full sticky top-0 sm:static z-20 py-1 sm:py-0 select-none",
        className
      )}
    >
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Filter notifications"
        className="w-full flex items-center gap-1.5 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth p-1.5 sm:p-0 rounded-2xl sm:rounded-none bg-card/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-border/80 sm:border-0 sm:border-b sm:border-border shadow-md sm:shadow-none"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = counts ? counts[tab.id] : undefined;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "relative text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 select-none flex items-center gap-2",
                "px-3.5 py-2 rounded-xl sm:rounded-none sm:py-0 sm:px-1 sm:pb-3.5",
                isActive
                  ? "bg-primary text-white font-bold shadow-xs sm:bg-transparent sm:text-foreground sm:shadow-none"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 sm:hover:bg-transparent"
              )}
            >
              <span>{tab.label}</span>
              {typeof count === "number" && count > 0 && (
                <span
                  className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors",
                    isActive
                      ? "bg-white/20 text-white sm:bg-secondary sm:text-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              )}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default NotificationsTabs;
