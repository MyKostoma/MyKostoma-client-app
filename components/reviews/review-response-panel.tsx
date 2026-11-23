"use client";

import type { FormEvent } from "react";
import { Info, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/form-fields";
import type { ReviewResponsePanelProps } from "./types";

const MAX_RESPONSE_CHARS = 500;

export function ReviewResponsePanel({
  review,
  draftText,
  isSavingDraft = false,
  isSubmitting = false,
  isEditRequested = false,
  onDraftChange,
  onSaveDraft,
  onSubmitResponse,
  onRequestEdit,
}: ReviewResponsePanelProps) {
  const firstName =
    review.authorName.trim().split(/\s+/)[0] || review.authorName;

  if (review.response) {
    return (
      <section
        aria-label="Submitted review response"
        className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-foreground">
            <Reply className="size-4 text-muted-foreground shrink-0" />
            <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
              Your Response
            </h3>
          </div>

          <span className="text-xs italic text-muted-foreground">
            Response submitted on {review.response.repliedAtLabel}
          </span>
        </div>

        <div className="rounded-xl border border-border bg-secondary/35 p-4 sm:p-5">
          <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
            {review.response.text}
          </p>
        </div>

        {review.direction === "received" && (
          <div>
            {isEditRequested || review.response.editRequested ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-info-bg text-info text-xs font-semibold">
                Edit request sent to MyKostoma Support
              </span>
            ) : (
              <button
                type="button"
                onClick={onRequestEdit}
                className="text-xs font-semibold text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors cursor-pointer"
              >
                Request to Edit (Contact Support)
              </button>
            )}
          </div>
        )}
      </section>
    );
  }

  if (review.direction === "given") {
    return null;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitResponse();
  };

  return (
    <section
      aria-label="Respond to review"
      className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-4"
    >
      <div className="flex items-center gap-2 text-foreground">
        <Reply className="size-4 text-muted-foreground shrink-0" />
        <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
          Your Response
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="public-review-response"
            className="block text-xs font-bold text-foreground"
          >
            Write your public response
          </label>

          <div className="relative">
            <Textarea
              id="public-review-response"
              value={draftText}
              maxLength={MAX_RESPONSE_CHARS}
              onChange={(e) => onDraftChange(e.target.value)}
              placeholder={`Dear ${firstName}, thank you for your kind feedback...`}
              className="min-h-28 pb-7 resize-none text-xs sm:text-sm"
            />
            <span className="pointer-events-none absolute right-3 bottom-2.5 text-[11px] font-medium text-muted-foreground">
              {draftText.length} / {MAX_RESPONSE_CHARS} characters
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-secondary/45 px-4 py-3.5 flex items-start gap-3">
          <Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="font-bold text-foreground">
              Important Note:
            </strong>{" "}
            You can only respond to a review once. Once submitted, your response
            will be visible to everyone visiting your public profile. Ensure
            your tone remains professional and complies with privacy
            regulations.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            loading={isSavingDraft}
            loadingText="Saving..."
            onClick={onSaveDraft}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Save Draft
          </Button>

          <Button
            type="submit"
            variant="default"
            size="sm"
            loading={isSubmitting}
            loadingText="Submitting..."
            disabled={!draftText.trim()}
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Submit Response
          </Button>
        </div>
      </form>
    </section>
  );
}
