"use client";

import { AlertTriangle, FileQuestion, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface RequestsLoadingSkeletonProps {
  rows?: number;
  className?: string;
}

export function RequestsLoadingSkeleton({
  rows = 2,
  className,
}: RequestsLoadingSkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading requests"
      className={cn(
        "w-full rounded-2xl border border-border bg-card overflow-hidden shadow-2xs",
        className
      )}
    >
      {/* Skeleton Header Bar */}
      <div className="bg-secondary/40 border-b border-border px-6 py-4 grid grid-cols-3 gap-4">
        <div className="h-3 rounded-md bg-secondary-hover animate-pulse" />
        <div className="h-3 rounded-md bg-secondary-hover animate-pulse" />
        <div className="h-3 rounded-md bg-secondary-hover animate-pulse" />
      </div>

      {/* Skeleton Rows */}
      <div className="divide-y divide-border/70">
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            className="px-6 py-5 flex items-center justify-between gap-4"
          >
            <div className="space-y-2.5 flex-1 max-w-md">
              <div className="h-3.5 w-3/4 rounded-md bg-secondary animate-pulse" />
              <div className="h-2.5 w-1/2 rounded-md bg-secondary/70 animate-pulse" />
            </div>

            <div className="h-8 w-24 rounded-lg bg-secondary animate-pulse shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

export interface RequestsErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function RequestsErrorState({
  title = "Failed to load requests",
  description = "We encountered a technical issue while fetching your data. Please check your connection or try again.",
  onRetry,
  className,
}: RequestsErrorStateProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-border bg-card p-10 sm:p-14 flex flex-col items-center justify-center text-center shadow-2xs",
        className
      )}
    >
      <div className="size-12 rounded-full bg-secondary text-muted-foreground flex items-center justify-center mb-4">
        <AlertTriangle className="size-5" />
      </div>

      <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
        {title}
      </h3>

      <p className="text-xs text-muted-foreground max-w-sm mt-1.5 leading-relaxed">
        {description}
      </p>

      <Button
        type="button"
        variant="default"
        size="sm"
        onClick={onRetry}
        leadingIcon={<RefreshCw className="size-3.5" />}
        className="h-9 px-5 rounded-lg text-xs font-semibold mt-5 shadow-xs"
      >
        Try Again
      </Button>
    </div>
  );
}

export interface QuotesEmptyStateCardProps {
  showHeader?: boolean;
  onEditRequest?: () => void;
  onPromoteRequest?: () => void;
  className?: string;
}

export function QuotesEmptyStateCard({
  showHeader = true,
  onEditRequest,
  onPromoteRequest,
  className,
}: QuotesEmptyStateCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-border bg-card overflow-hidden shadow-2xs",
        className
      )}
    >
      {showHeader && (
        <div className="px-6 py-4 border-b border-border/70 flex items-center gap-2.5">
          <h3 className="text-sm font-bold text-foreground tracking-tight">
            Quotes Received
          </h3>
          <span className="px-2.5 py-0.5 rounded-full border border-border text-[10px] font-semibold text-muted-foreground">
            0 Total
          </span>
        </div>
      )}

      <div className="p-10 sm:p-12 flex flex-col items-center justify-center text-center">
        <div className="size-12 rounded-full bg-secondary text-muted-foreground flex items-center justify-center mb-4">
          <FileQuestion className="size-5" />
        </div>

        <h4 className="text-sm font-bold text-foreground tracking-tight">
          No quotes received yet
        </h4>

        <p className="text-xs text-muted-foreground max-w-sm mt-1.5 leading-relaxed">
          Professionals will provide quotes based on your request details.
          You&apos;ll be notified as soon as someone submits a proposal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onEditRequest}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Edit Request
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onPromoteRequest}
            className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
          >
            Promote Request
          </Button>
        </div>
      </div>
    </div>
  );
}
