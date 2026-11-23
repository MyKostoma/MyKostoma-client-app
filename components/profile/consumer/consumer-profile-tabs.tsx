"use client";

import { useCallback, useEffect, useRef } from "react";
import { Heart, LayoutGrid, MapPin, MessageSquareQuote } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  ConsumerProfileTabId,
  ConsumerProfileTabsProps,
} from "../types";

export function ConsumerProfileTabs({
  activeTab,
  addressesCount,
  savedProsCount,
  reviewsCount,
  onTabChange,
}: ConsumerProfileTabsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const scrollToTab = useCallback((tabId: ConsumerProfileTabId) => {
    const container = containerRef.current;
    const tabEl = tabRefs.current[tabId];
    if (!container || !tabEl) return;

    const targetLeft =
      tabEl.offsetLeft - container.offsetWidth / 2 + tabEl.offsetWidth / 2;

    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => scrollToTab(activeTab));
    return () => cancelAnimationFrame(frameId);
  }, [activeTab, scrollToTab]);

  const tabs: {
    id: ConsumerProfileTabId;
    label: string;
    count?: number;
    icon: typeof LayoutGrid;
  }[] = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    {
      id: "addresses",
      label: "Saved Addresses",
      count: addressesCount,
      icon: MapPin,
    },
    {
      id: "saved-pros",
      label: "Saved Pros",
      count: savedProsCount,
      icon: Heart,
    },
    {
      id: "reviews",
      label: "Reviews Given",
      count: reviewsCount,
      icon: MessageSquareQuote,
    },
  ];

  return (
    <nav
      aria-label="Consumer profile navigation"
      className="w-full sticky top-2 sm:static z-20 rounded-full sm:rounded-none sm:rounded-b-2xl border border-border sm:border-t sm:border-t-border/70 bg-card/95 backdrop-blur-md p-1.5 sm:px-6 sm:py-0 shadow-2xs transition-all duration-200"
    >
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Consumer profile sections"
        className="flex items-center gap-1.5 sm:gap-7 overflow-x-auto no-scrollbar min-h-10 sm:min-h-12"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                onTabChange(tab.id);
                scrollToTab(tab.id);
              }}
              className={cn(
                "relative inline-flex items-center gap-2 rounded-full sm:rounded-none px-4 py-2 sm:px-1 sm:py-3.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap select-none shrink-0",
                isActive
                  ? "bg-primary text-primary-foreground sm:bg-transparent sm:text-foreground shadow-2xs sm:shadow-none"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-3.5 shrink-0" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground sm:bg-primary/10 sm:text-primary"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {tab.count}
                </span>
              )}
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
    </nav>
  );
}
