"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { DisputeTabKey, DisputesTabsProps } from "./types";

export function DisputesTabs({
  activeTab,
  activeCount,
  resolvedCount,
  onTabChange,
}: DisputesTabsProps) {
  const tabRefs = useRef<Record<DisputeTabKey, HTMLButtonElement | null>>({
    active: null,
    resolved: null,
  });

  useEffect(() => {
    const activeEl = tabRefs.current[activeTab];
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  const tabs: { key: DisputeTabKey; label: string; count: number }[] = [
    { key: "active", label: "Active Disputes", count: activeCount },
    { key: "resolved", label: "Resolved Disputes", count: resolvedCount },
  ];

  return (
    <div className="sticky top-16 z-10 md:static md:z-auto -mx-4 px-4 py-2 md:mx-0 md:px-0 md:py-0 bg-background/90 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none">
      {/* Mobile sticky floating pill nav */}
      <div
        role="tablist"
        aria-label="Dispute status tabs"
        className="flex md:hidden items-center gap-2 overflow-x-auto no-scrollbar rounded-full border border-border bg-card p-1.5 shadow-xs"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              ref={(el) => {
                tabRefs.current[tab.key] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Desktop underline tabs */}
      <div
        role="tablist"
        aria-label="Dispute status tabs"
        className="hidden md:flex items-center gap-8 border-b border-border"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "relative inline-flex items-center gap-2 pb-3 text-sm font-semibold transition-colors cursor-pointer",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-[11px] font-bold leading-none",
                  isActive && tab.key === "active"
                    ? "bg-primary/15 text-primary"
                    : isActive
                    ? "bg-secondary text-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {tab.count}
              </span>
              {isActive && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
