"use client";

import { BadgeCheck, Star } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type { ShopProviderStripProps } from "./types";

export function ShopProviderStrip({
  provider,
  variant = "detail",
  onViewProfile,
  className,
}: ShopProviderStripProps) {
  const isDetail = variant === "detail";

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-2xl shadow-2xs flex items-center justify-between gap-4",
        isDetail ? "p-4 sm:p-5" : "p-5 sm:p-6",
        className
      )}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div
          className={cn(
            "rounded-full overflow-hidden bg-secondary shrink-0",
            isDetail ? "size-14" : "size-12"
          )}
        >
          <FallbackImage
            src={provider.avatarUrl}
            alt={provider.name}
            variant="avatar"
            fallbackType="user"
            className="size-full object-cover"
          />
        </div>

        <div className="min-w-0 space-y-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight truncate">
              {provider.name}
            </h3>
            {provider.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success-bg text-success text-[9px] font-bold uppercase tracking-wider shrink-0">
                <BadgeCheck className="size-3" />
                {isDetail ? "Verified Expert" : "Verified Professional"}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {provider.role}
          </p>
          {isDetail && onViewProfile && (
            <button
              type="button"
              onClick={onViewProfile}
              className="text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary-hover underline underline-offset-4 transition-colors cursor-pointer pt-1"
            >
              View professional profile
            </button>
          )}
        </div>
      </div>

      {isDetail && (
        <div className="text-right shrink-0">
          <span className="inline-flex items-center gap-1 text-lg font-bold text-foreground">
            <Star className="size-4 text-warning fill-warning" />
            {provider.rating.toFixed(1)}
          </span>
          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
            {provider.reviewsCount} reviews
          </span>
        </div>
      )}
    </div>
  );
}

