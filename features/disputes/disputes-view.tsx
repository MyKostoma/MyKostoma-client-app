"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { DisputesTopBar } from "@/components/layouts/top-bars/disputes/disputes-top-bar";
import { DisputesTabs } from "@/components/disputes/disputes-tabs";
import { DisputesToolbar } from "@/components/disputes/disputes-toolbar";
import { DisputesTable } from "@/components/disputes/disputes-table";
import { DisputesEmptyState } from "@/components/disputes/disputes-empty-state";
import { DisputesSummaryCards } from "@/components/disputes/disputes-summary-cards";
import {
  DisputeGuidelinesModal,
  RaiseDisputeWizardModal,
} from "@/components/modals/dispute-modals";
import {
  DISPUTE_GUIDELINES_ITEMS,
  DISPUTE_REASON_OPTIONS,
} from "@/features/disputes/data";
import { useDisputesDashboardService } from "@/features/disputes/services/disputesApi";

export function DisputesView() {
  const {
    isProfessional,
    hasAnyDisputesInStore,
    disputes,
    totalFilteredCount,
    activeCount,
    resolvedCount,
    activeTab,
    searchQuery,
    statusFilter,
    dateRangeFilter,
    includeArchived,
    hasActiveFilters,
    currentPage,
    totalPages,
    pageSize,
    kpiSummary,
    orderOptions,
    defaultOrderId,
    raiseModalOpen,
    setRaiseModalOpen,
    guidelinesModalOpen,
    setGuidelinesModalOpen,
    handleTabChange,
    handleSearchChange,
    handleStatusFilterChange,
    handleDateRangeFilterChange,
    handleIncludeArchivedChange,
    handleResetFilters,
    handlePageChange,
    handleArchiveDispute,
    handleRestoreDispute,
    handleRaiseDisputeSubmit,
    handleExportCsv,
    handleViewDisputeDetail,
    handleOpenHelpCenter,
    handleContactSupport,
  } = useDisputesDashboardService();

  const openRaiseModal = () => setRaiseModalOpen(true);

  return (
    <>
      <DashboardTopBarSlot>
        <DisputesTopBar title="Disputes" onRaiseDispute={openRaiseModal} />
      </DashboardTopBarSlot>

      <div className="space-y-6 pb-10">
        {/* Page Heading + Mobile Primary CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              Disputes
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage and track your active or resolved conflict resolutions.
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            onClick={openRaiseModal}
            className="flex sm:hidden w-full h-10 px-5 rounded-xl text-xs font-semibold gap-2 justify-center"
          >
            <Plus className="size-4" />
            <span>Raise Dispute</span>
          </Button>
        </div>

        <DisputesTabs
          activeTab={activeTab}
          activeCount={activeCount}
          resolvedCount={resolvedCount}
          onTabChange={handleTabChange}
        />

        {hasAnyDisputesInStore && (
          <DisputesToolbar
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            dateRangeFilter={dateRangeFilter}
            includeArchived={includeArchived}
            hasActiveFilters={hasActiveFilters}
            onSearchChange={handleSearchChange}
            onStatusFilterChange={handleStatusFilterChange}
            onDateRangeFilterChange={handleDateRangeFilterChange}
            onIncludeArchivedChange={handleIncludeArchivedChange}
            onResetFilters={handleResetFilters}
            onExportCsv={handleExportCsv}
          />
        )}

        {disputes.length > 0 ? (
          <>
            <DisputesTable
              disputes={disputes}
              totalCount={totalFilteredCount}
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              isProfessional={isProfessional}
              onPageChange={handlePageChange}
              onArchiveDispute={handleArchiveDispute}
              onRestoreDispute={handleRestoreDispute}
            />

            <DisputesSummaryCards
              summary={kpiSummary}
              onReadDocumentation={() => setGuidelinesModalOpen(true)}
            />
          </>
        ) : (
          <DisputesEmptyState
            variant={hasActiveFilters ? "no-matches" : "no-disputes"}
            onRaiseDispute={openRaiseModal}
            onClearFilters={handleResetFilters}
            onReadGuidelines={() => setGuidelinesModalOpen(true)}
          />
        )}
      </div>

      <RaiseDisputeWizardModal
        isOpen={raiseModalOpen}
        orderOptions={orderOptions}
        reasons={DISPUTE_REASON_OPTIONS}
        defaultOrderId={defaultOrderId}
        onClose={() => setRaiseModalOpen(false)}
        onSubmitDispute={handleRaiseDisputeSubmit}
        onViewDisputeDetail={handleViewDisputeDetail}
        onOpenHelpCenter={handleOpenHelpCenter}
        onContactSupport={handleContactSupport}
      />

      <DisputeGuidelinesModal
        isOpen={guidelinesModalOpen}
        sections={DISPUTE_GUIDELINES_ITEMS}
        onClose={() => setGuidelinesModalOpen(false)}
        onContactSupport={handleContactSupport}
      />
    </>
  );
}
