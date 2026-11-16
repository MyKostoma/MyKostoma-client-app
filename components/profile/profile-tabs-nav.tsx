"use client";

import { Check, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type { ProfessionalProfileData, ProfileTabId } from "./types";

export interface ProfileTabOption {
  id: ProfileTabId;
  label: string;
}

export const PROFILE_TABS: ProfileTabOption[] = [
  { id: "services", label: "SERVICES" },
  { id: "portfolio", label: "PORTFOLIO" },
  { id: "reviews", label: "REVIEWS" },
  { id: "about", label: "ABOUT" },
];

export interface ProfileTabsNavProps {
  tabs?: ProfileTabOption[];
  activeTab: ProfileTabId;
  onTabChange: (tab: ProfileTabId) => void;
  profile?: ProfessionalProfileData;
  onMessageClick?: () => void;
  isStuck?: boolean;
  className?: string;
}

export function ProfileTabsNav({
  tabs = PROFILE_TABS,
  activeTab,
  onTabChange,
  profile,
  onMessageClick,
  isStuck = false,
  className,
}: ProfileTabsNavProps) {
  return (
    <nav
      aria-label="Profile section navigation"
      className={cn(
        "w-full rounded-b-2xl border border-border bg-card/95 backdrop-blur-md px-3 sm:px-6 py-1.5 sm:py-2 shadow-2xs transition-all duration-200",
        isStuck && "shadow-md border-border/90",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 sm:gap-6 min-h-10 sm:min-h-11">
        {/* Left: Compact Pro Identity (fades in when sticky on sm+ screens) */}
        {isStuck && profile ? (
          <div className="hidden sm:flex items-center gap-3 min-w-0 shrink-0 animate-in fade-in slide-in-from-left-2 duration-200">
            <div className="size-8 sm:size-9 rounded-xl border border-border overflow-hidden bg-secondary shrink-0">
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
                <span className="text-xs sm:text-sm font-bold text-foreground truncate max-w-[130px] lg:max-w-[200px]">
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
                <span>{profile.roleTitle}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* Center / Main: Tab Buttons */}
        <div
          role="tablist"
          aria-label="Profile sections"
          className="flex items-center justify-around sm:justify-start gap-4 sm:gap-7 overflow-x-auto no-scrollbar flex-1 sm:flex-initial"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative py-2.5 sm:py-3 px-1 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap select-none",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Quick Action Message Button (visible on md+ when sticky) */}
        {isStuck && onMessageClick ? (
          <div className="hidden md:flex items-center gap-2 shrink-0 animate-in fade-in slide-in-from-right-2 duration-200">
            <Button
              type="button"
              size="sm"
              variant="default"
              onClick={onMessageClick}
              leadingIcon={<MessageSquare className="size-3 fill-current" />}
              className="h-8 px-3.5 rounded-xl text-[10px] font-semibold uppercase tracking-wider shadow-xs"
            >
              Message
            </Button>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default ProfileTabsNav;

