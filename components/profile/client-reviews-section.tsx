"use client";

import type { HTMLAttributes } from "react";
import { Star } from "lucide-react";
import { SectionHeader } from "@/components/consumer-home";
import { cn } from "@/lib/utils";
import type { ProfileRatingBarItem, ProfileReviewItem } from "./types";

export interface RatingSummaryCardProps {
  rating: number;
  reviewCount: number;
  breakdown: ProfileRatingBarItem[];
  className?: string;
}

export function RatingSummaryCard({
  rating,
  reviewCount,
  breakdown,
  className,
}: RatingSummaryCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 shadow-2xs flex flex-col items-center text-center",
        className
      )}
    >
      <span className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
        {rating.toFixed(1)}
      </span>

      <div
        aria-label={`${rating} out of 5 stars`}
        className="flex items-center justify-center gap-1 mt-2.5"
      >
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            className="size-4 text-warning fill-warning shrink-0"
          />
        ))}
      </div>

      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-2">
        BASED ON {reviewCount} REVIEWS
      </span>

      <div className="w-full space-y-2.5 mt-6">
        {breakdown.map((bar) => (
          <div
            key={bar.stars}
            className="flex items-center gap-2.5 text-[11px]"
          >
            <span className="font-bold text-foreground w-2.5 text-left shrink-0">
              {bar.stars}
            </span>

            <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${bar.percentage}%` }}
              />
            </div>

            <span className="font-medium text-muted-foreground w-7 text-right shrink-0">
              {bar.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface ClientReviewCardProps {
  review: ProfileReviewItem;
  className?: string;
}

export function ClientReviewCard({ review, className }: ClientReviewCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={review.avatarUrl}
            alt={review.authorName}
            className="size-10 rounded-full object-cover bg-secondary shrink-0 select-none"
          />

          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-foreground leading-tight truncate">
              {review.authorName}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
              {review.authorRole} • {review.timeAgo}
            </p>
          </div>
        </div>

        <div
          aria-label={`${review.rating} out of 5 stars`}
          className="flex items-center gap-0.5 shrink-0"
        >
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              className={cn(
                "size-3.5 shrink-0",
                idx < review.rating
                  ? "text-warning fill-warning"
                  : "text-border fill-border"
              )}
            />
          ))}
        </div>
      </div>

      <p className="text-xs sm:text-sm italic text-muted-foreground leading-relaxed">
        &ldquo;{review.comment}&rdquo;
      </p>

      {review.professionalResponse && (
        <div className="rounded-xl bg-secondary/60 border-l-2 border-l-primary p-4 space-y-1">
          <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary">
            PROFESSIONAL RESPONSE
          </span>
          <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
            {review.professionalResponse}
          </p>
        </div>
      )}
    </article>
  );
}

export interface ClientReviewsSectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  rating: number;
  reviewCount: number;
  breakdown: ProfileRatingBarItem[];
  reviews: ProfileReviewItem[];
}

export function ClientReviewsSection({
  title = "Client Reviews",
  rating,
  reviewCount,
  breakdown,
  reviews,
  className,
  ...props
}: ClientReviewsSectionProps) {
  return (
    <section
      id="reviews"
      className={cn("w-full space-y-5 scroll-mt-24", className)}
      {...props}
    >
      <SectionHeader title={title} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-3">
          <RatingSummaryCard
            rating={rating}
            reviewCount={reviewCount}
            breakdown={breakdown}
          />
        </div>

        <div className="lg:col-span-9 space-y-4">
          {reviews.map((review) => (
            <ClientReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
