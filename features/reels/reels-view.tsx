"use client";

import { Clapperboard, Compass, Plus, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/form-fields";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { ReelsTopBar } from "@/components/layouts/top-bars/reels/reels-top-bar";
import { ReelsFeedTabs } from "@/components/reels/reels-feed-tabs";
import { ReelFeedCard } from "@/components/reels/reel-feed-card";
import { MyReelsTabs } from "@/components/reels/my-reels-tabs";
import { MyReelGridCard } from "@/components/reels/my-reel-grid-card";
import {
  ReelPlayerModal,
  ReportReelModal,
} from "@/components/modals/reel-modals";
import { cn } from "@/lib/utils";
import { REEL_REPORT_REASONS } from "./data";
import { useReelsHubService } from "./services/reelsApi";

export function ReelsView() {
  const {
    isProfessional,
    viewMode,
    myReelsTab,
    setMyReelsTab,
    searchQuery,
    setSearchQuery,
    mobileSearchOpen,
    setMobileSearchOpen,
    activeHashtag,
    setActiveHashtag,
    playingReelId,
    isMuted,
    setIsMuted,
    likedReelIds,
    combinedFollowedIds,
    reportedReelIds,
    filteredFeedReels,
    filteredMyReels,
    allMyReelsCount,
    draftsCount,
    scheduledCount,
    reportTarget,
    setReportTarget,
    previewManagedReel,
    setPreviewManagedReel,
    handleModeChange,
    handleTogglePlay,
    handleToggleLike,
    handleToggleFollow,
    handleShareReel,
    handleConfirmReport,
    handleHashtagClick,
    handleOpenCreator,
    handleOpenFullProfile,
    handleOpenManageReel,
    handleOpenUploadReel,
    handleClearFeedFilters,
  } = useReelsHubService();

  const isCreatorStudio = isProfessional && viewMode === "my-reels";
  const activeFeedTab = viewMode === "following" ? "following" : "discover";
  const showMobileSearchInput =
    mobileSearchOpen || searchQuery.trim().length > 0;

  return (
    <>
      <DashboardTopBarSlot>
        <ReelsTopBar
          isProfessional={isProfessional}
          viewMode={viewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          mobileSearchOpen={mobileSearchOpen}
          onToggleMobileSearch={() => setMobileSearchOpen((prev) => !prev)}
          onViewModeChange={handleModeChange}
          onUploadClick={isProfessional ? handleOpenUploadReel : undefined}
        />
      </DashboardTopBarSlot>

      <div className="space-y-4 pb-10">
        {/* Expandable Mobile Search (only rendered when toggled open or active) */}
        {showMobileSearchInput && (
          <div className="md:hidden">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isCreatorStudio
                  ? "Search your reels..."
                  : "Search reels, creators, #tags..."
              }
              className="h-9 text-xs bg-card"
            />
          </div>
        )}

        {/* Mobile Mode Switcher (Professionals Only) */}
        {isProfessional && (
          <div className="md:hidden grid grid-cols-2 gap-1.5 p-1 rounded-xl border border-border bg-card">
            <button
              type="button"
              onClick={() => handleModeChange("my-reels")}
              className={cn(
                "h-8 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer",
                isCreatorStudio
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Clapperboard className="size-3.5" />
              <span>My Reels</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange("discover")}
              className={cn(
                "h-8 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer",
                !isCreatorStudio
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Compass className="size-3.5" />
              <span>Audience Feed</span>
            </button>
          </div>
        )}

        {/* Creator Studio View (Professionals Only) */}
        {isCreatorStudio ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                  My Reels
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Manage and track the performance of your video content.
                </p>
              </div>
            </div>

            <MyReelsTabs
              activeTab={myReelsTab}
              allCount={allMyReelsCount}
              draftsCount={draftsCount}
              scheduledCount={scheduledCount}
              onTabChange={setMyReelsTab}
            />

            {filteredMyReels.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-12 text-center space-y-4 shadow-2xs">
                <div className="mx-auto size-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                  <Clapperboard className="size-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold text-foreground">
                    No reels in this view
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                    {searchQuery.trim()
                      ? "No studio reels matched your search query."
                      : "Upload a new short showcase reel to share your craftsmanship and expertise with MyKostoma customers."}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2.5">
                  {searchQuery.trim() && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      className="h-9 px-4 rounded-xl text-xs font-semibold"
                    >
                      Clear Search
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={handleOpenUploadReel}
                    leadingIcon={<Plus className="size-3.5" />}
                    className="h-9 px-5 rounded-xl text-xs font-bold shadow-xs"
                  >
                    Upload Reel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {filteredMyReels.map((reel) => (
                  <MyReelGridCard
                    key={reel.id}
                    reel={reel}
                    onManage={handleOpenManageReel}
                    onPreview={setPreviewManagedReel}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Audience Feed View (Consumer Default + Pro Feed Mode) */
          <div className="space-y-4 sm:space-y-6">
            <ReelsFeedTabs
              activeTab={activeFeedTab}
              onTabChange={(tab) => handleModeChange(tab)}
            />

            {activeHashtag && (
              <div className="flex items-center justify-center">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card text-xs font-semibold text-foreground shadow-2xs">
                  <Tag className="size-3.5 text-primary" />
                  <span>Filtering by {activeHashtag}</span>
                  <button
                    type="button"
                    onClick={() => setActiveHashtag(null)}
                    aria-label="Clear hashtag filter"
                    className="p-0.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </button>
                </span>
              </div>
            )}

            {filteredFeedReels.length === 0 ? (
              <div className="max-w-md mx-auto rounded-2xl border border-border bg-card p-10 text-center space-y-4 shadow-2xs">
                <div className="mx-auto size-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                  <Compass className="size-5" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold text-foreground">
                    {activeFeedTab === "following" &&
                    !searchQuery.trim() &&
                    !activeHashtag
                      ? "No followed creators yet"
                      : "No matching reels found"}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {activeFeedTab === "following" &&
                    !searchQuery.trim() &&
                    !activeHashtag
                      ? "Follow professionals in Discover to see their latest project showcases and tips here."
                      : "Try clearing your search query or hashtag filter to explore more reels."}
                  </p>
                </div>

                {activeFeedTab === "following" &&
                !searchQuery.trim() &&
                !activeHashtag ? (
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={() => handleModeChange("discover")}
                    className="h-9 px-5 rounded-xl text-xs font-bold shadow-xs"
                  >
                    Explore Discover
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClearFeedFilters}
                    className="h-9 px-5 rounded-xl text-xs font-semibold"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 sm:gap-10">
                {filteredFeedReels.map((reel) => (
                  <ReelFeedCard
                    key={reel.id}
                    reel={reel}
                    isLiked={likedReelIds.includes(reel.id)}
                    isFollowing={combinedFollowedIds.includes(
                      reel.creatorId.toLowerCase()
                    )}
                    isPlaying={playingReelId === reel.id}
                    isMuted={isMuted}
                    isReported={reportedReelIds.includes(reel.id)}
                    onTogglePlay={handleTogglePlay}
                    onToggleMute={() => setIsMuted((prev) => !prev)}
                    onToggleLike={handleToggleLike}
                    onToggleFollow={handleToggleFollow}
                    onShare={handleShareReel}
                    onOpenCreator={handleOpenCreator}
                    onHashtagClick={handleHashtagClick}
                    onRequestReport={setReportTarget}
                    onViewFullProfile={handleOpenFullProfile}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <ReportReelModal
        isOpen={Boolean(reportTarget)}
        creatorName={reportTarget?.creatorName ?? "Creator"}
        reasons={REEL_REPORT_REASONS}
        onClose={() => setReportTarget(null)}
        onSubmitReport={handleConfirmReport}
      />

      <ReelPlayerModal
        isOpen={Boolean(previewManagedReel)}
        reels={previewManagedReel ? [previewManagedReel] : []}
        activeIndex={0}
        likedReelIds={likedReelIds}
        followedCreatorIds={combinedFollowedIds}
        onClose={() => setPreviewManagedReel(null)}
        onChangeIndex={() => {}}
        onToggleLike={handleToggleLike}
        onToggleFollow={handleToggleFollow}
        onShare={handleShareReel}
      />
    </>
  );
}
