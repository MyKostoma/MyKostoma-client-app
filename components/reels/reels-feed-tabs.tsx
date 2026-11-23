"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { ReelsFeedTabId, ReelsFeedTabsProps } from "./types";

const FEED_TABS: { id: ReelsFeedTabId; label: string }[] = [
  { id: "discover", label: "Discover" },
  { id: "following", label: "Following" },
];

export function ReelsFeedTabs({
  activeTab,
  onTabChange,
  className,
}: ReelsFeedTabsProps) {
  const tabRefs = useRef<Partial<Record<ReelsFeedTabId, HTMLButtonElement | null>>>(
    {}
  );

  useEffect(() => {
    tabRefs.current[activeTab]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeTab]);

  return (
    <div
      className={cn(
        "sticky top-16 z-10 flex justify-center py-2 md:py-0 md:static",
        className
      )}
    >
      <nav
        aria-label="Reels feed tabs"
        className="inline-flex items-center gap-2 md:gap-8 overflow-x-auto no-scrollbar rounded-full border border-border bg-card/95 backdrop-blur-xs p-1 shadow-xs md:shadow-none md:rounded-none md:border-0 md:border-b md:border-border md:w-full md:justify-center md:bg-card md:px-4"
      >
        {FEED_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[tab.id] = node;
              }}
              type="button"
              onClick={() => {
                tabRefs.current[tab.id]?.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
                onTabChange(tab.id);
              }}
              className={cn(
                "relative shrink-0 px-5 py-1.5 md:px-2 md:py-3 rounded-full md:rounded-none text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer outline-none",
                isActive
                  ? "bg-primary text-primary-foreground md:bg-transparent md:text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 md:hover:bg-transparent"
              )}
            >
              <span>{tab.label}</span>

              {isActive && (
                <span
                  aria-hidden="true"
                  className="hidden md:block absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
