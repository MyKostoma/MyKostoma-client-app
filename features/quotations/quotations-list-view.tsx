"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/form-fields";
import {
  AcceptQuotationModal,
  QuotationCard,
  QuotationPromoteCard,
  QuotationsFilterTabs,
  RejectQuotationModal,
  type QuotationItem,
  type QuotationTabFilter,
} from "@/components/quotations";
import {
  DashboardTopBarSlot,
  QuotationsListTopBar,
} from "@/components/layouts/top-bars";
import { DEFAULT_QUOTATIONS } from "./data";

export interface QuotationsListViewProps {
  initialQuotations?: QuotationItem[];
  totalCountLabel?: string;
}

export function QuotationsListView({
  initialQuotations = DEFAULT_QUOTATIONS,
  totalCountLabel = "12 TOTAL",
}: QuotationsListViewProps) {
  const router = useRouter();
  const [quotations, setQuotations] =
    useState<QuotationItem[]>(initialQuotations);
  const [activeTab, setActiveTab] = useState<QuotationTabFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [comparedIds, setComparedIds] = useState<string[]>([
    "QT-8821-B",
    "QT-8821-A",
  ]);
  const [acceptingQuote, setAcceptingQuote] = useState<QuotationItem | null>(
    null
  );
  const [rejectingQuote, setRejectingQuote] = useState<QuotationItem | null>(
    null
  );

  const filteredQuotations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return quotations.filter((item) => {
      if (activeTab === "pending") {
        if (item.status !== "pending" && item.status !== "updated") {
          return false;
        }
      } else if (activeTab === "accepted") {
        if (item.status !== "accepted") return false;
      } else if (activeTab === "rejected") {
        if (item.status !== "rejected") return false;
      } else if (activeTab === "comparison") {
        if (!comparedIds.includes(item.id)) return false;
      }

      if (q) {
        const haystack =
          `${item.providerName} ${item.requestTitle} ${item.requestCode} ${item.message}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [quotations, activeTab, searchQuery, comparedIds]);

  const handleToggleCompare = (quote: QuotationItem) => {
    setComparedIds((prev) => {
      if (prev.includes(quote.id)) {
        return prev.filter((id) => id !== quote.id);
      }
      if (prev.length >= 3) {
        toast.info("You can compare up to 3 quotes at a time.");
        return prev;
      }
      return [...prev, quote.id];
    });
  };

  const handleViewDetail = (quote: QuotationItem) => {
    router.push(`/quotations/${encodeURIComponent(quote.id)}`);
  };

  const handleConfirmAccept = () => {
    if (!acceptingQuote) return;
    setQuotations((prev) =>
      prev.map((q) =>
        q.id === acceptingQuote.id ? { ...q, status: "accepted" } : q
      )
    );
    toast.success(
      `Quote from ${acceptingQuote.providerName} accepted! Order created.`
    );
    const targetId = acceptingQuote.id;
    setAcceptingQuote(null);
    router.push(`/quotations/${encodeURIComponent(targetId)}`);
  };

  const handleConfirmReject = () => {
    if (!rejectingQuote) return;
    setQuotations((prev) =>
      prev.map((q) =>
        q.id === rejectingQuote.id
          ? { ...q, status: "rejected", rejectedAt: "Today" }
          : q
      )
    );
    setComparedIds((prev) => prev.filter((id) => id !== rejectingQuote.id));
    toast.success(`Quote from ${rejectingQuote.providerName} rejected.`);
    setRejectingQuote(null);
  };

  const handleRestoreQuote = (quote: QuotationItem) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === quote.id ? { ...q, status: "pending" } : q))
    );
    toast.success(`Quote from ${quote.providerName} restored.`);
  };

  const handleCompareNow = () => {
    const query =
      comparedIds.length > 0 ? `?ids=${comparedIds.join(",")}` : "";
    router.push(`/quotations/compare${query}`);
  };

  return (
    <>
      <DashboardTopBarSlot>
        <QuotationsListTopBar
          totalCountLabel={totalCountLabel}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleFilters={() => toast.info("Filter options coming soon.")}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <div className="flex md:hidden items-center gap-2.5 sm:gap-3 shrink-0 ml-auto">
          <div className="w-full">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quotes..."
              className="h-9 text-xs bg-secondary/40"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => toast.info("Filter options coming soon.")}
            leadingIcon={<SlidersHorizontal className="size-3.5" />}
            className="h-9 px-3.5 rounded-lg text-xs font-semibold shrink-0"
          >
            Filters
          </Button>
        </div>

        <QuotationsFilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          comparisonCount={comparedIds.length}
        />

        {filteredQuotations.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-xs sm:text-sm text-muted-foreground">
            No quotations match your current filter.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuotations.map((quote) => (
              <QuotationCard
                key={quote.id}
                quotation={quote}
                isComparing={comparedIds.includes(quote.id)}
                onToggleCompare={handleToggleCompare}
                onViewDetail={handleViewDetail}
                onAcceptQuote={setAcceptingQuote}
                onRejectQuote={setRejectingQuote}
                onRestoreQuote={handleRestoreQuote}
              />
            ))}
          </div>
        )}

        <QuotationPromoteCard
          selectedCount={comparedIds.length}
          onCompareNow={handleCompareNow}
          onClearCompare={() => setComparedIds([])}
          onPromoteRequest={() =>
            toast.success(
              "Your request has been promoted to top professionals!"
            )
          }
        />
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

export default QuotationsListView;

