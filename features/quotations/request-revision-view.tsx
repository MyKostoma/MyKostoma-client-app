"use client";

import { Button } from "@/components/ui/button";
import { QuotationRevisionForm } from "@/components/quotations/quotation-revision-form";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { RequestFormTopBar } from "@/components/layouts/top-bars/requests/request-form-top-bar";
import { useRequestRevisionService } from "./services/quotationsApi";
import type { RequestRevisionViewProps } from "./types";

export type { RequestRevisionViewProps } from "./types";

export function RequestRevisionView({
  quotationId = "QT-8821-A",
}: RequestRevisionViewProps) {
  const {
    quotation,
    formValues,
    setFormValues,
    handleBackToQuote,
    handleSubmit,
  } = useRequestRevisionService(quotationId);

  return (
    <>
      <DashboardTopBarSlot>
        <RequestFormTopBar
          title="Request Revision"
          backLabel="Back to Quote"
          onBack={handleBackToQuote}
          secondaryActionLabel="Cancel"
          onSecondaryAction={handleBackToQuote}
          primaryActionLabel="Send Revision Request"
          onPrimaryAction={handleSubmit}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <div className="flex md:hidden items-center justify-end gap-2.5 sm:gap-3 shrink-0 ml-auto">
          <button
            type="button"
            onClick={handleBackToQuote}
            className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleSubmit}
            className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
          >
            Send Revision Request
          </Button>
        </div>

        <QuotationRevisionForm
          quotation={quotation}
          values={formValues}
          onChange={setFormValues}
          onCancel={handleBackToQuote}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

export default RequestRevisionView;
