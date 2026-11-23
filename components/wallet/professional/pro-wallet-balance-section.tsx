"use client";

import { History, Info, Lock, SlidersHorizontal, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatWalletNaira } from "@/features/wallet/services/walletHelpers";
import type { ProWalletBalanceSectionProps } from "../types";

export function ProWalletBalanceSection({
  summary,
  onPayoutSettings,
  onWithdrawFunds,
  className,
}: ProWalletBalanceSectionProps) {
  return (
    <div className={cn("space-y-4 sm:space-y-5", className)}>
      {/* Available Balance Hero Card */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            AVAILABLE BALANCE
          </p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {formatWalletNaira(summary.availableBalance)}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {summary.currency}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onPayoutSettings}
            leadingIcon={<SlidersHorizontal className="size-3.5" />}
            className="h-10 px-4 rounded-xl text-xs font-bold"
          >
            Payout Settings
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onWithdrawFunds}
            leadingIcon={<Upload className="size-3.5" />}
            className="h-10 px-5 rounded-xl text-xs font-bold shadow-xs"
          >
            Withdraw Funds
          </Button>
        </div>
      </div>

      {/* Pending & Escrow Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <span>Pending Balance</span>
              <Info className="size-3.5 text-muted-foreground/80" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              {formatWalletNaira(summary.pendingBalance)}
            </p>
          </div>

          <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
            <History className="size-4.5" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <span>Escrow Balance</span>
              <Info className="size-3.5 text-muted-foreground/80" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              {formatWalletNaira(summary.escrowBalance)}
            </p>
          </div>

          <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
            <Lock className="size-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
