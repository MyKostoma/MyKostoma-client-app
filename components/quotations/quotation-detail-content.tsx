"use client";

import Link from "next/link";
import {
  BadgeCheck,
  Calendar,
  Check,
  History,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuotationStatusBadge } from "./quotation-status-badge";
import type { QuotationItem, QuotationRevisionEntry } from "./types";

export interface QuotationAcceptedStateProps {
  quotation: QuotationItem;
  onGoToOrder: () => void;
  onViewReceipt: () => void;
}

export function QuotationAcceptedState({
  quotation,
  onGoToOrder,
  onViewReceipt,
}: QuotationAcceptedStateProps) {
  const initials = quotation.providerName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
      <div className="p-6 sm:p-10 text-center max-w-lg mx-auto space-y-4">
        <div className="size-12 rounded-full bg-success-bg text-success flex items-center justify-center mx-auto">
          <Check className="size-6 stroke-[2.5]" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
            Quote Accepted
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Your project &ldquo;{quotation.requestTitle} #{quotation.requestCode}
            &rdquo; has been converted into an active order with{" "}
            <span className="font-semibold text-foreground">
              {quotation.providerName}
            </span>
            .
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onGoToOrder}
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Go to Order Detail
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onViewReceipt}
            className="h-9 px-5 rounded-lg text-xs font-semibold"
          >
            View Receipt
          </Button>
        </div>
      </div>

      <div className="border-t border-border bg-secondary/30 px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20 shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">
              {quotation.providerName}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {quotation.providerRole}
            </p>
          </div>
        </div>

        <div className="sm:text-right">
          <p className="text-xs sm:text-sm font-extrabold text-foreground">
            {quotation.totalAmount}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Order #{quotation.orderCode || "ORD-NG88293"}
          </p>
        </div>
      </div>
    </div>
  );
}

export interface QuotationRejectedStateProps {
  quotation: QuotationItem;
  onBackToQuotes: () => void;
  onRestoreQuote?: () => void;
  onMessageArtisan?: () => void;
}

export function QuotationRejectedState({
  quotation,
  onBackToQuotes,
  onRestoreQuote,
  onMessageArtisan,
}: QuotationRejectedStateProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div className="flex items-center gap-2.5">
          <h2 className="text-sm sm:text-base font-bold text-foreground">
            Quote from {quotation.providerName}
          </h2>
          <QuotationStatusBadge status="rejected" variant="detail" />
        </div>

        <button
          type="button"
          onClick={onBackToQuotes}
          className="text-xs font-semibold text-foreground underline underline-offset-4 hover:text-primary transition-colors cursor-pointer"
        >
          Back to Quotes
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-[11px] text-muted-foreground">Total Price</p>
          <p className="text-xl sm:text-2xl font-extrabold text-muted-foreground tracking-tight">
            {quotation.totalAmount}
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-[11px] text-muted-foreground">Status</p>
          <p className="text-xs font-bold uppercase tracking-wider text-error">
            Rejected by Client
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-secondary/45 px-4 py-3.5 text-center text-xs text-muted-foreground italic">
        This quote is no longer available for acceptance. If you changed your
        mind, please restore the quote or message the artisan to request a new
        quote.
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2.5">
        {onRestoreQuote && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRestoreQuote}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Restore Quote
          </Button>
        )}
        {onMessageArtisan && (
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onMessageArtisan}
            className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
          >
            Message Artisan
          </Button>
        )}
      </div>
    </div>
  );
}

export interface QuotationDetailWorkspaceProps {
  quotation: QuotationItem;
  onViewOriginalRequest: () => void;
  onRejectQuote: () => void;
  onViewProfile?: () => void;
  onSelectRevision?: (revision: QuotationRevisionEntry) => void;
}

