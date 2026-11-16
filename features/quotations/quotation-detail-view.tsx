"use client";

import {
  Archive,
  Ban,
  Download,
  ExternalLink,
  History,
  MessageSquare,
  SquarePen,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  QuotationAcceptedState,
  QuotationDetailWorkspace,
  QuotationRejectedState,
} from "@/components/quotations/quotation-detail-content";
import { ProQuotationDetailPending } from "@/components/quotations/professional/pro-quotation-detail-pending";
import { ProQuotationDetailHired } from "@/components/quotations/professional/pro-quotation-detail-hired";
import { ProQuotationDetailRejected } from "@/components/quotations/professional/pro-quotation-detail-rejected";
import { ProQuotationDetailCompleted } from "@/components/quotations/professional/pro-quotation-detail-completed";
import {
  AcceptQuotationModal,
  RejectQuotationModal,
} from "@/components/modals/quotation-modals";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { QuotationDetailTopBar } from "@/components/layouts/top-bars/quotations/quotation-detail-top-bar";
import { ProfessionalQuotationDetailTopBar } from "@/components/layouts/top-bars/quotations/professional-quotations-top-bar";
import { useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import { DEFAULT_PROFESSIONAL_QUOTATIONS } from "./data";
import {
  useProfessionalQuotationDetailService,
  useQuotationDetailService,
} from "./services/quotationsApi";
import type { QuotationDetailViewProps } from "./types";

export type { QuotationDetailViewProps } from "./types";

function ConsumerQuotationDetailView({
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
            quotation.versionBadge
              ? `REVISED (${quotation.versionBadge})`
              : undefined
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

export function ProfessionalQuotationDetailView({
  quotationId = "QT-1024",
}: QuotationDetailViewProps) {
  const {
    quotation,
    overviewKpis,
    historicalKpis,
    handleBackToQuotations,
    handleViewHistory,
    handleUpdateQuote,
    handleCancelQuote,
    handleArchiveQuote,
    handleViewOtherRequests,
    handleOpenChat,
    handleGoToOrder,
    handleDownloadReceipt,
    handleViewReview,
    handleContactSupport,
  } = useProfessionalQuotationDetailService(quotationId);

  const orderCode = quotation.orderCode || "ORD-5521";

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalQuotationDetailTopBar
          status={quotation.status}
          orderCode={orderCode}
          onBackToQuotations={handleBackToQuotations}
          onViewHistory={handleViewHistory}
          onCancelQuote={handleCancelQuote}
          onUpdateQuote={handleUpdateQuote}
          onMessageConsumer={handleOpenChat}
          onGoToOrder={handleGoToOrder}
          onArchiveQuote={handleArchiveQuote}
          onViewOtherRequests={handleViewOtherRequests}
          onDownloadReceipt={handleDownloadReceipt}
          onViewReview={handleViewReview}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <div className="flex sm:hidden flex-wrap items-center justify-end gap-2 shrink-0 ml-auto">
          {quotation.status === "pending" && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleViewHistory}
                leadingIcon={<History className="size-3.5" />}
                className="h-9 px-3 rounded-lg text-xs font-semibold"
              >
                View History
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCancelQuote}
                leadingIcon={<Ban className="size-3.5 text-error" />}
                className="h-9 px-3 rounded-lg text-xs font-semibold text-error border-border"
              >
                Cancel Quote
              </Button>

              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={handleUpdateQuote}
                leadingIcon={<SquarePen className="size-3.5" />}
                className="h-9 px-3.5 rounded-lg text-xs font-semibold shadow-xs"
              >
                Update Quote
              </Button>
            </>
          )}

          {quotation.status === "approved" && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleOpenChat}
                leadingIcon={<MessageSquare className="size-3.5" />}
                className="h-9 px-3 rounded-lg text-xs font-semibold"
              >
                Message Consumer
              </Button>

              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={handleGoToOrder}
                trailingIcon={<ExternalLink className="size-3.5" />}
                className="h-9 px-3.5 rounded-lg text-xs font-semibold shadow-xs"
              >
                Go to Order #{orderCode}
              </Button>
            </>
          )}

          {quotation.status === "rejected" && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleArchiveQuote}
                leadingIcon={<Archive className="size-3.5" />}
                className="h-9 px-3 rounded-lg text-xs font-semibold"
              >
                Archive Quote
              </Button>

              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={handleViewOtherRequests}
                className="h-9 px-3.5 rounded-lg text-xs font-semibold shadow-xs"
              >
                View Other Requests
              </Button>
            </>
          )}

          {quotation.status === "completed" && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDownloadReceipt}
                leadingIcon={<Download className="size-3.5" />}
                className="h-9 px-3 rounded-lg text-xs font-semibold"
              >
                Download Receipt
              </Button>

              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={handleViewReview}
                leadingIcon={<Star className="size-3.5 fill-current" />}
                className="h-9 px-3.5 rounded-lg text-xs font-semibold shadow-xs"
              >
                View Review
              </Button>
            </>
          )}
        </div>

        {quotation.status === "approved" ? (
          <ProQuotationDetailHired
            quotation={quotation}
            onGoToOrder={handleGoToOrder}
          />
        ) : quotation.status === "rejected" ? (
          <ProQuotationDetailRejected
            quotation={quotation}
            onSendMessage={handleOpenChat}
          />
        ) : quotation.status === "completed" ? (
          <ProQuotationDetailCompleted
            quotation={quotation}
            historicalKpis={historicalKpis}
            onGoToOrder={handleGoToOrder}
            onContactSupport={handleContactSupport}
          />
        ) : (
          <ProQuotationDetailPending
            quotation={quotation}
            kpis={overviewKpis}
            onOpenChat={handleOpenChat}
          />
        )}
      </div>
    </>
  );
}

export function QuotationDetailView({
  quotationId = "QT-8821-A",
}: QuotationDetailViewProps) {
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  const isProQuoteId = DEFAULT_PROFESSIONAL_QUOTATIONS.some(
    (q) =>
      q.id.toLowerCase() === quotationId.toLowerCase() ||
      q.code.toLowerCase() === quotationId.toLowerCase()
  );

  if (effectiveRole === "professional" || isProQuoteId) {
    return <ProfessionalQuotationDetailView quotationId={quotationId} />;
  }

  return <ConsumerQuotationDetailView quotationId={quotationId} />;
}

export default QuotationDetailView;
