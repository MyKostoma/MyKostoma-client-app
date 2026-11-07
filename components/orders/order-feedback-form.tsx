"use client";

import {
  FileText,
  Plus,
  Shield,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { OrderFeedbackFormProps } from "./types";

export type { OrderFeedbackFormProps } from "./types";

const MAX_REVIEW_CHARS = 500;

export function OrderFeedbackForm({
  order,
  values,
  onChange,
  onSubmitReview,
  onRaiseDispute,
  onLearnResolutionPolicy,
}: OrderFeedbackFormProps) {
  const handleRatingSelect = (star: number) => {
    onChange({
      ...values,
      rating: star,
    });
  };

  const handleCommentChange = (text: string) => {
    if (text.length <= MAX_REVIEW_CHARS) {
      onChange({
        ...values,
        comment: text,
      });
    }
  };

  const handleAddMockPhoto = () => {
    if (values.photos.length >= 4) return;
    const nextPhotoLabel = `project-photo-${values.photos.length + 1}.jpg`;
    onChange({
      ...values,
      photos: [...values.photos, nextPhotoLabel],
    });
  };

  const handleRemovePhoto = (index: number) => {
    onChange({
      ...values,
      photos: values.photos.filter((_, idx) => idx !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-2xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="size-10 rounded-xl bg-secondary text-foreground flex items-center justify-center shrink-0">
            <FileText className="size-4" />
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Professional
            </span>
            <p className="text-xs sm:text-sm font-bold text-foreground truncate">
              {order.providerName}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Project Total
          </span>
          <p className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
            {order.totalAmount}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-2xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
              Leave a Review
            </h2>
            <p className="text-xs text-muted-foreground">
              How was your experience with {order.providerName}?
            </p>
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-foreground">
              Overall Rating
            </label>

            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-1.5"
                role="radiogroup"
                aria-label="Overall rating out of 5 stars"
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= values.rating;
                  return (
                    <button
                      key={star}
                      type="button"
                      role="radio"
                      aria-checked={values.rating === star}
                      aria-label={`Rate ${star} out of 5`}
                      onClick={() => handleRatingSelect(star)}
                      className="p-0.5 transition-transform hover:scale-110 cursor-pointer focus:outline-hidden"
                    >
                      <Star
                        className={cn(
                          "size-6 transition-colors",
                          isFilled
                            ? "fill-foreground text-foreground"
                            : "text-border"
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              <span className="text-xs text-muted-foreground font-medium">
                {values.rating.toFixed(1)} out of 5
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="order-review-comment"
              className="block text-xs font-bold text-foreground"
            >
              Share your experience (Optional)
            </label>

            <Textarea
              id="order-review-comment"
              value={values.comment}
              onChange={(e) => handleCommentChange(e.target.value)}
              placeholder="What did you like? Was the professional on time? How was the quality of work?"
              className="min-h-32 text-xs"
            />

            <p className="text-right text-[11px] text-muted-foreground">
              {values.comment.length} / {MAX_REVIEW_CHARS} characters
            </p>
          </div>

          <div className="space-y-2.5">
            <span className="block text-xs font-bold text-foreground">
              Add Photos
            </span>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAddMockPhoto}
                className="size-20 rounded-xl border border-dashed border-border hover:border-primary/50 bg-secondary/25 hover:bg-secondary/50 flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="size-4" />
                <span className="text-[10px] font-medium">Upload</span>
              </button>

              {values.photos.map((photo, idx) => (
                <div
                  key={photo}
                  className="relative size-20 rounded-xl border border-border bg-secondary/60 flex items-center justify-center p-2 text-center"
                >
                  <span className="text-[10px] font-medium text-foreground break-all line-clamp-2">
                    {photo}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    aria-label={`Remove ${photo}`}
                    className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-foreground text-background flex items-center justify-center shadow-xs cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border/70 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <label className="inline-flex items-center gap-2.5 text-xs text-muted-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={values.isAnonymous}
                onChange={(e) =>
                  onChange({
                    ...values,
                    isAnonymous: e.target.checked,
                  })
                }
                className="size-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
              />
              <span>Post review anonymously</span>
            </label>

            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onSubmitReview}
              className="h-10 px-6 rounded-lg text-xs font-semibold shadow-xs"
            >
              Submit Review
            </Button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground">
                <Plus className="size-4 shrink-0" />
                <h3>Having an issue?</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If the work is incomplete or doesn&apos;t match the scope, you
                can open a dispute.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="size-5 rounded-full bg-secondary text-foreground text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-foreground">
                    Communicate First
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    We recommend messaging the professional to resolve minor
                    issues directly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="size-5 rounded-full bg-secondary text-foreground text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-foreground">
                    Submit Dispute
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Provide evidence (photos, messages) of the specific failure
                    to comply.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-secondary/45 border border-border/60 p-4 space-y-2.5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Escrow Status
              </span>

              <div className="flex items-center justify-between text-xs font-bold text-foreground">
                <span>Funds in Escrow</span>
                <span>{order.totalAmount}</span>
              </div>

              <div className="h-1.5 w-full rounded-full bg-foreground overflow-hidden" />
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRaiseDispute}
              className="w-full h-10 rounded-xl text-xs font-bold"
            >
              Raise a Dispute
            </Button>

            <p className="text-[10px] text-muted-foreground italic text-center leading-relaxed">
              Disputes must be raised within 72 hours of project completion
              marking.
            </p>
          </div>

          <div className="rounded-2xl bg-foreground text-background p-5 sm:p-6 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <Shield className="size-4 shrink-0" />
              <h3>Payment Protection</h3>
            </div>

            <p className="text-xs text-background/80 leading-relaxed">
              Your funds are held securely. We only release payment when you are
              satisfied or through our formal dispute resolution process.
            </p>

            <button
              type="button"
              onClick={onLearnResolutionPolicy}
              className="text-xs font-bold text-background underline underline-offset-4 hover:opacity-85 transition-opacity cursor-pointer"
            >
              Learn about our resolution policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

