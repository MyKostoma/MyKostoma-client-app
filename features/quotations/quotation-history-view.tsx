"use client";

import { ProQuotationHistoryTimeline } from "@/components/quotations/professional/pro-quotation-history-timeline";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { ProfessionalQuotationSubpageTopBar } from "@/components/layouts/top-bars/quotations/professional-quotations-top-bar";
import { useProfessionalQuotationHistoryService } from "./services/quotationsApi";
import type { QuotationHistoryViewProps } from "./types";

export type { QuotationHistoryViewProps } from "./types";

export function QuotationHistoryView({
  quotationId = "QT-1024",
}: QuotationHistoryViewProps) {
  const {
    quotation,
    handleBackToDetail,
    handleViewVersion,
    handleExportAuditLog,
  } = useProfessionalQuotationHistoryService(quotationId);

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalQuotationSubpageTopBar
          backLabel="Back to Quote Detail"
          onBack={handleBackToDetail}
        />
      </DashboardTopBarSlot>

      <ProQuotationHistoryTimeline
        quotation={quotation}
        onViewVersion={handleViewVersion}
        onExportAuditLog={handleExportAuditLog}
      />
    </>
  );
}

export default QuotationHistoryView;
