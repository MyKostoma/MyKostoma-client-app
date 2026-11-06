"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AcceptQuotationModal,
  QuotationAcceptedState,
  QuotationDetailWorkspace,
  QuotationRejectedState,
  RejectQuotationModal,
  type QuotationItem,
  type QuotationStatus,
} from "@/components/quotations";
import {
  DashboardTopBarSlot,
  QuotationDetailTopBar,
} from "@/components/layouts/top-bars";
import { DEFAULT_QUOTATIONS } from "./data";

export interface QuotationDetailViewProps {
  quotationId?: string;
}

export function QuotationDetailView({
  quotationId = "QT-8821-A",
}: QuotationDetailViewProps) {
  const router = useRouter();

  const matchedQuote = useMemo<QuotationItem>(() => {
    return (
      DEFAULT_QUOTATIONS.find(
        (q) => q.id.toLowerCase() === quotationId.toLowerCase()
      ) ?? DEFAULT_QUOTATIONS[0]
    );
  }, [quotationId]);

  const [statusOverride, setStatusOverride] = useState<QuotationStatus | null>(
    null
  );
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const effectiveStatus = statusOverride ?? matchedQuote.status;
  const quotation: QuotationItem = useMemo(
    () => ({
      ...matchedQuote,
      status: effectiveStatus,
    }),
    [matchedQuote, effectiveStatus]
  );

  const isUpdated = effectiveStatus === "updated";
  const canManage =
    effectiveStatus === "pending" || effectiveStatus === "updated";

  const handleBackToQuotes = () => {
    router.push("/quotations");
  };

  const handleCompare = () => {
    router.push("/quotations/compare");
  };

  const handleRequestUpdate = () => {
    router.push(`/quotations/${encodeURIComponent(quotation.id)}/revision`);
  };

  const handleConfirmAccept = () => {
    setAcceptModalOpen(false);
    setStatusOverride("accepted");
    toast.success("Quote accepted and converted into an active order!");
  };

  const handleConfirmReject = () => {
    setRejectModalOpen(false);
    setStatusOverride("rejected");
    toast.success("Quote has been rejected.");
  };

  const handleRestoreQuote = () => {
    setStatusOverride("pending");
    toast.success("Quote restored to pending review.");
  };

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
            onGoToOrder={() => router.push("/orders")}
            onViewReceipt={() => toast.info("Downloading order receipt...")}
          />
        ) : quotation.status === "rejected" ? (
          <QuotationRejectedState
            quotation={quotation}
            onBackToQuotes={handleBackToQuotes}
            onRestoreQuote={handleRestoreQuote}
            onMessageArtisan={() => router.push("/messages")}
          />
        ) : (
          <QuotationDetailWorkspace
            quotation={quotation}
            onViewOriginalRequest={() =>
              router.push(`/requests/${encodeURIComponent(quotation.requestId)}`)
            }
            onRejectQuote={() => setRejectModalOpen(true)}
            onViewProfile={() =>
              toast.info(`Viewing profile for ${quotation.providerName}`)
            }
            onSelectRevision={(rev) =>
              toast.info(`Viewing ${rev.versionLabel} (${rev.amount})`)
            }
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

