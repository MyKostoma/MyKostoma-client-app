"use client";

import { ArrowLeft, Info, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  ProfessionalRequestItem,
  ProfessionalSubmittedQuote,
} from "../types";

export interface ProRequestQuoteSubmittedDetailProps {
  request: ProfessionalRequestItem;
  submittedQuote: ProfessionalSubmittedQuote;
  onBack: () => void;
  onEditQuote: () => void;
  onWithdrawQuote: () => void;
}

export function ProRequestQuoteSubmittedDetail({
  request,
  submittedQuote,
  onBack,
  onEditQuote,
  onWithdrawQuote,
}: ProRequestQuoteSubmittedDetailProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <ArrowLeft className="size-3.5" />
        <span>Back to Requests</span>
      </button>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-5 border-b border-border/70">
          <div className="space-y-1">
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
              {request.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              Request ID: #{request.code}
            </p>
          </div>

          <span className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-[10px] font-bold uppercase tracking-wider text-primary shrink-0">
            <span className="size-1.5 rounded-full bg-primary" />
            PENDING REVIEW
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-1">
            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              BUDGET RANGE
            </p>
            <p className="text-xs sm:text-sm font-bold text-foreground">
              {request.budgetRangeShort}
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-1">
            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              LOCATION
            </p>
            <p className="text-xs sm:text-sm font-bold text-foreground">
              {request.location}
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl border-2 border-foreground bg-card p-5 sm:p-6 pt-7 space-y-5">
          <span className="absolute -top-3 left-5 inline-flex items-center px-3 py-0.5 rounded bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-wider">
            YOUR SUBMITTED QUOTE
          </span>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                YOUR PRICE
              </p>
              <p className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                {submittedQuote.totalPriceFormatted}
              </p>
            </div>

            <div className="sm:text-right space-y-0.5">
              <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                TIMELINE
              </p>
              <p className="text-xs sm:text-sm font-bold text-foreground">
                {submittedQuote.estimatedDuration}
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              PAYMENT MILESTONES
            </p>
            <div className="space-y-2">
              {submittedQuote.milestones.map((ms) => (
                <div
                  key={ms.id}
                  className="rounded-lg bg-secondary/45 px-4 py-2.5 flex items-center justify-between gap-3 text-xs"
                >
                  <span className="font-medium text-foreground">{ms.name}</span>
                  <span className="font-bold text-foreground whitespace-nowrap">
                    {ms.amountFormatted}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border/70 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onEditQuote}
              leadingIcon={<SquarePen className="size-3.5" />}
              className="w-full sm:w-40 h-9 rounded-lg text-xs font-bold"
            >
              Edit Quote
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onWithdrawQuote}
              leadingIcon={<Trash2 className="size-3.5" />}
              className="w-full sm:w-40 h-9 rounded-lg text-xs font-semibold text-muted-foreground hover:text-error"
            >
              Withdraw
            </Button>
          </div>
        </div>

        <div className="rounded-xl bg-secondary/40 border border-border/60 p-4 flex items-start gap-3">
          <Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            The client has been notified of your quote. You can edit your
            proposal until the client accepts it or the request is closed.
          </p>
        </div>
      </div>
    </div>
  );
}
