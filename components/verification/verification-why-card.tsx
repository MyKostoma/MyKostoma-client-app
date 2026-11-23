"use client";

import { Info } from "lucide-react";
import type { VerificationWhyCardProps } from "./types";

export function VerificationWhyCard({ onLearnMore }: VerificationWhyCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:px-6 sm:py-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start sm:items-center gap-4 min-w-0">
        <div className="size-10 rounded-full border border-border bg-secondary/40 text-foreground flex items-center justify-center shrink-0">
          <Info className="size-4" />
        </div>

        <div className="space-y-0.5 min-w-0">
          <p className="text-xs sm:text-sm font-bold text-foreground">
            Why get verified?
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Verified accounts receive 3x more collaboration requests and gain
            access to high-value contract opportunities.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onLearnMore}
        className="text-xs sm:text-sm font-semibold text-primary hover:underline underline-offset-4 cursor-pointer shrink-0 self-end sm:self-center"
      >
        Learn more
      </button>
    </div>
  );
}
