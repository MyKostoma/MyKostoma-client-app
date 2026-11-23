"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  Check,
  CheckCircle2,
  Flag,
  MessageSquareText,
  PieChart,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { FormField, Select, Textarea } from "@/components/ui/form-fields";
import { getRatingSentimentLabel } from "@/features/reviews/services/reviewsHelpers";
import { cn } from "@/lib/utils";
import type {
  DeleteReviewResponseModalProps,
  RateExperienceModalProps,
  ReportReviewModalProps,
  RequestEditResponseModalProps,
  ReviewSubmittedModalProps,
} from "./types";

export type {
  DeleteReviewResponseModalProps,
  RateExperienceModalProps,
  ReportReviewModalProps,
  RequestEditResponseModalProps,
  ReviewSubmittedModalProps,
} from "./types";

const MAX_MODAL_COMMENT_CHARS = 500;

export function RateExperienceModal({
  isOpen,
  variant,
  recipientName,
  recipientAvatarUrl,
  serviceTitle,
  completedDateLabel,
  orderCode,
  feeFormatted,
  onClose,
  onSubmitReview,
}: RateExperienceModalProps) {
  const defaultRating = variant === "consumer" ? 4 : 5;
  const [rating, setRating] = useState(defaultRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;
    setRating(defaultRating);
    setHoveredRating(0);
    setComment("");
    setError(undefined);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [defaultRating, isOpen, onClose]);

  if (!isOpen) return null;

  const displayedRating = hoveredRating || rating;
  const sentimentLabel = getRatingSentimentLabel(displayedRating, variant);
  const isConsumerVariant = variant === "consumer";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating < 1) {
      setError("Please select at least 1 star to submit your review.");
      return;
    }
    onSubmitReview({ rating, comment: comment.trim() });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rate-experience-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-5 animate-in zoom-in-95 duration-150"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close rating dialog"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>

        {!isConsumerVariant && (
          <div className="flex justify-center pt-1">
            <FallbackImage
              src={recipientAvatarUrl}
              alt={recipientName}
              fallbackType="user"
              variant="avatar"
              className="size-16 rounded-full border border-border bg-secondary object-cover"
            />
          </div>
        )}

        <div className="text-center space-y-1.5">
          <h2
            id="rate-experience-modal-title"
            className="text-xl font-extrabold text-foreground tracking-tight"
          >
            Rate your experience
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {isConsumerVariant ? (
              <>How was your service with {recipientName}?</>
            ) : (
              <>
                How was working with{" "}
                <strong className="font-semibold text-foreground">
                  {recipientName}
                </strong>
                ?
              </>
            )}
          </p>
        </div>

        {/* Order Context Summary Card */}
        {isConsumerVariant ? (
          <div className="rounded-xl border border-border bg-secondary/45 p-3.5 flex items-center gap-3.5">
            <FallbackImage
              src={recipientAvatarUrl}
              alt={recipientName}
              fallbackType="user"
              variant="avatar"
              className="size-11 rounded-xl border border-border bg-card object-cover shrink-0"
            />
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                  {serviceTitle}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-success">
                  <CheckCircle2 className="size-3 shrink-0" />
                  <span>COMPLETED</span>
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">
                {orderCode ? `Order #${orderCode} • ` : ""}
                {completedDateLabel}
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-secondary/45 px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-9 rounded-lg border border-border bg-card text-info flex items-center justify-center shrink-0">
                <PieChart className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground truncate">
                  {serviceTitle}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
                  COMPLETED {completedDateLabel}
                </p>
              </div>
            </div>

            {feeFormatted && (
              <div className="text-right shrink-0">
                <span className="block text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                  FEE
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-foreground">
                  {feeFormatted}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Interactive Star Selector & Dynamic Sentiment Pill */}
        <div className="flex flex-col items-center gap-2.5 py-1">
          <div
            role="radiogroup"
            aria-label="Star rating"
            className="flex items-center justify-center gap-2"
            onMouseLeave={() => setHoveredRating(0)}
          >
            {[1, 2, 3, 4, 5].map((starValue) => {
              const filled = starValue <= displayedRating;
              return (
                <button
                  key={starValue}
                  type="button"
                  role="radio"
                  aria-checked={rating === starValue}
                  aria-label={`Rate ${starValue} out of 5 stars`}
                  onMouseEnter={() => setHoveredRating(starValue)}
                  onClick={() => {
                    setRating(starValue);
                    setError(undefined);
                  }}
                  className="p-0.5 transition-transform hover:scale-110 cursor-pointer outline-none"
                >
                  <Star
                    className={cn(
                      "size-8 transition-colors",
                      filled
                        ? "text-warning fill-warning"
                        : "text-border fill-border"
                    )}
                  />
                </button>
              );
            })}
          </div>

          <span className="inline-flex items-center px-3 py-1 rounded-full bg-warning-bg text-warning text-[10px] font-extrabold uppercase tracking-wider">
            {sentimentLabel}
          </span>
        </div>

        {/* Optional Feedback Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="rate-experience-comment"
              className="text-xs font-bold text-foreground"
            >
              {isConsumerVariant ? "Tell us more (Optional)" : "Client feedback"}
            </label>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {isConsumerVariant
                ? `Max ${MAX_MODAL_COMMENT_CHARS} chars (${comment.length}/${MAX_MODAL_COMMENT_CHARS})`
                : "OPTIONAL"}
            </span>
          </div>

          <Textarea
            id="rate-experience-comment"
            value={comment}
            maxLength={MAX_MODAL_COMMENT_CHARS}
            onChange={(e) => {
              setComment(e.target.value);
              setError(undefined);
            }}
            placeholder={
              isConsumerVariant
                ? "Describe your experience with the design, communication, or process..."
                : "Describe your experience with this client... (communication, clarity of requirements, promptness)"
            }
            className="min-h-24 resize-none bg-secondary/35 text-xs sm:text-sm"
          />

          {error && <p className="text-xs font-medium text-error">{error}</p>}
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-1">
          <Button
            type="submit"
            variant="default"
            size="sm"
            className={cn(
              "w-full h-11 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-xs",
              isConsumerVariant &&
                "bg-foreground text-background hover:bg-foreground/90"
            )}
          >
            {isConsumerVariant ? "SUBMIT REVIEW +" : "SUBMIT REVIEW"}
          </Button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {isConsumerVariant ? "SKIP FOR NOW" : "I'LL DO THIS LATER"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function ReviewSubmittedModal({
  isOpen,
  variant = "professional",
  title = "Review Submitted",
  description,
  actionLabel = "RETURN TO DASHBOARD",
  onClose,
  onPrimaryAction,
}: ReviewSubmittedModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resolvedDescription =
    description ??
    (variant === "consumer"
      ? "Your feedback helps build trust in the MyKostoma community and guides other customers when choosing professionals."
      : "Your feedback helps build trust in the MyKostoma community. Thank you for your professionalism.");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-submitted-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl text-center space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex justify-center pt-1">
          <div className="size-16 rounded-full bg-success-bg flex items-center justify-center">
            <div className="size-10 rounded-full bg-success text-success-foreground flex items-center justify-center shadow-xs">
              <Check className="size-5 stroke-[2.75]" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2
            id="review-submitted-modal-title"
            className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight"
          >
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            {resolvedDescription}
          </p>
        </div>

        <div className="pt-4 border-t border-border/80">
          <button
            type="button"
            onClick={onPrimaryAction ?? onClose}
            className="inline-flex items-center justify-center px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ReportReviewModal({
  isOpen,
  authorName,
  reasons,
  onClose,
  onSubmitReport,
}: ReportReviewModalProps) {
  const [reason, setReason] = useState(reasons[0] ?? "Other policy violation");
  const [details, setDetails] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;
    setReason(reasons[0] ?? "Other policy violation");
    setDetails("");
    setError(undefined);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, reasons]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError("Please choose a reason for reporting this review.");
      return;
    }
    onSubmitReport({ reason, details: details.trim() });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-review-dialog-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-error-bg text-error flex items-center justify-center shrink-0">
              <Flag className="size-4" />
            </div>
            <div>
              <h2
                id="report-review-dialog-title"
                className="text-base sm:text-lg font-bold text-foreground tracking-tight"
              >
                Report Review
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Flag feedback from {authorName} for Trust &amp; Safety review.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close report modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <FormField
          id="report-review-reason"
          label="Reason"
          required
          state={error ? "error" : "default"}
          errorMessage={error}
        >
          <Select
            id="report-review-reason"
            value={reason}
            onChange={(value) => {
              setReason(value);
              setError(undefined);
            }}
            options={reasons.map((item) => ({ label: item, value: item }))}
          />
        </FormField>

        <FormField id="report-review-details" label="Additional Details (Optional)">
          <Textarea
            id="report-review-details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Share order context or policy concerns to help our moderation team..."
            className="min-h-24 resize-none"
          />
        </FormField>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
            size="sm"
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
}

export function DeleteReviewResponseModal({
  isOpen,
  authorName,
  onClose,
  onConfirmDelete,
}: DeleteReviewResponseModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-review-response-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="size-11 rounded-full bg-error-bg text-error flex items-center justify-center">
          <Trash2 className="size-5" />
        </div>

        <div className="space-y-2">
          <h2
            id="delete-review-response-title"
            className="text-base sm:text-lg font-bold text-foreground tracking-tight"
          >
            Delete Your Response?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Your public response to{" "}
            <strong className="font-semibold text-foreground">
              {authorName}
            </strong>
            &rsquo;s review will be removed from your profile. You can write a
            new response at any time.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => {
              onConfirmDelete();
              onClose();
            }}
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Delete Response
          </Button>
        </div>
      </div>
    </div>
  );
}

export function RequestEditResponseModal({
  isOpen,
  currentResponse,
  onClose,
  onSubmitRequest,
}: RequestEditResponseModalProps) {
  const [revisedText, setRevisedText] = useState(currentResponse);
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;
    setRevisedText(currentResponse);
    setReason("");
    setError(undefined);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentResponse, isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!revisedText.trim() || !reason.trim()) {
      setError("Please include your proposed edit and reason for support.");
      return;
    }
    onSubmitRequest({
      revisedText: revisedText.trim(),
      reason: reason.trim(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-edit-response-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-secondary text-foreground flex items-center justify-center shrink-0">
              <MessageSquareText className="size-4" />
            </div>
            <div>
              <h2
                id="request-edit-response-title"
                className="text-base sm:text-lg font-bold text-foreground tracking-tight"
              >
                Request Response Edit
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Submitted responses require support approval before updating.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit request modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <FormField id="revised-response-text" label="Proposed Response Text" required>
          <Textarea
            id="revised-response-text"
            value={revisedText}
            maxLength={500}
            onChange={(e) => {
              setRevisedText(e.target.value);
              setError(undefined);
            }}
            className="min-h-24 resize-none"
          />
        </FormField>

        <FormField
          id="edit-request-reason"
          label="Reason for Change"
          required
          state={error ? "error" : "default"}
          errorMessage={error}
        >
          <Textarea
            id="edit-request-reason"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError(undefined);
            }}
            placeholder="Briefly explain what clarification or correction you need..."
            className="min-h-20 resize-none"
          />
        </FormField>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Submit Edit Request
          </Button>
        </div>
      </form>
    </div>
  );
}
