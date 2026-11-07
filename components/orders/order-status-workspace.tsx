"use client";

import {
  AlertTriangle,
  Calendar,
  Check,
  ChevronRight,
  FileText,
  HelpCircle,
  Loader2,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrderStatusBadge } from "./order-status-badge";
import type { OrderStatusWorkspaceProps } from "./types";

export type { OrderStatusWorkspaceProps } from "./types";

export function OrderStatusWorkspace({
  order,
  onViewPaymentHistory,
  onReleaseRemainingFunds,
  onViewProjectSpecs,
  onDisputeOrder,
  onEscrowFaq,
}: OrderStatusWorkspaceProps) {
  const initials = order.providerName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-6">
          <h2 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
            Order Lifecycle
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {order.lifecycleSteps.map((step, index) => {
              const isCompleted = step.state === "completed";
              const isCurrent = step.state === "current";
              const isLast = index === order.lifecycleSteps.length - 1;

              return (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center text-center"
                >
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className={cn(
                        "hidden sm:block absolute top-3.5 left-[calc(50%+18px)] right-[calc(-50%+18px)] h-0.5 rounded-full",
                        isCompleted ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}

                  <div
                    className={cn(
                      "relative z-10 size-7 rounded-full flex items-center justify-center mb-2.5 transition-colors",
                      isCompleted &&
                        "bg-foreground text-background shadow-2xs",
                      isCurrent &&
                        "bg-foreground text-background ring-4 ring-primary/15",
                      step.state === "upcoming" &&
                        "border border-border bg-card text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="size-3.5 stroke-[2.5]" />
                    ) : isCurrent ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : null}
                  </div>

                  <p
                    className={cn(
                      "text-xs sm:text-sm font-bold",
                      step.state === "upcoming"
                        ? "text-muted-foreground"
                        : "text-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {step.dateLabel}
                  </p>
                  {step.statusSublabel && (
                    <span
                      className={cn(
                        "text-[10px] font-bold mt-1",
                        isCompleted ? "text-success" : "text-foreground"
                      )}
                    >
                      {step.statusSublabel}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="border-t border-border/70 pt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-foreground">
                Latest Update
              </h3>

              <div className="rounded-xl bg-secondary/40 border border-border/60 p-4 flex items-start gap-3">
                <div className="size-8 rounded-full bg-card border border-border flex items-center justify-center text-[10px] font-bold text-foreground shrink-0 mt-0.5">
                  {initials}
                </div>

                <div className="space-y-1 min-w-0">
                  <p className="text-xs font-bold text-foreground">
                    {order.latestUpdate?.title || "Work in progress"}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {order.latestUpdate?.description ||
                      "The professional is currently working on the scheduled milestone."}
                  </p>
                  <p className="text-[10px] text-muted-foreground pt-1">
                    {order.latestUpdate?.updatedAgo || "2 hours ago"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-foreground">
                Estimated Completion
              </h3>

              <div className="p-1 space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground">
                  <Calendar className="size-4 text-muted-foreground shrink-0" />
                  <span>{order.estimatedCompletionAt || "October 24, 2026"}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Work is currently tracking on schedule with no reported
                  delays.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
          <div className="bg-foreground text-background p-5 sm:px-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-9 rounded-full bg-background/15 text-background flex items-center justify-center shrink-0">
                <Plus className="size-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold tracking-tight">
                  Escrow Protection
                </h3>
                <p className="text-[11px] text-background/75 truncate">
                  Your funds are held securely until work is approved.
                </p>
              </div>
            </div>

            <OrderStatusBadge status="secured" />
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">
                  Total Order Amount
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                  {order.escrowSummary.totalAmount}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">
                  Funds Released
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-success tracking-tight">
                  {order.escrowSummary.fundsReleased}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">
                  Remaining in Escrow
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                  {order.escrowSummary.remainingInEscrow}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-secondary/40 border border-border/60 p-4 flex items-start gap-3">
              <div className="size-8 rounded-lg bg-card border border-border text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="size-4" />
              </div>

              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-foreground">
                  What happens next?
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  The remaining{" "}
                  <span className="font-semibold text-foreground">
                    {order.escrowSummary.remainingInEscrow}
                  </span>{" "}
                  is currently being held in our secure escrow system. Once the
                  artisan finishes the{" "}
                  <span className="font-semibold text-foreground">
                    {order.escrowSummary.nextMilestoneName}
                  </span>
                  , you will be prompted to review the work.
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Only after you confirm completion will these funds be released
                  to{" "}
                  <span className="font-semibold text-foreground">
                    {order.providerName}
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onViewPaymentHistory}
                className="h-9 px-4 rounded-lg text-xs font-semibold"
              >
                View Payment History
              </Button>

              {order.status !== "completed" && order.status !== "cancelled" && (
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={onReleaseRemainingFunds}
                  className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
                >
                  Release Remaining Funds
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-4">
          <h3 className="text-xs sm:text-sm font-bold text-foreground">
            Order Context
          </h3>

          <div className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground">
                Professional
              </span>
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-secondary border border-border flex items-center justify-center text-[10px] font-bold text-foreground shrink-0">
                  {initials}
                </div>
                <span className="font-bold text-foreground">
                  {order.providerName}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground">
                Service Area
              </span>
              <p className="font-bold text-foreground">{order.serviceArea}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground">
                Shipping/Work Address
              </span>
              <p className="font-bold text-foreground leading-snug">
                {order.workAddress}
              </p>
            </div>
          </div>

          <div className="border-t border-border/60 pt-3">
            <button
              type="button"
              onClick={onViewProjectSpecs}
              className="w-full flex items-center justify-between text-xs font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <span>View Project Specs</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-3">
          <h3 className="text-xs sm:text-sm font-bold text-foreground">
            Need Help?
          </h3>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={onDisputeOrder}
              className="w-full rounded-xl border border-border/80 bg-card hover:bg-secondary/45 p-3 flex items-center gap-3 text-left transition-colors cursor-pointer"
            >
              <div className="size-8 rounded-lg bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
                <AlertTriangle className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground">
                  Dispute this Order
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Escrow will be frozen
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={onEscrowFaq}
              className="w-full rounded-xl border border-border/80 bg-card hover:bg-secondary/45 p-3 flex items-center gap-3 text-left transition-colors cursor-pointer"
            >
              <div className="size-8 rounded-lg bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
                <HelpCircle className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground">Escrow FAQ</p>
                <p className="text-[11px] text-muted-foreground">
                  How payments work
                </p>
              </div>
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-secondary/45 border border-border/60 p-4 space-y-1.5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-3.5 text-muted-foreground shrink-0" />
            <h4 className="text-xs font-bold text-foreground">
              Platform Guarantee
            </h4>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Every project is covered by MyKostoma&apos;s ₦7.5M satisfaction
            guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}
