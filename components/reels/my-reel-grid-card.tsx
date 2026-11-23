"use client";

import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { formatCompactCount } from "@/features/reels/services/reelsHelpers";
import { cn } from "@/lib/utils";
import type { MyReelGridCardProps, ReelVisibility } from "./types";

const STATUS_BADGE_MAP: Record<
  ReelVisibility,
  { label: string; badgeClass: string }
> = {
  public: {
    label: "PUBLISHED",
    badgeClass: "bg-foreground/85 text-background",
  },
  draft: {
    label: "DRAFT",
    badgeClass: "bg-secondary/95 text-foreground",
  },
  scheduled: {
    label: "SCHEDULED",
    badgeClass: "bg-info-bg text-info",
  },
};

export function MyReelGridCard({
  reel,
  onManage,
  onPreview,
}: MyReelGridCardProps) {
  const badge = STATUS_BADGE_MAP[reel.status];

  return (
    <article className="relative aspect-9/16 rounded-2xl overflow-hidden bg-black border border-border shadow-2xs group">
      <FallbackImage
        src={reel.thumbnailUrl}
        alt={reel.title}
        fallbackType="portfolio"
        onClick={() => onPreview(reel)}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/80" />

      {/* Top-Left Status Badge */}
      <span
        className={cn(
          "absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider shadow-xs",
          badge.badgeClass
        )}
      >
        {badge.label}
      </span>

      {/* Centered Analytics & Manage Action */}
      <div className="absolute inset-x-3 bottom-4 flex flex-col items-center text-center gap-2 text-primary-foreground">
        {reel.status === "public" ? (
          <div className="space-y-0.5">
            <p className="text-base sm:text-lg font-extrabold tracking-tight leading-none">
              {formatCompactCount(reel.viewsCount)}
            </p>
            <p className="text-[11px] font-medium opacity-85">Total Views</p>
          </div>
        ) : (
          <p className="text-[11px] font-semibold opacity-90">
            {reel.uploadedAtLabel}
          </p>
        )}

        <p className="text-xs font-semibold opacity-95 line-clamp-1 px-1">
          {reel.title}
        </p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onManage(reel.id)}
          className="h-8 px-4 rounded-lg text-xs font-bold bg-card text-foreground border-border hover:bg-secondary shadow-xs"
        >
          Manage
        </Button>
      </div>
    </article>
  );
}
