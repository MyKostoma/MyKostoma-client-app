"use client";

import { WalletTransactionFiltersBar } from "@/components/wallet/wallet-transaction-filters-bar";
import { WalletTransactionsTable } from "@/components/wallet/wallet-transactions-table";
import { WalletPaginationBar } from "@/components/wallet/wallet-pagination-bar";
import { ProWalletTransactionsHistory } from "@/components/wallet/professional/pro-wallet-transactions-history";
import { WalletTopBar } from "@/components/layouts/top-bars/wallet/wallet-top-bar";
import { ProfessionalWalletTopBar } from "@/components/layouts/top-bars/wallet/professional-wallet-top-bar";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import {
  useProWalletTransactionsService,
  useWalletTransactionsService,
} from "./services/walletApi";
import type { WalletTransactionsViewProps } from "./types";

function ConsumerWalletTransactionsView({
  initialTransactions,
}: WalletTransactionsViewProps) {
  const {
    filters,
    paginatedTransactions,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems,
    handleDateRangeChange,
    handleTypeChange,
    handleStatusChange,
    handleSearchChange,
    handleExportCsv,
    handleSelectTransaction,
  } = useWalletTransactionsService(initialTransactions);

  return (
    <>
      <DashboardTopBarSlot>
        <WalletTopBar
          title="Transaction History"
          subtitle="Detailed record of all your financial activities"
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <WalletTransactionFiltersBar
          filters={filters}
          onDateRangeChange={handleDateRangeChange}
          onTypeChange={handleTypeChange}
          onStatusChange={handleStatusChange}
          onSearchChange={handleSearchChange}
          onExportCsv={handleExportCsv}
        />

        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
          <WalletTransactionsTable
            transactions={paginatedTransactions}
            variant="full"
            onSelectTransaction={handleSelectTransaction}
            className="border-0 rounded-none shadow-none"
          />

          <WalletPaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}

export function ProfessionalWalletTransactionsView() {
  const {
    summary,
    filters,
    paginatedTransactions,
    monthOptions,
    typeOptions,
    statusOptions,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems,
    handleSearchChange,
    handleMonthChange,
    handleTypeChange,
    handleStatusChange,
    handleMoreFilters,
    handleExportCsv,
    handleSelectTransaction,
    handleViewEscrowStatus,
  } = useProWalletTransactionsService();

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalWalletTopBar
          breadcrumbs={[
            { label: "Wallet", href: "/wallet" },
            { label: "Transaction History" },
          ]}
        />
      </DashboardTopBarSlot>

      <ProWalletTransactionsHistory
        summary={summary}
        transactions={paginatedTransactions}
        filters={filters}
        monthOptions={monthOptions}
        typeOptions={typeOptions}
        statusOptions={statusOptions}
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        onSearchChange={handleSearchChange}
        onMonthChange={handleMonthChange}
        onTypeChange={handleTypeChange}
        onStatusChange={handleStatusChange}
        onMoreFilters={handleMoreFilters}
        onExportCsv={handleExportCsv}
        onSelectTransaction={handleSelectTransaction}
        onPageChange={setCurrentPage}
        onViewEscrowStatus={handleViewEscrowStatus}
      />
    </>
  );
}

export function WalletTransactionsView(props: WalletTransactionsViewProps) {
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  if (effectiveRole === "professional") {
    return <ProfessionalWalletTransactionsView />;
  }

  return <ConsumerWalletTransactionsView {...props} />;
}

