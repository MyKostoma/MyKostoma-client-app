"use client";

import { useRef, useCallback, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import type { QuotationTabFilter } from "./types";

export interface QuotationTabOption<T extends string = QuotationTabFilter> {
  id: T;
  label: string;
}

export interface QuotationsFilterTabsProps<
  T extends string = QuotationTabFilter,
> {
  activeTab: T;
  onTabChange: (tab: T) => void;
  comparisonCount?: number;
  tabs?: QuotationTabOption<T>[];
  className?: string;
}

export function QuotationsFilterTabs<T extends string = QuotationTabFilter>({
  activeTab,
  onTabChange,
  comparisonCount = 0,
  tabs: customTabs,
  className,
}: QuotationsFilterTabsProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const defaultTabs = useMemo<QuotationTabOption<QuotationTabFilter>[]>(
    () => [
      { id: "all", label: "All Quotes" },
      { id: "pending", label: "Pending" },
      { id: "accepted", label: "Accepted" },
      {
        id: "comparison",
        label:
          comparisonCount > 0
            ? `Comparison (${comparisonCount})`
            : "Comparison",
      },
      { id: "rejected", label: "Rejected" },
    ],
    [comparisonCount]
  );

  const tabs = (customTabs ?? defaultTabs) as QuotationTabOption<T>[];

  const scrollToTab = useCallback((tabId: T, smooth = true) => {
      const container = containerRef.current;
      const tabEl = tabRefs.current[tabId];
      if (!container || !tabEl) return;

      const scrollTarget =
        tabEl.offsetLeft - container.offsetWidth / 2 + tabEl.offsetWidth / 2;

      container.scrollTo({
        left: Math.max(0, scrollTarget),
        behavior: smooth ? "smooth" : "auto",
      });
    },
    []
  );

  const handleTabClick = (tabId: T) => {
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
        "w-full sticky top-0 sm:static z-20 py-1 sm:py-0",
        className
      )}
    >
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Filter quotations by status"
        className="w-full flex items-center gap-1.5 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth p-1.5 sm:p-0 rounded-2xl sm:rounded-none bg-card/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-border/80 sm:border-0 sm:border-b sm:border-border shadow-md sm:shadow-none"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
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
                "relative text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 select-none",
                "px-3.5 py-2 rounded-xl sm:rounded-none sm:py-0 sm:px-1 sm:pb-3.5",
                isActive
                  ? "bg-primary text-white font-bold shadow-xs sm:bg-transparent sm:text-primary sm:shadow-none"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 sm:hover:bg-transparent"
              )}
            >
              <span>{tab.label}</span>
              {isActive && (
                <span
                  aria-hidden="true"
                  className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

