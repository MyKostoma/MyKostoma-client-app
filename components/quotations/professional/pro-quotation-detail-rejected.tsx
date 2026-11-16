"use client";

import { Info, MapPin, MessageSquare, TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNairaWithDecimals } from "@/features/quotations/services/quotationsHelpers";
import type { ProfessionalQuotationItem } from "../types";
import { ProQuotationStatusPill } from "./pro-quotation-status-pill";

export interface ProQuotationDetailRejectedProps {
  quotation: ProfessionalQuotationItem;
  onSendMessage: () => void;
}

export function ProQuotationDetailRejected({
  quotation,
  onSendMessage,
}: ProQuotationDetailRejectedProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Quotation #{quotation.code}
          </h1>
          <ProQuotationStatusPill status="rejected" variant="detail" />
        </div>
        <p className="text-xs text-muted-foreground">
          Rejected on {quotation.rejectedDateLabel || "January 14, 2026"} •
          Original Quote Date: {quotation.dateSubmitted}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-2xs flex items-start gap-4">
        <div className="size-10 rounded-full bg-error text-error-foreground flex items-center justify-center shrink-0">
          <X className="size-5" />
        </div>

        <div className="space-y-1.5 min-w-0">
          <h2 className="text-xs sm:text-sm font-bold text-foreground">
            This quotation was rejected by the consumer.
          </h2>
          <p className="text-xs text-muted-foreground">
            <span className="font-bold text-foreground">Rejection Reason:</span>{" "}
            {quotation.rejectionReason || "Price too high / Budget exceeded"}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-bold text-foreground">Consumer Note:</span>{" "}
            &ldquo;
            {quotation.consumerRejectionNote ||
              "Thank you for the quote, but we've found a professional whose rates better align with our current budget for this specific project."}
            &rdquo;
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
                SENT QUOTATION DETAILS
              </h2>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  YOUR NOTE TO CLIENT
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {quotation.professionalNote}
                </p>
              </div>

              <div className="pt-4 border-t border-border/70 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {quotation.serviceFeeLabel}
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatNairaWithDecimals(quotation.serviceFee)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Materials &amp; Supplies
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatNairaWithDecimals(quotation.materialsCost)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Logistics/Transport
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatNairaWithDecimals(quotation.logisticsCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-2xs overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                REJECTED TOTALS
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Total Quoted
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-muted-foreground">
                  {quotation.totalAmountFormatted}
                </span>
              </div>

              <div className="rounded-xl bg-secondary/40 border border-border/60 p-3.5 space-y-0.5">
                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                  OUTCOME
                </p>
                <p className="text-xs font-bold italic text-foreground">
                  Not Booked
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-2xs space-y-5">
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                <Info className="size-4" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  NEXT STEPS
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {quotation.nextStepsNote ||
                    "This quote is now inactive. You can archive it to clean up your dashboard or look for other available requests in your area."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="size-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                <TrendingUp className="size-4" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  ANALYSIS
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {quotation.analysisNote ||
                    "Clients frequently reject quotes over ₦22k for this service type. Consider adjusting your base rate for better conversion."}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-foreground text-background p-6 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold text-background">
              Need to follow up?
            </h3>
            <p className="text-xs text-background/75 leading-relaxed">
              Even though the quote was rejected, you can still message the
              client if you have questions about the feedback.
            </p>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onSendMessage}
              leadingIcon={<MessageSquare className="size-3.5" />}
              className="w-full h-9 rounded-lg text-xs font-bold bg-background text-foreground hover:bg-background/90"
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
