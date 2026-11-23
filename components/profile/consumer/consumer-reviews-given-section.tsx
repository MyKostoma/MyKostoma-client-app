"use client";

import { useState, type FormEvent } from "react";
import {
  ChevronRight,
  MessageSquareQuote,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { Textarea } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type {
  ConsumerReviewsGivenSectionProps,
  ConsumerWrittenReview,
} from "../types";

interface ConsumerReviewRowProps {
  review: ConsumerWrittenReview;
  onViewProfessional: (proId: string) => void;
  onEditReview: (reviewId: string, rating: number, comment: string) => void;
  onDeleteReview: (reviewId: string) => void;
}

function ConsumerReviewRow({
  review,
  onViewProfessional,
  onEditReview,
  onDeleteReview,
}: ConsumerReviewRowProps) {
  const [editing, setEditing] = useState(false);
  const [ratingDraft, setRatingDraft] = useState(review.rating);
  const [commentDraft, setCommentDraft] = useState(review.comment);

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentDraft.trim()) return;
    onEditReview(review.id, ratingDraft, commentDraft.trim());
    setEditing(false);
  };

  return (
    <article className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <button
          type="button"
          onClick={() => onViewProfessional(review.professionalId)}
          className="flex items-center gap-3 text-left group cursor-pointer min-w-0"
        >
          <div className="size-10 rounded-xl border border-border bg-secondary overflow-hidden shrink-0">
            <FallbackImage
              src={review.professionalAvatar}
              alt={review.professionalName}
              fallbackType="user"
              variant="avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1 truncate">
              <span className="truncate">{review.professionalName}</span>
              <ChevronRight className="size-3.5 shrink-0" />
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {review.professionalCategory} • {review.dateLabel}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <div
            aria-label={`${review.rating} out of 5 stars`}
            className="flex items-center gap-0.5"
          >
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={cn(
                  "size-3.5",
                  idx < review.rating
                    ? "text-warning fill-warning"
                    : "text-border fill-border"
                )}
              />
            ))}
          </div>

          {!editing && (
            <div className="flex items-center gap-1 ml-2">
              <button
                type="button"
                onClick={() => {
                  setRatingDraft(review.rating);
                  setCommentDraft(review.comment);
                  setEditing(true);
                }}
                aria-label="Edit your review"
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
              >
                <Pencil className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDeleteReview(review.id)}
                aria-label="Delete your review"
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-error-bg cursor-pointer"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {editing ? (
        <form
          onSubmit={handleSave}
          className="rounded-xl bg-secondary/40 border border-border p-4 space-y-3"
        >
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((starVal) => (
              <button
                key={starVal}
                type="button"
                onClick={() => setRatingDraft(starVal)}
                aria-label={`${starVal} stars`}
                className="p-1 rounded hover:bg-secondary cursor-pointer"
              >
                <Star
                  className={cn(
                    "size-4.5",
                    starVal <= ratingDraft
                      ? "text-warning fill-warning"
                      : "text-border fill-border"
                  )}
                />
              </button>
            ))}
          </div>

          <Textarea
            value={commentDraft}
            onChange={(e) => setCommentDraft(e.target.value)}
            className="min-h-20 bg-card text-xs resize-none"
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setEditing(false)}
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
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          &ldquo;{review.comment}&rdquo;
        </p>
      )}

      {review.professionalResponse && !editing && (
        <div className="rounded-xl bg-secondary/50 border-l-2 border-l-primary p-4 space-y-1">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-primary">
            RESPONSE FROM {review.professionalName.toUpperCase()}
          </span>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {review.professionalResponse}
          </p>
        </div>
      )}
    </article>
  );
}

export function ConsumerReviewsGivenSection({
  reviews,
  onViewProfessional,
  onEditReview,
  onDeleteReview,
  onBrowseOrders,
}: ConsumerReviewsGivenSectionProps) {
  return (
    <section aria-label="Reviews you have written" className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h2 className="text-lg font-bold text-foreground tracking-tight">
            Reviews Given
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Feedback you shared for professionals and companies you hired.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onBrowseOrders}
          className="h-10 px-4 rounded-xl text-xs font-semibold shrink-0 self-start sm:self-center"
        >
          Rate Completed Orders
        </Button>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center space-y-3 shadow-2xs">
          <div className="size-12 rounded-2xl bg-secondary text-muted-foreground flex items-center justify-center mx-auto">
            <MessageSquareQuote className="size-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-foreground">
              You haven&apos;t left any reviews yet
            </p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              After completing a service order, share your experience to help
              other MyKostoma clients book with confidence.
            </p>
          </div>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onBrowseOrders}
            className="h-9 px-5 rounded-xl text-xs font-semibold"
          >
            Go to My Orders
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ConsumerReviewRow
              key={review.id}
              review={review}
              onViewProfessional={onViewProfessional}
              onEditReview={onEditReview}
              onDeleteReview={onDeleteReview}
            />
          ))}
        </div>
      )}
    </section>
  );
}
