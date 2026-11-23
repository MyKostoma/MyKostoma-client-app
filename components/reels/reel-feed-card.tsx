"use client";

import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  Check,
  ExternalLink,
  Flag,
  Heart,
  MoreVertical,
  Pause,
  Play,
  Plus,
  Share2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { formatCompactCount } from "@/features/reels/services/reelsHelpers";
import { cn } from "@/lib/utils";
import type { ReelFeedCardProps, ReelItem } from "./types";

interface ReelActionRailProps {
  placement: "overlay" | "side";
  reel: ReelItem;
  isLiked: boolean;
  isFollowing: boolean;
  isReported: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onToggleLike: (reelId: string) => void;
  onToggleFollow: (creatorId: string, creatorName: string) => void;
  onShare: (reel: ReelItem) => void;
  onOpenCreator: (creatorId: string) => void;
  onViewFullProfile: (creatorId: string) => void;
  onRequestReport: (reel: ReelItem) => void;
}

function ReelActionRail({
  placement,
  reel,
  isLiked,
  isFollowing,
  isReported,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  onToggleLike,
  onToggleFollow,
  onShare,
  onOpenCreator,
  onViewFullProfile,
  onRequestReport,
}: ReelActionRailProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const isOverlay = placement === "overlay";

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onCloseMenu();
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen, onCloseMenu]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "flex flex-col items-center shrink-0",
        isOverlay
          ? "sm:hidden absolute right-2.5 bottom-4 z-30 gap-3.5"
          : "hidden sm:flex gap-3 pb-3"
      )}
    >
      {/* Like */}
      <button
        type="button"
        onClick={() => onToggleLike(reel.id)}
        aria-label={isLiked ? "Unlike reel" : "Like reel"}
        className="flex flex-col items-center gap-1 cursor-pointer group/btn"
      >
        <span
          className={cn(
            "size-10 sm:size-11 rounded-full border flex items-center justify-center transition-all group-hover/btn:scale-105",
            isLiked
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : isOverlay
                ? "border-primary-foreground/20 bg-black/50 backdrop-blur-xs text-primary-foreground hover:bg-black/70"
                : "border-border bg-card text-foreground shadow-sm hover:bg-secondary"
          )}
        >
          <Heart className={cn("size-4 sm:size-5", isLiked && "fill-current")} />
        </span>
        <span
          className={cn(
            "text-[11px] font-bold leading-none",
            isOverlay
              ? "text-primary-foreground drop-shadow-xs"
              : "text-foreground"
          )}
        >
          {formatCompactCount(reel.likesCount)}
        </span>
      </button>

      {/* Follow */}
      <button
        type="button"
        onClick={() => onToggleFollow(reel.creatorId, reel.creatorName)}
        aria-label={isFollowing ? "Unfollow creator" : "Follow creator"}
        className="flex flex-col items-center gap-1 cursor-pointer group/btn"
      >
        <span
          className={cn(
            "size-10 sm:size-11 rounded-full border flex items-center justify-center transition-all group-hover/btn:scale-105",
            isFollowing
              ? isOverlay
                ? "border-border bg-card text-foreground shadow-sm"
                : "border-foreground bg-foreground text-background shadow-sm"
              : isOverlay
                ? "border-primary-foreground/20 bg-black/50 backdrop-blur-xs text-primary-foreground hover:bg-black/70"
                : "border-border bg-card text-foreground shadow-sm hover:bg-secondary"
          )}
        >
          {isFollowing ? (
            <Check className="size-4 sm:size-5" />
          ) : (
            <Plus className="size-4 sm:size-5" />
          )}
        </span>
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-wider leading-none",
            isOverlay
              ? "text-primary-foreground drop-shadow-xs"
              : "text-muted-foreground"
          )}
        >
          {isFollowing ? "Following" : "Follow"}
        </span>
      </button>

      {/* Share */}
      <button
        type="button"
        onClick={() => onShare(reel)}
        aria-label="Share reel"
        className="flex flex-col items-center gap-1 cursor-pointer group/btn"
      >
        <span
          className={cn(
            "size-10 sm:size-11 rounded-full border flex items-center justify-center transition-all group-hover/btn:scale-105",
            isOverlay
              ? "border-primary-foreground/20 bg-black/50 backdrop-blur-xs text-primary-foreground hover:bg-black/70"
              : "border-border bg-card text-foreground shadow-sm hover:bg-secondary"
          )}
        >
          <Share2 className="size-4 sm:size-5" />
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold leading-none",
            isOverlay
              ? "text-primary-foreground drop-shadow-xs"
              : "text-muted-foreground"
          )}
        >
          Share
        </span>
      </button>

      {/* Overflow Menu */}
      <div ref={menuRef} className="relative">
        <button
          type="button"
          aria-label="More reel actions"
          aria-expanded={menuOpen}
          onClick={onToggleMenu}
          className={cn(
            "size-10 sm:size-11 rounded-full border flex items-center justify-center transition-colors cursor-pointer",
            isOverlay
              ? "border-primary-foreground/20 bg-black/50 backdrop-blur-xs text-primary-foreground hover:bg-black/70"
              : "border-border bg-card text-muted-foreground shadow-sm hover:text-foreground hover:bg-secondary"
          )}
        >
          <MoreVertical className="size-4 sm:size-5" />
        </button>

        {menuOpen && (
          <div
            role="menu"
            className={cn(
              "absolute w-48 rounded-xl border border-border bg-card shadow-xl py-1.5 z-40",
              isOverlay ? "right-12 bottom-0" : "right-0 bottom-12"
            )}
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onCloseMenu();
                onOpenCreator(reel.creatorId);
              }}
              className="w-full px-3.5 py-2 text-left text-xs font-medium text-foreground hover:bg-secondary/70 flex items-center gap-2 cursor-pointer"
            >
              <ExternalLink className="size-3.5 text-muted-foreground" />
              <span>Creator Reels Profile</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onCloseMenu();
                onViewFullProfile(reel.creatorId);
              }}
              className="w-full px-3.5 py-2 text-left text-xs font-medium text-foreground hover:bg-secondary/70 flex items-center gap-2 cursor-pointer"
            >
              <ExternalLink className="size-3.5 text-muted-foreground" />
              <span>View Full Services</span>
            </button>

            <button
              type="button"
              role="menuitem"
              disabled={isReported}
              onClick={() => {
                onCloseMenu();
                onRequestReport(reel);
              }}
              className="w-full px-3.5 py-2 text-left text-xs font-medium text-error hover:bg-error-bg/60 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              <Flag className="size-3.5" />
              <span>{isReported ? "Reel Reported" : "Report Reel"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ReelFeedCard({
  reel,
  isLiked,
  isFollowing,
  isPlaying,
  isMuted,
  isReported = false,
  onTogglePlay,
  onToggleMute,
  onToggleLike,
  onToggleFollow,
  onShare,
  onOpenCreator,
  onHashtagClick,
  onRequestReport,
  onViewFullProfile,
}: ReelFeedCardProps) {
  const [overlayMenuOpen, setOverlayMenuOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [progressPercent, setProgressPercent] = useState(14);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.muted = isMuted;
    if (isPlaying) {
      void videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
    }
  }, [isMuted, isPlaying]);

  useEffect(() => {
    if (!isPlaying || reel.videoUrl) return;
    const stepMs = Math.max(120, Math.round((reel.durationSeconds * 1000) / 100));
    const timer = window.setInterval(() => {
      setProgressPercent((prev) => (prev >= 100 ? 0 : prev + 1));
    }, stepMs);
    return () => window.clearInterval(timer);
  }, [isPlaying, reel.durationSeconds, reel.videoUrl]);

  return (
    <article className="flex items-end justify-center gap-4 w-full">
      {/* Vertical 9:16 Video Card */}
      <div className="relative w-full max-w-[400px] sm:max-w-[380px] aspect-9/16 rounded-2xl shadow-lg group select-none">
        {/* Clipped Media Container */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden bg-black border border-border">
          {/* Top Playback Progress Bar */}
          <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-border/25">
            <div
              className="h-full bg-primary transition-[width] duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Media Stage */}
          {reel.videoUrl ? (
            <video
              ref={videoRef}
              src={reel.videoUrl}
              poster={reel.thumbnailUrl}
              muted={isMuted}
              loop
              playsInline
              onTimeUpdate={(e) => {
                const vid = e.currentTarget;
                if (vid.duration > 0) {
                  setProgressPercent(
                    Math.round((vid.currentTime / vid.duration) * 100)
                  );
                }
              }}
              onClick={() => onTogglePlay(reel.id)}
              className="w-full h-full object-cover cursor-pointer"
            />
          ) : (
            <FallbackImage
              src={reel.thumbnailUrl}
              alt={reel.title}
              fallbackType="portfolio"
              onClick={() => onTogglePlay(reel.id)}
              className="w-full h-full object-cover cursor-pointer"
            />
          )}

          {/* Top-Right Mute Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMute();
            }}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="absolute top-3 right-3 z-20 size-8 rounded-full bg-black/50 text-primary-foreground flex items-center justify-center hover:bg-black/75 transition-colors cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="size-4" />
            ) : (
              <Volume2 className="size-4" />
            )}
          </button>

          {/* Center Play/Pause Overlay */}
          <button
            type="button"
            onClick={() => onTogglePlay(reel.id)}
            aria-label={isPlaying ? "Pause reel" : "Play reel"}
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
          >
            <span
              className={cn(
                "size-14 rounded-full bg-black/50 text-primary-foreground flex items-center justify-center transition-opacity duration-200",
                isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              )}
            >
              {isPlaying ? (
                <Pause className="size-6" />
              ) : (
                <Play className="size-6 ml-0.5 fill-current" />
              )}
            </span>
          </button>

          {/* Bottom Creator & Caption Overlay */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 pr-16 sm:pr-4 pt-16 space-y-2.5 text-primary-foreground"
          >
            <button
              type="button"
              onClick={() => onOpenCreator(reel.creatorId)}
              className="flex items-center gap-2.5 min-w-0 text-left cursor-pointer group/creator"
            >
              <FallbackImage
                src={reel.creatorAvatarUrl}
                alt={reel.creatorName}
                fallbackType="user"
                variant="avatar"
                className="size-9 rounded-full object-cover border border-border/60 shrink-0"
              />

              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold leading-tight flex items-center gap-1 truncate group-hover/creator:underline">
                  <span className="truncate">{reel.creatorName}</span>
                  {reel.creatorVerified && (
                    <BadgeCheck className="size-3.5 text-info fill-info shrink-0" />
                  )}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80 truncate">
                  {reel.creatorRole}
                </p>
              </div>
            </button>

            <p className="text-xs leading-relaxed opacity-95 line-clamp-2">
              {reel.caption}
            </p>

            {reel.hashtags.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {reel.hashtags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onHashtagClick(tag)}
                    className="text-[11px] font-medium opacity-85 hover:opacity-100 hover:underline cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile In-Video Action Rail */}
        <ReelActionRail
          placement="overlay"
          reel={reel}
          isLiked={isLiked}
          isFollowing={isFollowing}
          isReported={isReported}
          menuOpen={overlayMenuOpen}
          onToggleMenu={() => setOverlayMenuOpen((prev) => !prev)}
          onCloseMenu={() => setOverlayMenuOpen(false)}
          onToggleLike={onToggleLike}
          onToggleFollow={onToggleFollow}
          onShare={onShare}
          onOpenCreator={onOpenCreator}
          onViewFullProfile={onViewFullProfile}
          onRequestReport={onRequestReport}
        />
      </div>

      {/* Desktop External Side Action Rail */}
      <ReelActionRail
        placement="side"
        reel={reel}
        isLiked={isLiked}
        isFollowing={isFollowing}
        isReported={isReported}
        menuOpen={sideMenuOpen}
        onToggleMenu={() => setSideMenuOpen((prev) => !prev)}
        onCloseMenu={() => setSideMenuOpen(false)}
        onToggleLike={onToggleLike}
        onToggleFollow={onToggleFollow}
        onShare={onShare}
        onOpenCreator={onOpenCreator}
        onViewFullProfile={onViewFullProfile}
        onRequestReport={onRequestReport}
      />
    </article>
  );
}
