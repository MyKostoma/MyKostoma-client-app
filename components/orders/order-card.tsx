"use client";

import {
  BadgeCheck,
  Check,
  FileQuestion,
  MessageSquare,
  Plus,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrderStatusBadge } from "./order-status-badge";
import type { OrderCardProps, OrderSupportCardProps } from "./types";

export type { OrderCardProps, OrderSupportCardProps } from "./types";

export function OrderCard({
  order,
  onViewDetails,
  onMessagePro,
  onConfirmMilestone,
  onDepositFunds,
  onCancelOrder,
  onDownloadReceipt,
  onReorderService,
  className,
}: OrderCardProps) {
  const isInProgress =
    order.status === "in-progress" || order.status === "awaiting-confirmation";
  const isPending = order.status === "pending";
  const isCompleted = order.status === "completed";
  const isCancelled = order.status === "cancelled";

  const initials = order.providerName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const dateMetaLabel = isCompleted
    ? `Finished: ${order.completedAt || order.orderedAt}`
    : isPending
      ? `Expected Start: ${order.expectedStartAt || order.orderedAt}`
      : `Started: ${order.startedAt || order.orderedAt}`;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-2xs transition-all space-y-4",
        isCancelled && "opacity-80",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3.5 min-w-0">
          <button
            type="button"
            onClick={() => onViewDetails(order)}
            className="size-11 rounded-xl border border-border bg-secondary/60 flex items-center justify-center font-bold text-xs text-foreground shrink-0 select-none cursor-pointer hover:border-primary/40 transition-colors"
          >
            {initials}
          </button>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onViewDetails(order)}
                className="text-sm sm:text-base font-bold tracking-tight text-foreground hover:text-primary transition-colors text-left truncate cursor-pointer"
              >
                {order.title}
              </button>

              <OrderStatusBadge status={order.status} variant="card" />
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                <span>{order.providerName}</span>
                {order.providerVerified && (
                  <BadgeCheck className="size-3.5 fill-foreground text-background shrink-0" />
                )}
              </span>

              <span aria-hidden="true">•</span>

              <span>Order #{order.code}</span>

              <span aria-hidden="true">•</span>

              <span>{dateMetaLabel}</span>
            </div>
          </div>
        </div>

        <div className="sm:text-right shrink-0 flex sm:flex-col items-baseline sm:items-end justify-between gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-border/60">
          <p className="text-base sm:text-xl font-extrabold tracking-tight text-foreground">
            {order.totalAmount}
          </p>

          <div className="inline-flex items-center gap-1 text-[11px] font-medium">
            {isCompleted ? (
              <span className="inline-flex items-center gap-1 text-success font-semibold">
                <Check className="size-3 stroke-[2.5]" />
                <span>{order.escrowStatusLabel}</span>
              </span>
            ) : isPending ? (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Sparkles className="size-3" />
                <span>{order.escrowStatusLabel}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Plus className="size-3" />
                <span>{order.escrowStatusLabel}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {isInProgress && (
        <div className="space-y-2 pt-0.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">
              Project Completion
            </span>
            <span className="font-bold text-foreground">
              {order.completionPercentage}%
            </span>
          </div>

          <div
            className="h-2 w-full rounded-full bg-secondary overflow-hidden"
            role="progressbar"
            aria-valuenow={order.completionPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${order.completionPercentage}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          {isInProgress && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onMessagePro(order)}
              leadingIcon={<MessageSquare className="size-3.5" />}
              className="h-8 px-3.5 rounded-lg text-xs font-semibold bg-secondary/35 border-border/70"
            >
              Message Pro
            </Button>
          )}

          {isPending && (
            <span className="text-[11px] text-muted-foreground">
              {order.lastUpdatedLabel || `Ordered on ${order.orderedAt}`}
            </span>
          )}

          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Star className="size-3.5 fill-muted-foreground/70 text-muted-foreground" />
              <span>
                Rating: {order.clientRating ? `${order.clientRating}/5` : "Not rated"}
              </span>
            </span>
          )}

          {isCancelled && (
            <span className="text-[11px] text-muted-foreground">
              Reason: {order.cancelledReason || "Cancelled"}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {isInProgress && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(order)}
                className="h-8 px-3.5 rounded-lg text-xs font-semibold"
              >
                View Details
              </Button>
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() => onConfirmMilestone(order)}
                className="h-8 px-4 rounded-lg text-xs font-semibold shadow-xs"
              >
                Confirm Milestone
              </Button>
            </>
          )}

          {isPending && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onCancelOrder(order)}
                className="h-8 px-3.5 rounded-lg text-xs font-semibold"
              >
                Cancel Order
              </Button>
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() => onDepositFunds(order)}
                className="h-8 px-4 rounded-lg text-xs font-semibold shadow-xs"
              >
                Deposit Funds
              </Button>
            </>
          )}

          {isCompleted && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onDownloadReceipt(order)}
                className="h-8 px-3.5 rounded-lg text-xs font-semibold"
              >
                Download Receipt
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onReorderService(order)}
                className="h-8 px-3.5 rounded-lg text-xs font-semibold"
              >
                Re-order Service
              </Button>
            </>
          )}

          {isCancelled && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(order)}
              className="h-8 px-3.5 rounded-lg text-xs font-semibold"
            >
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function OrderSupportCard({
  onContactSupport,
  className,
}: OrderSupportCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-border bg-card/50 p-6 sm:p-10 text-center space-y-3",
        className
      )}
    >
      <div className="size-11 rounded-full bg-secondary text-muted-foreground flex items-center justify-center mx-auto">
        <FileQuestion className="size-5" />
      </div>

      <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
        Need help with an order?
      </h3>

      <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
        Our resolution center is here to help with disputes, modifications, or
        cancellations.
      </p>

      <div className="pt-1.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onContactSupport}
          className="h-9 px-5 rounded-lg text-xs font-semibold"
        >
          Contact Support
        </Button>
      </div>
    </div>
  );
}

