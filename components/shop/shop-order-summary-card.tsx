"use client";

import { Clock, RefreshCw } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import { formatDelivery } from "@/features/shop/services/shopHelpers";
import type { ShopOrderSummaryCardProps } from "./types";

export function ShopOrderSummaryCard({
  service,
  className,
}: ShopOrderSummaryCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 shadow-2xs",
        className
      )}
    >
      <div className="w-full sm:w-36 h-28 sm:h-24 rounded-xl overflow-hidden bg-primary/10 shrink-0">
        <FallbackImage
          src={service.imageUrl}
          alt={service.title}
          fallbackType="portfolio"
          className="size-full object-cover select-none"
        />
      </div>

      <div className="min-w-0 space-y-1.5">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {service.packageLabel}
        </span>
        <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug">
          {service.title}
        </h2>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {formatDelivery(service.deliveryDays)} Delivery
          </span>
          <span className="inline-flex items-center gap-1.5">
            <RefreshCw className="size-3.5" />
            {service.revisions} Revision Rounds
          </span>
        </div>
      </div>
    </div>
  );
}

