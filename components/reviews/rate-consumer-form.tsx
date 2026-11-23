"use client";

import { useState, type FormEvent } from "react";
import { Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { Textarea } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { RateConsumerFormProps } from "./types";

const MAX_COMMENT_CHARS = 1000;

export function RateConsumerForm({
  order,
  rating,
  comment,
  isSubmitting = false,
  onRatingChange,
  onCommentChange,
  onSubmit,
  onCancel,
}: RateConsumerFormProps) {
  const [hoveredStar, setHoveredStar] = useState(0);

  const displayedRating = hoveredStar || rating;
  const isConsumerTarget = order.targetRole === "consumer";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden"
      >
        {/* Recipient & Order Header */}
        <div className="px-6 py-5 sm:px-8 border-b border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <FallbackImage
              src={order.recipientAvatarUrl}
              alt={order.recipientName}
              fallbackType="user"
              variant="avatar"
              className="size-12 rounded-full border border-border bg-secondary object-cover shrink-0"
            />
            <div className="min-w-0">
              <h2 className="text-base font-extrabold text-foreground tracking-tight truncate">
                {order.recipientName}
              </h2>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {order.recipientSubtitle}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0 space-y-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              RELATED ORDER
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-md border border-border bg-secondary/50 text-xs font-bold text-foreground">
              #{order.orderCode}
            </span>
          </div>
        </div>

        {/* Rating Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-3 py-1">
            <h3 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">
              How was your experience with {order.recipientName}?
            </h3>

            <div
              role="radiogroup"
              aria-label={`Rate experience with ${order.recipientName}`}
              className="flex items-center justify-center gap-2.5"
              onMouseLeave={() => setHoveredStar(0)}
            >
              {[1, 2, 3, 4, 5].map((starValue) => {
                const filled = starValue <= displayedRating;
                return (
                  <button
                    key={starValue}
                    type="button"
                    role="radio"
                    aria-checked={rating === starValue}
                    aria-label={`${starValue} out of 5 stars`}
                    onMouseEnter={() => setHoveredStar(starValue)}
                    onClick={() => onRatingChange(starValue)}
                    className="p-0.5 transition-transform hover:scale-110 cursor-pointer outline-none"
                  >
                    <Star
                      className={cn(
                        "size-9 sm:size-10 transition-colors",
                        filled
                          ? "text-foreground fill-foreground"
                          : "text-border fill-border"
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-muted-foreground">
              {rating > 0
                ? `Selected rating: ${rating} out of 5 stars`
                : "Select a star rating (1 to 5)"}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="rate-consumer-comment"
                className="text-xs font-bold text-foreground"
              >
                Leave a comment (optional)
              </label>
              <span className="text-[11px] font-medium text-muted-foreground">
                {comment.length} / {MAX_COMMENT_CHARS} characters
              </span>
            </div>

            <Textarea
              id="rate-consumer-comment"
              value={comment}
              maxLength={MAX_COMMENT_CHARS}
              onChange={(e) => onCommentChange(e.target.value)}
              placeholder={
                isConsumerTarget
                  ? "Describe your professional interaction with this consumer. Was the appointment on time? Was the communication clear?"
                  : "Describe your experience working with this professional. Were deliverables and timelines met?"
              }
              className="min-h-32 resize-none text-xs sm:text-sm"
            />
          </div>

          <div className="rounded-xl border border-border bg-secondary/45 px-4 py-3.5 flex items-start gap-3">
            <Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground">
                Community Contribution
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isConsumerTarget
                  ? "Your review helps other professionals in the community make informed decisions. Please ensure your feedback is honest, professional, and adheres to our community guidelines."
                  : "Your review helps consumers and businesses across MyKostoma discover reliable professionals. Please ensure your feedback is accurate and constructive."}
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            <Button
              type="submit"
              variant="default"
              size="sm"
              loading={isSubmitting}
              loadingText="Submitting Review..."
              disabled={rating < 1}
              className="w-full h-11 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
            >
              Submit Review
            </Button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        {isConsumerTarget
          ? "Reviews are shared with the consumer and visible to other providers on the platform."
          : "Reviews are published to the professional's profile after verification."}
      </p>
    </div>
  );
}
