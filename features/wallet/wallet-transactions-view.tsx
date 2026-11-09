"use client";

import { WalletTransactionFiltersBar } from "@/components/wallet/wallet-transaction-filters-bar";
import { WalletTransactionsTable } from "@/components/wallet/wallet-transactions-table";
import { WalletPaginationBar } from "@/components/wallet/wallet-pagination-bar";
import { WalletTopBar } from "@/components/layouts/top-bars/wallet/wallet-top-bar";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { useWalletTransactionsService } from "./services/walletApi";
import type { WalletTransactionsViewProps } from "./types";

export function WalletTransactionsView({
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

