"use client";

import type { MouseEvent } from "react";
import {
  ArrowLeft,
  Edit3,
  Pause,
  Play,
  Share2,
  Trash2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { formatExactCount } from "@/features/reels/services/reelsHelpers";
import { cn } from "@/lib/utils";
import type { ManageReelWorkspaceProps, ReelVisibility } from "./types";

const VISIBILITY_DISPLAY_LABEL: Record<ReelVisibility, string> = {
  public: "Public",
  draft: "Draft",
  scheduled: "Scheduled",
};

export function ManageReelWorkspace({
  reel,
  isPlaying,
  isMuted,
  progressPercent,
  onBack,
  onTogglePlay,
  onToggleMute,
  onScrub,
  onOpenEdit,
  onShareLink,
  onOpenDelete,
}: ManageReelWorkspaceProps) {
  const handleProgressBarClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    onScrub(Math.round(ratio * 100));
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-base sm:text-xl font-extrabold tracking-tight text-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <ArrowLeft className="size-5 shrink-0" />
        <span>Manage Reel: &ldquo;{reel.title}&rdquo;</span>
      </button>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 9:16 Playback Card */}
        <div className="lg:col-span-4 max-w-xs w-full mx-auto lg:mx-0">
          <div className="relative aspect-9/16 rounded-2xl overflow-hidden bg-black border border-border shadow-md group select-none">
            {reel.videoUrl ? (
              <video
                src={reel.videoUrl}
                poster={reel.thumbnailUrl}
                autoPlay={isPlaying}
                muted={isMuted}
                loop
                playsInline
                onClick={onTogglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />
            ) : (
              <FallbackImage
                src={reel.thumbnailUrl}
                alt={reel.title}
                fallbackType="portfolio"
                onClick={onTogglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />
            )}

            <div className="pointer-events-none absolute inset-0 bg-black/25" />

            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? "Unmute preview" : "Mute preview"}
              className="absolute top-3 right-3 z-20 size-8 rounded-full bg-black/55 text-primary-foreground flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </button>

            <button
              type="button"
              onClick={onTogglePlay}
              aria-label={isPlaying ? "Pause video preview" : "Play video preview"}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 text-primary-foreground cursor-pointer"
            >
              <span className="size-12 rounded-full bg-card/85 text-foreground flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
                {isPlaying ? (
                  <Pause className="size-5" />
                ) : (
                  <Play className="size-5 ml-0.5 fill-current" />
                )}
              </span>
              <span className="text-xs font-semibold opacity-90">
                Video Playback Preview
              </span>
            </button>

            {/* Bottom Scrubber */}
            <div
              onClick={handleProgressBarClick}
              role="slider"
              aria-label="Video playback progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
              tabIndex={0}
              className="absolute inset-x-0 bottom-0 z-20 h-2 bg-border/40 cursor-pointer"
            >
              <div
                className="h-full bg-primary transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Analytics & Details Column */}
        <div className="lg:col-span-8 space-y-5">
          {/* 3 KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                VIEWS
              </p>
              <p className="text-2xl font-extrabold tracking-tight text-foreground">
                {formatExactCount(reel.viewsCount)}
              </p>
              <p className="text-xs font-semibold text-success">
                {reel.viewsTrendLabel}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                LIKES
              </p>
              <p className="text-2xl font-extrabold tracking-tight text-foreground">
                {formatExactCount(reel.likesCount)}
              </p>
              <p className="text-xs text-muted-foreground">
                {reel.engagementRateLabel}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                COMMENTS
              </p>
              <p className="text-2xl font-extrabold tracking-tight text-foreground">
                {formatExactCount(reel.commentsCount)}
              </p>
              <p className="text-xs text-muted-foreground">
                {reel.commentsTodayLabel}
              </p>
            </div>
          </div>

          {/* Reel Details Card */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-5">
            <h2 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">
              Reel Details
            </h2>

            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                CAPTION
              </p>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                {reel.caption}{" "}
                {reel.hashtags.length > 0 && (
                  <span className="text-muted-foreground">
                    {reel.hashtags.join(" ")}
                  </span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-border/80 text-xs">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  UPLOADED
                </p>
                <p className="font-semibold text-foreground">
                  {reel.uploadedAtLabel}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  VISIBILITY
                </p>
                <p className="font-semibold text-foreground">
                  {VISIBILITY_DISPLAY_LABEL[reel.status]}
                </p>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  AUDIO
                </p>
                <p className="font-semibold text-foreground truncate">
                  {reel.audioLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onOpenEdit}
              leadingIcon={<Edit3 className="size-3.5" />}
              className="h-10 rounded-xl text-xs font-bold"
            >
              Edit Reel
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onShareLink}
              leadingIcon={<Share2 className="size-3.5" />}
              className="h-10 rounded-xl text-xs font-bold"
            >
              Share Link
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onOpenDelete}
              leadingIcon={<Trash2 className="size-3.5" />}
              className={cn(
                "h-10 rounded-xl text-xs font-bold border-error/45 text-error hover:bg-error-bg hover:text-error"
              )}
            >
              Delete Reel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
