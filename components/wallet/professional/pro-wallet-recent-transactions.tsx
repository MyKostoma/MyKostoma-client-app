"use client";

import { Landmark, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  formatProSignedAmount,
  maskBankLast4,
} from "@/features/wallet/services/walletHelpers";
import type { ProWalletRecentTransactionsProps } from "../types";

export function ProWalletRecentTransactions({
  transactions,
  primaryBankAccount,
  onViewAllTransactions,
  onSelectTransaction,
  onEditBankDetails,
  onLearnMoreEscrow,
  className,
}: ProWalletRecentTransactionsProps) {
  return (
    <div className={cn("space-y-5", className)}>
      {/* Recent Transactions Table Card */}
      <div className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b border-border/70">
          <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-foreground">
            Recent Transactions
          </h2>

          <button
            type="button"
            onClick={onViewAllTransactions}
            className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            View All Transactions
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-border/70 bg-secondary/35 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3.5 px-6">DATE</th>
                <th className="py-3.5 px-4">DESCRIPTION</th>
                <th className="py-3.5 px-4">TYPE</th>
                <th className="py-3.5 px-4">AMOUNT (₦)</th>
                <th className="py-3.5 px-6 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs">
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 px-6 text-center text-xs text-muted-foreground"
                  >
                    No recent transactions yet.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => {
                  const isCredit = tx.direction === "credit";
                  const isCompleted = tx.status === "completed";
                  const isPending = tx.status === "pending";

                  return (
                    <tr
                      key={tx.id}
                      onClick={() => onSelectTransaction(tx)}
                      className="hover:bg-secondary/35 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-6 text-muted-foreground font-medium whitespace-nowrap">
                        {tx.dateFormatted}
                      </td>

                      <td className="py-4 px-4">
                        <p className="text-xs sm:text-sm font-bold text-foreground">
                          {tx.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {tx.subtitle}
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
                        {formatProSignedAmount(tx.direction, tx.amount, true)}
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        {isPending ? (
                          <span className="inline-flex items-center gap-1.5 font-semibold text-warning">
                            <Loader2 className="size-3.5 animate-spin shrink-0" />
                            <span>Pending</span>
                          </span>
                        ) : isCompleted ? (
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 font-semibold",
                              isCredit
                                ? "text-success"
                                : "text-muted-foreground"
                            )}
                          >
                            <span
                              className={cn(
                                "size-1.5 rounded-full shrink-0",
                                isCredit
                                  ? "bg-success"
                                  : "bg-muted-foreground/50"
                              )}
                            />
                            <span>Completed</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 font-semibold text-error">
                            <span className="size-1.5 rounded-full bg-error shrink-0" />
                            <span>Failed</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom 2-Column Info Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="size-11 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
              <Landmark className="size-5" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <p className="text-xs sm:text-sm font-extrabold text-foreground truncate">
                Linked Bank Account
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {primaryBankAccount
                  ? `${primaryBankAccount.bankName} ${maskBankLast4(primaryBankAccount.last4)}`
                  : "No bank account linked yet"}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onEditBankDetails}
            className="h-9 px-4 rounded-xl text-xs font-bold shrink-0"
          >
            {primaryBankAccount ? "Edit Details" : "Add Bank"}
          </Button>
        </div>

        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex flex-col items-center justify-center text-center space-y-2">
          <Shield className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
            Your funds are protected by Mykostoma Secure Escrow for a safe
            professional experience.
          </p>
          <button
            type="button"
            onClick={onLearnMoreEscrow}
            className="text-xs font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}
