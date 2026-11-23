"use client";

import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { ReviewSubpageTopBar } from "@/components/layouts/top-bars/reviews/review-subpage-top-bar";
import { RateConsumerForm } from "@/components/reviews/rate-consumer-form";
import { ReviewSuccessState } from "@/components/reviews/review-success-state";
import { useRateConsumerService } from "./services/reviewsApi";
import type { RateConsumerViewProps } from "./types";

export function RateConsumerView({ orderId }: RateConsumerViewProps) {
  const {
    order,
    backLabel,
    rating,
    setRating,
    comment,
    setComment,
    isSubmitting,
    submittedSuccess,
    handleBack,
    handleBackToReviews,
    handleSubmit,
  } = useRateConsumerService(orderId);

  const pageTitle =
    order.targetRole === "consumer" ? "Rate Consumer" : "Rate Professional";

  return (
    <>
      <DashboardTopBarSlot>
        <ReviewSubpageTopBar
          title={pageTitle}
          backLabel={backLabel}
          onBack={handleBack}
        />
      </DashboardTopBarSlot>

      <div className="pb-10">
        {submittedSuccess ? (
          <ReviewSuccessState
            description={
              order.targetRole === "consumer"
                ? `Thank you for your feedback. It has been shared with the community and recorded on ${order.recipientName}'s consumer profile.`
                : `Thank you for your feedback. It has been shared with the community and recorded on ${order.recipientName}'s profile.`
            }
            backLabel="Back to Reviews"
            redirectSeconds={5}
            onBackToReviews={handleBackToReviews}
          />
        ) : (
          <RateConsumerForm
            order={order}
            rating={rating}
            comment={comment}
            isSubmitting={isSubmitting}
            onRatingChange={setRating}
            onCommentChange={setComment}
            onSubmit={handleSubmit}
            onCancel={handleBack}
          />
        )}
      </div>
    </>
  );
}
