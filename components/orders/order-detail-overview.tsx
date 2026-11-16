"use client";

import {
  AlertTriangle,
  BadgeCheck,
  Check,
  CircleDot,
  FileText,
  Headphones,
  Info,
  Plus,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrderStatusBadge } from "./order-status-badge";
import type { OrderDetailOverviewProps } from "./types";

export type { OrderDetailOverviewProps } from "./types";

export function OrderDetailOverview({
  order,
  onViewOriginalQuote,
  onReleaseFinalMilestone,
  onViewProfile,
  onLeaveReview,
  onDisputeOrder,
  onContactSupport,
}: OrderDetailOverviewProps) {
  const initials = order.providerName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const completedMilestonesCount = order.milestones.filter(
    (m) => m.status === "released"
  ).length;
  const totalMilestonesCount = order.milestones.length;
  const hasEscrowMilestone = order.milestones.some(
    (m) => m.status === "in-escrow"
  );

  const supportActions = [
    {
      id: "review",
      title: "Leave a Review",
      subtitle:
        order.status === "completed"
          ? "Share your project feedback"
          : "Available after completion",
      icon: Star,
      onClick: onLeaveReview,
    },
    {
      id: "dispute",
      title: "Dispute Order",
      subtitle: "Open resolution ticket",
      icon: AlertTriangle,
      onClick: onDisputeOrder,
    },
    {
      id: "support",
      title: "Contact Support",
      subtitle: "Get help from MyKostoma",
      icon: Headphones,
      onClick: onContactSupport,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="size-14 rounded-xl border border-border bg-secondary/60 flex items-center justify-center font-bold text-sm text-foreground shrink-0 select-none">
                {initials}
              </div>

              <div className="space-y-1.5 min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                  {order.title}
                </h2>
                <p className="text-xs text-muted-foreground">
                  Ordered on {order.orderedAt}
                </p>
                <div className="pt-0.5">
                  <button
                    type="button"
                    onClick={onViewOriginalQuote}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/70 hover:bg-secondary text-foreground text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    <FileText className="size-3 text-muted-foreground" />
                    <span>View Original Quote</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="sm:text-right shrink-0 flex sm:flex-col items-baseline sm:items-end justify-between gap-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                <Plus className="size-3" />
                <span>{order.escrowStatusLabel}</span>
              </span>
              <p className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                {order.totalAmount}
              </p>
            </div>
          </div>

          <div className="border-t border-border/70 pt-5 space-y-5">
            <div className="flex items-center justify-between text-xs">
              <h3 className="font-bold text-foreground">Project Timeline</h3>
              <span className="font-bold text-foreground">
                {order.completionPercentage}% Complete
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
              {order.timelineSteps.map((step, index) => {
                const isCompleted = step.state === "completed";
                const isCurrent = step.state === "current";
                const isLast = index === order.timelineSteps.length - 1;

                return (
                  <div
                    key={step.id}
                    className="relative flex flex-col items-center text-center"
                  >
                    {!isLast && (
                      <div
                        aria-hidden="true"
                        className={cn(
                          "hidden sm:block absolute top-3 left-[calc(50%+16px)] right-[calc(-50%+16px)] h-0.5 rounded-full",
                          isCompleted
                            ? index === 0
                              ? "bg-primary"
                              : "bg-foreground"
                            : "bg-border"
                        )}
                      />
                    )}

                    <div
                      className={cn(
                        "relative z-10 size-6 rounded-full flex items-center justify-center mb-2 transition-colors",
                        isCompleted &&
                          "bg-foreground text-background shadow-2xs",
                        isCurrent &&
                          "border-2 border-border bg-secondary text-muted-foreground",
                        step.state === "upcoming" &&
                          "border border-border bg-card text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="size-3.5 stroke-[2.5]" />
                      ) : isCurrent ? (
                        <span className="size-2 rounded-full bg-muted-foreground/60" />
                      ) : null}
                    </div>

                    <p
                      className={cn(
                        "text-xs font-bold leading-snug",
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
          <div className="p-5 sm:p-6 border-b border-border/70 flex items-center justify-between gap-2">
            <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
              Milestones &amp; Payments
            </h3>
            <span className="text-xs text-muted-foreground">
              {completedMilestonesCount} of {totalMilestonesCount} Completed
            </span>
          </div>

          {order.milestones.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No active milestones for this order.
            </div>
          ) : (
            <div className="divide-y divide-border/70">
              {order.milestones.map((milestone) => {
                const isReleased = milestone.status === "released";
                const isInEscrow = milestone.status === "in-escrow";

                return (
                  <div
                    key={milestone.id}
                    className="p-5 sm:px-6 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      {isReleased ? (
                        <div className="size-6 rounded-full bg-success text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="size-3.5 stroke-[2.5]" />
                        </div>
                      ) : isInEscrow ? (
                        <div className="size-6 rounded-full border-2 border-foreground text-foreground flex items-center justify-center shrink-0 mt-0.5">
                          <CircleDot className="size-3.5" />
                        </div>
                      ) : (
                        <div className="size-6 rounded-full border border-border bg-secondary/50 shrink-0 mt-0.5" />
                      )}

                      <div className="space-y-0.5 min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                          {milestone.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {milestone.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 space-y-0.5">
                      <p className="text-xs sm:text-sm font-bold text-foreground">
                        {milestone.amount}
                      </p>
                      <OrderStatusBadge
                        status={milestone.status}
                        variant="milestone"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {hasEscrowMilestone && order.status !== "completed" && (
            <div className="p-4 sm:px-6 bg-secondary/25 border-t border-border/70 flex items-center justify-end">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={onReleaseFinalMilestone}
                className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
              >
                Release Final Milestone
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-4">
          <h3 className="text-xs sm:text-sm font-bold text-foreground">
            Professional Info
          </h3>

          <div className="flex items-center gap-3">
            <div className="size-11 rounded-full border border-border bg-secondary/60 flex items-center justify-center font-bold text-xs text-foreground shrink-0">
              {initials}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                  {order.providerName}
                </p>
                {order.providerVerified && (
                  <BadgeCheck className="size-3.5 fill-foreground text-background shrink-0" />
                )}
              </div>
              <div className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <Star className="size-3.5 fill-foreground text-foreground" />
                <span className="font-semibold text-foreground">
                  {order.providerRating.toFixed(1)}
                </span>
                <span>({order.providerReviewsCount} reviews)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-border/60 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Location</span>
              <span className="font-semibold text-foreground text-right">
                {order.providerLocation}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Member Since</span>
              <span className="font-semibold text-foreground text-right">
                {order.providerMemberSince}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Response Time</span>
              <span className="font-semibold text-foreground text-right">
                {order.providerResponseTime}
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onViewProfile}
            className="w-full h-9 rounded-lg text-xs font-semibold"
          >
            View Profile
          </Button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-3">
          <h3 className="text-xs sm:text-sm font-bold text-foreground">
            Actions &amp; Support
          </h3>

          <div className="space-y-2.5">
            {supportActions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  className="w-full rounded-xl border border-border/80 bg-card hover:bg-secondary/45 p-3 flex items-center gap-3 text-left transition-colors cursor-pointer"
                >
                  <div className="size-8 rounded-lg bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-secondary/45 border border-border/60 p-4 space-y-1.5">
          <div className="flex items-center gap-2">
            <Info className="size-3.5 text-muted-foreground shrink-0" />
            <h4 className="text-xs font-bold text-foreground">
              Need to modify this?
            </h4>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            If you need to change the scope or price, please contact the
            professional first. Both parties must agree to order modifications.
          </p>
        </div>
      </div>
    </div>
  );
}

