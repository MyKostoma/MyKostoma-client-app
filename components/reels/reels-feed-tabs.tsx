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
  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Partial<Record<ReelsFeedTabId, HTMLButtonElement | null>>>(
    {}
  );

  useEffect(() => {
    const navEl = navRef.current;
    const activeEl = tabRefs.current[activeTab];
    if (navEl && activeEl && navEl.scrollWidth > navEl.clientWidth) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  return (
    <div
      className={cn(
        "sticky top-0 z-30 flex justify-center -mt-2 sm:-mt-4 lg:-mt-6 py-1.5 pointer-events-none",
        className
      )}
    >
      <nav
        ref={navRef}
        aria-label="Reels feed tabs"
        className="pointer-events-auto inline-flex items-center gap-2 md:gap-8 overflow-x-auto no-scrollbar rounded-full md:rounded-none bg-transparent backdrop-blur-md px-1.5 py-1 md:px-4 md:py-1.5"
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
                const navEl = navRef.current;
                const el = tabRefs.current[tab.id];
                if (navEl && el && navEl.scrollWidth > navEl.clientWidth) {
                  el.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  });
                }
                onTabChange(tab.id);
              }}
              className={cn(
                "relative shrink-0 px-4 py-1.5 md:px-2 md:py-1.5 rounded-full md:rounded-none text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer outline-none",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs md:shadow-none md:bg-transparent md:text-foreground"
                  : "text-foreground/80 hover:text-foreground hover:bg-secondary/40 md:text-muted-foreground md:hover:text-foreground md:hover:bg-transparent"
              )}
            >
              <span>{tab.label}</span>

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
