"use client";

import { ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  QuotationStatusBadge,
  type QuotationStatus,
} from "@/components/quotations";
import { cn } from "@/lib/utils";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";

export interface QuotationDetailTopBarProps {
  quoteCode: string;
  status: QuotationStatus;
  versionBadge?: string;
  onBackToQuotes: () => void;
  onCompare?: () => void;
  onRequestUpdate?: () => void;
  onAcceptQuote?: () => void;
  canManage?: boolean;
  onMenuClick?: () => void;
  className?: string;
}

export function QuotationDetailTopBar({
  quoteCode,
  status,
  versionBadge,
  onBackToQuotes,
  onCompare,
  onRequestUpdate,
  onAcceptQuote,
  canManage = true,
  onMenuClick,
  className,
}: QuotationDetailTopBarProps) {
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;
  const isUpdated = status === "updated";

  return (
    <div
      className={cn(
        "h-16 px-4 md:px-6 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-xs select-none sticky top-0 z-20 shrink-0 gap-3",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {effectiveMenuClick && (
          <button
            type="button"
            onClick={effectiveMenuClick}
            aria-label="Open mobile menu"
            className="lg:hidden p-2 -ml-1 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer shrink-0"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <button
          type="button"
          onClick={onBackToQuotes}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="size-3.5" />
          <span className="hidden sm:inline">My Quotes</span>
          <span className="sm:hidden">Back</span>
        </button>

        <span aria-hidden="true" className="h-4 w-px bg-border shrink-0" />

        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-sm sm:text-base font-bold text-foreground tracking-tight truncate">
            {isUpdated ? "Updated Quote" : `Quote #${quoteCode}`}
          </h1>
          <QuotationStatusBadge
            status={status}
            variant="detail"
            customLabel={isUpdated ? versionBadge || "REVISED (V3)" : undefined}
            className="hidden md:inline-flex"
          />
        </div>
      </div>

      {canManage && (
        <div className="hidden sm:flex items-center gap-2.5 shrink-0 ml-auto">
          {onCompare && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCompare}
              className="h-9 px-3.5 rounded-lg text-xs font-semibold"
            >
              {isUpdated ? "Compare All" : "Compare"}
            </Button>
          )}

          {onRequestUpdate && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRequestUpdate}
              className="h-9 px-3.5 rounded-lg text-xs font-semibold"
            >
              {isUpdated ? "Request Change" : "Request Update"}
            </Button>
          )}

          {onAcceptQuote && (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onAcceptQuote}
              className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
            >
              {isUpdated ? "Accept Latest Quote" : "Accept Quote"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default QuotationDetailTopBar;

