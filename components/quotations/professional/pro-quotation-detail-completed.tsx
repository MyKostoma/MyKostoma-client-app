"use client";

import {
  CheckCircle2,
  ExternalLink,
  Headset,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { formatNairaWithDecimals } from "@/features/quotations/services/quotationsHelpers";
import type {
  ProfessionalQuotationItem,
  ProfessionalQuotationKpiMetric,
} from "../types";
import { ProQuotationStatusPill } from "./pro-quotation-status-pill";
import { ProQuotationsKpiStrip } from "./pro-quotations-kpi-strip";

export interface ProQuotationDetailCompletedProps {
  quotation: ProfessionalQuotationItem;
  historicalKpis: ProfessionalQuotationKpiMetric[];
  onGoToOrder: () => void;
  onContactSupport: () => void;
}

export function ProQuotationDetailCompleted({
  quotation,
  historicalKpis,
  onGoToOrder,
  onContactSupport,
}: ProQuotationDetailCompletedProps) {
  const orderCode = quotation.orderCode || "ORD-5521";
  const photos = quotation.completionPhotos ?? [
    "BEFORE PHOTO",
    "AFTER PHOTO 1",
    "AFTER PHOTO 2",
  ];
  const review = quotation.clientReview ?? {
    clientName: quotation.consumerName,
    verifiedLabel: "Verified Client",
    rating: 5,
    comment:
      "Excellent work! The team was very professional and the house looks amazing. Thank you for the quick turnaround.",
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-success/25 bg-success-bg/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="size-8 rounded-full bg-success text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="size-4" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs sm:text-sm font-bold text-foreground">
              This service has been completed.
            </p>
            <p className="text-xs text-muted-foreground">
              Job finalized on{" "}
              {quotation.completedDateTimeLabel ||
                "January 16, 2026 at 01:30 PM"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onGoToOrder}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-success underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer shrink-0 self-end sm:self-center"
        >
          <span>View Order #{orderCode}</span>
          <ExternalLink className="size-3.5" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              Quotation #{quotation.code}
            </h1>
            <ProQuotationStatusPill status="completed" variant="detail" />
          </div>
          <p className="text-xs text-muted-foreground">
            Quotation cycle closed • Total duration:{" "}
            {quotation.completedDurationLabel || "4.5 hours"}
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            FINAL AMOUNT PAID
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-0.5">
            {quotation.totalAmountFormatted}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-2xs overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                ORIGINAL REQUEST CONTEXT
              </h2>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    SERVICE TYPE
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    {quotation.serviceRequested}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    CLIENT NAME
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
                    COMPLETION DATE
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    {quotation.completionDateLabel || "Jan 15, 2026"}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  ORIGINAL DESCRIPTION
                </p>
                <div className="rounded-xl bg-secondary/40 border border-border/60 p-4 text-xs sm:text-sm italic text-muted-foreground leading-relaxed">
                  &ldquo;{quotation.originalRequestDescription}&rdquo;
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-2xs overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                COMPLETION SUMMARY
              </h2>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {quotation.completionSummary ||
                  "All requested areas were cleaned to standard. Bathrooms were sanitized, and kitchen cabinets were cleared and wiped as requested. Additional stain removal was performed on the balcony tiles at no extra cost. Client inspected and signed off on site."}
              </p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {photos.map((photoLabel, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-xl border border-border bg-secondary/40 flex items-center justify-center p-2 text-center"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {photoLabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-2xs overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                FINAL QUOTATION
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-success-bg text-success text-[10px] font-bold uppercase tracking-wider">
                PAID
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  Service Fee ({quotation.completedDurationLabel || "4.5 hrs"})
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
                  Grand Total
                </span>
                <span className="text-base sm:text-lg font-extrabold text-foreground">
                  {quotation.totalAmountFormatted}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <FallbackImage
                src={review.clientAvatarUrl}
                alt={review.clientName}
                variant="avatar"
                className="size-10 text-xs"
              />
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {review.clientName}
                </p>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-success-bg text-success text-[10px] font-bold">
                  {review.verifiedLabel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: review.rating }).map((_, idx) => (
                <Star
                  key={idx}
                  className="size-3.5 text-warning fill-warning"
                />
              ))}
            </div>

            <p className="text-xs sm:text-sm italic text-muted-foreground leading-relaxed">
              &ldquo;{review.comment}&rdquo;
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-foreground">
              Need to reopen?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If there are any issues with this completed service, please
              contact support within 24 hours.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onContactSupport}
              leadingIcon={<Headset className="size-3.5" />}
              className="w-full h-9 rounded-lg text-xs font-semibold"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>

      <ProQuotationsKpiStrip
        metrics={historicalKpis}
        sectionTitle="HISTORICAL PERFORMANCE"
      />
    </div>
  );
}
