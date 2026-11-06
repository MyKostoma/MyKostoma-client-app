"use client";

import Link from "next/link";
import {
  BadgeCheck,
  Check,
  FileQuestion,
  Plus,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuotationStatusBadge } from "./quotation-status-badge";
import type { QuotationItem } from "./types";

export interface QuotationCardProps {
  quotation: QuotationItem;
  isComparing?: boolean;
  onToggleCompare?: (quotation: QuotationItem) => void;
  onViewDetail: (quotation: QuotationItem) => void;
  onAcceptQuote?: (quotation: QuotationItem) => void;
  onRejectQuote?: (quotation: QuotationItem) => void;
  onRestoreQuote?: (quotation: QuotationItem) => void;
  className?: string;
}

export function QuotationCard({
  quotation,
  isComparing = false,
  onToggleCompare,
  onViewDetail,
  onAcceptQuote,
  onRejectQuote,
  onRestoreQuote,
  className,
}: QuotationCardProps) {
  const isRejected = quotation.status === "rejected";
  const isAccepted = quotation.status === "accepted";
  const initials = quotation.providerName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-4 sm:p-6 shadow-2xs transition-all space-y-4",
        isComparing && !isRejected
          ? "border-primary/40 ring-1 ring-primary/15"
          : "border-border",
        isRejected && "opacity-75",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3.5 min-w-0">
          <div
            className={cn(
              "size-11 rounded-xl border border-border bg-secondary/50 flex items-center justify-center font-bold text-xs shrink-0 select-none",
              isRejected ? "text-muted-foreground" : "text-foreground"
            )}
          >
            {initials}
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3
                className={cn(
                  "text-sm sm:text-base font-bold tracking-tight truncate",
                  isRejected ? "text-muted-foreground" : "text-foreground"
                )}
              >
                {quotation.providerName}
              </h3>

              {quotation.providerVerified && !isRejected && (
                <BadgeCheck className="size-4 text-info fill-info/15 shrink-0" />
              )}

              <QuotationStatusBadge
                status={quotation.status}
                variant="card"
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-medium text-foreground">
                <Star className="size-3.5 fill-warning text-warning shrink-0" />
                <span>{quotation.rating.toFixed(1)}</span>
                <span className="text-muted-foreground font-normal">
                  ({quotation.reviewsCount} reviews)
                </span>
              </span>

              <span aria-hidden="true">•</span>

              <Link
                href={`/requests/${encodeURIComponent(quotation.requestId)}`}
                className="underline underline-offset-2 hover:text-foreground transition-colors truncate"
              >
                Request: {quotation.requestTitle} #{quotation.requestCode}
              </Link>
            </div>
          </div>
        </div>

        <div className="sm:text-right shrink-0 flex sm:flex-col items-baseline sm:items-end justify-between gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-border/60">
          <p
            className={cn(
              "text-base sm:text-xl font-extrabold tracking-tight",
              isRejected ? "text-muted-foreground" : "text-foreground"
            )}
          >
            {quotation.totalAmount}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Est. Duration: {quotation.estimatedDuration}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-secondary/45 px-4 py-3 text-xs text-muted-foreground italic leading-relaxed">
        &ldquo;{quotation.message}&rdquo;
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-3">
          {!isRejected && onToggleCompare && (
            <button
              type="button"
              onClick={() => onToggleCompare(quotation)}
              className={cn(
                "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[11px] font-semibold transition-all cursor-pointer select-none",
                isComparing
                  ? "bg-foreground text-background shadow-2xs"
                  : "border border-border bg-card text-foreground hover:bg-secondary/60"
              )}
            >
              {isComparing ? (
                <>
                  <Check className="size-3.5" />
                  <span>In Comparison</span>
                </>
              ) : (
                <>
                  <Plus className="size-3.5" />
                  <span>Add to Compare</span>
                </>
              )}
            </button>
          )}

          <span className="text-[11px] text-muted-foreground">
            {isRejected
              ? `Rejected on: ${quotation.rejectedAt || quotation.receivedAt}`
              : `Received: ${quotation.receivedAt}`}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {isRejected ? (
            <>
              {onRestoreQuote && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onRestoreQuote(quotation)}
                  className="h-8 px-3.5 rounded-lg text-xs font-semibold"
                >
                  Restore Quote
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onViewDetail(quotation)}
                className="h-8 px-3.5 rounded-lg text-xs font-semibold"
              >
                View Detail
              </Button>
            </>
          ) : isAccepted ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onViewDetail(quotation)}
              className="h-8 px-4 rounded-lg text-xs font-semibold"
            >
              View Detail
            </Button>
          ) : (
            <>
              {onRejectQuote && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onRejectQuote(quotation)}
                  className="h-8 px-3.5 rounded-lg text-xs font-semibold"
                >
                  Reject
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onViewDetail(quotation)}
                className="h-8 px-3.5 rounded-lg text-xs font-semibold"
              >
                View Detail
              </Button>
              {onAcceptQuote && (
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => onAcceptQuote(quotation)}
                  className="h-8 px-4 rounded-lg text-xs font-semibold shadow-xs"
                >
                  Accept Quote
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export interface FloatingCompareBannerProps {
  selectedCount: number;
  onCompareNow: () => void;
  onClearCompare: () => void;
  className?: string;
}

export function FloatingCompareBanner({
  selectedCount,
  onCompareNow,
  onClearCompare,
  className,
}: FloatingCompareBannerProps) {
  if (selectedCount <= 0) return null;

  return (
    <div
      className={cn(
        "w-full max-w-lg mx-auto rounded-full bg-primary text-primary-foreground px-4 sm:px-5 py-2.5 shadow-lg flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200",
        className
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex items-center -space-x-2 shrink-0" aria-hidden="true">
          <span className="size-5 rounded-full bg-primary-foreground border-2 border-primary" />
          <span className="size-5 rounded-full bg-primary-foreground border-2 border-primary" />
        </div>
        <span className="text-xs font-semibold truncate">
          {selectedCount} {selectedCount === 1 ? "Quote" : "Quotes"} selected to
          compare
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onCompareNow}
          className="px-3.5 py-1.5 rounded-full bg-card text-foreground text-[11px] font-bold uppercase tracking-wider hover:opacity-95 transition-opacity cursor-pointer shadow-2xs"
        >
          Compare Now
        </button>

        <button
          type="button"
          onClick={onClearCompare}
          aria-label="Clear comparison selection"
          className="p-1 rounded-full text-primary-foreground/80 hover:text-primary-foreground hover:bg-black/10 transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}

export interface QuotationPromoteCardProps {
  selectedCount?: number;
  onCompareNow?: () => void;
  onClearCompare?: () => void;
  onPromoteRequest?: () => void;
  className?: string;
}

export function QuotationPromoteCard({
  selectedCount = 0,
  onCompareNow,
  onClearCompare,
  onPromoteRequest,
  className,
}: QuotationPromoteCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-border bg-card/50 p-6 sm:p-8 text-center space-y-5",
        className
      )}
    >
      {selectedCount > 0 && onCompareNow && onClearCompare && (
        <FloatingCompareBanner
          selectedCount={selectedCount}
          onCompareNow={onCompareNow}
          onClearCompare={onClearCompare}
        />
      )}

      <div className="max-w-md mx-auto space-y-2.5">
        <div className="size-10 rounded-full bg-secondary text-muted-foreground flex items-center justify-center mx-auto">
          <FileQuestion className="size-5" />
        </div>

        <h3 className="text-sm sm:text-base font-bold text-foreground">
          Looking for more?
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Promote your request to get more quotes from top-rated professionals
          in your area.
        </p>

        <div className="pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onPromoteRequest}
            className="h-9 px-5 rounded-lg text-xs font-semibold"
          >
            Promote Request
          </Button>
        </div>
      </div>
    </div>
  );
}

