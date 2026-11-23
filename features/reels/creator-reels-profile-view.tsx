"use client";

import { useEffect, useRef } from "react";
import { Briefcase, Clapperboard, Info, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { ReelsSubpageTopBar } from "@/components/layouts/top-bars/reels/reels-subpage-top-bar";
import { CreatorProfileHeader } from "@/components/reels/creator-profile-header";
import { CreatorReelsGrid } from "@/components/reels/creator-reels-grid";
import { ReelPlayerModal } from "@/components/modals/reel-modals";
import { cn } from "@/lib/utils";
import type { CreatorProfileTabId } from "@/components/reels/types";
import { useCreatorReelsProfileService } from "./services/reelsApi";
import type { CreatorReelsProfileViewProps } from "./types";

const CREATOR_TABS: {
  id: CreatorProfileTabId;
  label: string;
  icon: typeof Clapperboard;
}[] = [
  { id: "reels", label: "REELS", icon: Clapperboard },
  { id: "about", label: "ABOUT", icon: Info },
  { id: "services", label: "SERVICES", icon: Briefcase },
];

export function CreatorReelsProfileView({
  creatorId,
}: CreatorReelsProfileViewProps) {
  const {
    creator,
    creatorReels,
    activeTab,
    setActiveTab,
    isFollowing,
    likedReelIds,
    combinedFollowedIds,
    playerIndex,
    setPlayerIndex,
    handleBack,
    handleToggleFollow,
    handleMessageCreator,
    handleViewFullStorefront,
    handleCopyProfileLink,
    handleToggleLike,
    handleShareReel,
  } = useCreatorReelsProfileService(creatorId);

  const tabRefs = useRef<
    Partial<Record<CreatorProfileTabId, HTMLButtonElement | null>>
  >({});

  useEffect(() => {
    tabRefs.current[activeTab]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeTab]);

  return (
    <>
      <DashboardTopBarSlot>
        <ReelsSubpageTopBar
          title={creator.name}
          backLabel="Back to Reels"
          onBack={handleBack}
          actionLabel="View Services"
          onAction={handleViewFullStorefront}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6 pb-10">
        <CreatorProfileHeader
          creator={creator}
          isFollowing={isFollowing}
          onToggleFollow={handleToggleFollow}
          onMessageCreator={handleMessageCreator}
          onViewFullStorefront={handleViewFullStorefront}
          onCopyProfileLink={handleCopyProfileLink}
        />

        {/* Responsive Sticky Mobile Pill -> Desktop Center Underline Tabs */}
        <div className="sticky top-16 z-10 flex justify-center py-1.5 md:static md:py-0">
          <nav
            aria-label="Creator profile sections"
            className="inline-flex items-center gap-2 md:gap-10 overflow-x-auto no-scrollbar rounded-full border border-border bg-card/95 backdrop-blur-xs p-1 shadow-xs md:shadow-none md:rounded-none md:border-0 md:border-t md:border-border md:w-full md:justify-center md:bg-transparent md:pt-1"
          >
            {CREATOR_TABS.map((tab) => {
              const Icon = tab.icon;
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
                    setActiveTab(tab.id);
                  }}
                  className={cn(
                    "relative shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 md:px-2 md:py-3 rounded-full md:rounded-none text-[11px] font-bold tracking-wider whitespace-nowrap transition-colors cursor-pointer outline-none",
                    isActive
                      ? "bg-primary text-primary-foreground md:bg-transparent md:text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 md:hover:bg-transparent"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-3.5 shrink-0",
                      isActive ? "md:text-primary" : ""
                    )}
                  />
                  <span>{tab.label}</span>

                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="hidden md:block absolute top-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Contents */}
        {activeTab === "reels" && (
          <CreatorReelsGrid
            reels={creatorReels}
            onSelectReel={(idx) => setPlayerIndex(idx)}
          />
        )}

        {activeTab === "about" && (
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-5 max-w-3xl mx-auto">
            <div className="space-y-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-accent text-primary text-[10px] font-bold uppercase tracking-wider">
                {creator.categoryBadge}
              </span>
              <h3 className="text-lg font-extrabold text-foreground tracking-tight pt-1">
                About {creator.name}
              </h3>
            </div>

            <p className="text-sm text-foreground/90 leading-relaxed">
              {creator.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-border/80 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" />
                <span>{creator.location}</span>
              </span>
              {creator.websiteLabel && (
                <span>Portfolio: {creator.websiteLabel}</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={handleViewFullStorefront}
                className="h-9 px-5 rounded-xl text-xs font-bold shadow-xs"
              >
                Open Full Professional Profile
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleMessageCreator}
                className="h-9 px-5 rounded-xl text-xs font-semibold"
              >
                Send Message
              </Button>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-4 max-w-3xl mx-auto">
            {creator.services.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-[11px] font-semibold text-muted-foreground">
                    Estimated timeline: {service.durationLabel}
                  </p>
                </div>

                <div className="sm:text-right shrink-0 space-y-2">
                  <p className="text-base sm:text-lg font-extrabold text-foreground">
                    {service.priceFormatted}
                  </p>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={handleViewFullStorefront}
                    className="h-9 px-4 rounded-xl text-xs font-bold shadow-xs"
                  >
                    Book Service
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ReelPlayerModal
        isOpen={playerIndex !== null}
        reels={creatorReels}
        activeIndex={playerIndex ?? 0}
        likedReelIds={likedReelIds}
        followedCreatorIds={combinedFollowedIds}
        onClose={() => setPlayerIndex(null)}
        onChangeIndex={setPlayerIndex}
        onToggleLike={handleToggleLike}
        onToggleFollow={handleToggleFollow}
        onShare={handleShareReel}
      />
    </>
  );
}
