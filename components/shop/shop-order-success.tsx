"use client";

import { ArrowLeft, BadgeCheck, Calendar, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import { formatNaira } from "@/features/shop/services/shopHelpers";
import type { ShopOrderSuccessProps } from "./types";

export function ShopOrderSuccess({
  confirmation,
  onViewOrder,
  onBackToShop,
  className,
}: ShopOrderSuccessProps) {
  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto flex flex-col items-center text-center space-y-6",
        className
      )}
    >
      <div className="size-16 rounded-full bg-success text-success-foreground flex items-center justify-center shadow-md">
        <Check className="size-8 stroke-[3]" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
          Order Created Successfully
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Your direct order has been placed and funds are secured in escrow.
        </p>
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-card">
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
          Order ID:
        </span>
        <span className="text-xs font-bold text-foreground">
          #{confirmation.orderCode}
        </span>
      </div>

      <div className="w-full bg-card border border-primary/30 rounded-2xl overflow-hidden text-left shadow-xs">
        <div className="flex items-center justify-between gap-4 p-5 border-b border-primary/20">
          <div className="min-w-0">
            <span className="block text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              {confirmation.packageLabel}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-foreground tracking-tight leading-snug">
              {confirmation.serviceTitle}
            </h2>
          </div>
          <div className="text-right shrink-0">
            <span className="block text-lg sm:text-xl font-bold text-primary">
              {formatNaira(confirmation.total)}
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              Total paid
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5">
          <div className="space-y-2.5">
            <span className="block text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              Professional
            </span>
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-full overflow-hidden bg-secondary shrink-0">
                <FallbackImage
                  src={confirmation.providerAvatarUrl}
                  alt={confirmation.providerName}
                  variant="avatar"
                  fallbackType="user"
                  className="size-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  {confirmation.providerName}
                </p>
                {confirmation.providerVerified && (
                  <p className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                    <BadgeCheck className="size-3 text-warning" />
                    Verified Pro
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <span className="block text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              Timeline &amp; Escrow
            </span>
            <p className="inline-flex items-center gap-2 text-xs text-foreground">
              <Calendar className="size-3.5 text-muted-foreground" />
              Estimated Delivery: {confirmation.estimatedDelivery}
            </p>
            <p className="flex items-center gap-2 text-xs font-bold italic text-foreground">
              <ShieldCheck className="size-3.5 text-success" />
              Escrow Active
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        <Button
          variant="default"
          size="default"
          onClick={onViewOrder}
          className="w-full sm:w-72 h-11 xl:h-11 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md"
        >
          View Order Details
        </Button>
        <button
          type="button"
          onClick={onBackToShop}
          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          Back to shop
        </button>
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        SSL encrypted
      </p>
    </div>
  );
}

