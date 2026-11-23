"use client";

import { useState, type FormEvent } from "react";
import { CornerDownRight, Share2, Star, ThumbsUp } from "lucide-react";
import { SectionHeader } from "@/components/consumer-home/section-header";
import { ReviewsEmptyState } from "@/components/reviews/reviews-empty-state";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { Select, Textarea } from "@/components/ui/form-fields";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { RatingSummaryCard } from "./client-reviews-section";
import type {
  ProfileReviewFilter,
  ProfileReviewItem,
  ProfileReviewsTabProps,
  ProfileSortReview,
} from "./types";

interface ReviewDetailCardProps {
  review: ProfileReviewItem;
  isOwner: boolean;
  isHelpfulActive: boolean;
  onToggleHelpful: (reviewId: string) => void;
  onShareReview: (review: ProfileReviewItem) => void;
  onSubmitReply: (reviewId: string, text: string) => void;
}

function ReviewDetailCard({
  review,
  isOwner,
  isHelpfulActive,
  onToggleHelpful,
  onShareReview,
  onSubmitReply,
}: ReviewDetailCardProps) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyDraft, setReplyDraft] = useState(
    review.professionalResponse ?? ""
  );

  const handleSaveReply = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replyDraft.trim()) return;
    onSubmitReply(review.id, replyDraft.trim());
    setReplyOpen(false);
  };

  return (
    <article className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <FallbackImage
            src={review.avatarUrl}
            alt={review.authorName}
            fallbackType="user"
            variant="avatar"
            className="size-10 rounded-full object-cover bg-secondary border border-border shrink-0 select-none"
          />

          <div className="min-w-0">
            <h3 className="text-sm font-bold text-foreground leading-tight truncate">
              {review.authorName}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
              {review.verifiedPurchase && !review.authorRole
                ? "Verified Purchase"
                : review.authorRole}{" "}
              • {review.dateLabel || review.timeAgo}
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
                  ? "text-foreground fill-foreground"
                  : "text-border fill-border"
              )}
            />
          ))}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
        &ldquo;{review.comment}&rdquo;
      </p>

      {review.photos && review.photos.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {review.photos.map((photoUrl, idx) => (
            <div
              key={`${review.id}-photo-${idx}`}
              className="size-16 sm:size-20 rounded-xl border border-border bg-secondary overflow-hidden shrink-0"
            >
              <FallbackImage
                src={photoUrl}
                alt={`${review.authorName} project photo ${idx + 1}`}
                fallbackType="portfolio"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Existing Professional Response Block */}
      {review.professionalResponse && !replyOpen && (
        <div className="rounded-xl bg-secondary/50 border-l-2 border-l-foreground p-4 space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-foreground">
              PROFESSIONAL RESPONSE
            </span>

            <div className="flex items-center gap-3">
              {review.professionalResponseDate && (
                <span className="text-[11px] text-muted-foreground">
                  {review.professionalResponseDate}
                </span>
              )}
              {isOwner && (
                <button
                  type="button"
                  onClick={() => {
                    setReplyDraft(review.professionalResponse ?? "");
                    setReplyOpen(true);
                  }}
                  className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  EDIT
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            &ldquo;{review.professionalResponse}&rdquo;
          </p>
        </div>
      )}

      {/* Reply Trigger for Unresponded Owner View */}
      {isOwner && !review.professionalResponse && !replyOpen && (
        <div className="pt-0.5">
          <button
            type="button"
            onClick={() => {
              setReplyDraft("");
              setReplyOpen(true);
            }}
            className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <CornerDownRight className="size-3.5" />
            <span>REPLY TO REVIEW</span>
          </button>
        </div>
      )}

      {/* Inline Write / Edit Response Composer */}
      {isOwner && replyOpen && (
        <form
          onSubmit={handleSaveReply}
          className="pt-3 border-t border-border space-y-3"
        >
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="w-0.5 h-3.5 bg-primary rounded-full shrink-0"
            />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-foreground">
              {review.professionalResponse ? "EDIT RESPONSE" : "WRITE A RESPONSE"}
            </span>
          </div>

          <Textarea
            value={replyDraft}
            maxLength={500}
            onChange={(e) => setReplyDraft(e.target.value)}
            placeholder="Thank the client and acknowledge their feedback..."
            className="min-h-24 bg-secondary/25 text-xs sm:text-sm resize-none"
          />

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setReplyOpen(false)}
              className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              CANCEL
            </button>

            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={!replyDraft.trim()}
              className="h-9 px-5 rounded-lg text-[11px] font-bold uppercase tracking-wider shadow-xs"
            >
              POST RESPONSE
            </Button>
          </div>
        </form>
      )}

      {!isOwner && (
        <div className="flex items-center gap-5 pt-1 text-[11px] font-semibold text-muted-foreground">
          <button
            type="button"
            onClick={() => onToggleHelpful(review.id)}
            className={cn(
              "inline-flex items-center gap-1.5 transition-colors cursor-pointer",
              isHelpfulActive ? "text-primary" : "hover:text-foreground"
            )}
          >
            <ThumbsUp className="size-3.5" />
            <span>HELPFUL ({review.helpfulCount ?? 0})</span>
          </button>

          <button
            type="button"
            onClick={() => onShareReview(review)}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
          >
            <Share2 className="size-3.5" />
            <span>SHARE</span>
          </button>
        </div>
      )}
    </article>
  );
}

export function ProfileReviewsTab({
  rating,
  reviewCount,
  breakdown,
  reviews,
  totalFilteredCount,
  repliedCount,
  sortBy,
  filterBy,
  currentPage,
  totalPages,
  isOwner = false,
  helpfulReviewIds,
  onSortChange,
  onFilterChange,
  onPageChange,
  onToggleHelpful,
  onShareReview,
  onSubmitReply,
  onWriteReview,
}: ProfileReviewsTabProps) {
  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "highest", label: "Highest Rated" },
    { value: "lowest", label: "Lowest Rated" },
  ];

  const ratingFilterOptions = [
    { value: "all", label: `All Ratings (${totalFilteredCount})` },
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars & Below" },
    { value: "with-photos", label: "With Photos" },
    ...(isOwner ? [{ value: "needs-reply", label: "Needs Reply" }] : []),
  ];

  return (
    <section aria-label="Customer reviews" className="w-full space-y-6">
      <SectionHeader title="Client Reviews & Responses" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Summary & Filter Column */}
        <div className="lg:col-span-4 space-y-4">
          <RatingSummaryCard
            rating={rating}
            reviewCount={reviewCount}
            breakdown={breakdown}
            isOwner={isOwner}
            repliedCount={repliedCount}
            onWriteReview={onWriteReview}
          />

          <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-foreground">
              FILTER REVIEWS
            </h3>

            <div className="space-y-2.5">
              <Select
                aria-label="Sort reviews"
                value={sortBy}
                onChange={(value) => onSortChange(value as ProfileSortReview)}
                options={sortOptions}
              />

              <Select
                aria-label="Filter reviews by rating"
                value={filterBy}
                onChange={(value) =>
                  onFilterChange(value as ProfileReviewFilter)
                }
                options={ratingFilterOptions}
              />
            </div>
          </div>
        </div>

        {/* Right Reviews Feed */}
        <div className="lg:col-span-8 space-y-4">
          {reviews.length === 0 ? (
            <ReviewsEmptyState
              tab="received"
              hasActiveFilters={filterBy !== "all" || sortBy !== "recent"}
              onClearFilters={() => {
                onSortChange("recent");
                onFilterChange("all");
              }}
            />
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewDetailCard
                  key={review.id}
                  review={review}
                  isOwner={isOwner}
                  isHelpfulActive={helpfulReviewIds.includes(review.id)}
                  onToggleHelpful={onToggleHelpful}
                  onShareReview={onShareReview}
                  onSubmitReply={onSubmitReply}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pt-2 flex flex-col items-center gap-3">
              {currentPage < totalPages && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage + 1)}
                  className="h-9 px-6 rounded-xl text-[11px] font-bold uppercase tracking-wider"
                >
                  LOAD MORE REVIEWS
                </Button>
              )}

              <Pagination className="justify-center">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      disabled={currentPage <= 1}
                      onClick={() =>
                        onPageChange(Math.max(1, currentPage - 1))
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={pageNum === currentPage}
                          onClick={() => onPageChange(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      disabled={currentPage >= totalPages}
                      onClick={() =>
                        onPageChange(Math.min(totalPages, currentPage + 1))
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
