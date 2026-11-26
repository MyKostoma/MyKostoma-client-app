"use client";

import { Clock, Info, Scale } from "lucide-react";
import type { DisputesSummaryCardsProps } from "./types";

export function DisputesSummaryCards({
  summary,
  onReadDocumentation,
}: DisputesSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Avg. Resolution Time */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
            <Clock className="size-3.5" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Avg. Resolution Time
          </span>
        </div>
        <div className="space-y-0.5">
          <p className="text-2xl font-extrabold tracking-tight text-foreground">
            {summary.avgResolutionDays}
          </p>
          <p className="text-xs text-muted-foreground">
            {summary.avgResolutionTrend}
          </p>
        </div>
      </div>

      {/* Success Rate */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
            <Scale className="size-3.5" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Success Rate
          </span>
        </div>
        <div className="space-y-0.5">
          <p className="text-2xl font-extrabold tracking-tight text-foreground">
            {summary.successRatePercent}
          </p>
          <p className="text-xs text-muted-foreground">
            {summary.successRateTrend}
          </p>
        </div>
      </div>

      {/* Dispute Guidelines */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
            <Info className="size-3.5" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Dispute Guidelines
          </span>
        </div>
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Learn more about our mediation process and terms.
          </p>
          <button
            type="button"
            onClick={onReadDocumentation}
            className="text-xs font-bold text-primary underline underline-offset-2 hover:text-primary-hover cursor-pointer"
          >
            Read Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
