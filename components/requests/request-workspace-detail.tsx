"use client";

import {
  CheckCircle2,
  Clock,
  MessageSquare,
  Plus,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RequestStatusBadge } from "./request-status-badge";
import { QuotesEmptyStateCard } from "./requests-state-cards";
import type { ConsumerRequestItem, RequestQuoteItem } from "./types";

export interface RequestWorkspaceDetailProps {
  request: ConsumerRequestItem;
  forceEmptyQuotes?: boolean;
  onViewAllQuotes?: () => void;
  onViewQuote?: (quote: RequestQuoteItem) => void;
  onEditRequest?: () => void;
  onPromoteRequest?: () => void;
  className?: string;
}

export function RequestWorkspaceDetail({
  request,
  forceEmptyQuotes = false,
  onViewAllQuotes,
  onViewQuote,
  onEditRequest,
  onPromoteRequest,
  className,
}: RequestWorkspaceDetailProps) {
  const effectiveQuotes = forceEmptyQuotes ? [] : request.quotes;
  const photosCount = request.photosCount ?? 2;

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-5", className)}>
      {/* 1. Request Overview Card */}
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-6">
        {/* Title & Status */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
              {request.title}
            </h1>
            <RequestStatusBadge status={request.status} />
          </div>

          <p className="text-xs text-muted-foreground mt-1.5">
            Posted on {request.postedDateFull} • Request ID: {request.code}
          </p>
        </div>

        {/* 4-Column Metadata Row */}
        <div className="py-5 border-y border-border/70 grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              CATEGORY
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground mt-1.5">
              <SlidersHorizontal className="size-3.5 text-muted-foreground shrink-0" />
              <span>{request.category}</span>
            </div>
          </div>

          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              BUDGET
            </span>
            <p className="text-xs font-bold text-foreground mt-1.5">
              {request.budget}
            </p>
          </div>

          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              LOCATION
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground mt-1.5">
              <CheckCircle2 className="size-3.5 text-foreground shrink-0" />
              <span>{request.location}</span>
            </div>
          </div>

          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              TIMELINE
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground mt-1.5">
              <Clock className="size-3.5 text-muted-foreground shrink-0" />
              <span>{request.timeline}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-foreground">Description</h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {request.description}
          </p>
        </div>

        {/* Attached Photos */}
        {photosCount > 0 && (
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold text-foreground">
              Attached Photos
            </h2>

            <div className="flex flex-wrap items-center gap-3.5">
              {Array.from({ length: photosCount }).map((_, idx) => (
                <div
                  key={idx}
                  className="size-22 sm:size-24 rounded-xl bg-secondary/70 border border-border/70 flex flex-col items-center justify-center gap-1.5 text-muted-foreground select-none"
                >
                  <Plus className="size-4.5" />
                  <span className="text-[10px] font-medium">
                    Image {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 2. Quotes Received Section */}
      {effectiveQuotes.length === 0 ? (
        <QuotesEmptyStateCard
          onEditRequest={onEditRequest}
          onPromoteRequest={onPromoteRequest}
        />
      ) : (
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <h2 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
                Quotes Received
              </h2>
              <span className="px-2.5 py-0.5 rounded-full border border-border text-[10px] font-semibold text-muted-foreground">
                {request.quotesCount} Total
              </span>
            </div>

            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onViewAllQuotes}
              trailingIcon={<Star className="size-3 fill-current" />}
              className="h-8 px-3.5 rounded-lg text-[11px] font-semibold shadow-2xs"
            >
              View All Quotes
            </Button>
          </div>

          <div className="space-y-3">
            {effectiveQuotes.map((quote) => (
              <article
                key={quote.id}
                className="rounded-xl border border-border bg-card p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-border/90 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={quote.avatarUrl}
                    alt={quote.providerName}
                    className="size-10 rounded-full object-cover bg-secondary shrink-0 select-none"
                  />

                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-foreground leading-tight truncate">
                      {quote.providerName}
                    </h3>
                    {quote.rating !== undefined && (
                      <p className="inline-flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                        <Star className="size-3 text-foreground fill-foreground shrink-0" />
                        <span>
                          {quote.rating} ({quote.reviewCount} reviews)
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-border/60 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                      QUOTE
                    </span>
                    <span className="block text-sm sm:text-base font-bold text-foreground">
                      {quote.amount}
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onViewQuote?.(quote)}
                    className="h-8 px-3.5 rounded-lg text-xs font-semibold"
                  >
                    View Quote
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 3. Manage Your Request Info Banner */}
      <div className="rounded-2xl border border-border bg-secondary/45 p-5 flex items-start gap-3.5">
        <div className="size-9 rounded-full bg-card border border-border text-foreground flex items-center justify-center shrink-0 shadow-2xs">
          <MessageSquare className="size-4 fill-current" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-foreground">
            Manage your request
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed mt-1">
            You can review each quote&apos;s details, check professional
            portfolios, and communicate directly through the messages tab before
            hiring. Once you choose a professional, click &apos;Hire&apos; on
            their quote to start the order.
          </p>
        </div>
      </div>
    </div>
  );
}