export function QuotationDetailWorkspace({
  quotation,
  onViewOriginalRequest,
  onRejectQuote,
  onViewProfile,
  onSelectRevision,
}: QuotationDetailWorkspaceProps) {
  const isUpdated = quotation.status === "updated";
  const initials = quotation.providerName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="size-12 rounded-full bg-secondary text-foreground flex items-center justify-center font-bold text-sm border border-border shrink-0">
                {initials}
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
                    {quotation.providerName}
                  </h2>

                  {quotation.providerVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-info-bg text-info text-[10px] font-semibold">
                      <BadgeCheck className="size-3" />
                      <span>Verified Professional</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  {quotation.providerContactName
                    ? `${quotation.providerContactName} • ${quotation.providerRole}`
                    : quotation.providerRole}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-0.5 text-xs">
                  <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                    <Star className="size-3.5 fill-warning text-warning" />
                    <span>{quotation.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground font-normal">
                      ({quotation.reviewsCount} reviews)
                    </span>
                  </span>

                  {quotation.updatedAgo && (
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <History className="size-3.5" />
                      <span>Updated {quotation.updatedAgo}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {onViewProfile && (
              <button
                type="button"
                onClick={onViewProfile}
                className="text-xs font-semibold text-primary hover:underline underline-offset-4 shrink-0 cursor-pointer"
              >
                View Profile
              </button>
            )}
          </div>

          <div className="border-t border-border/70 pt-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {isUpdated ? "Latest Update Note" : "Professional Message"}
              </span>
              {isUpdated && quotation.versionBadge && (
                <span className="px-2 py-0.5 rounded bg-secondary text-foreground text-[10px] font-bold">
                  {quotation.versionBadge}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {quotation.message}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
              {isUpdated
                ? "Latest Quotation Breakdown"
                : "Quotation Breakdown"}
            </h3>
            {isUpdated && (
              <span className="text-[11px] text-muted-foreground">
                Compared to previous version
              </span>
            )}
          </div>

          <div className="divide-y divide-border/60">
            {quotation.breakdown.map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <span className="text-muted-foreground">{item.label}</span>

                <div className="flex items-center gap-2 shrink-0">
                  {item.previousAmount && (
                    <span className="text-xs text-muted-foreground line-through">
                      {item.previousAmount}
                    </span>
                  )}
                  <span className="font-semibold text-foreground">
                    {item.amount}
                  </span>
                  {item.savingsLabel && (
                    <span className="px-1.5 py-0.5 rounded bg-success-bg text-success text-[10px] font-bold">
                      {item.savingsLabel}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-secondary/45 p-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs sm:text-sm font-bold text-foreground">
                Total Quote Amount
              </p>
              {quotation.totalSavingsNote && (
                <p className="text-[11px] font-medium text-success mt-0.5">
                  {quotation.totalSavingsNote}
                </p>
              )}
            </div>

            <div className="text-right">
              <p className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                {quotation.totalAmount}
              </p>
              {quotation.previousTotalAmount && (
                <p className="text-[10px] text-muted-foreground line-through">
                  Prev: {quotation.previousTotalAmount}
                </p>
              )}
            </div>
          </div>
        </div>

        {quotation.revisions && quotation.revisions.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
              Revision History
            </h3>

            <div className="space-y-4">
              {quotation.revisions.map((rev, index) => {
                const isLast = index === (quotation.revisions?.length ?? 0) - 1;
                return (
                  <div key={rev.id} className="relative flex gap-3.5">
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute left-1.5 top-4 bottom-0 w-px bg-border"
                      />
                    )}

                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-3 rounded-full mt-1 shrink-0 ring-4 ring-card",
                        rev.isLatest ? "bg-primary" : "bg-border"
                      )}
                    />

                    <div className="flex-1 min-w-0 pb-2 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={cn(
                            "text-xs sm:text-sm font-bold",
                            rev.isLatest
                              ? "text-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {rev.versionLabel}
                        </p>
                        <span
                          className={cn(
                            "text-xs sm:text-sm font-bold shrink-0",
                            rev.isLatest
                              ? "text-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {rev.amount}
                        </span>
                      </div>

                      <p className="text-[11px] text-muted-foreground">
                        {rev.dateLabel}
                      </p>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {rev.note}
                      </p>

                      {!rev.isLatest && onSelectRevision && (
                        <button
                          type="button"
                          onClick={() => onSelectRevision(rev)}
                          className="text-[11px] font-semibold text-foreground underline underline-offset-2 hover:text-primary transition-colors cursor-pointer pt-0.5"
                        >
                          View this version
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-4">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Related Request
          </span>

          <div>
            <h3 className="text-sm font-bold text-foreground">
              {quotation.requestTitle}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              ID: #{quotation.requestCode}
            </p>
          </div>

          <div className="space-y-2 pt-1 border-t border-border/60 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-semibold text-foreground text-right">
                {quotation.requestLocation}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-semibold text-foreground text-right">
                {quotation.requestService}
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onViewOriginalRequest}
            className="w-full h-9 rounded-lg text-xs font-semibold"
          >
            View Original Request
          </Button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
              <Calendar className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Estimated Duration
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {quotation.estimatedDuration}
                </p>
                {quotation.durationDeltaBadge && (
                  <span className="px-1.5 py-0.5 rounded bg-success-bg text-success text-[10px] font-bold">
                    {quotation.durationDeltaBadge}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-border/60 pt-4 flex items-center gap-3">
            <div className="size-9 rounded-xl bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
              <Calendar className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Quote Expires
              </p>
              <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                {quotation.expiresAt}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-border bg-card/70 p-4 flex items-start gap-3">
          <div className="size-8 rounded-lg bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
            <ShieldCheck className="size-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-foreground">
              {isUpdated ? "Version Control" : "Secure Booking"}
            </h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {isUpdated
                ? "Once you accept a version, all previous quotes for this request will be automatically voided."
                : "Payments are held in escrow and only released when the milestone is approved by you."}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRejectQuote}
          className="w-full h-10 rounded-xl text-xs font-semibold text-error border-error/25 hover:bg-error-bg"
        >
          {isUpdated ? "Decline All Versions" : "Reject Quote"}
        </Button>
      </div>
    </div>
  );
}

