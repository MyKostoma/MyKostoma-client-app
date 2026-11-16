"use client";

import { Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDelivery, formatNaira } from "@/features/shop/services/shopHelpers";
import type { ShopOrderPanelProps } from "./types";

export function ShopOrderPanel({
  service,
  variant = "card",
  onDirectOrder,
  className,
}: ShopOrderPanelProps) {
  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-4 bg-card border border-border rounded-2xl p-4 shadow-2xs",
          className
        )}
      >
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-primary">
            {service.packageLabel}
          </span>
          <span className="text-xl font-bold text-foreground">
            {formatNaira(service.price)}
          </span>
        </div>
        <Button
          variant="default"
          size="default"
          onClick={onDirectOrder}
          className="h-10 xl:h-10 px-5 text-xs font-bold uppercase tracking-wider rounded-lg"
        >
          Direct Order
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs",
        className
      )}
    >
      <div className="space-y-1">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-primary">
          {service.packageLabel}
        </span>
        <span className="text-3xl font-bold text-foreground tracking-tight">
          {formatNaira(service.price)}
        </span>
      </div>

      <dl className="space-y-3 text-xs">
        <div className="flex items-center justify-between gap-3">
          <dt className="inline-flex items-center gap-2 text-muted-foreground">
            <Clock className="size-4" />
            Delivery Time
          </dt>
          <dd className="font-bold text-foreground">
            {formatDelivery(service.deliveryDays)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="inline-flex items-center gap-2 text-muted-foreground">
            <RefreshCw className="size-4" />
            Revisions
          </dt>
          <dd className="font-bold text-foreground">
            {service.revisions} {service.revisions === 1 ? "Round" : "Rounds"}
          </dd>
        </div>
      </dl>

      <Button
        variant="default"
        size="default"
        onClick={onDirectOrder}
        className="w-full h-11 xl:h-11 text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs"
      >
        Direct Order
      </Button>

      <p className="text-center text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Secure escrow checkout via MyKostoma
      </p>
    </div>
  );
}

