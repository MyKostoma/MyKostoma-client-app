"use client";

import { ArrowRight, CreditCard, Landmark, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { WalletFundAmountFormProps, WalletFundingMethod } from "./types";

const FUNDING_METHODS: {
  id: WalletFundingMethod;
  title: string;
  description: string;
  icon: typeof Landmark;
}[] = [
  {
    id: "bank-transfer",
    title: "Nigerian Bank Transfer",
    description: "Instant funding via your banking app",
    icon: Landmark,
  },
  {
    id: "card",
    title: "Debit / Credit Card",
    description: "Pay securely with Mastercard or Visa",
    icon: CreditCard,
  },
];

export function WalletFundAmountForm({
  amountInput,
  quickAmounts,
  selectedMethod,
  canContinue,
  onAmountInputChange,
  onSelectQuickAmount,
  onSelectMethod,
  onContinue,
  className,
}: WalletFundAmountFormProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6",
        className
      )}
    >
      {/* Amount Input Section */}
      <div className="space-y-3">
        <label
          htmlFor="wallet-fund-amount"
          className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
        >
          ENTER AMOUNT
        </label>

        <div className="flex items-center gap-2 rounded-2xl border border-border bg-secondary/40 px-4 py-3.5 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15 transition-all">
          <span className="text-xl sm:text-2xl font-extrabold text-muted-foreground select-none">
            ₦
          </span>
          <input
            id="wallet-fund-amount"
            type="text"
            inputMode="decimal"
            value={amountInput}
            onChange={(e) => onAmountInputChange(e.target.value)}
            placeholder="0.00"
            className="w-full bg-transparent text-2xl sm:text-3xl font-extrabold text-foreground placeholder:text-muted-foreground/45 focus:outline-none"
          />
        </div>

        {/* Quick Amount Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => onSelectQuickAmount(amount)}
              className="h-8 px-3.5 rounded-full border border-border bg-card hover:border-primary/40 hover:bg-primary/5 text-xs font-bold text-foreground transition-colors cursor-pointer"
            >
              +₦{amount.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Funding Method Selector */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          SELECT FUNDING METHOD
        </p>

        <div className="space-y-3">
          {FUNDING_METHODS.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;

            return (
              <button
                key={method.id}
                type="button"
                onClick={() => onSelectMethod(method.id)}
                className={cn(
                  "w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3.5 transition-all cursor-pointer",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-2xs"
                    : "border-border bg-card hover:border-primary/40 hover:bg-secondary/30"
                )}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={cn(
                      "size-11 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    <Icon className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                      {method.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                      {method.description}
                    </p>
                  </div>
                </div>

                {/* Radio indicator */}
                <span
                  className={cn(
                    "size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                    isSelected ? "border-primary" : "border-border"
                  )}
                >
                  {isSelected && (
                    <span className="size-2.5 rounded-full bg-primary" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary CTA */}
      <div className="space-y-3 pt-1">
        <Button
          type="button"
          variant="default"
          size="lg"
          disabled={!canContinue}
          onClick={onContinue}
          trailingIcon={<ArrowRight className="size-4" />}
          className="w-full h-12 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
        >
          {selectedMethod === "bank-transfer"
            ? "Continue to Transfer Details"
            : "Continue to Card Checkout"}
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <ShieldCheck className="size-3.5" />
          <span>SECURE ENCRYPTED TRANSACTION</span>
        </p>
      </div>
    </div>
  );
}

