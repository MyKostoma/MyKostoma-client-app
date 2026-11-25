"use client";

import { BookOpen, HelpCircle, Plus, RotateCcw, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DisputesEmptyStateProps } from "./types";

export function DisputesEmptyState({
  variant,
  onRaiseDispute,
  onClearFilters,
  onReadGuidelines,
}: DisputesEmptyStateProps) {
  const isNoMatches = variant === "no-matches";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card px-6 py-14 sm:py-16 flex flex-col items-center text-center shadow-2xs">
        <div className="size-16 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground mb-5">
          <Scale className="size-7" />
        </div>

        <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
          {isNoMatches ? "No Matching Disputes" : "No Disputes Found"}
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mt-2 leading-relaxed">
          {isNoMatches
            ? "No disputes match your current search or filter selection. Clear your filters to inspect all cases."
            : "You don't have any active or resolved disputes at the moment. When you raise a dispute, it will appear here."}
        </p>

        <div className="mt-6">
          {isNoMatches ? (
            <Button
              type="button"
              variant="outline"
              onClick={onClearFilters}
              className="h-10 px-5 rounded-xl text-xs font-semibold gap-2"
            >
              <RotateCcw className="size-3.5" />
              <span>Clear Filters</span>
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={onRaiseDispute}
              className="h-10 px-6 rounded-xl text-xs font-semibold gap-2"
            >
              <Plus className="size-4" />
              <span>Raise a Dispute</span>
            </Button>
          )}
        </div>
      </div>

      {/* Bottom 2-Card Help Grid (Screenshot 6) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 flex items-start gap-4">
          <div className="size-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground shrink-0">
            <HelpCircle className="size-4" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-foreground">How it works</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our mediation process helps resolve issues between clients and
              professionals efficiently. Most cases are resolved within 4
              business days.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 flex items-start gap-4">
          <div className="size-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground shrink-0">
            <BookOpen className="size-4" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-foreground">Guidelines</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Read our dispute policy to understand what evidence is required
              and how we handle financial settlements.
            </p>
            <button
              type="button"
              onClick={onReadGuidelines}
              className="text-xs font-bold text-primary underline underline-offset-2 hover:text-primary-hover cursor-pointer"
            >
              Read Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
