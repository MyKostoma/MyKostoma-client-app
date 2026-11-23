"use client";

import {
  AlertTriangle,
  Check,
  Clock,
  Download,
  Headset,
  Landmark,
  Lock,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatWalletNaira } from "@/features/wallet/services/walletHelpers";
import type { ProWithdrawStatusCardProps } from "../types";

export function ProWithdrawStatusCard({
  session,
  processingStage,
  onBackToWallet,
  onViewTransactionDetails,
  onDownloadReceipt,
  onTryAgain,
  onCheckPayoutSettings,
  onContactSupport,
  className,
}: ProWithdrawStatusCardProps) {
  const { status } = session;

  if (status === "processing") {
    const progressWidth =
      processingStage === 1 ? "35%" : processingStage === 2 ? "68%" : "92%";

    return (
      <div className={cn("mx-auto max-w-lg space-y-5", className)}>
        <div className="rounded-3xl border border-border bg-card shadow-xs overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="relative size-20 mx-auto flex items-center justify-center">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border-4 border-secondary border-t-foreground border-l-foreground animate-spin"
              />
              <Send className="size-6 text-primary" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                Processing Withdrawal...
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                We are communicating with your bank. This usually takes a few
                seconds.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-secondary/25 p-5 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                SENDING AMOUNT
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                {formatWalletNaira(session.amount)}
              </p>
              <p className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-foreground pt-1">
                <Landmark className="size-3.5 text-primary shrink-0" />
                <span>
                  {session.bankShortName} ****{session.last4}
                </span>
              </p>
            </div>

            <p className="inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-medium">
              <AlertTriangle className="size-3.5 text-primary shrink-0" />
              <span>Please do not refresh this page or click &apos;Back&apos;.</span>
            </p>

            <div className="space-y-2 pt-1">
              <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: progressWidth }}
                />
              </div>
              <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                <span className="text-foreground">VERIFICATION</span>
                <span
                  className={cn(
                    processingStage >= 2
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  BANK HANDSHAKE
                </span>
                <span
                  className={cn(
                    processingStage >= 3
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  SETTLEMENT
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-secondary/40 border-t border-border/70 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-wider text-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="size-3 text-primary" />
              <span>SECURE GATEWAY</span>
            </span>
            <button
              type="button"
              onClick={onContactSupport}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              NEED HELP?
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          Most withdrawals are processed instantly. If your bank is experiencing
          delays, the funds will reflect in your account within 24 hours.
        </p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className={cn("mx-auto max-w-lg space-y-5", className)}>
        <div className="rounded-3xl border border-border bg-card shadow-xs overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="size-16 rounded-2xl bg-error-bg text-error flex items-center justify-center mx-auto">
              <X className="size-7 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                Withdrawal Failed
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                We couldn&apos;t process your withdrawal. This could be due to a
                bank network issue or incorrect account details.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-secondary/25 p-5 space-y-2.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                ERROR MESSAGE
              </p>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold text-error shadow-2xs">
                <span>
                  Error Code: {session.errorCode || "BANK_REJECTED_01"}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <Button
                type="button"
                variant="default"
                size="lg"
                onClick={onTryAgain}
                className="w-full h-12 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
              >
                Try Again
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onCheckPayoutSettings}
                className="w-full h-12 rounded-xl text-xs sm:text-sm font-bold"
              >
                Check Payout Settings
              </Button>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={onContactSupport}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors cursor-pointer"
                >
                  <Headset className="size-3.5" />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-border/70 bg-secondary/20 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" />
              <span>SECURE INFRASTRUCTURE</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              <span>REFLECTED INSTANTLY</span>
            </span>
          </div>
        </div>

        <div className="text-center space-y-1 text-xs text-muted-foreground">
          <p>
            Still having trouble with your {session.bankShortName} account?
          </p>
          <button
            type="button"
            onClick={onContactSupport}
            className="font-bold text-primary underline underline-offset-4 hover:opacity-80 cursor-pointer"
          >
            Contact Mykostoma Support
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("mx-auto max-w-lg space-y-5", className)}>
      <div className="rounded-3xl border border-border bg-card shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6 text-center">
          <div className="size-16 rounded-full bg-success text-success-foreground flex items-center justify-center mx-auto shadow-sm">
            <Check className="size-8 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              Withdrawal Successful!
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              {formatWalletNaira(session.netAmount)} has been sent to your{" "}
              {session.bankShortName} account. It should arrive within 24 hours.
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-secondary/20 p-5 space-y-3">
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                TRANSACTION ID
              </p>
              <p className="text-xs sm:text-sm font-bold text-muted-foreground">
                #{session.transactionId}
              </p>
            </div>

            <div className="border-t border-border/60 pt-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-foreground">
              <Landmark className="size-4 text-muted-foreground shrink-0" />
              <span>
                {session.bankShortName} ****{session.last4}
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={onBackToWallet}
              className="w-full h-12 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
            >
              Back to Wallet
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onViewTransactionDetails}
              className="w-full h-12 rounded-xl text-xs sm:text-sm font-bold"
            >
              View Transaction Details
            </Button>

            <div className="pt-1">
              <button
                type="button"
                onClick={onDownloadReceipt}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors cursor-pointer"
              >
                <Download className="size-3.5" />
                <span>Download Receipt</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border/70 bg-secondary/20 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" />
            <span>ENCRYPTED TRANSACTION</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Headset className="size-3.5" />
            <span>24/7 SUPPORT</span>
          </span>
        </div>
      </div>

      <div className="text-center space-y-1 text-xs text-muted-foreground">
        <p>Didn&apos;t receive the funds after 24 hours?</p>
        <button
          type="button"
          onClick={onContactSupport}
          className="font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          Contact MyKostoma Support
        </button>
      </div>
    </div>
  );
}
