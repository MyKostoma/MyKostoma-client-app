"use client";

import { Calendar, CheckCircle2, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { formatNairaWithDecimals } from "@/features/quotations/services/quotationsHelpers";
import type { ProfessionalQuotationItem } from "../types";
import { ProQuotationStatusPill } from "./pro-quotation-status-pill";

export interface ProQuotationDetailHiredProps {
  quotation: ProfessionalQuotationItem;
  onGoToOrder: () => void;
}

export function ProQuotationDetailHired({
  quotation,
  onGoToOrder,
}: ProQuotationDetailHiredProps) {
  const orderCode = quotation.orderCode || "ORD-5521";

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-foreground text-background p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="size-8 rounded-full bg-success/20 text-success flex items-center justify-center shrink-0">
            <CheckCircle2 className="size-4" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs sm:text-sm font-bold text-background">
              You have been hired for this request!
            </p>
            <p className="text-xs text-background/75">
              Consumer {quotation.consumerName} accepted your quotation and
              initiated Order #{orderCode}.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onGoToOrder}
          className="text-xs font-bold text-background underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer shrink-0 self-end sm:self-center"
        >
          View Order Details
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              Quotation #{quotation.code}
            </h1>
            <ProQuotationStatusPill status="approved" variant="detail" />
          </div>
          <p className="text-xs text-muted-foreground">
            Hired on {quotation.hiredDateLabel || "January 14, 2026"} •
            Reference: {quotation.referenceCode || `${quotation.code}-5521`}
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            AGREED AMOUNT
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-0.5">
            {quotation.totalAmountFormatted}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-2xs overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                REQUEST CONTEXT
              </h2>
              <span className="text-[10px] font-medium text-muted-foreground">
                Original Request ID: #REQ-882
              </span>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    CONSUMER
                  </p>
                  <div className="flex items-center gap-2.5">
                    <FallbackImage
                      src={quotation.consumerAvatarUrl}
                      alt={quotation.consumerName}
                      variant="avatar"
                      className="size-6 text-[10px]"
                    />
                    <span className="text-xs sm:text-sm font-bold text-foreground">
                      {quotation.consumerName}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    SERVICE TYPE
                  </p>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-accent text-primary text-xs font-semibold">
                      {quotation.serviceRequested}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    LOCATION
                  </p>
                  <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground">
                    <MapPin className="size-3.5 text-primary shrink-0" />
                    <span>{quotation.location}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    EXECUTION DATE
                  </p>
                  <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground">
                    <Calendar className="size-3.5 text-primary shrink-0" />
                    <span>{quotation.requestedDateTime}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  ORIGINAL REQUEST DESCRIPTION
                </p>
                <div className="rounded-xl bg-secondary/40 border border-border/60 p-4 text-xs sm:text-sm italic text-muted-foreground leading-relaxed">
                  &ldquo;{quotation.originalRequestDescription}&rdquo;
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-2xs overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                AGREED QUOTATION NOTE
              </h2>
            </div>
            <div className="p-6">
              <div className="border-l-2 border-primary pl-4">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {quotation.professionalNote}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-2xs overflow-hidden">
            <div className="px-6 py-3.5 bg-foreground text-background">
              <h2 className="text-[10px] font-bold uppercase tracking-wider">
                FINALIZED PRICE BREAKDOWN
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  {quotation.serviceFeeLabel}
                </span>
                <span className="font-bold text-foreground">
                  {formatNairaWithDecimals(quotation.serviceFee)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  Materials &amp; Supplies
                </span>
                <span className="font-bold text-foreground">
                  {formatNairaWithDecimals(quotation.materialsCost)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  Logistics/Transport
                </span>
                <span className="font-bold text-foreground">
                  {formatNairaWithDecimals(quotation.logisticsCost)}
                </span>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                  TOTAL AGREED
                </span>
                <span className="text-base sm:text-lg font-extrabold text-primary">
                  {quotation.totalAmountFormatted}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-2xs space-y-5">
            <div className="flex items-start gap-3.5">
              <div className="size-10 rounded-xl bg-accent/60 flex items-center justify-center text-primary shrink-0">
                <Clock className="size-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  ESTIMATED DURATION
                </p>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {quotation.duration.replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="size-10 rounded-xl bg-success-bg flex items-center justify-center text-success shrink-0">
                <CheckCircle2 className="size-4" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  STATUS
                </p>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  Converted to Order
                </p>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-secondary text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-accent/35 p-6 space-y-3">
            <h3 className="text-xs font-bold text-foreground">
              Contract Active
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This quotation is now locked as part of a binding service order.
              To request changes to the scope or price, please use the Order
              Management tools.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onGoToOrder}
              className="w-full h-9 rounded-lg text-xs font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              View Order #{orderCode}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
