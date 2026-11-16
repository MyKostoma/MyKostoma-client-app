"use client";

import { Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/form-fields";
import {
  QuotationCard,
  QuotationPromoteCard,
} from "@/components/quotations/quotation-card";
import {
  QuotationsFilterTabs,
  type QuotationTabOption,
} from "@/components/quotations/quotations-filter-tabs";
import { ProQuotationsTable } from "@/components/quotations/professional/pro-quotations-table";
import { ProQuotationsKpiStrip } from "@/components/quotations/professional/pro-quotations-kpi-strip";
import {
  AcceptQuotationModal,
  RejectQuotationModal,
} from "@/components/modals/quotation-modals";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { QuotationsListTopBar } from "@/components/layouts/top-bars/quotations/quotations-list-top-bar";
import { ProfessionalQuotationsListTopBar } from "@/components/layouts/top-bars/quotations/professional-quotations-top-bar";
import { useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import {
  useProfessionalQuotationsListService,
  useQuotationsListService,
} from "./services/quotationsApi";
import type {
  ProfessionalQuotationTabFilter,
  QuotationsListViewProps,
} from "./types";

export type { QuotationsListViewProps } from "./types";

const PROFESSIONAL_QUOTATION_TABS: QuotationTabOption<ProfessionalQuotationTabFilter>[] =
  [
    { id: "all", label: "All Quotes" },
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
    { id: "completed", label: "Completed" },
  ];

function ConsumerQuotationsListView({
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

export function ProfessionalQuotationsListView() {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalCount,
    totalPages,
    filteredQuotations,
    kpis,
    handleViewQuote,
    handleCreateNewQuote,
    handleToggleFilters,
  } = useProfessionalQuotationsListService();

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalQuotationsListTopBar
          onCreateNewQuote={handleCreateNewQuote}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <div className="flex sm:hidden items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Manage and track your professional service estimates.
          </p>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleCreateNewQuote}
            leadingIcon={<Plus className="size-3.5" />}
            className="h-9 px-3.5 rounded-lg text-xs font-semibold shrink-0"
          >
            New Quote
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card p-2.5 sm:px-4 sm:py-2.5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <QuotationsFilterTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={PROFESSIONAL_QUOTATION_TABS}
            className="flex-1"
          />

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-full sm:w-56 lg:w-64">
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
        </div>

        <ProQuotationsTable
          quotations={filteredQuotations}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={setCurrentPage}
          onSelectQuote={handleViewQuote}
        />

        <ProQuotationsKpiStrip metrics={kpis} />
      </div>
    </>
  );
}

export function QuotationsListView(props: QuotationsListViewProps) {
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  if (effectiveRole === "professional") {
    return <ProfessionalQuotationsListView />;
  }

  return <ConsumerQuotationsListView {...props} />;
}

export default QuotationsListView;
