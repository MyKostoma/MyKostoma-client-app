"use client";

import { Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReviewsEmptyStateProps, ReviewsTabId } from "./types";

const EMPTY_COPY_BY_TAB: Record<
  ReviewsTabId,
  { title: string; subtitle: string; howItWorks: string }
> = {
  received: {
    title: "No reviews yet",
    subtitle:
      "Reviews from your completed orders and professional interactions will appear here.",
    howItWorks: "Reviews are posted after order completion",
  },
  given: {
    title: "No reviews given yet",
    subtitle:
      "Feedback you submit for consumers or service professionals after completed orders will appear here.",
    howItWorks: "You can rate completed orders anytime from the Pending tab",
  },
  pending: {
    title: "All caught up!",
    subtitle:
      "You have no completed orders waiting for a review right now.",
    howItWorks: "Completed orders automatically appear here for rating",
  },
};

export function ReviewsEmptyState({
  tab,
  hasActiveFilters,
  onClearFilters,
  onBrowseOrders,
}: ReviewsEmptyStateProps) {
  const copy = EMPTY_COPY_BY_TAB[tab];

  return (
    <div className="rounded-2xl border border-border bg-card px-6 py-16 sm:py-20 shadow-2xs flex flex-col items-center justify-center text-center">
      <div className="size-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground mb-5">
        <Star className="size-5" />
      </div>

      <h3 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
        {hasActiveFilters ? "No matching reviews" : copy.title}
      </h3>

      <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mt-2 leading-relaxed">
        {hasActiveFilters
          ? "No reviews matched your current search or filter criteria. Try adjusting or resetting your filters."
          : copy.subtitle}
      </p>

      {hasActiveFilters && onClearFilters ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="h-9 px-5 rounded-lg text-xs font-semibold mt-6"
        >
          Clear Filters
        </Button>
      ) : (
        <div className="mt-7 space-y-2.5 flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            HOW IT WORKS
          </span>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/45 text-xs text-muted-foreground">
            <Info className="size-3.5 shrink-0" />
            <span>{copy.howItWorks}</span>
          </div>

          {onBrowseOrders && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onBrowseOrders}
              className="h-8 px-4 rounded-lg text-xs font-semibold mt-2"
            >
              View Orders
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
