"use client";

import { Calendar, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import type { PendingReviewCardProps } from "./types";

export function PendingReviewCard({
  order,
  onQuickRate,
  onRateOnPage,
}: PendingReviewCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
        <FallbackImage
          src={order.recipientAvatarUrl}
          alt={order.recipientName}
          fallbackType="user"
          variant="avatar"
          className="size-12 rounded-xl border border-border bg-secondary object-cover shrink-0"
        />

        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-foreground truncate">
              {order.recipientName}
            </h3>
            <span className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              #{order.orderCode}
            </span>
          </div>

          <p className="text-xs text-muted-foreground truncate">
            {order.serviceTitle} • {order.recipientSubtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1 text-success font-semibold">
              <CheckCircle2 className="size-3.5 shrink-0" />
              <span>Completed</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5 shrink-0" />
              <span>{order.completedDateLabel}</span>
            </span>
            <span className="font-bold text-foreground">
              {order.feeFormatted}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 shrink-0 sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onQuickRate(order)}
          className="h-9 px-4 rounded-lg text-xs font-semibold"
        >
          Quick Rate
        </Button>

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={() => onRateOnPage(order.orderId)}
          leadingIcon={<Star className="size-3.5" />}
          className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
        >
          Leave Review
        </Button>
      </div>
    </article>
  );
}
