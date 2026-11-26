"use client";

import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { SettingsTopBar } from "@/components/layouts/top-bars/settings/settings-top-bar";
import {
  DisputeDetailModal,
  StartDisputeModal,
} from "@/components/modals/settings-modals";
import { DisputesSettingsPanel } from "@/components/settings/disputes-settings-panel";
import { SettingsShell } from "@/components/settings/settings-shell";
import { DISPUTE_REASON_OPTIONS } from "@/features/settings/data";
import { useDisputesSettingsService } from "@/features/settings/services/settingsApi";

export function DisputesSettingsView() {
  const {
    isProfessional,
    disputes,
    totalDisputesCount,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateRangeFilter,
    setDateRangeFilter,
    currentPage,
    totalPages,
    setCurrentPage,
    startModalOpen,
    setStartModalOpen,
    selectedDispute,
    setSelectedDispute,
    handleCreateDispute,
    handleOpenHelpCenter,
    handleReadDisputePolicies,
  } = useDisputesSettingsService();

  return (
    <>
      <DashboardTopBarSlot>
        <SettingsTopBar title="Disputes" />
      </DashboardTopBarSlot>

      <SettingsShell activeSection="disputes" isProfessional={isProfessional}>
        <DisputesSettingsPanel
          disputes={disputes}
          totalDisputesCount={totalDisputesCount}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          dateRangeFilter={dateRangeFilter}
          currentPage={currentPage}
          totalPages={totalPages}
          onSearchChange={setSearchQuery}
          onStatusFilterChange={setStatusFilter}
          onDateRangeFilterChange={setDateRangeFilter}
          onPageChange={setCurrentPage}
          onStartDispute={() => setStartModalOpen(true)}
          onViewDisputeDetail={setSelectedDispute}
          onOpenHelpCenter={handleOpenHelpCenter}
          onReadDisputePolicies={handleReadDisputePolicies}
        />
      </SettingsShell>

      <StartDisputeModal
        isOpen={startModalOpen}
        reasons={DISPUTE_REASON_OPTIONS}
        onClose={() => setStartModalOpen(false)}
        onCreateDispute={handleCreateDispute}
      />

      <DisputeDetailModal
        isOpen={Boolean(selectedDispute)}
        dispute={selectedDispute}
        onClose={() => setSelectedDispute(null)}
        onContactSupport={handleOpenHelpCenter}
      />
    </>
  );
}
