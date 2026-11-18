"use client";

import { useCallback, useEffect, useRef } from "react";
import { Award, Pencil, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type { ProShopMainTab, ProShopProfile } from "../types";

const PRO_SHOP_TABS: { id: ProShopMainTab; label: string }[] = [
  { id: "services", label: "Services" },
  { id: "products", label: "Products" },
  { id: "reviews", label: "Reviews" },
  { id: "about", label: "About" },
];

export interface ProShopHeaderBannerProps {
  profile: ProShopProfile;
  activeTab: ProShopMainTab;
  onTabChange: (tab: ProShopMainTab) => void;
  onEditShop: () => void;
  onAddNew: () => void;
}

export function ProShopHeaderBanner({
  profile,
  activeTab,
  onTabChange,
  onEditShop,
  onAddNew,
}: ProShopHeaderBannerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const scrollToTab = useCallback((tabId: ProShopMainTab, smooth = true) => {
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

  useEffect(() => {
    const frameId = requestAnimationFrame(() => scrollToTab(activeTab, true));
    return () => cancelAnimationFrame(frameId);
  }, [activeTab, scrollToTab]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="relative h-44 sm:h-56 w-full rounded-2xl overflow-hidden border border-border bg-secondary">
          <FallbackImage
            src={profile.coverBannerUrl}
            alt={profile.shopName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        </div>

        <div className="px-4 sm:px-6 -mt-12 sm:-mt-14 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-end gap-4 min-w-0">
            <div className="size-20 sm:size-24 rounded-2xl border-4 border-card bg-card shadow-md overflow-hidden shrink-0">
              <FallbackImage
                src={profile.avatarUrl}
                alt={profile.shopName}
                variant="avatar"
                className="w-full h-full rounded-none text-lg"
              />
            </div>

            <div className="pb-1 space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-foreground md:text-white drop-shadow-xs truncate">
                  {profile.shopName}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-warning-bg text-warning text-[10px] font-bold uppercase tracking-wider shrink-0">
                  <Award className="size-3 shrink-0" />
                  <span>{profile.badgeLabel}</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <Star className="size-3.5 text-warning fill-warning shrink-0" />
                <span className="font-bold text-foreground">
                  {profile.rating.toFixed(1)}
                </span>
                <span className="text-primary font-medium">
                  ({profile.reviewsCount} Reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 pb-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onEditShop}
              leadingIcon={<Pencil className="size-3.5" />}
              className="h-9 px-4 rounded-xl text-xs font-bold bg-card shadow-xs"
            >
              EDIT SHOP
            </Button>

            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onAddNew}
              leadingIcon={<Plus className="size-3.5" />}
              className="h-9 px-4 rounded-xl text-xs font-bold shadow-xs"
            >
              ADD NEW
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full sticky top-0 sm:static z-20 py-1 sm:py-0">
        <div
          ref={containerRef}
          role="tablist"
          aria-label="Shop sections"
          className="w-full flex items-center gap-1.5 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth p-1.5 sm:p-0 rounded-2xl sm:rounded-none bg-card/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-border/80 sm:border-0 sm:border-b sm:border-border shadow-md sm:shadow-none"
        >
          {PRO_SHOP_TABS.map((tab) => {
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
                onClick={() => {
                  onTabChange(tab.id);
                  scrollToTab(tab.id, true);
                }}
                className={cn(
                  "relative text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 select-none",
                  "px-3.5 py-2 rounded-xl sm:rounded-none sm:py-0 sm:px-1 sm:pb-3",
                  isActive
                    ? "bg-primary text-primary-foreground font-bold shadow-xs sm:bg-transparent sm:text-primary sm:shadow-none"
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
    </div>
  );
}
