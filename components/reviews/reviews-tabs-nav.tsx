"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { ReviewsTabId, ReviewsTabsNavProps } from "./types";

interface TabDef {
  id: ReviewsTabId;
  label: string;
}

const REVIEW_TABS: TabDef[] = [
  { id: "received", label: "Reviews Received" },
  { id: "given", label: "Reviews Given" },
  { id: "pending", label: "Pending" },
];

export function ReviewsTabsNav({
  activeTab,
  receivedCount,
  givenCount,
  pendingCount,
  onTabChange,
  className,
}: ReviewsTabsNavProps) {
  const tabRefs = useRef<Partial<Record<ReviewsTabId, HTMLButtonElement | null>>>(
    {}
  );

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  const countsByTab: Record<ReviewsTabId, number> = {
    received: receivedCount,
    given: givenCount,
    pending: pendingCount,
  };

  return (
    <div
      className={cn(
        "sticky top-16 z-10 -mx-1 px-1 py-1.5 md:static md:mx-0 md:px-0 md:py-0",
        className
      )}
    >
      <nav
        aria-label="Reviews categories"
        className="flex items-center gap-1.5 md:gap-7 overflow-x-auto no-scrollbar rounded-full border border-border bg-card/95 backdrop-blur-xs p-1 shadow-xs md:shadow-none md:rounded-none md:border-0 md:border-b md:border-border md:bg-transparent md:p-0"
      >
        {REVIEW_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = countsByTab[tab.id];

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
                "relative shrink-0 inline-flex items-center gap-2 px-3.5 py-2 md:px-1 md:py-3 rounded-full md:rounded-none text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer outline-none",
                isActive
                  ? "bg-primary text-primary-foreground md:bg-transparent md:text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 md:hover:bg-transparent"
              )}
            >
              <span>{tab.label}</span>

              <span
                className={cn(
                  "inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-md text-[10px] font-bold transition-colors",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground md:bg-accent md:text-primary"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {count}
              </span>

              {isActive && (
                <span
                  aria-hidden="true"
                  className="hidden md:block absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
