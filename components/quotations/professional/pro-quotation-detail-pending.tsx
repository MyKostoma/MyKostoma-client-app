"use client";

import { Calendar, Clock, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNairaWithDecimals } from "@/features/quotations/services/quotationsHelpers";
import type {
  ProfessionalQuotationItem,
  ProfessionalQuotationKpiMetric,
} from "../types";
import { ProQuotationStatusPill } from "./pro-quotation-status-pill";
import { ProQuotationsKpiStrip } from "./pro-quotations-kpi-strip";

export interface ProQuotationDetailPendingProps {
  quotation: ProfessionalQuotationItem;
  kpis: ProfessionalQuotationKpiMetric[];
  onOpenChat: () => void;
}

export function ProQuotationDetailPending({
  quotation,
  kpis,
  onOpenChat,
}: ProQuotationDetailPendingProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              Quote #{quotation.code}
            </h1>
            <ProQuotationStatusPill status="pending" variant="detail" />
          </div>
          <p className="text-xs text-muted-foreground">
            Created on {quotation.createdAtLabel} • Valid until{" "}
            {quotation.validUntilLabel}
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            TOTAL QUOTE AMOUNT
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary mt-0.5">
            {quotation.totalAmountFormatted}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-2xs overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                REQUEST CONTEXT
              </h2>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    SERVICE REQUESTED
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    {quotation.serviceRequested}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    CONSUMER NAME
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    {quotation.consumerName}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    LOCATION
                  </p>
                  <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground">
                    <MapPin className="size-3.5 text-muted-foreground shrink-0" />
                    <span>{quotation.location}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    REQUESTED DATE/TIME
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    {quotation.requestedDateTime}
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
                PROFESSIONAL&apos;S NOTE
              </h2>
            </div>
            <div className="p-6">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {quotation.professionalNote}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-2xs overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                PRICE BREAKDOWN
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
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  Total Amount
                </span>
                <span className="text-base sm:text-lg font-extrabold text-primary">
                  {quotation.totalAmountFormatted}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-2xs space-y-5">
            <div className="flex items-start gap-3.5">
              <div className="size-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                <Clock className="size-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  EST. DURATION
                </p>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {quotation.duration.replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="size-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                <Calendar className="size-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  VALIDITY PERIOD
                </p>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {quotation.validityPeriodLabel}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Expires {quotation.validUntilLabel.replace("February", "Feb")}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-foreground">Need Help?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If you need to discuss this quote further with the client, you can
              use the chat interface.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onOpenChat}
              leadingIcon={<MessageSquare className="size-3.5" />}
              className="w-full h-9 rounded-lg text-xs font-semibold"
            >
              Open Chat
            </Button>
          </div>
        </div>
      </div>

      <ProQuotationsKpiStrip metrics={kpis} />
    </div>
  );
}
