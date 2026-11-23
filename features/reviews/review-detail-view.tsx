"use client";

import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { ReviewSubpageTopBar } from "@/components/layouts/top-bars/reviews/review-subpage-top-bar";
import { ReviewDetailCard } from "@/components/reviews/review-detail-card";
import { ReviewResponsePanel } from "@/components/reviews/review-response-panel";
import {
  ReportReviewModal,
  RequestEditResponseModal,
} from "@/components/modals/review-modals";
import { REVIEW_REPORT_REASONS } from "./data";
import { useReviewDetailService } from "./services/reviewsApi";
import type { ReviewDetailViewProps } from "./types";

export function ReviewDetailView({ reviewId }: ReviewDetailViewProps) {
  const {
    review,
    draftText,
    setDraftText,
    isSavingDraft,
    isSubmitting,
    reportModalOpen,
    setReportModalOpen,
    editRequestModalOpen,
    setEditRequestModalOpen,
    isReported,
    isEditRequested,
    handleBack,
    handleSaveDraft,
    handleSubmitResponse,
    handleConfirmReport,
    handleConfirmEditRequest,
  } = useReviewDetailService(reviewId);

  return (
    <>
      <DashboardTopBarSlot>
        <ReviewSubpageTopBar
          title="Review Detail"
          backLabel="Back to Reviews"
          onBack={handleBack}
          actionLabel={isReported ? "Review Reported" : "Report Review"}
          actionDisabled={isReported}
          onAction={() => setReportModalOpen(true)}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6 pb-10">
        {/* Mobile Action Button */}
        <div className="flex sm:hidden items-center justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isReported}
            onClick={() => setReportModalOpen(true)}
            leadingIcon={<Flag className="size-3.5" />}
            className="h-9 px-3.5 rounded-lg text-xs font-semibold"
          >
            {isReported ? "Review Reported" : "Report Review"}
          </Button>
        </div>

        <ReviewDetailCard review={review} />

        <ReviewResponsePanel
          review={review}
          draftText={draftText}
          isSavingDraft={isSavingDraft}
          isSubmitting={isSubmitting}
          isEditRequested={isEditRequested}
          onDraftChange={setDraftText}
          onSaveDraft={handleSaveDraft}
          onSubmitResponse={handleSubmitResponse}
          onRequestEdit={() => setEditRequestModalOpen(true)}
        />
      </div>

      <ReportReviewModal
        isOpen={reportModalOpen}
        authorName={review.authorName}
        reasons={REVIEW_REPORT_REASONS}
        onClose={() => setReportModalOpen(false)}
        onSubmitReport={handleConfirmReport}
      />

      <RequestEditResponseModal
        isOpen={editRequestModalOpen}
        currentResponse={review.response?.text ?? ""}
        onClose={() => setEditRequestModalOpen(false)}
        onSubmitRequest={handleConfirmEditRequest}
      />
    </>
  );
}
