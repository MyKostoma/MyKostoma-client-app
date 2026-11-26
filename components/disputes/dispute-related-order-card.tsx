"use client";

import Link from "next/link";
import { getEscrowStatusMeta } from "@/features/disputes/services/disputesHelpers";
import { cn } from "@/lib/utils";
import type { DisputeRelatedOrderCardProps } from "./types";

export function DisputeRelatedOrderCard({
  dispute,
  totalAmountFormatted,
}: DisputeRelatedOrderCardProps) {
  const escrowMeta = getEscrowStatusMeta(dispute.escrowStatus);

  return (
    <section
      aria-labelledby="related-order-heading"
      className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-5 shadow-2xs"
    >
      <h2
        id="related-order-heading"
        className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
      >
        Related Order
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-border">
        <div className="space-y-1">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Order ID
          </span>
          <Link
            href={`/orders/${encodeURIComponent(dispute.orderId)}`}
            className="text-sm font-bold text-foreground hover:text-primary transition-colors"
          >
            {dispute.orderCode}
          </Link>
        </div>

        <div className="space-y-1">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Service
          </span>
          <span className="block text-sm font-bold text-foreground truncate">
            {dispute.serviceTitle}
          </span>
        </div>

        <div className="space-y-1">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Total Amount
          </span>
          <span className="block text-sm font-bold text-foreground">
            {totalAmountFormatted}
          </span>
        </div>

        <div className="space-y-1">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Escrow Status
          </span>
          <span
            className={cn(
              "block text-sm font-extrabold uppercase tracking-wide",
              escrowMeta.toneClass
            )}
          >
            {escrowMeta.label}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-2">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Dispute Reason
        </span>
        <h3 className="text-sm font-bold text-foreground">{dispute.reason}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {dispute.description}
        </p>
      </div>
    </section>
  );
}
