"use client";

import { CheckCircle2, MapPin, Star } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type { ReviewDetailCardProps } from "./types";

export function ReviewDetailCard({ review }: ReviewDetailCardProps) {
  const displayName =
    review.direction === "received" ? review.authorName : review.recipientName;
  const displayAvatar =
    review.direction === "received"
      ? review.authorAvatarUrl
      : review.recipientAvatarUrl;

  return (
    <section
      aria-label="Review details"
      className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <FallbackImage
            src={displayAvatar}
            alt={displayName}
            fallbackType="user"
            variant="avatar"
            className="size-12 rounded-full border border-border bg-secondary object-cover shrink-0"
          />

          <div className="min-w-0 space-y-1">
            <h2 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight truncate">
              {displayName}
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              <div
                aria-label={`${review.rating} out of 5 stars`}
                className="flex items-center gap-0.5 shrink-0"
              >
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <Star
                    key={starIndex}
                    className={cn(
                      "size-3.5 shrink-0",
                      starIndex <= review.rating
                        ? "text-foreground fill-foreground"
                        : "text-border fill-border"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {review.dateLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right shrink-0 space-y-1">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            ORDER REFERENCE
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-md border border-border bg-secondary/50 text-xs font-bold text-foreground">
            #{review.orderCode}
          </span>
        </div>
      </div>

      {review.headline && (
        <p className="text-sm sm:text-base font-extrabold italic text-foreground tracking-tight">
          &ldquo;{review.headline}&rdquo;
        </p>
      )}

      <div className="space-y-3 text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
        {review.comment}
      </div>

      <div className="pt-4 border-t border-border/80 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
        {review.verifiedPurchase && (
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-muted-foreground shrink-0" />
            <span>Verified Purchase</span>
          </span>
        )}

        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5 text-muted-foreground shrink-0" />
          <span>{review.locationLabel}</span>
        </span>
      </div>
    </section>
  );
}
