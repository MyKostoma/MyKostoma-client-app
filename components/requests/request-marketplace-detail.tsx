"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Cloud,
  Filter,
  Mail,
  MapPin,
  MoreHorizontal,
  Search,
  Settings,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestStatusBadge } from "./request-status-badge";
import type {
  ConsumerRequestItem,
  MarketplaceDetailVariant,
  RequestQuoteItem,
} from "./types";

export interface RequestMarketplaceDetailProps {
  request: ConsumerRequestItem;
  variant: MarketplaceDetailVariant;
  onVariantChange?: (variant: MarketplaceDetailVariant) => void;
  onBackToWorkspace?: () => void;
  onEditRequest?: () => void;
  onCloseRequest?: () => void;
  onBackToDashboard?: () => void;
  onViewQuote?: (quote: RequestQuoteItem) => void;
}

export function RequestMarketplaceDetail({
  request,
  variant,
  onEditRequest,
  onCloseRequest,
  onBackToDashboard,
  onViewQuote,
  onVariantChange,
}: RequestMarketplaceDetailProps) {
  const quotes = request.marketplaceQuotes ?? request.quotes;
  const isClosed = variant === "closed";
  const isOpenWithQuotes = variant === "open-with-quotes";
  const isOpenNoQuotes = variant === "open-no-quotes";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Standalone Top Header (Screenshots 6, 7, 8) */}
      <header className="w-full bg-card border-b border-border sticky top-0 z-30">
        <div className="container  px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <Link
            href="/requests"
            className="inline-flex items-center transition-opacity hover:opacity-90"
            aria-label="MyKostoma Requests"
          >
            <img
              src="/mykostoma_full_logo.png"
              alt="MyKostoma"
              className="h-7 sm:h-8 w-auto object-contain select-none"
            />
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <RequestStatusBadge
              status={isClosed ? "closed" : "open"}
              variant="header-pill"
            />

            <button
              type="button"
              aria-label="Messages"
              className="size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <Mail className="size-4.5" />
            </button>

            <button
              type="button"
              aria-label="Settings"
              className="size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <Settings className="size-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main 2-Column Content */}
      <main className="flex-1 container  px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Request Details & Quotes */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Contextual Status Banner */}
            {isOpenWithQuotes && (
              <div className="rounded-xl border border-success/20 bg-success-bg p-4 flex items-center gap-3.5">
                <div className="size-9 rounded-full bg-card text-success flex items-center justify-center shrink-0 shadow-2xs">
                  <AlertTriangle className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-success">
                    You have received {quotes.length} quotes for this request.
                  </p>
                  <p className="text-xs text-success/85 mt-0.5">
                    Review the proposals below to find the best professional for
                    your project.
                  </p>
                </div>
              </div>
            )}

            {isOpenNoQuotes && (
              <div className="rounded-xl border border-border bg-secondary/55 p-4 flex items-center gap-3.5">
                <div className="size-9 rounded-full bg-card border border-border text-foreground flex items-center justify-center shrink-0 shadow-2xs">
                  <Search className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">
                    Marketplace Visibility: High
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Your request is live. Professionals are currently reviewing
                    your project details.
                  </p>
                </div>
              </div>
            )}

            {isClosed && (
              <div className="rounded-xl border border-border bg-secondary/65 p-4 flex items-center gap-3.5">
                <div className="size-9 rounded-full bg-card border border-border text-foreground flex items-center justify-center shrink-0 shadow-2xs">
                  <MoreHorizontal className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">
                    Request Status: Archival
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    This request was closed on{" "}
                    {request.closedDateLabel ?? "October 24, 2024"}. No further
                    actions can be taken.
                  </p>
                </div>
              </div>
            )}

            {/* 2. Request Title & ID */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                {request.title}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Request ID: #{request.code}
              </p>
            </div>

            {/* 3. 2x2 Metadata Grid */}
            <div className="py-6 border-y border-border/70 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  CATEGORY
                </span>
                <p className="text-xs sm:text-sm font-semibold text-foreground mt-1.5">
                  {request.category}
                </p>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  BUDGET RANGE
                </span>
                <p className="text-xs sm:text-sm font-semibold text-foreground mt-1.5">
                  {request.budgetRangeLabel ?? request.budget}
                </p>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  LOCATION
                </span>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground mt-1.5">
                  <MapPin className="size-3.5 text-foreground shrink-0" />
                  <span>{request.location}</span>
                </div>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  TIMELINE
                </span>
                <p className="text-xs sm:text-sm font-semibold text-foreground mt-1.5">
                  {request.timeline}
                </p>
              </div>
            </div>

            {/* 4. Description (shown in Open-No-Quotes & Closed Archival views) */}
            {(isOpenNoQuotes || isClosed) && (
              <div className="space-y-3">
                <h2 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  DESCRIPTION
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {request.description}
                </p>
                {request.extraDescription && (
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {request.extraDescription}
                  </p>
                )}
              </div>
            )}

            {/* 5. Quotes Received Section */}
            {isOpenWithQuotes && (
              <section className="space-y-4 pt-2">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                    Quotes Received
                  </h2>
                  <span className="px-3 py-1 rounded-md bg-secondary text-[10px] font-bold uppercase tracking-wider text-foreground">
                    {quotes.length} TOTAL
                  </span>
                </div>

                <div className="space-y-3.5">
                  {quotes.map((quote) => (
                    <article
                      key={quote.id}
                      className="rounded-2xl border border-border bg-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={quote.avatarUrl}
                          alt={quote.providerName}
                          className="size-11 rounded-full object-cover bg-secondary shrink-0 select-none"
                        />
                        <div className="min-w-0">
                          <h3 className="text-xs sm:text-sm font-bold text-foreground leading-tight truncate">
                            {quote.providerName}
                          </h3>
                          {quote.receivedAtLabel && (
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {quote.receivedAtLabel}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/60 shrink-0">
                        <div className="text-left sm:text-right">
                          <span className="block text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                            QUOTE AMOUNT
                          </span>
                          <span className="block text-base sm:text-lg font-extrabold text-foreground mt-0.5">
                            {quote.amount}
                          </span>
                        </div>

                        <Button
                          type="button"
                          variant="default"
                          size="sm"
                          onClick={() => onViewQuote?.(quote)}
                          className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
                        >
                          View Quote
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {isOpenNoQuotes && (
              <section className="space-y-4 pt-4 border-t border-border/60">
                <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                  Quotes Received
                </h2>

                <div className="rounded-2xl border border-dashed border-border bg-secondary/35 p-10 sm:p-14 flex flex-col items-center justify-center text-center">
                  <div className="size-14 rounded-full bg-card border border-border/60 text-muted-foreground flex items-center justify-center mb-4 shadow-2xs">
                    <Cloud className="size-6 fill-current" />
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-foreground">
                    No quotes received yet
                  </h3>

                  <p className="text-xs text-muted-foreground max-w-sm mt-1.5 leading-relaxed">
                    Your request is visible to professionals in the marketplace.
                    You&apos;ll be notified as soon as someone submits a
                    proposal.
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Summary Sidebar & Actions */}
          <aside className="lg:col-span-4 space-y-4">
            {/* Summary Card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-5">
              <h2 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
                {isClosed
                  ? "Activity Summary"
                  : isOpenNoQuotes
                    ? "Summary"
                    : "Request Summary"}
              </h2>

              {isOpenWithQuotes && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-0.5 rounded-full bg-success mt-2 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        Request Live
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Since Yesterday • 02:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="size-2 rounded-full bg-warning mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        {quotes.length} Quotes Received
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Latest: 1 hour ago
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isOpenNoQuotes && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-0.5 rounded-full bg-success mt-2 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        Request Posted
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Today • 09:12 AM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="size-2 rounded-full bg-warning mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        Waiting for Professionals
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Visibility: Active
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isClosed && (
                <>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-0.5 rounded-full bg-success mt-2 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-foreground">
                          Request Posted
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Oct 12, 2024 • 10:45 AM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-2 h-0.5 rounded-full bg-primary mt-2 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-foreground">
                          5 Quotes Received
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Oct 15, 2024 — Oct 20, 2024
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="size-2 rounded-full bg-foreground/70 mt-1.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-foreground">
                          Closed by User
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Oct 24, 2024 • 03:20 PM
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => onVariantChange?.("open-with-quotes")}
                      leadingIcon={<TrendingUp className="size-4" />}
                      className="w-full h-10 rounded-lg text-xs font-semibold"
                    >
                      View Archived Quotes
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!isClosed && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onEditRequest}
                    leadingIcon={<Filter className="size-3.5 fill-current" />}
                    className="w-full h-11 rounded-xl text-xs font-bold"
                  >
                    Edit Request
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={onCloseRequest}
                    leadingIcon={<Trash2 className="size-3.5" />}
                    className="w-full h-11 rounded-xl text-xs font-bold bg-error-bg border-error/20 text-error hover:bg-error/15"
                  >
                    Close Request
                  </Button>
                </>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={onBackToDashboard}
                leadingIcon={<MapPin className="size-3.5" />}
                className="w-full h-11 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Back to Dashboard
              </Button>
            </div>

            {/* Expert Tip Card (Screenshot 8) */}
            {isOpenWithQuotes && (
              <div className="rounded-2xl bg-secondary/55 border border-border/60 p-5 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground">
                  <Search className="size-3.5 text-muted-foreground shrink-0" />
                  <span>EXPERT TIP</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We recommend checking the professional&apos;s portfolio and
                  reviews before accepting a quote.
                </p>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
