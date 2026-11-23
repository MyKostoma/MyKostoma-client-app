"use client";

import { Play } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { formatCompactCount } from "@/features/reels/services/reelsHelpers";
import type { CreatorReelsGridProps } from "./types";

export function CreatorReelsGrid({
  reels,
  onSelectReel,
}: CreatorReelsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
      {reels.map((reel, idx) => (
        <button
          key={reel.id}
          type="button"
          onClick={() => onSelectReel(idx)}
          aria-label={`Watch ${reel.title}`}
          className="relative aspect-9/16 overflow-hidden rounded-lg bg-black group cursor-pointer text-left"
        >
          <FallbackImage
            src={reel.thumbnailUrl}
            alt={reel.title}
            fallbackType="portfolio"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="size-11 rounded-full bg-black/55 text-primary-foreground flex items-center justify-center">
              <Play className="size-5 ml-0.5 fill-current" />
            </span>
          </div>

          <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 text-primary-foreground text-xs font-bold">
            <Play className="size-3 fill-current shrink-0" />
            <span>{formatCompactCount(reel.viewsCount)}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
