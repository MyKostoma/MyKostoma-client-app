"use client";

import {
  AlertTriangle,
  ArrowRight,
  Check,
  Loader2,
  Lock,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatWalletNaira } from "@/features/wallet/services/walletHelpers";
import type {
  WalletFundingStatusCardProps,
  WalletFundingStatusState,
} from "./types";

const STATUS_SWITCH_TABS: { id: WalletFundingStatusState; label: string }[] = [
  { id: "pending", label: "Pending State" },
  { id: "success", label: "Success State" },
  { id: "failed", label: "Failure State" },
];

export function WalletFundingStatusCard({
  status,
  amount,
  reference,
  availableBalance,
  failureTitle = "Payment Authorization Failed",
  failureMessage = "Unable to process your deposit. Please check your bank details and try again.",
  failureReason = "Transaction Timed Out",
  onBackToWallet,
  onViewTransactions,
  onRetryFunding,
  onContactSupport,
  onStatusSwitch,
  className,
}: WalletFundingStatusCardProps) {
  return (
    <div className={cn("mx-auto max-w-lg space-y-4", className)}>
      {/* Interactive State Switcher so all 3 screenshot states can be inspected seamlessly */}
      {onStatusSwitch && (
        <div className="flex items-center justify-center gap-1.5 rounded-full border border-border bg-card p-1 shadow-2xs w-fit mx-auto">
          {STATUS_SWITCH_TABS.map((tab) => {
            const active = status === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onStatusSwitch(tab.id)}
                className={cn(
                  "px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6 text-center">
        {/* Status Icon */}
        <div className="flex justify-center">
          {status === "pending" && (
            <div className="size-16 rounded-full bg-warning-bg text-warning flex items-center justify-center">
              <Loader2 className="size-8 animate-spin" />
            </div>
          )}
          {status === "success" && (
            <div className="size-16 rounded-full bg-success text-primary-foreground flex items-center justify-center shadow-sm">
              <Check className="size-8 stroke-[3]" />
            </div>
          )}
          {status === "failed" && (
            <div className="size-16 rounded-full bg-error-bg text-error flex items-center justify-center">
              <X className="size-8 stroke-[3]" />
            </div>
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            {status === "pending" && "Confirming Your Deposit"}
            {status === "success" && "Wallet Funded Successfully"}
            {status === "failed" && "Funding Failed"}
          </h2>

          {status === "success" && (
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Your wallet has been credited with{" "}
              <span className="font-semibold text-foreground">
                {formatWalletNaira(amount)}
              </span>
              . You can now use these funds for transactions.
            </p>
          )}

          {status === "failed" && (
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              We could not confirm your deposit. This might be due to a network
              error or an incorrect reference code. Please check your bank
              statement.
            </p>
          )}
        </div>

        {/* Pending Warning Alert */}
        {status === "pending" && (
          <div className="rounded-xl border border-warning/25 bg-warning-bg p-3.5 flex items-start gap-2.5 text-left text-xs text-warning">
            <AlertTriangle className="size-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              We are waiting for confirmation from your bank. This usually takes
              a few minutes but can take up to 24 hours.
            </p>
          </div>
        )}

        {/* Failed Error Alert */}
        {status === "failed" && (
          <div className="rounded-xl border border-error/25 bg-error-bg p-3.5 flex items-start gap-2.5 text-left text-xs text-error">
            <XCircle className="size-4 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold">{failureTitle}</p>
              <p className="leading-relaxed opacity-90">{failureMessage}</p>
            </div>
          </div>
        )}

        {/* Summary Key-Value Card */}
        <div className="rounded-2xl border border-border/70 bg-secondary/35 p-4 sm:p-5 divide-y divide-border/60 text-xs">
          {status === "pending" && (
            <>
              <div className="pb-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  AMOUNT TO CREDIT
                </span>
                <span className="text-sm font-extrabold text-foreground">
                  {formatWalletNaira(amount)}
                </span>
              </div>
              <div className="pt-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  REFERENCE
                </span>
                <span className="font-extrabold text-foreground">
                  {reference}
                </span>
              </div>
            </>
          )}

          {status === "success" && (
            <>
              <div className="pb-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  AMOUNT CREDITED
                </span>
                <span className="text-sm font-extrabold text-success">
                  {formatWalletNaira(amount)}
                </span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  TRANSACTION ID
                </span>
                <span className="font-extrabold text-foreground">
                  {reference}
                </span>
              </div>
              <div className="pt-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  AVAILABLE BALANCE
                </span>
                <span className="text-sm font-extrabold text-foreground">
                  {formatWalletNaira(availableBalance)}
                </span>
              </div>
            </>
          )}

          {status === "failed" && (
            <>
              <div className="pb-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  AMOUNT ATTEMPTED
                </span>
                <span className="text-sm font-extrabold text-foreground">
                  {formatWalletNaira(amount)}
                </span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  REFERENCE
                </span>
                <span className="font-extrabold text-foreground">
                  REF-0012998822
                </span>
              </div>
              <div className="pt-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  FAILURE REASON
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-error-bg text-error text-[10px] font-bold">
                  {failureReason}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-1">
          {status === "failed" ? (
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={onRetryFunding}
              trailingIcon={<ArrowRight className="size-4" />}
              className="w-full h-12 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
            >
              Retry Funding
            </Button>
          ) : (
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={onBackToWallet}
              trailingIcon={<ArrowRight className="size-4" />}
              className="w-full h-12 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
            >
              Back to Wallet
            </Button>
          )}

          <div>
            {status === "success" ? (
              <button
                type="button"
                onClick={onViewTransactions}
                className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                View Transaction History
              </button>
            ) : (
              <button
                type="button"
                onClick={onContactSupport}
                className={cn(
                  "text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  status === "failed" && "underline underline-offset-4"
                )}
              >
                Contact Support
              </button>
            )}
          </div>

          <p className="pt-2 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {status === "pending" ? (
              <>
                <ShieldCheck className="size-3.5" />
                <span>ENCRYPTED TRANSACTION MONITORING</span>
              </>
            ) : (
              <>
                <Lock className="size-3.5" />
                <span>SECURED BY MYKOSTOMA PAY</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

