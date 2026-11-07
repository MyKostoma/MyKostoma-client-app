"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/form-fields";
import {
  QuotationCard,
  QuotationPromoteCard,
} from "@/components/quotations/quotation-card";
import { QuotationsFilterTabs } from "@/components/quotations/quotations-filter-tabs";
import {
  AcceptQuotationModal,
  RejectQuotationModal,
} from "@/components/modals/quotation-modals";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { QuotationsListTopBar } from "@/components/layouts/top-bars/quotations/quotations-list-top-bar";
import { useQuotationsListService } from "./services/quotationsApi";
import type { QuotationsListViewProps } from "./types";

export type { QuotationsListViewProps } from "./types";

export function QuotationsListView({
  initialQuotations,
  totalCountLabel = "12 TOTAL",
}: QuotationsListViewProps) {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    comparedIds,
    filteredQuotations,
    acceptingQuote,
    setAcceptingQuote,
    rejectingQuote,
    setRejectingQuote,
    handleToggleCompare,
    handleClearCompare,
    handleViewDetail,
    handleConfirmAccept,
    handleConfirmReject,
    handleRestoreQuote,
    handleCompareNow,
    handleToggleFilters,
    handlePromoteRequest,
  } = useQuotationsListService(initialQuotations);

  return (
    <>
      <DashboardTopBarSlot>
        <QuotationsListTopBar
          totalCountLabel={totalCountLabel}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleFilters={handleToggleFilters}
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
            onClick={handleToggleFilters}
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
          onClearCompare={handleClearCompare}
          onPromoteRequest={handlePromoteRequest}
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
