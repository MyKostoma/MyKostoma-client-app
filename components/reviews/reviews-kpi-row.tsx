"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReviewsKpiRowProps } from "./types";

export function ReviewsKpiRow({ summary, className }: ReviewsKpiRowProps) {
  const filledStars = Math.round(summary.averageRating);

  return (
    <section
      aria-label="Reviews summary metrics"
      className={cn("grid grid-cols-1 sm:grid-cols-3 gap-4", className)}
    >
      {/* Average Rating */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          AVERAGE RATING
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {summary.averageRating > 0
              ? summary.averageRating.toFixed(1)
              : "0.0"}
          </span>

          <div
            aria-label={`${summary.averageRating.toFixed(1)} out of 5 stars`}
            className="flex items-center gap-0.5"
          >
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <Star
                key={starIndex}
                className={cn(
                  "size-4 shrink-0",
                  starIndex <= filledStars
                    ? "text-warning fill-warning"
                    : "text-border fill-border"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Total Reviews */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          TOTAL REVIEWS
        </p>
        <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          {summary.totalReviews.toLocaleString()}
        </p>
      </div>

      {/* Response Rate */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          RESPONSE RATE
        </p>
        <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          {summary.responseRatePercent}%
        </p>
      </div>
    </section>
  );
}
