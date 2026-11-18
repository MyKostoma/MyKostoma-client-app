"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProfessionalSubmittedQuote } from "../types";

export interface ProQuoteSubmittedConfirmationProps {
  submittedQuote: ProfessionalSubmittedQuote;
  onGoToMyQuotes: () => void;
  onDone: () => void;
}

export function ProQuoteSubmittedConfirmation({
  submittedQuote,
  onGoToMyQuotes,
  onDone,
}: ProQuoteSubmittedConfirmationProps) {
  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-2xs space-y-7">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="size-12 rounded-full bg-success-bg flex items-center justify-center text-success">
            <Check className="size-6 stroke-[2.5]" />
          </div>

          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
            Quote Submitted Successfully
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
            Your proposal has been sent to the client. You will be notified once
            they review or respond to your quote.
          </p>
        </div>

        <div className="rounded-xl bg-secondary/40 border border-border/60 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              TOTAL QUOTE PRICE
            </span>
            <span className="text-sm sm:text-base font-extrabold text-foreground">
              {submittedQuote.totalPriceFormatted}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              ESTIMATED DURATION
            </span>
            <span className="text-xs sm:text-sm font-bold text-foreground">
              {submittedQuote.estimatedDuration}
            </span>
          </div>

          <div className="pt-3 border-t border-border/70 space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              PROFESSIONAL NOTE SUMMARY
            </p>
            <p className="text-xs italic text-muted-foreground leading-relaxed">
              &ldquo;{submittedQuote.professionalNote}&rdquo;
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <Button
            type="button"
            variant="default"
            onClick={onGoToMyQuotes}
            className="w-full h-11 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
          >
            Go to My Quotes
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onDone}
            className="w-full h-11 rounded-xl text-xs sm:text-sm font-semibold"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
