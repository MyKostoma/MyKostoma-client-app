"use client";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  formatCountdownTimer,
  formatWalletNaira,
} from "@/features/wallet/services/walletHelpers";
import type { WalletBankTransferCardProps } from "./types";

export function WalletBankTransferCard({
  amount,
  bankDetails,
  copiedField,
  isConfirming,
  onCopyField,
  onConfirmTransfer,
  onCancel,
  className,
}: WalletBankTransferCardProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6",
        className
      )}
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
          Transfer Funds
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Transfer exactly{" "}
          <span className="font-extrabold text-foreground">
            {formatWalletNaira(amount)}
          </span>{" "}
          to the account below
        </p>

        <div className="pt-1 flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <Clock className="size-3" />
            <span>
              THIS ACCOUNT EXPIRES IN{" "}
              {formatCountdownTimer(bankDetails.expiresInSeconds)}
            </span>
          </span>
        </div>
      </div>

      {/* Bank Account Details Box */}
      <div className="rounded-2xl border border-border bg-secondary/35 p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              BANK NAME
            </p>
            <p className="text-sm font-extrabold text-foreground leading-snug">
              {bankDetails.bankName}
            </p>
          </div>
          <Landmark className="size-5 text-muted-foreground/70 shrink-0" />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              ACCOUNT NUMBER
            </p>
            <p className="text-lg sm:text-xl font-extrabold tracking-wider text-foreground">
              {bankDetails.accountNumber}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onCopyField("accountNumber", bankDetails.accountNumber)
            }
            aria-label="Copy account number"
            className="size-9 rounded-xl border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            {copiedField === "accountNumber" ? (
              <Check className="size-4 text-success" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
        </div>

        <div className="space-y-1 pb-3 border-b border-border/70">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            ACCOUNT NAME
          </p>
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-foreground">
            {bankDetails.accountName}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              REFERENCE / NARRATION
            </p>
            <p className="text-sm sm:text-base font-extrabold text-foreground">
              {bankDetails.reference}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onCopyField("reference", bankDetails.reference)}
            aria-label="Copy transfer reference"
            className="size-9 rounded-xl border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            {copiedField === "reference" ? (
              <Check className="size-4 text-success" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Important Notice */}
      <div className="rounded-xl border border-success/25 bg-success-bg p-3.5 flex items-start gap-2.5 text-xs text-success">
        <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-bold">Important:</span> Use the reference code
          above to ensure your wallet is credited automatically. Transfers
          without the reference may take up to 24 hours to verify.
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-1">
        <Button
          type="button"
          variant="default"
          size="lg"
          loading={isConfirming}
          loadingText="Verifying..."
          onClick={onConfirmTransfer}
          trailingIcon={<ArrowRight className="size-4" />}
          className="w-full h-12 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
        >
          I have made the transfer
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Cancel and go back
          </button>
        </div>

        <p className="pt-1 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <ShieldCheck className="size-3.5" />
          <span>SECURE BANK-GRADE PAYMENT GATEWAY</span>
        </p>
      </div>
    </div>
  );
}

