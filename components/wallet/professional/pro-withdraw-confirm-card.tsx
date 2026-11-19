"use client";

import { AlertTriangle, Info, Landmark, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatWalletNaira } from "@/features/wallet/services/walletHelpers";
import type { ProWithdrawConfirmCardProps } from "../types";

export function ProWithdrawConfirmCard({
  amount,
  fee,
  netAmount,
  bankAccount,
  isSubmitting = false,
  onConfirmWithdraw,
  onBackToEdit,
  className,
}: ProWithdrawConfirmCardProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-lg rounded-3xl border border-border bg-card shadow-xs overflow-hidden",
        className
      )}
    >
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-2 pb-5 border-b border-border/70">
          <div className="size-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground mb-1">
            <Info className="size-5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Review Details
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Confirm your withdrawal request before we process it.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Withdrawal Amount</span>
            <span className="font-extrabold text-foreground">
              {formatWalletNaira(amount)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm pb-4 border-b border-dashed border-border">
            <span className="text-muted-foreground">Transaction Fee</span>
            <span className="font-extrabold text-foreground">
              {formatWalletNaira(fee)}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs sm:text-sm font-bold text-foreground">
              Total to Receive
            </span>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
              {formatWalletNaira(netAmount)}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            DESTINATION ACCOUNT
          </p>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
              <Landmark className="size-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-extrabold text-foreground truncate">
                {bankAccount.bankShortName} - ****{bankAccount.last4}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground truncate">
                {bankAccount.accountName}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/70 bg-secondary/45 p-3.5 flex items-start gap-2.5 text-xs text-muted-foreground">
          <AlertTriangle className="size-4 shrink-0 mt-0.5 text-muted-foreground" />
          <p className="leading-relaxed">
            Please confirm the details above are correct. This action{" "}
            <span className="underline underline-offset-2 font-medium text-foreground">
              cannot be undone
            </span>{" "}
            once processed.
          </p>
        </div>

        <div className="space-y-3 pt-1">
          <Button
            type="button"
            variant="default"
            size="lg"
            loading={isSubmitting}
            loadingText="Processing..."
            onClick={onConfirmWithdraw}
            className="w-full h-12 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
          >
            Confirm &amp; Withdraw
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onBackToEdit}
            className="w-full h-12 rounded-xl text-xs sm:text-sm font-bold"
          >
            Back to Edit
          </Button>
        </div>
      </div>

      <div className="px-6 py-3.5 border-t border-border/70 bg-secondary/25 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        <Lock className="size-3" />
        <span>256-BIT ENCRYPTED TRANSACTION</span>
      </div>
    </div>
  );
}
