"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  QuotationRevisionForm,
  type QuotationItem,
  type QuotationRevisionFormValues,
} from "@/components/quotations";
import {
  DashboardTopBarSlot,
  RequestFormTopBar,
} from "@/components/layouts/top-bars";
import { DEFAULT_QUOTATIONS } from "./data";

export interface RequestRevisionViewProps {
  quotationId?: string;
}

export function RequestRevisionView({
  quotationId = "QT-8821-A",
}: RequestRevisionViewProps) {
  const router = useRouter();

  const quotation = useMemo<QuotationItem>(() => {
    return (
      DEFAULT_QUOTATIONS.find(
        (q) => q.id.toLowerCase() === quotationId.toLowerCase()
      ) ?? DEFAULT_QUOTATIONS[0]
    );
  }, [quotationId]);

  const [formValues, setFormValues] = useState<QuotationRevisionFormValues>({
    changesDescription: "",
    attachments: [],
  });

  const handleBackToQuote = () => {
    router.push(`/quotations/${encodeURIComponent(quotation.id)}`);
  };

  const handleSubmit = () => {
    if (!formValues.changesDescription.trim()) {
      toast.error("Please describe the updates you need before submitting.");
      return;
    }
    toast.success(
      `Revision request sent to ${quotation.providerName}. You will be notified once updated.`
    );
    router.push(`/quotations/${encodeURIComponent(quotation.id)}`);
  };

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

