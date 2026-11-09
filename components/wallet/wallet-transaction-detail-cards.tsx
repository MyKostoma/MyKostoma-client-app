"use client";

import {
  Check,
  Copy,
  Download,
  LifeBuoy,
  Share2,
  X,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  formatWalletNaira,
  getTransactionStatusClasses,
} from "@/features/wallet/services/walletHelpers";
import type { WalletTransactionDetailCardsProps } from "./types";

export function WalletTransactionDetailCards({
  transaction,
  copiedReference,
  onCopyReference,
  onDownloadReceipt,
  onShareDetails,
  onContactSupport,
  className,
}: WalletTransactionDetailCardsProps) {
  const statusStyles = getTransactionStatusClasses(transaction.status);
  const isSuccess =
    transaction.status === "completed" || transaction.status === "success";
  const isFailed = transaction.status === "failed";

  const bannerBadgeLabel = isSuccess
    ? "TRANSACTION SUCCESS"
    : isFailed
      ? "TRANSACTION FAILED"
      : "TRANSACTION PENDING";

  const bannerBadgeClass = isSuccess
    ? "bg-success-bg text-success"
    : isFailed
      ? "bg-error-bg text-error"
      : "bg-warning-bg text-warning";

  return (
    <div className={cn("space-y-6", className)}>
      {/* Top Hero Summary Card */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 text-center space-y-4 shadow-2xs">
        <div className="flex justify-center">
          <div
            className={cn(
              "size-14 rounded-full flex items-center justify-center",
              isSuccess
                ? "bg-success-bg text-success"
                : isFailed
                  ? "bg-error-bg text-error"
                  : "bg-warning-bg text-warning"
            )}
          >
            <div
              className={cn(
                "size-8 rounded-full flex items-center justify-center text-primary-foreground",
                isSuccess
                  ? "bg-success"
                  : isFailed
                    ? "bg-error"
                    : "bg-warning"
              )}
            >
              {isSuccess ? (
                <Check className="size-4 stroke-[3]" />
              ) : isFailed ? (
                <X className="size-4 stroke-[3]" />
              ) : (
                <Clock className="size-4 stroke-[2.5]" />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {formatWalletNaira(transaction.amount)}
          </p>

          <div>
            <span
              className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                bannerBadgeClass
              )}
            >
              {bannerBadgeLabel}
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onDownloadReceipt}
            leadingIcon={<Download className="size-3.5" />}
            className="h-10 px-5 rounded-xl text-xs font-bold shadow-xs"
          >
            Download Receipt
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onShareDetails}
            leadingIcon={<Share2 className="size-3.5" />}
            className="h-10 px-5 rounded-xl text-xs font-bold"
          >
            Share Details
          </Button>
        </div>
      </div>

      {/* Bottom 2-Column Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Transaction Details Key-Value List */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 space-y-4 shadow-2xs">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            TRANSACTION DETAILS
          </h2>

          <div className="divide-y divide-border/60 text-xs">
            <div className="py-3.5 flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Transaction Type</span>
              <span className="px-2.5 py-1 rounded-md bg-secondary text-[10px] font-bold uppercase tracking-wider text-foreground">
                {transaction.typeLabel}
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Date &amp; Time</span>
              <span className="font-bold text-foreground">
                {transaction.dateFormatted} • {transaction.timeFormatted}
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Reference</span>
              <button
                type="button"
                onClick={onCopyReference}
                className="inline-flex items-center gap-1.5 font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <span>{transaction.reference}</span>
                {copiedReference ? (
                  <Check className="size-3.5 text-success" />
                ) : (
                  <Copy className="size-3.5 text-muted-foreground" />
                )}
              </button>
            </div>

            <div className="py-3.5 flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-bold text-foreground">
                {transaction.paymentMethod}
              </span>
            </div>

            <div className="pt-3.5 flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Status</span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 font-bold",
                  statusStyles.textClass
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full shrink-0",
                    statusStyles.dotClass
                  )}
                />
                <span>{transaction.statusLabel}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Description / Note + Need Assistance Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-2xs">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              DESCRIPTION / NOTE
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {transaction.note}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                <LifeBuoy className="size-4.5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                  Need assistance?
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  Contact support for this transaction
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onContactSupport}
              className="h-9 px-3.5 rounded-xl text-xs font-bold shrink-0"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

