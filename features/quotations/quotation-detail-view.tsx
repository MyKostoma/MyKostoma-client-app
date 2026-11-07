"use client";

import { Button } from "@/components/ui/button";
import {
  QuotationAcceptedState,
  QuotationDetailWorkspace,
  QuotationRejectedState,
} from "@/components/quotations/quotation-detail-content";
import {
  AcceptQuotationModal,
  RejectQuotationModal,
} from "@/components/modals/quotation-modals";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { QuotationDetailTopBar } from "@/components/layouts/top-bars/quotations/quotation-detail-top-bar";
import { useQuotationDetailService } from "./services/quotationsApi";
import type { QuotationDetailViewProps } from "./types";

export type { QuotationDetailViewProps } from "./types";

export function QuotationDetailView({
  quotationId = "QT-8821-A",
}: QuotationDetailViewProps) {
  const {
    quotation,
    isUpdated,
    canManage,
    acceptModalOpen,
    setAcceptModalOpen,
    rejectModalOpen,
    setRejectModalOpen,
    handleBackToQuotes,
    handleCompare,
    handleRequestUpdate,
    handleConfirmAccept,
    handleConfirmReject,
    handleRestoreQuote,
    handleGoToOrder,
    handleViewReceipt,
    handleMessageArtisan,
    handleViewOriginalRequest,
    handleViewProfile,
    handleSelectRevision,
  } = useQuotationDetailService(quotationId);

  return (
    <>
      <DashboardTopBarSlot>
        <QuotationDetailTopBar
          quoteCode={quotation.code}
          status={quotation.status}
          versionBadge={
            quotation.versionBadge ? `REVISED (${quotation.versionBadge})` : undefined
          }
          onBackToQuotes={handleBackToQuotes}
          onCompare={handleCompare}
          onRequestUpdate={handleRequestUpdate}
          onAcceptQuote={() => setAcceptModalOpen(true)}
          canManage={canManage}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        {canManage && (
          <div className="flex sm:hidden flex-wrap items-center justify-end gap-2 shrink-0 ml-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCompare}
              className="h-9 px-3 rounded-lg text-xs font-semibold"
            >
              {isUpdated ? "Compare All" : "Compare"}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRequestUpdate}
              className="h-9 px-3 rounded-lg text-xs font-semibold"
            >
              {isUpdated ? "Request Change" : "Request Update"}
            </Button>

            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => setAcceptModalOpen(true)}
              className="h-9 px-3.5 rounded-lg text-xs font-semibold shadow-xs"
            >
              {isUpdated ? "Accept Latest" : "Accept Quote"}
            </Button>
          </div>
        )}

        {quotation.status === "accepted" ? (
          <QuotationAcceptedState
            quotation={quotation}
            onGoToOrder={handleGoToOrder}
            onViewReceipt={handleViewReceipt}
          />
        ) : quotation.status === "rejected" ? (
          <QuotationRejectedState
            quotation={quotation}
            onBackToQuotes={handleBackToQuotes}
            onRestoreQuote={handleRestoreQuote}
            onMessageArtisan={handleMessageArtisan}
          />
        ) : (
          <QuotationDetailWorkspace
            quotation={quotation}
            onViewOriginalRequest={handleViewOriginalRequest}
            onRejectQuote={() => setRejectModalOpen(true)}
            onViewProfile={handleViewProfile}
            onSelectRevision={handleSelectRevision}
          />
        )}
      </div>

      <AcceptQuotationModal
        isOpen={acceptModalOpen}
        quoteCode={quotation.code}
        requestTitle={quotation.requestTitle}
        providerName={quotation.providerName}
        estimatedDuration={quotation.estimatedDuration}
        totalAmount={quotation.totalAmount}
        onClose={() => setAcceptModalOpen(false)}
        onConfirmAccept={handleConfirmAccept}
      />

      <RejectQuotationModal
        isOpen={rejectModalOpen}
        providerName={quotation.providerName}
        onClose={() => setRejectModalOpen(false)}
        onConfirmReject={handleConfirmReject}
      />
    </>
  );
}

export default QuotationDetailView;
