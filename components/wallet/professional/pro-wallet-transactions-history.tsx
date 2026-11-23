"use client";

import { Download, Filter, MoreVertical, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput, Select } from "@/components/ui/form-fields";
import { WalletPaginationBar } from "@/components/wallet/wallet-pagination-bar";
import { cn } from "@/lib/utils";
import {
  formatProSignedAmount,
  formatWalletNaira,
} from "@/features/wallet/services/walletHelpers";
import type { ProWalletTransactionsHistoryProps } from "../types";

export function ProWalletTransactionsHistory({
  summary,
  transactions,
  filters,
  monthOptions,
  typeOptions,
  statusOptions,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onSearchChange,
  onMonthChange,
  onTypeChange,
  onStatusChange,
  onMoreFilters,
  onExportCsv,
  onSelectTransaction,
  onPageChange,
  onViewEscrowStatus,
  className,
}: ProWalletTransactionsHistoryProps) {
  return (
    <div className={cn("space-y-5", className)}>
      {/* Title + Totals Summary Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Transaction History
        </h1>

        <div className="rounded-2xl border border-border bg-card px-4 py-2.5 shadow-2xs flex items-center justify-between sm:justify-start gap-5 self-start md:self-auto">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              TOTAL CREDITS
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-success">
              {formatWalletNaira(summary.totalCredits)}
            </p>
          </div>

          <div className="space-y-0.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              TOTAL DEBITS
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-error">
              {formatWalletNaira(summary.totalDebits)}
            </p>
          </div>

          <span aria-hidden="true" className="h-7 w-px bg-border" />

          <button
            type="button"
            aria-label="Export transaction history CSV"
            onClick={onExportCsv}
            className="size-8 rounded-lg hover:bg-secondary text-foreground flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <Download className="size-4" />
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="rounded-2xl border border-border bg-card p-3 sm:p-4 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        <div className="flex-1 min-w-0">
          <SearchInput
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search description or ID..."
            className="h-10 text-xs bg-secondary/25"
          />
        </div>

        <div className="grid grid-cols-2 sm:flex items-center gap-2.5 shrink-0">
          <div className="sm:w-32">
            <Select
              options={monthOptions}
              value={filters.month}
              onChange={onMonthChange}
              className="h-10 text-xs"
            />
          </div>

          <div className="sm:w-32">
            <Select
              options={typeOptions}
              value={filters.type}
              onChange={onTypeChange}
              className="h-10 text-xs"
            />
          </div>

          <div className="sm:w-32">
            <Select
              options={statusOptions}
              value={filters.status}
              onChange={onStatusChange}
              className="h-10 text-xs"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onMoreFilters}
            leadingIcon={<Filter className="size-3.5" />}
            className="h-10 px-3.5 rounded-lg text-xs font-bold shrink-0"
          >
            More Filters
          </Button>
        </div>
      </div>

      {/* Full History Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-border/70 bg-secondary/35 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3.5 px-5">DATE</th>
                <th className="py-3.5 px-4">TRANSACTION ID</th>
                <th className="py-3.5 px-4">DESCRIPTION</th>
                <th className="py-3.5 px-4">TYPE</th>
                <th className="py-3.5 px-4">AMOUNT (₦)</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-5 text-right">ACTION</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60 text-xs">
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 px-5 text-center text-xs sm:text-sm text-muted-foreground"
                  >
                    No transactions match your current filter criteria.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => {
                  const isCredit = tx.direction === "credit";

                  return (
                    <tr
                      key={tx.id}
                      onClick={() => onSelectTransaction(tx)}
                      className="hover:bg-secondary/35 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-5 text-muted-foreground font-medium whitespace-nowrap">
                        {tx.dateFormatted}
                      </td>

                      <td className="py-4 px-4 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                        {tx.id}
                      </td>

                      <td className="py-4 px-4">
                        <p className="text-xs sm:text-sm font-bold text-foreground">
                          {tx.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {tx.historySubtitle || tx.subtitle}
                        </p>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            isCredit
                              ? "bg-success-bg text-success"
                              : "bg-error-bg text-error"
                          )}
                        >
                          {tx.direction.toUpperCase()}
                        </span>
                      </td>

                      <td
                        className={cn(
                          "py-4 px-4 text-xs sm:text-sm font-bold whitespace-nowrap",
                          isCredit ? "text-success" : "text-error"
                        )}
                      >
                        {formatProSignedAmount(tx.direction, tx.amount, false)}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold",
                            tx.status === "completed" &&
                              "bg-success-bg text-success",
                            tx.status === "pending" &&
                              "bg-warning-bg text-warning",
                            tx.status === "failed" && "bg-error-bg text-error"
                          )}
                        >
                          {tx.status === "completed"
                            ? "Completed"
                            : tx.status === "pending"
                              ? "Pending"
                              : "Failed"}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right">
                        <button
                          type="button"
                          aria-label={`View transaction ${tx.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTransaction(tx);
                          }}
                          className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                        >
                          <MoreVertical className="size-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <WalletPaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      </div>

      {/* Bottom Escrow Info Callout */}
      <div className="rounded-2xl border border-info/25 bg-info-bg/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="size-9 rounded-full bg-card border border-info/20 flex items-center justify-center text-info shrink-0">
            <Shield className="size-4" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs sm:text-sm font-bold text-info">
              Looking for Escrow Payouts?
            </p>
            <p className="text-xs text-info/80">
              Funds in escrow are only added to your history once released.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onViewEscrowStatus}
          className="h-9 px-4 rounded-xl bg-card border-info/25 text-info hover:bg-card/90 text-xs font-bold shrink-0 self-end sm:self-center"
        >
          View Escrow Status
        </Button>
      </div>
    </div>
  );
}
