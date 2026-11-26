"use client";

import { Check, CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/form-fields";
import {
  computeSplitAmounts,
  formatNairaAmount,
} from "@/features/disputes/services/disputesHelpers";
import { cn } from "@/lib/utils";
import type { DisputeResolutionCardProps, DisputeResolutionPath } from "./types";

const RESOLUTION_PATHS: {
  path: DisputeResolutionPath;
  title: string;
  subtitle?: string;
}[] = [
  {
    path: "release-to-professional",
    title: "Release to Professional",
  },
  {
    path: "refund-to-consumer",
    title: "Refund to Consumer",
  },
  {
    path: "split",
    title: "Split (Partial Refund)",
    subtitle: "Negotiate a partial payout",
  },
];

export function DisputeResolutionCard({
  dispute,
  selectedPath,
  splitConsumerPercent,
  resolutionNote,
  isFinalizing,
  isProfessional,
  onSelectPath,
  onSplitPercentChange,
  onResolutionNoteChange,
  onFinalizeDecision,
}: DisputeResolutionCardProps) {
  const isResolved =
    dispute.status === "resolved" || dispute.status === "archived";
  const effectivePath = dispute.resolutionProposal?.path ?? selectedPath;
  const effectiveSplitPercent =
    dispute.resolutionProposal?.splitConsumerPercent ?? splitConsumerPercent;
  const { consumerAmount, professionalAmount } = computeSplitAmounts(
    dispute.totalAmount,
    effectiveSplitPercent
  );

  return (
    <section
      aria-labelledby="propose-resolution-heading"
      className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs"
    >
      {/* Semantic dark-header contrasting strip (light mode = dark bar, dark mode = inverted via tokens) */}
      <div className="bg-foreground text-background px-5 py-3.5 flex items-center gap-2.5">
        <ShieldCheck className="size-4 shrink-0" />
        <h2
          id="propose-resolution-heading"
          className="text-xs font-extrabold uppercase tracking-wider"
        >
          Propose Resolution
        </h2>
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {isResolved
            ? "Settlement has been finalized for this dispute and recorded on the escrow ledger."
            : "Select a resolution path for internal review or mutual agreement:"}
        </p>

        <div className="space-y-2.5">
          {RESOLUTION_PATHS.map((option) => {
            const isSelected = effectivePath === option.path;
            return (
              <button
                key={option.path}
                type="button"
                disabled={isResolved}
                onClick={() => onSelectPath(option.path)}
                className={cn(
                  "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left transition-all",
                  !isResolved && "cursor-pointer",
                  isResolved && !isSelected && "opacity-55",
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "border-border bg-card hover:bg-secondary/40"
                )}
              >
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-foreground">
                    {option.title}
                  </span>
                  {option.subtitle && (
                    <span className="block text-[11px] text-muted-foreground mt-0.5">
                      {option.subtitle}
                    </span>
                  )}
                </div>

                {isSelected ? (
                  <span className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <Check className="size-3" />
                  </span>
                ) : (
                  <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {effectivePath === "split" && (
          <div className="rounded-xl border border-border bg-secondary/40 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-foreground">Split Allocation</span>
              <span className="text-primary font-bold">
                {effectiveSplitPercent}% Refund / {100 - effectiveSplitPercent}%
                Release
              </span>
            </div>

            {!isResolved && (
              <input
                type="range"
                min={10}
                max={90}
                step={5}
                value={effectiveSplitPercent}
                onChange={(e) => onSplitPercentChange(Number(e.target.value))}
                aria-label="Consumer refund percentage"
                className="w-full accent-primary cursor-pointer"
              />
            )}

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="rounded-lg border border-border bg-card px-3 py-2">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isProfessional ? "Client Refund" : "Your Refund"}
                </span>
                <span className="block text-sm font-extrabold text-foreground mt-0.5">
                  {formatNairaAmount(consumerAmount)}
                </span>
              </div>
              <div className="rounded-lg border border-border bg-card px-3 py-2">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isProfessional ? "Your Payout" : "Pro Release"}
                </span>
                <span className="block text-sm font-extrabold text-foreground mt-0.5">
                  {formatNairaAmount(professionalAmount)}
                </span>
              </div>
            </div>
          </div>
        )}

        {!isResolved && effectivePath && (
          <div className="space-y-1.5">
            <label
              htmlFor="resolution-proposal-note"
              className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
            >
              Settlement Note (Optional)
            </label>
            <Textarea
              id="resolution-proposal-note"
              value={resolutionNote}
              onChange={(e) => onResolutionNoteChange(e.target.value)}
              rows={2}
              placeholder="Add any terms or context for this resolution..."
              className="resize-none rounded-xl text-xs"
            />
          </div>
        )}

        {isResolved && dispute.resolutionProposal ? (
          <div className="rounded-xl border border-success/30 bg-success-bg px-4 py-3 flex items-start gap-2.5">
            <CheckCircle2 className="size-4 text-success shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-foreground">Decision Finalized</p>
              <p className="text-muted-foreground mt-0.5">
                {dispute.resolutionProposal.note ||
                  `Settled on ${dispute.resolutionProposal.proposedAtLabel}.`}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 pt-1">
            <Button
              type="button"
              variant={selectedPath ? "primary" : "secondary"}
              disabled={!selectedPath || isFinalizing}
              loading={isFinalizing}
              loadingText="Finalizing Decision..."
              onClick={onFinalizeDecision}
              className="w-full h-11 rounded-xl text-xs font-extrabold uppercase tracking-wider"
            >
              Finalize Decision
            </Button>
            <p className="text-[11px] text-muted-foreground text-center">
              {selectedPath
                ? "Submitting records your settlement proposal for immediate escrow confirmation."
                : "Select a resolution option above once both parties provide statements."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
