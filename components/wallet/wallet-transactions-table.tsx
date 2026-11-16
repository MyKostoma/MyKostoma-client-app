"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  formatSignedAmount,
  getTransactionStatusClasses,
  getTransactionTypeBadgeClasses,
} from "@/features/wallet/services/walletHelpers";
import type { WalletTransactionsTableProps } from "./types";

export function WalletTransactionsTable({
  transactions,
  variant = "recent",
  onSelectTransaction,
  onViewAll,
  className,
}: WalletTransactionsTableProps) {
  const isFull = variant === "full";

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card overflow-hidden shadow-2xs",
        className
      )}
    >
      {!isFull && (
        <div className="px-5 sm:px-6 py-4 flex items-center justify-between border-b border-border/70">
          <h2 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
            Transaction History
          </h2>
          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="size-3.5" />
            </button>
          )}
        </div>
      )}

      {transactions.length === 0 ? (
        <div className="p-12 text-center text-xs sm:text-sm text-muted-foreground">
          No transactions match your current filter criteria.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/70 bg-secondary/40 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3.5 px-5 sm:px-6">
                  {isFull ? "DATE & TIME" : "DATE"}
                </th>
                <th className="py-3.5 px-4">DESCRIPTION</th>
                {isFull && <th className="py-3.5 px-4">REFERENCE</th>}
                <th className="py-3.5 px-4">TYPE</th>
                <th className="py-3.5 px-4">
                  {isFull ? "AMOUNT (₦)" : "AMOUNT"}
                </th>
                <th className="py-3.5 px-5 sm:px-6">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs">
              {transactions.map((tx) => {
                const statusStyle = getTransactionStatusClasses(tx.status);
                const amountColor =
                  tx.status === "failed"
                    ? "text-foreground"
                    : tx.direction === "credit"
                      ? "text-success"
                      : "text-error";

                return (
                  <tr
                    key={tx.id}
                    onClick={() => onSelectTransaction?.(tx)}
                    className={cn(
                      "transition-colors",
                      onSelectTransaction &&
                        "hover:bg-secondary/40 cursor-pointer"
                    )}
                  >
                    <td className="py-4 px-5 sm:px-6 whitespace-nowrap">
                      {isFull ? (
                        <div>
                          <p className="font-bold text-foreground">
                            {tx.dateFormatted}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {tx.timeFormatted}
                          </p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground font-medium">
                          {tx.dateISO}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 font-semibold text-foreground min-w-[200px]">
                      {tx.description}
                    </td>

                    {isFull && (
                      <td className="py-4 px-4 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                        {tx.reference}
                      </td>
                    )}

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
                          getTransactionTypeBadgeClasses(tx.type)
                        )}
                      >
                        {isFull && tx.type === "funding"
                          ? "DEPOSIT"
                          : tx.typeLabel}
                      </span>
                    </td>

                    <td
                      className={cn(
                        "py-4 px-4 font-bold whitespace-nowrap",
                        amountColor
                      )}
                    >
                      {formatSignedAmount(tx, !isFull)}
                    </td>

                    <td className="py-4 px-5 sm:px-6 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 font-semibold",
                          statusStyle.textClass
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 rounded-full shrink-0",
                            statusStyle.dotClass
                          )}
                        />
                        <span>
                          {isFull && tx.status === "held"
                            ? "Pending"
                            : tx.statusLabel}
                        </span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

