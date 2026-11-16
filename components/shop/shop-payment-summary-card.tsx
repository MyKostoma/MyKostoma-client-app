"use client";

import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatNaira } from "@/features/shop/services/shopHelpers";
import type { ShopPaymentSummaryCardProps } from "./types";

export function ShopPaymentSummaryCard({
  summary,
  canConfirm,
  isSubmitting,
  onConfirm,
  className,
}: ShopPaymentSummaryCardProps) {
  const rows = [
    { label: "Service Price", value: formatNaira(summary.servicePrice) },
    { label: "Platform Service Fee", value: formatNaira(summary.platformFee) },
  ];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
          Payment Summary
        </h2>

        <dl className="space-y-2.5 text-xs">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-bold text-foreground">{row.value}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Escrow Protection</dt>
            <dd className="font-bold text-success">FREE</dd>
          </div>
        </dl>

        <div className="flex items-end justify-between gap-3 pt-4 border-t border-border/70">
          <span className="text-sm font-bold text-foreground">Total Amount</span>
          <span className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
            {formatNaira(summary.total)}
          </span>
        </div>

        <div className="rounded-xl bg-success-bg p-4 space-y-1.5">
          <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-success">
            <ShieldCheck className="size-3.5" />
            Escrow protected
          </p>
          <p className="text-[11px] text-success/90 leading-relaxed">
            Your payment is securely held by MyKostoma. We do not release funds
            until you confirm the work is complete and meets the agreed
            standards.
          </p>
        </div>

        <Button
          variant="default"
          size="default"
          disabled={!canConfirm}
          loading={isSubmitting}
          loadingText="Processing..."
          onClick={onConfirm}
          className="w-full h-11 xl:h-11 text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs"
        >
          Confirm &amp; Proceed to Escrow
        </Button>

        {!canConfirm && (
          <p className="text-center text-[11px] text-muted-foreground">
            Accept both agreements to continue.
          </p>
        )}
      </div>

      <p className="flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Lock className="size-3" />
        SSL secured transaction
      </p>
    </div>
  );
}

