"use client";

import { useState, type FormEvent } from "react";
import {
  ChevronDown,
  MessageSquarePlus,
  Share2,
  SlidersHorizontal,
  Star,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { Textarea } from "@/components/ui/form-fields";
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

const REVIEW_SORT_TABS: { id: ProfileSortReview; label: string }[] = [
  { id: "recent", label: "Most Recent" },
  { id: "highest", label: "Highest Rated" },
  { id: "lowest", label: "Lowest Rated" },
];

interface ReviewDetailCardProps {
  review: ProfileReviewItem;
  professionalName: string;
  isOwner: boolean;
  isHelpfulActive: boolean;
  onToggleHelpful: (reviewId: string) => void;
  onShareReview: (review: ProfileReviewItem) => void;
  onSubmitReply: (reviewId: string, text: string) => void;
}

function ReviewDetailCard({
  review,
  professionalName,
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

  const proInitial = professionalName.charAt(0).toUpperCase() || "P";

  const handleSaveReply = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replyDraft.trim()) return;
    onSubmitReply(review.id, replyDraft);
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
            className="size-10 rounded-full object-cover bg-secondary shrink-0 select-none"
          />

          <div className="min-w-0">
            <h3 className="text-sm font-bold text-foreground leading-tight truncate">
              {review.authorName}
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-0.5">
              {review.verifiedPurchase ? "VERIFIED PURCHASE" : review.authorRole}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div
            aria-label={`${review.rating} out of 5 stars`}
            className="flex items-center justify-end gap-0.5"
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
          <span className="block text-[11px] text-muted-foreground mt-1">
            {review.dateLabel || review.timeAgo}
          </span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
        {review.comment}
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

      {review.professionalResponse && !replyOpen && (
        <div className="rounded-xl bg-secondary/50 border-l-2 border-l-primary p-4 space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="size-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                {proInitial}
              </span>
              <span className="text-xs font-bold text-foreground truncate">
                Response from {professionalName}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
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
                  className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed pl-7">
            {review.professionalResponse}
          </p>
        </div>
      )}

      {isOwner && !review.professionalResponse && !replyOpen && (
        <div>
          <button
            type="button"
            onClick={() => setReplyOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
          >
            <MessageSquarePlus className="size-3.5" />
            <span>Reply to Review</span>
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
            placeholder={`Write your public response to ${review.authorName}...`}
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
    </article>
  );
}

export function ProfileReviewsTab({
  professionalName,
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
  return (
    <section aria-label="Customer reviews" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Summary Column */}
        <div className="lg:col-span-4">
          <RatingSummaryCard
            rating={rating}
            reviewCount={reviewCount}
            breakdown={breakdown}
            isOwner={isOwner}
            repliedCount={repliedCount}
            onWriteReview={onWriteReview}
          />
        </div>

        {/* Right Reviews Feed */}
        <div className="lg:col-span-8 space-y-4">
          {/* Sort & Filter Bar */}
          <div className="rounded-xl border border-border bg-card px-4 sm:px-5 py-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
              {REVIEW_SORT_TABS.map((tab) => {
                const isActive = sortBy === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onSortChange(tab.id)}
                    className={cn(
                      "relative py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="relative flex items-center shrink-0">
              <SlidersHorizontal className="size-3.5 text-muted-foreground absolute left-2.5 pointer-events-none" />
              <select
                aria-label="Filter reviews"
                value={filterBy}
                onChange={(e) =>
                  onFilterChange(e.target.value as ProfileReviewFilter)
                }
                className="h-8 pl-8 pr-7 rounded-lg border border-border bg-card text-xs font-semibold text-foreground appearance-none outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 cursor-pointer"
              >
                <option value="all">Filter: All ({totalFilteredCount})</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars &amp; Below</option>
                <option value="with-photos">With Photos</option>
                {isOwner && <option value="needs-reply">Needs Reply</option>}
              </select>
              <ChevronDown className="size-3.5 text-muted-foreground absolute right-2 pointer-events-none" />
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center space-y-2 shadow-2xs">
              <p className="text-sm font-semibold text-foreground">
                No reviews match this filter
              </p>
              <p className="text-xs text-muted-foreground">
                Try switching the rating filter to see all verified client
                reviews.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewDetailCard
                  key={review.id}
                  review={review}
                  professionalName={professionalName}
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
            <div className="pt-2 flex justify-center">
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
