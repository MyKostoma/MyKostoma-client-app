"use client";

import {
  AlertTriangle,
  Lock,
  MessageSquare,
  PenTool,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type {
  ProfessionalOrderItem,
  ProfessionalOrderReviewFormValues,
} from "../types";

export interface ProOrderReviewFormProps {
  order: ProfessionalOrderItem;
  values: ProfessionalOrderReviewFormValues;
  onChange: (values: ProfessionalOrderReviewFormValues) => void;
  onCancel: () => void;
  onSubmit: () => void;
  onMessageConsumer: () => void;
  onContactSupport: () => void;
}

export function ProOrderReviewForm({
  order,
  values,
  onChange,
  onCancel,
  onSubmit,
  onMessageConsumer,
  onContactSupport,
}: ProOrderReviewFormProps) {
  const firstName = order.consumerName.split(" ")[0] || order.consumerName;

  return (
    <div className=" mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Leave a Review
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Share your experience working with {order.consumerName} for Order #
          {order.code}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xs space-y-6">
          <div className="space-y-2.5">
            <p className="text-xs sm:text-sm font-extrabold text-foreground">
              How would you rate your experience?
            </p>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled = star <= values.overallRating;
                return (
                  <button
                    key={star}
                    type="button"
                    aria-label={`Rate ${star} stars`}
                    onClick={() =>
                      onChange({ ...values, overallRating: star })
                    }
                    className="p-0.5 transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={cn(
                        "size-7 transition-colors",
                        filled
                          ? "text-primary fill-primary"
                          : "text-muted-foreground/35"
                      )}
                    />
                  </button>
                );
              })}
              <span className="text-sm font-extrabold text-foreground ml-2">
                {values.overallRating.toFixed(1)} / 5.0
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                Communication
              </p>
              <div className="rounded-xl border border-border bg-secondary/25 px-3.5 py-2.5 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = star <= values.communicationRating;
                  return (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Rate communication ${star} stars`}
                      onClick={() =>
                        onChange({ ...values, communicationRating: star })
                      }
                      className="cursor-pointer"
                    >
                      <Star
                        className={cn(
                          "size-4 transition-colors",
                          filled
                            ? "text-primary fill-primary"
                            : "text-muted-foreground/35"
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                Requirements Clarity
              </p>
              <div className="rounded-xl border border-border bg-secondary/25 px-3.5 py-2.5 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = star <= values.requirementsClarityRating;
                  return (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Rate requirements clarity ${star} stars`}
                      onClick={() =>
                        onChange({
                          ...values,
                          requirementsClarityRating: star,
                        })
                      }
                      className="cursor-pointer"
                    >
                      <Star
                        className={cn(
                          "size-4 transition-colors",
                          filled
                            ? "text-primary fill-primary"
                            : "text-muted-foreground/35"
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="pro-review-feedback"
              className="block text-xs font-extrabold text-foreground"
            >
              Your Feedback
            </label>

            <textarea
              id="pro-review-feedback"
              rows={5}
              maxLength={1000}
              value={values.feedback}
              onChange={(e) =>
                onChange({ ...values, feedback: e.target.value })
              }
              placeholder="Describe your experience working with this client. What went well? What could be improved?"
              className="w-full p-4 rounded-xl border border-border bg-secondary/25 text-xs sm:text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed"
            />

            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Your review will be public on their profile.</span>
              <span>{values.feedback.length} / 1,000 characters</span>
            </div>
          </div>

          <label className="rounded-xl border border-border/70 bg-secondary/35 px-4 py-3.5 flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={values.wouldRecommend}
              onChange={(e) =>
                onChange({ ...values, wouldRecommend: e.target.checked })
              }
              className="size-4 rounded accent-foreground cursor-pointer"
            />
            <span className="text-xs font-semibold text-foreground">
              I would recommend working with this consumer again
            </span>
          </label>

          <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-full sm:w-auto h-10 px-6 rounded-lg text-xs font-bold"
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="default"
              onClick={onSubmit}
              className="w-full sm:w-auto h-10 px-6 rounded-lg text-xs font-bold shadow-xs"
            >
              Submit Review
            </Button>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-5">
            <h2 className="text-sm font-extrabold text-foreground">
              Order Summary
            </h2>

            <div className="flex items-center gap-3 pb-4 border-b border-border/70">
              <div className="size-10 rounded-xl bg-secondary flex items-center justify-center text-foreground shrink-0">
                <PenTool className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground truncate">
                  {order.serviceTitle}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {order.code}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Consumer</span>
                <div className="flex items-center gap-2">
                  <FallbackImage
                    src={order.consumerAvatarUrl}
                    alt={order.consumerName}
                    variant="avatar"
                    className="size-5 text-[9px]"
                  />
                  <span className="font-bold text-foreground">
                    {order.consumerName}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Completed Date</span>
                <span className="font-bold text-foreground">
                  {order.completedDateShort || "Oct 24, 2026"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="font-extrabold text-foreground">
                  {order.totalAmountFormatted}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-foreground text-background p-6 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-extrabold text-background">
              <Lock className="size-4 shrink-0" />
              <span>Why Reviews Matter</span>
            </div>

            <p className="text-xs text-background/75 leading-relaxed">
              Reviews help maintain the integrity of the MyKostoma community.
              Your honest feedback assists other professionals in making
              informed decisions.
            </p>

            <button
              type="button"
              onClick={onContactSupport}
              className="text-xs font-bold text-background underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer"
            >
              Review Guidelines
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onMessageConsumer}
              leadingIcon={<MessageSquare className="size-3.5" />}
              className="w-full h-9 rounded-lg text-xs font-bold"
            >
              Message {firstName}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onContactSupport}
              leadingIcon={<AlertTriangle className="size-3.5" />}
              className="w-full h-9 rounded-lg text-xs font-bold"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
