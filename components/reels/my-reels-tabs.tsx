"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { MyReelsFilterTab, MyReelsTabsProps } from "./types";

export function MyReelsTabs({
  activeTab,
  allCount,
  draftsCount,
  scheduledCount,
  onTabChange,
  className,
}: MyReelsTabsProps) {
  const tabRefs = useRef<Partial<Record<MyReelsFilterTab, HTMLButtonElement | null>>>(
    {}
  );

  useEffect(() => {
    tabRefs.current[activeTab]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeTab]);

  const tabs: { id: MyReelsFilterTab; label: string }[] = [
    { id: "all", label: `All Reels (${allCount})` },
    { id: "draft", label: `Drafts (${draftsCount})` },
    { id: "scheduled", label: `Scheduled (${scheduledCount})` },
  ];

  return (
    <div
      className={cn(
        "sticky top-16 z-10 -mx-1 px-1 py-1.5 md:static md:mx-0 md:px-0 md:py-0",
        className
      )}
    >
      <nav
        aria-label="My reels status tabs"
        className="flex items-center gap-1.5 md:gap-7 overflow-x-auto no-scrollbar rounded-full border border-border bg-card/95 backdrop-blur-xs p-1 shadow-xs md:shadow-none md:rounded-none md:border-0 md:border-b md:border-border md:bg-transparent md:p-0"
      >
        {tabs.map((tab) => {
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
                "relative shrink-0 px-3.5 py-2 md:px-1 md:py-3 rounded-full md:rounded-none text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer outline-none",
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
