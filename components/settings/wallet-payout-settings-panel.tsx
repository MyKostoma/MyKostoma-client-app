"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  MoreHorizontal,
  Plus,
  Shield,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProPayoutSchedule } from "@/components/wallet/types";
import { formatNairaCurrency } from "@/features/settings/services/settingsHelpers";
import { cn } from "@/lib/utils";
import type { WalletPayoutSettingsPanelProps } from "./types";

const SCHEDULE_LABEL: Record<ProPayoutSchedule, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

export function WalletPayoutSettingsPanel({
  availableBalanceFormatted,
  pendingBalanceFormatted,
  bankAccounts,
  schedule,
  nextPayoutDateLabel,
  minTransferFormatted,
  processingTimeLabel,
  recentTransactions,
  onWithdrawFunds,
  onAddMethod,
  onSetPrimaryMethod,
  onDeleteMethod,
  onViewAllTransactions,
  onEditSchedule,
  onLearnSecurity,
  onOpenSupportResource,
  onExportCsv,
}: WalletPayoutSettingsPanelProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openMenuId) return;
    const handleOutside = (event: MouseEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [openMenuId]);

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Heading */}
      <div className="space-y-1.5">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link href="/settings" className="hover:text-foreground">
            Settings
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="font-semibold text-foreground">
            Wallet &amp; Payouts
          </span>
        </nav>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Wallet &amp; Payouts
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Manage your earnings, withdraw funds, and configure how you get paid.
        </p>
      </div>

      {/* Main 12-Column Split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Main Column */}
        <div className="xl:col-span-8 space-y-5">
          {/* Dark Current Balance Card */}
          <div className="rounded-2xl bg-foreground text-background p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-background/70">
                CURRENT BALANCE
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {availableBalanceFormatted}
              </p>
              <p className="inline-flex items-center gap-1.5 text-xs text-background/75">
                <Clock className="size-3.5 shrink-0" />
                <span>{pendingBalanceFormatted} pending (clearing in 3 days)</span>
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onWithdrawFunds}
              leadingIcon={<ArrowUpRight className="size-4" />}
              className="h-10 px-5 rounded-xl text-xs font-bold bg-card text-foreground border-border hover:bg-secondary shrink-0"
            >
              Withdraw Funds
            </Button>
          </div>

          {/* Payout Methods Card */}
          <div
            ref={menuContainerRef}
            className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">
                Payout Methods
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onAddMethod}
                leadingIcon={<Plus className="size-3.5" />}
                className="h-8 px-3 rounded-lg text-xs font-semibold"
              >
                Add Method
              </Button>
            </div>

            <div className="space-y-3">
              {bankAccounts.map((account) => (
                <div
                  key={account.id}
                  className="rounded-xl border border-border bg-secondary/20 px-4 py-3.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-lg border border-border bg-card text-foreground flex items-center justify-center shrink-0">
                      <Building2 className="size-4" />
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                        {account.bankName} •••• {account.last4}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                        {account.isPrimary ? (
                          <span className="text-muted-foreground">PRIMARY</span>
                        ) : (
                          <span className="text-muted-foreground">
                            {account.accountType} ACCOUNT
                          </span>
                        )}
                        {account.isVerified && (
                          <span className="px-1.5 py-0.5 rounded bg-success-bg text-success">
                            ACTIVE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative shrink-0">
                    <button
                      type="button"
                      aria-label={`Manage ${account.bankName}`}
                      onClick={() =>
                        setOpenMenuId((prev) =>
                          prev === account.id ? null : account.id
                        )
                      }
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>

                    {openMenuId === account.id && (
                      <div
                        role="menu"
                        className="absolute right-0 mt-1 w-44 rounded-xl border border-border bg-card shadow-xl py-1.5 z-20"
                      >
                        {!account.isPrimary && (
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setOpenMenuId(null);
                              onSetPrimaryMethod(account.id);
                            }}
                            className="w-full px-3.5 py-2 text-left text-xs font-medium text-foreground hover:bg-secondary/70 flex items-center gap-2 cursor-pointer"
                          >
                            <Star className="size-3.5 text-warning" />
                            <span>Set as Primary</span>
                          </button>
                        )}
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setOpenMenuId(null);
                            onDeleteMethod(account.id);
                          }}
                          className="w-full px-3.5 py-2 text-left text-xs font-medium text-error hover:bg-error-bg/60 flex items-center gap-2 cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
                          <span>Remove Account</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden">
            <div className="px-5 py-4 sm:px-6 border-b border-border flex items-center justify-between gap-3">
              <h3 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">
                Recent Transactions
              </h3>
              <button
                type="button"
                onClick={onViewAllTransactions}
                className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="size-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="py-3 px-5 sm:px-6">DATE</th>
                    <th className="py-3 px-4">DESCRIPTION</th>
                    <th className="py-3 px-4 text-right">AMOUNT</th>
                    <th className="py-3 px-5 sm:px-6 text-right">STATUS</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border/80 text-xs">
                  {recentTransactions.map((trx) => {
                    const isDebit = trx.direction === "debit";
                    const formattedAmt = `${isDebit ? "-" : "+"}${formatNairaCurrency(trx.amount)}`;
                    return (
                      <tr key={trx.id} className="hover:bg-secondary/20">
                        <td className="py-3.5 px-5 sm:px-6 text-muted-foreground whitespace-nowrap">
                          {trx.dateFormatted}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-foreground min-w-44">
                          {trx.title}
                        </td>
                        <td
                          className={cn(
                            "py-3.5 px-4 font-bold text-right whitespace-nowrap",
                            isDebit ? "text-foreground" : "text-success"
                          )}
                        >
                          {formattedAmt}
                        </td>
                        <td className="py-3.5 px-5 sm:px-6 text-right whitespace-nowrap">
                          <span
                            className={cn(
                              "inline-flex px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider",
                              trx.status === "completed"
                                ? "bg-success-bg text-success"
                                : trx.status === "pending"
                                  ? "bg-warning-bg text-warning"
                                  : "bg-error-bg text-error"
                            )}
                          >
                            {trx.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground pt-1">
            Need an itemized statement or CSV export?{" "}
            <button
              type="button"
              onClick={onExportCsv}
              className="font-bold text-foreground underline underline-offset-4 hover:text-primary cursor-pointer"
            >
              Export Data
            </button>
          </p>
        </div>

        {/* Right Side Column */}
        <div className="xl:col-span-4 space-y-5">
          {/* Payout Schedule Card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-foreground">
              <Calendar className="size-4 text-muted-foreground shrink-0" />
              <h3 className="text-sm font-extrabold tracking-tight">
                Payout Schedule
              </h3>
            </div>

            <div className="rounded-xl bg-secondary/45 border border-border p-4 space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                NEXT AUTOMATIC PAYOUT
              </p>
              <p className="text-sm sm:text-base font-extrabold text-foreground">
                {nextPayoutDateLabel}
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Automatic payouts run on your selected cadence for cleared
                balances over {minTransferFormatted}.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Frequency</span>
                <span className="font-bold text-foreground">
                  {SCHEDULE_LABEL[schedule]}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Min. Transfer</span>
                <span className="font-bold text-foreground">
                  {minTransferFormatted}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Processing Time</span>
                <span className="font-bold text-foreground">
                  {processingTimeLabel}
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onEditSchedule}
              className="w-full h-9 rounded-xl text-xs font-bold"
            >
              Edit Schedule
            </Button>
          </div>

          {/* Secure Transactions Dark Card */}
          <div className="rounded-2xl bg-foreground text-background p-5 shadow-xs space-y-3">
            <div className="size-8 rounded-lg bg-background/15 flex items-center justify-center">
              <Shield className="size-4" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-extrabold">Secure Transactions</h3>
              <p className="text-xs text-background/75 leading-relaxed">
                Your payout information is encrypted and securely stored. We use
                industry-standard protocols to ensure your earnings are safe.
              </p>
            </div>

            <button
              type="button"
              onClick={onLearnSecurity}
              className="text-xs font-bold underline underline-offset-4 hover:opacity-80 cursor-pointer"
            >
              Learn about security
            </button>
          </div>

          {/* Support Resources Card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-3">
            <h3 className="text-sm font-extrabold text-foreground tracking-tight">
              Support Resources
            </h3>

            <div className="divide-y divide-border/70 text-xs">
              {[
                "Tax Documents (WHT / TIN)",
                "Fee Structure",
                "Withdrawal Problems",
              ].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => onOpenSupportResource(topic)}
                  className="w-full py-2.5 flex items-center justify-between gap-2 text-left font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <span>{topic}</span>
                  <ChevronRight className="size-3.5 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
