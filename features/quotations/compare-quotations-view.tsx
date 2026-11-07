"use client";

import { Button } from "@/components/ui/button";
import { QuotationsComparisonTable } from "@/components/quotations/quotations-comparison-table";
import {
  AcceptQuotationModal,
  RejectQuotationModal,
} from "@/components/modals/quotation-modals";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { CompareQuotationsTopBar } from "@/components/layouts/top-bars/quotations/compare-quotations-top-bar";
import { useCompareQuotationsService } from "./services/quotationsApi";
import type { CompareQuotationsViewProps } from "./types";

export type { CompareQuotationsViewProps } from "./types";

export function CompareQuotationsView({
  selectedIds,
}: CompareQuotationsViewProps) {
  const {
    comparedQuotes,
    primaryQuote,
    acceptingQuote,
    setAcceptingQuote,
    rejectingQuote,
    setRejectingQuote,
    handleBackToQuotes,
    handleDownloadComparison,
    handleViewDetail,
    handleConfirmAccept,
    handleConfirmReject,
  } = useCompareQuotationsService(selectedIds);

  return (
    <>
      <DashboardTopBarSlot>
        <CompareQuotationsTopBar
          requestTitle={primaryQuote.requestTitle}
          requestCode={primaryQuote.requestCode}
          selectedCount={comparedQuotes.length}
          onBack={handleBackToQuotes}
          onDownloadComparison={handleDownloadComparison}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <div className="flex md:hidden items-center justify-between gap-2.5 shrink-0">
          <span className="text-xs font-medium text-muted-foreground">
            {comparedQuotes.length}{" "}
            {comparedQuotes.length === 1 ? "Quote" : "Quotes"} Selected
          </span>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleDownloadComparison}
            className="h-9 px-3.5 rounded-lg text-[11px] font-bold uppercase tracking-wider shadow-xs"
          >
            Download Comparison
          </Button>
        </div>

        {comparedQuotes.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center space-y-3">
            <p className="text-xs sm:text-sm text-muted-foreground">
              No quotes left in comparison.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleBackToQuotes}
              className="h-9 px-4 rounded-lg text-xs font-semibold"
            >
              Back to Quotes
            </Button>
          </div>
        ) : (
          <QuotationsComparisonTable
            quotations={comparedQuotes}
            onAcceptQuote={setAcceptingQuote}
            onViewDetail={handleViewDetail}
            onRejectQuote={setRejectingQuote}
          />
        )}
      </div>

      <AcceptQuotationModal
        isOpen={Boolean(acceptingQuote)}
        quoteCode={acceptingQuote?.code || ""}
        requestTitle={acceptingQuote?.requestTitle || ""}
        providerName={acceptingQuote?.providerName || ""}
        estimatedDuration={acceptingQuote?.estimatedDuration || ""}
        totalAmount={acceptingQuote?.totalAmount || ""}
        onClose={() => setAcceptingQuote(null)}
        onConfirmAccept={handleConfirmAccept}
      />

      <RejectQuotationModal
        isOpen={Boolean(rejectingQuote)}
        providerName={rejectingQuote?.providerName || ""}
        onClose={() => setRejectingQuote(null)}
        onConfirmReject={handleConfirmReject}
      />
    </>
  );
}

export default CompareQuotationsView;
