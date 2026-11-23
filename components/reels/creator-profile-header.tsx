"use client";

import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  Copy,
  ExternalLink,
  Link2,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { formatCompactCount } from "@/features/reels/services/reelsHelpers";
import type { CreatorProfileHeaderProps } from "./types";

export function CreatorProfileHeader({
  creator,
  isFollowing,
  onToggleFollow,
  onMessageCreator,
  onViewFullStorefront,
  onCopyProfileLink,
}: CreatorProfileHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  return (
    <section
      aria-label="Creator profile header"
      className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 pb-6"
    >
      <FallbackImage
        src={creator.avatarUrl}
        alt={creator.name}
        fallbackType="user"
        variant="avatar"
        className="size-24 sm:size-28 rounded-full border border-border bg-card object-cover shrink-0 shadow-xs"
      />

      <div className="flex-1 min-w-0 space-y-3.5 w-full">
        {/* Name & Actions Row */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              {creator.name}
            </h2>
            {creator.verified && (
              <BadgeCheck className="size-5 text-info fill-info shrink-0" />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              onClick={onToggleFollow}
              className="h-9 px-5 rounded-lg text-xs font-bold shadow-xs"
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onMessageCreator}
              leadingIcon={<MessageSquare className="size-3.5" />}
              className="h-9 px-4 rounded-lg text-xs font-bold"
            >
              Message
            </Button>

            <div ref={menuRef} className="relative">
              <Button
                type="button"
                variant="outline"
                size="sm"
                aria-label="More creator actions"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
                className="h-9 w-9 p-0 rounded-lg"
              >
                <ChevronDown className="size-4" />
              </Button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-1.5 w-52 rounded-xl border border-border bg-card shadow-lg py-1.5 z-20"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      onViewFullStorefront();
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs font-medium text-foreground hover:bg-secondary/70 flex items-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="size-3.5 text-muted-foreground" />
                    <span>View Full Pro Profile</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      onCopyProfileLink();
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs font-medium text-foreground hover:bg-secondary/70 flex items-center gap-2 cursor-pointer"
                  >
                    <Copy className="size-3.5 text-muted-foreground" />
                    <span>Copy Profile Link</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
          <p className="text-muted-foreground">
            <strong className="font-extrabold text-foreground">
              {creator.reelsCount}
            </strong>{" "}
            Reels
          </p>
          <p className="text-muted-foreground">
            <strong className="font-extrabold text-foreground">
              {formatCompactCount(creator.followersCount)}
            </strong>{" "}
            Followers
          </p>
          <p className="text-muted-foreground">
            <strong className="font-extrabold text-foreground">
              {creator.followingCount.toLocaleString("en-US")}
            </strong>{" "}
            Following
          </p>
        </div>

        {/* Bio & Location */}
        <div className="space-y-1 max-w-xl">
          <p className="text-xs sm:text-sm font-bold text-foreground">
            {creator.roleTitle}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {creator.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              <span>Based in {creator.location}</span>
            </span>

            {creator.websiteLabel && (
              <button
                type="button"
                onClick={onViewFullStorefront}
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline cursor-pointer"
              >
                <Link2 className="size-3.5 shrink-0" />
                <span>{creator.websiteLabel}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
