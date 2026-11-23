"use client";

import { useMemo } from "react";
import { Plus, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import {
  formatWalletNaira,
  maskBankLast4,
} from "@/features/wallet/services/walletHelpers";
import type { ProWithdrawFormCardProps } from "../types";

const PERCENT_CHIPS: (25 | 50 | 75 | 100)[] = [25, 50, 75, 100];

export function ProWithdrawFormCard({
  availableBalance,
  amountInput,
  activePercent,
  selectedBankId,
  bankAccounts,
  fee,
  validationError,
  onAmountChange,
  onSelectPercent,
  onSelectBank,
  onAddNewBank,
  onReviewWithdrawal,
  onCancel,
  className,
}: ProWithdrawFormCardProps) {
  const bankSelectOptions = useMemo(
    () =>
      bankAccounts.map((bank) => ({
        value: bank.id,
        label: `${bank.bankName} ${maskBankLast4(bank.last4)}`,
      })),
    [bankAccounts]
  );

  return (
    <div
      className={cn(
        "mx-auto max-w-lg rounded-3xl border border-border bg-card shadow-xs overflow-hidden",
        className
      )}
    >
      <div className="p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Withdraw Funds
          </h1>
          <p className="text-xs text-muted-foreground">
            Move money from your wallet to your linked bank account.
          </p>
        </div>

        <div className="rounded-2xl bg-secondary/50 border border-border/60 p-4 sm:p-5 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              AVAILABLE FOR WITHDRAWAL
            </p>
            <p className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              {formatWalletNaira(availableBalance)}
            </p>
          </div>

          <div className="size-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground shrink-0">
            <Wallet className="size-4.5" />
          </div>
        </div>

        {/* Amount Input & Percentage Chips */}
        <div className="space-y-3">
          <label
            htmlFor="pro-withdraw-amount"
            className="block text-xs font-bold text-foreground"
          >
            Amount to Withdraw
          </label>

          <div className="rounded-2xl border border-border bg-card px-4 py-3 flex items-center gap-3 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15 transition-all">
            <input
              id="pro-withdraw-amount"
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={amountInput}
              onChange={(e) => onAmountChange(e.target.value)}
              className="w-full bg-transparent text-xl sm:text-2xl font-extrabold text-foreground placeholder:text-foreground/80 focus:outline-none"
            />
            <span className="size-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground shrink-0">
              ₦
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {PERCENT_CHIPS.map((pct) => {
              const isSelected = activePercent === pct;
              return (
                <button
                  key={pct}
                  type="button"
                  onClick={() => onSelectPercent(pct)}
                  className={cn(
                    "h-9 rounded-xl border text-xs transition-all cursor-pointer",
                    isSelected
                      ? "bg-primary border-primary text-primary-foreground font-bold shadow-xs"
                      : "bg-card border-border text-foreground hover:bg-secondary/50 font-semibold"
                  )}
                >
                  {pct}%
                </button>
              );
            })}
          </div>
        </div>

        {/* Destination Bank Account */}
        <div className="space-y-2">
          <label
            htmlFor="pro-withdraw-bank"
            className="block text-xs font-bold text-foreground"
          >
            Destination Account
          </label>

          <Select
            id="pro-withdraw-bank"
            options={bankSelectOptions}
            value={selectedBankId}
            placeholder="Select linked bank account"
            onChange={onSelectBank}
            className="h-11 rounded-xl text-xs sm:text-sm"
          />

          <button
            type="button"
            onClick={onAddNewBank}
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer pt-0.5"
          >
            <Plus className="size-3.5" />
            <span>Add new bank account</span>
          </button>
        </div>

        {/* Fee & Arrival Summary Box */}
        <div className="rounded-2xl border border-border/80 bg-secondary/30 p-4 space-y-2.5 text-xs">
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Transaction Fee</span>
            <span className="font-bold text-foreground">
              {formatWalletNaira(fee)} fee applies
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Estimated Arrival</span>
            <span className="font-bold text-foreground">Within 24 hours</span>
          </div>
        </div>

        {validationError && (
          <p className="text-xs font-semibold text-error text-center">
            {validationError}
          </p>
        )}

        <div className="space-y-2 pt-1">
          <Button
            type="button"
            variant="default"
            size="lg"
            onClick={onReviewWithdrawal}
            className="w-full h-12 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
          >
            Review Withdrawal
          </Button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer whitespace-nowrap"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="px-6 py-3.5 border-t border-border/70 bg-secondary/25 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        <ShieldCheck className="size-3.5" />
        <span>SECURED BY MYKOSTOMA ESCROW</span>
      </div>
    </div>
  );
}
