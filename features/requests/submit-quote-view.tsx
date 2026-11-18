"use client";

import { ProSubmitQuoteForm } from "@/components/requests/professional/pro-submit-quote-form";
import { ProQuoteSubmittedConfirmation } from "@/components/requests/professional/pro-quote-submitted-confirmation";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { ProfessionalRequestsTopBar } from "@/components/layouts/top-bars/requests/professional-requests-top-bar";
import { useProfessionalSubmitQuoteService } from "./services/requestsApi";
import type { SubmitQuoteViewProps } from "./types";

export type { SubmitQuoteViewProps } from "./types";

export function SubmitQuoteView({
  requestId = "RQ-2026-882",
}: SubmitQuoteViewProps) {
  const {
    request,
    values,
    setValues,
    submittedQuote,
    totalMilestoneAllocationFormatted,
    handleAddMilestone,
    handleRemoveMilestone,
    handleUpdateMilestone,
    handleSubmit,
    handleBackToDetail,
    handleGoToMyQuotes,
    handleDone,
  } = useProfessionalSubmitQuoteService(requestId);

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalRequestsTopBar
          breadcrumbs={[
            { label: "Requests", href: "/requests" },
            {
              label: request.title,
              href: `/requests/${encodeURIComponent(request.id)}`,
            },
            { label: "Submit Quote" },
          ]}
          showVerifiedProBadge={false}
        />
      </DashboardTopBarSlot>

      {submittedQuote ? (
        <ProQuoteSubmittedConfirmation
          submittedQuote={submittedQuote}
          onGoToMyQuotes={handleGoToMyQuotes}
          onDone={handleDone}
        />
      ) : (
        <ProSubmitQuoteForm
          request={request}
          values={values}
          totalMilestoneAllocationFormatted={totalMilestoneAllocationFormatted}
          onChange={setValues}
          onAddMilestone={handleAddMilestone}
          onRemoveMilestone={handleRemoveMilestone}
          onUpdateMilestone={handleUpdateMilestone}
          onSubmit={handleSubmit}
          onCancel={handleBackToDetail}
        />
      )}
    </>
  );
}

export default SubmitQuoteView;
