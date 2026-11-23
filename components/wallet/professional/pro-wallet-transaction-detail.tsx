"use client";

import {
  ArrowLeft,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  Download,
  HelpCircle,
  MessageSquare,
  Shield,
  Wallet,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import { formatWalletNaira } from "@/features/wallet/services/walletHelpers";
import type { ProWalletTransactionDetailProps } from "../types";

export function ProWalletTransactionDetail({
  transaction,
  copiedReference,
  onBackToHistory,
  onCopyReference,
  onOpenRelatedProject,
  onMessageClient,
  onDownloadReceipt,
  onContactSupport,
  onReportIssue,
  className,
}: ProWalletTransactionDetailProps) {
  const isCompleted = transaction.status === "completed";
  const isPending = transaction.status === "pending";

  return (
    <div className={cn("space-y-5", className)}>
      <div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onBackToHistory}
          leadingIcon={<ArrowLeft className="size-3.5" />}
          className="h-8 px-3.5 rounded-xl text-xs font-semibold"
        >
          Back to History
        </Button>
      </div>

      {/* Title & Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            #{transaction.id}
          </h1>
          <p className="text-xs text-muted-foreground">
            Transaction details and receipt
          </p>
        </div>

        <span
          className={cn(
            "self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0",
            isCompleted && "bg-foreground text-background",
            isPending && "bg-warning-bg text-warning",
            !isCompleted && !isPending && "bg-error-bg text-error"
          )}
        >
          {isCompleted ? (
            <CheckCircle2 className="size-3.5" />
          ) : isPending ? (
            <Clock className="size-3.5" />
          ) : (
            <XCircle className="size-3.5" />
          )}
          <span>{transaction.status.toUpperCase()}</span>
        </span>
      </div>

      {/* Main Receipt Card */}
      <div className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden">
        <div className="bg-secondary/45 py-8 px-6 flex flex-col items-center text-center border-b border-border/70">
          <div className="size-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground shadow-2xs mb-3">
            <Wallet className="size-5" />
          </div>

          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {formatWalletNaira(transaction.amount)}
          </p>

          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1.5">
            {transaction.direction === "credit"
              ? "CREDIT AMOUNT"
              : "DEBIT AMOUNT"}
          </p>
        </div>

        <div className="p-6 sm:p-7 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-border/60">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                DATE &amp; TIME
              </p>
              <p className="text-xs sm:text-sm font-bold text-foreground">
                {transaction.dateTimeFormatted}
              </p>
            </div>

            <div className="sm:text-right space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                TYPE
              </p>
              <p className="text-xs sm:text-sm font-bold text-foreground">
                {transaction.typeDetailLabel}
              </p>
            </div>
          </div>

          <div className="pb-5 border-b border-border/60 space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              DESCRIPTION
            </p>
            <p className="text-xs sm:text-sm text-foreground leading-relaxed">
              {transaction.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                PAYMENT METHOD
              </p>
              <p className="text-xs sm:text-sm font-bold text-foreground">
                {transaction.paymentMethod}
              </p>
            </div>

            <div className="sm:text-right space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                REFERENCE ID
              </p>
              <button
                type="button"
                onClick={onCopyReference}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <span>{transaction.referenceId}</span>
                {copiedReference ? (
                  <Check className="size-3.5 text-success" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Project & Client Cards */}
      {(transaction.relatedProjectTitle || transaction.clientName) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {transaction.relatedProjectTitle && (
            <button
              type="button"
              onClick={onOpenRelatedProject}
              className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-2xs hover:bg-secondary/35 transition-colors flex items-center justify-between gap-3 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="size-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                  <Briefcase className="size-4" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                    RELATED PROJECT
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                    {transaction.relatedProjectTitle}
                  </p>
                </div>
              </div>

              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            </button>
          )}

          {transaction.clientName && (
            <button
              type="button"
              onClick={onMessageClient}
              className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-2xs hover:bg-secondary/35 transition-colors flex items-center justify-between gap-3 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <FallbackImage
                  src={transaction.clientAvatarUrl}
                  alt={transaction.clientName}
                  variant="avatar"
                  className="size-10 text-xs"
                />
                <div className="min-w-0 space-y-0.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                    CLIENT
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                    {transaction.clientName}
                  </p>
                </div>
              </div>

              <MessageSquare className="size-4 text-muted-foreground shrink-0" />
            </button>
          )}
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onDownloadReceipt}
          leadingIcon={<Download className="size-3.5" />}
          className="h-10 px-5 rounded-xl text-xs font-bold shadow-xs self-start sm:self-auto"
        >
          Download Receipt
        </Button>

        <div className="flex items-center gap-4 text-xs font-bold text-foreground">
          <button
            type="button"
            onClick={onContactSupport}
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"
          >
            <HelpCircle className="size-3.5 text-muted-foreground" />
            <span>Contact Support</span>
          </button>

          <span aria-hidden="true" className="h-4 w-px bg-border" />

          <button
            type="button"
            onClick={onReportIssue}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Report an Issue
          </button>
        </div>
      </div>

      {/* Escrow Protection Footer Box */}
      <div className="rounded-xl border border-border/80 bg-secondary/45 p-4 flex items-start gap-3">
        <Shield className="size-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          This transaction is protected by MYKOSTOMA Escrow Services. For
          security reasons, sensitive details like bank account numbers are
          partially masked. If you notice any discrepancy, please contact
          support immediately.
        </p>
      </div>
    </div>
  );
}
