"use client";

import {
  ChevronRight,
  FileText,
  Flag,
  Plus,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OrderCompletionWorkspaceProps } from "./types";

export type { OrderCompletionWorkspaceProps } from "./types";

export function OrderCompletionWorkspace({
  order,
  completedReferenceOrder,
  cancelledReferenceOrder,
  onConfirmAndRelease,
  onRaiseConcern,
  onLeaveReview,
  onViewReceipt,
  onDisputeResolution,
  onViewHistory,
}: OrderCompletionWorkspaceProps) {
  const initials = order.providerName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const releaseAmount =
    order.escrowSummary.remainingInEscrow !== "₦0.00"
      ? order.escrowSummary.remainingInEscrow
      : "₦185,000.00";

  const completedRefCode = completedReferenceOrder?.code || "ORD-7720";
  const completedRefAmount =
    completedReferenceOrder?.totalAmount || "₦512,500.00";
  const completedRefDate = completedReferenceOrder?.completedAt || "Oct 24, 2026";

  const cancelledRefCode = cancelledReferenceOrder?.code || "ORD-9012";
  const cancelledRefRefund =
    cancelledReferenceOrder?.refundStatusLabel ||
    "Fully Refunded to Original Payment Method";
  const cancelledRefReason =
    cancelledReferenceOrder?.cancelledReason || "Artisan Unavailable";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-2xs space-y-5">
        <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="size-10 rounded-full bg-secondary text-foreground flex items-center justify-center shrink-0">
              <Flag className="size-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
                Confirm Completion
              </h2>
              <p className="text-xs text-muted-foreground">
                The artisan has marked this project as finished.
              </p>
            </div>
          </div>

          <div className="size-9 rounded-full border border-border bg-secondary/60 flex items-center justify-center font-bold text-xs text-foreground shrink-0">
            {initials}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
          By confirming completion, you authorize the release of the remaining
          escrow funds to{" "}
          <span className="font-semibold text-foreground">
            {order.providerName}
          </span>
          . Please ensure you have inspected the final work and everything meets
          the project specifications.
        </p>

        <div className="rounded-xl border border-border/80 bg-secondary/35 p-4 max-w-2xl space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <Plus className="size-3.5 shrink-0" />
            <span>Escrow Release Policy</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed pl-5">
            Once funds are released, they are non-refundable through the
            platform. If there are unresolved issues, consider opening a dispute
            instead.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onConfirmAndRelease}
            className="h-10 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Confirm &amp; Release {releaseAmount}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRaiseConcern}
            className="h-10 px-5 rounded-lg text-xs font-semibold"
          >
            Raise a Concern
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-foreground tracking-tight">
              Completed Order State
            </h3>
            <span className="px-2 py-0.5 rounded bg-secondary text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
              REF: {completedRefCode}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Status</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                <span className="size-1.5 rounded-full bg-foreground" />
                <span>Completed</span>
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Escrow Outcome</span>
              <span className="font-bold text-foreground text-right">
                Funds Released ({completedRefAmount})
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Completion Date</span>
              <span className="font-semibold text-foreground">
                {completedRefDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onLeaveReview}
              leadingIcon={<Star className="size-3.5" />}
              className="flex-1 h-9 rounded-lg text-xs font-semibold shadow-xs"
            >
              Leave a Review
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onViewReceipt}
              className="flex-1 h-9 rounded-lg text-xs font-semibold"
            >
              View Receipt
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-foreground tracking-tight">
              Cancelled Order State
            </h3>
            <span className="px-2 py-0.5 rounded bg-secondary text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
              REF: {cancelledRefCode}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Status</span>
              <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-muted-foreground">
                <span className="size-1.5 rounded-full bg-muted-foreground" />
                <span>CANCELLED</span>
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Refund Status</span>
              <span className="font-semibold text-foreground text-right">
                {cancelledRefRefund}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Reason</span>
              <span className="font-semibold text-foreground text-right">
                {cancelledRefReason}
              </span>
            </div>
          </div>

          <div className="pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled
              className="w-full h-9 rounded-lg text-xs font-semibold opacity-60"
            >
              No Actions Available
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-3">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Escrow Details
          </span>

          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
              <FileText className="size-4" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">
                Released to Artisan
              </p>
              <p className="text-sm font-extrabold text-foreground">
                {completedRefAmount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-3">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Support
          </span>

          <div className="space-y-2 text-xs">
            <button
              type="button"
              onClick={onDisputeResolution}
              className="w-full flex items-center justify-between font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <span>Dispute Resolution</span>
              <SlidersHorizontal className="size-3.5 text-muted-foreground" />
            </button>

            <button
              type="button"
              onClick={onViewHistory}
              className="w-full flex items-center justify-between font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <span>View History</span>
              <ChevronRight className="size-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl bg-foreground text-background p-5 shadow-2xs space-y-2 overflow-hidden">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-background/70">
            Guarantee
          </span>
          <p className="text-xs font-medium text-background/90 leading-relaxed pr-6">
            This transaction is fully protected by the MyKostoma platform.
          </p>
          <Plus className="size-5 text-background/60 absolute bottom-4 right-4" />
        </div>
      </div>
    </div>
  );
}

