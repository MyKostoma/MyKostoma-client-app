"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AcceptQuotationModal,
  QuotationsComparisonTable,
  RejectQuotationModal,
  type QuotationItem,
} from "@/components/quotations";
import {
  CompareQuotationsTopBar,
  DashboardTopBarSlot,
} from "@/components/layouts/top-bars";
import { DEFAULT_QUOTATIONS } from "./data";

export interface CompareQuotationsViewProps {
  selectedIds?: string[];
}

export function CompareQuotationsView({
  selectedIds,
}: CompareQuotationsViewProps) {
  const router = useRouter();

  const initialQuotes = useMemo(() => {
    if (selectedIds && selectedIds.length > 0) {
      const matched = DEFAULT_QUOTATIONS.filter((q) =>
        selectedIds.includes(q.id)
      );
      if (matched.length > 0) return matched;
    }
    return DEFAULT_QUOTATIONS.filter(
      (q) => q.status === "pending" || q.status === "updated"
    ).slice(0, 3);
  }, [selectedIds]);

  const [comparedQuotes, setComparedQuotes] =
    useState<QuotationItem[]>(initialQuotes);
  const [acceptingQuote, setAcceptingQuote] = useState<QuotationItem | null>(
    null
  );
  const [rejectingQuote, setRejectingQuote] = useState<QuotationItem | null>(
    null
  );

  const primaryQuote = comparedQuotes[0] ?? DEFAULT_QUOTATIONS[0];

  const handleDownloadComparison = () => {
    toast.success("Downloading PDF comparison summary...");
  };

  const handleConfirmAccept = () => {
    if (!acceptingQuote) return;
    toast.success(
      `Quote from ${acceptingQuote.providerName} accepted! Redirecting...`
    );
    const targetId = acceptingQuote.id;
    setAcceptingQuote(null);
    router.push(`/quotations/${encodeURIComponent(targetId)}`);
  };

  const handleConfirmReject = () => {
    if (!rejectingQuote) return;
    setComparedQuotes((prev) =>
      prev.filter((q) => q.id !== rejectingQuote.id)
    );
    toast.success(
      `Quote from ${rejectingQuote.providerName} rejected and removed from comparison.`
    );
    setRejectingQuote(null);
  };

  return (
    <>
      <DashboardTopBarSlot>
        <CompareQuotationsTopBar
          requestTitle={primaryQuote.requestTitle}
          requestCode={primaryQuote.requestCode}
          selectedCount={comparedQuotes.length}
          onBack={() => router.push("/quotations")}
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
              onClick={() => router.push("/quotations")}
              className="h-9 px-4 rounded-lg text-xs font-semibold"
            >
              Back to Quotes
            </Button>
          </div>
        ) : (
          <QuotationsComparisonTable
            quotations={comparedQuotes}
            onAcceptQuote={setAcceptingQuote}
            onViewDetail={(quote) =>
              router.push(`/quotations/${encodeURIComponent(quote.id)}`)
            }
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

