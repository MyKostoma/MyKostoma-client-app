"use client";

import { useCallback, useEffect, useRef } from "react";
import { Check, MessageSquare, Pencil, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type {
  ProfileTabId,
  ProfileTabOption,
  ProfileTabsNavProps,
} from "./types";

export type { ProfileTabOption, ProfileTabsNavProps } from "./types";

export const PROFILE_TABS: ProfileTabOption[] = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "reviews", label: "Reviews" },
];

export const COMPANY_PROFILE_TABS: ProfileTabOption[] = [
  { id: "overview", label: "Identity & About" },
  { id: "services", label: "Service Cards" },
  { id: "portfolio", label: "Portfolio" },
  { id: "reviews", label: "Reviews" },
];

export function ProfileTabsNav({
  tabs = PROFILE_TABS,
  activeTab,
  onTabChange,
  profile,
  isOwner = false,
  onMessageClick,
  onEditClick,
  isStuck = false,
  className,
}: ProfileTabsNavProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const scrollToTab = useCallback((tabId: ProfileTabId) => {
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

  return (
    <nav
      aria-label="Profile section navigation"
      className={cn(
        "w-full sticky top-2 sm:static z-20 rounded-full sm:rounded-none sm:rounded-b-2xl border border-border sm:border-t sm:border-t-border/70 bg-card/95 backdrop-blur-md p-1.5 sm:px-6 sm:py-0 shadow-2xs transition-all duration-200",
        isStuck && "shadow-md border-border/90",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 sm:gap-6 min-h-10 sm:min-h-12">
        {isStuck && profile ? (
          <div className="hidden md:flex items-center gap-3 min-w-0 shrink-0 animate-in fade-in slide-in-from-left-2 duration-200">
            <div className="size-8 rounded-xl border border-border overflow-hidden bg-secondary shrink-0">
              <FallbackImage
                src={profile.avatarUrl}
                alt={profile.name}
                fallbackType="user"
                variant="avatar"
                className="w-full h-full object-cover select-none"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-foreground truncate max-w-[160px]">
                  {profile.name}
                </span>
                <span className="size-3.5 rounded-full bg-warning text-warning-foreground flex items-center justify-center shrink-0">
                  <Check className="size-2 stroke-[3.5]" />
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="inline-flex items-center gap-0.5 font-bold text-foreground">
                  <Star className="size-2.5 text-warning fill-warning shrink-0" />
                  <span>{profile.rating.toFixed(1)}</span>
                </span>
                <span>•</span>
                <span className="truncate max-w-[180px]">
                  {profile.roleTitle}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div
          ref={containerRef}
          role="tablist"
          aria-label="Profile sections"
          className="flex items-center gap-1.5 sm:gap-7 overflow-x-auto no-scrollbar flex-1 sm:flex-initial"
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
                onClick={() => {
                  onTabChange(tab.id);
                  scrollToTab(tab.id);
                }}
                className={cn(
                  "relative rounded-full sm:rounded-none px-4 py-2 sm:px-1 sm:py-3.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap select-none shrink-0",
                  isActive
                    ? "bg-primary text-primary-foreground sm:bg-transparent sm:text-foreground shadow-2xs sm:shadow-none"
                    : "text-muted-foreground hover:text-foreground"
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

        {isStuck && (isOwner ? onEditClick : onMessageClick) ? (
          <div className="hidden md:flex items-center gap-2 shrink-0 animate-in fade-in slide-in-from-right-2 duration-200">
            {isOwner && onEditClick ? (
              <Button
                type="button"
                size="sm"
                variant="default"
                onClick={onEditClick}
                leadingIcon={<Pencil className="size-3" />}
                className="h-8 px-3.5 rounded-xl text-[11px] font-semibold shadow-xs"
              >
                Edit Profile
              </Button>
            ) : (
              onMessageClick && (
                <Button
                  type="button"
                  size="sm"
                  variant="default"
                  onClick={onMessageClick}
                  leadingIcon={<MessageSquare className="size-3 fill-current" />}
                  className="h-8 px-3.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider shadow-xs"
                >
                  Message
                </Button>
              )
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default ProfileTabsNav;
