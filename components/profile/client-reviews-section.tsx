"use client";

import { useState, type FormEvent } from "react";
import { ChevronRight, MessageSquarePlus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/consumer-home/section-header";
import { FallbackImage } from "@/components/ui/fallback-image";
import { Textarea } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type {
  ClientReviewCardProps,
  ClientReviewsSectionProps,
  RatingSummaryCardProps,
} from "./types";

export type {
  ClientReviewCardProps,
  ClientReviewsSectionProps,
  RatingSummaryCardProps,
} from "./types";

export function RatingSummaryCard({
  rating,
  reviewCount,
  breakdown,
  isOwner = false,
  repliedCount = 0,
  onWriteReview,
  className,
}: RatingSummaryCardProps) {
  return (
    <div className="space-y-3">
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
              className={cn(
                "size-4 shrink-0",
                idx < Math.round(rating)
                  ? "text-warning fill-warning"
                  : "text-border fill-border"
              )}
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

        {!isOwner && onWriteReview && (
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onWriteReview}
            className="w-full h-10 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs mt-6"
          >
            WRITE A REVIEW
          </Button>
        )}
      </div>

      {!isOwner && onWriteReview && (
        <div className="rounded-xl border border-border bg-card p-4 text-center shadow-2xs">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Only customers who have booked a service can leave a verified
            review.
          </p>
        </div>
      )}

      {isOwner && (
        <div className="rounded-xl border border-border bg-card p-4 text-center shadow-2xs">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            You have responded to{" "}
            <strong className="font-semibold text-foreground">
              {repliedCount}
            </strong>{" "}
            featured client reviews. Prompt replies build stronger client trust.
          </p>
        </div>
      )}
    </div>
  );
}

export function ClientReviewCard({
  review,
  professionalName = "Professional",
  isOwner = false,
  onSubmitReply,
  className,
}: ClientReviewCardProps) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyDraft, setReplyDraft] = useState(
    review.professionalResponse ?? ""
  );

  const handleSaveReply = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replyDraft.trim()) return;
    onSubmitReply?.(review.id, replyDraft);
    setReplyOpen(false);
  };

  return (
    <article
      className={cn(
        "rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <FallbackImage
            src={review.avatarUrl}
            alt={review.authorName}
            fallbackType="user"
            variant="avatar"
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

      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        &ldquo;{review.comment}&rdquo;
      </p>

      {review.professionalResponse && !replyOpen && (
        <div className="rounded-xl bg-secondary/60 border-l-2 border-l-primary p-4 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary">
              RESPONSE FROM {professionalName.toUpperCase()}
            </span>
            {isOwner && onSubmitReply && (
              <button
                type="button"
                onClick={() => {
                  setReplyDraft(review.professionalResponse ?? "");
                  setReplyOpen(true);
                }}
                className="text-[10px] font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Edit Reply
              </button>
            )}
          </div>
          <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
            {review.professionalResponse}
          </p>
        </div>
      )}

      {isOwner && !review.professionalResponse && !replyOpen && onSubmitReply && (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setReplyOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
          >
            <MessageSquarePlus className="size-3.5" />
            <span>Write a response</span>
          </button>
        </div>
      )}

      {isOwner && replyOpen && (
        <form
          onSubmit={handleSaveReply}
          className="rounded-xl bg-secondary/40 border border-border p-3.5 space-y-2.5"
        >
          <Textarea
            value={replyDraft}
            onChange={(e) => setReplyDraft(e.target.value)}
            placeholder={`Write a public response to ${review.authorName}...`}
            className="min-h-20 bg-card text-xs resize-none"
          />
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setReplyOpen(false)}
              className="h-8 px-3 rounded-lg text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              size="sm"
              className="h-8 px-4 rounded-lg text-xs font-semibold"
            >
              Publish Reply
            </Button>
          </div>
        </form>
      )}
    </article>
  );
}

export function ClientReviewsSection({
  title = "Client Reviews",
  actionLabel = "VIEW ALL REVIEWS",
  professionalName = "Professional",
  isOwner = false,
  rating,
  reviewCount,
  breakdown,
  reviews,
  onViewAllClick,
  onSubmitReply,
  className,
  ...props
}: ClientReviewsSectionProps) {
  return (
    <section
      id="reviews"
      className={cn("w-full space-y-5 scroll-mt-32 sm:scroll-mt-36", className)}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeader title={title} />

        {actionLabel && onViewAllClick && (
          <button
            type="button"
            onClick={onViewAllClick}
            className="group inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors shrink-0 cursor-pointer"
          >
            <span>{actionLabel}</span>
            <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-3">
          <RatingSummaryCard
            rating={rating}
            reviewCount={reviewCount}
            breakdown={breakdown}
            isOwner={isOwner}
          />
        </div>

        <div className="lg:col-span-9 space-y-4">
          {reviews.map((review) => (
            <ClientReviewCard
              key={review.id}
              review={review}
              professionalName={professionalName}
              isOwner={isOwner}
              onSubmitReply={onSubmitReply}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
