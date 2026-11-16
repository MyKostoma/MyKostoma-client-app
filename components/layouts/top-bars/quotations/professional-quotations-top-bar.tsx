"use client";

import {
  Archive,
  ArrowLeft,
  Ban,
  Download,
  ExternalLink,
  History,
  Menu,
  MessageSquare,
  Plus,
  SquarePen,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";
import type { ProfessionalQuotationStatus } from "@/components/quotations/types";

export interface ProfessionalQuotationsListTopBarProps {
  onCreateNewQuote?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export function ProfessionalQuotationsListTopBar({
  onCreateNewQuote,
  onMenuClick,
  className,
}: ProfessionalQuotationsListTopBarProps) {
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;

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

        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground truncate">
            Quotations
          </h1>
          <p className="hidden sm:block text-xs text-muted-foreground truncate">
            Manage and track your professional service estimates.
          </p>
        </div>
      </div>

      {onCreateNewQuote && (
        <div className="hidden sm:flex items-center shrink-0 ml-auto">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onCreateNewQuote}
            leadingIcon={<Plus className="size-4" />}
            className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
          >
            Create New Quote
          </Button>
        </div>
      )}
    </div>
  );
}

export interface ProfessionalQuotationDetailTopBarProps {
  status: ProfessionalQuotationStatus;
  orderCode?: string;
  onBackToQuotations: () => void;
  onViewHistory?: () => void;
  onCancelQuote?: () => void;
  onUpdateQuote?: () => void;
  onMessageConsumer?: () => void;
  onGoToOrder?: () => void;
  onArchiveQuote?: () => void;
  onViewOtherRequests?: () => void;
  onDownloadReceipt?: () => void;
  onViewReview?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export function ProfessionalQuotationDetailTopBar({
  status,
  orderCode = "ORD-5521",
  onBackToQuotations,
  onViewHistory,
  onCancelQuote,
  onUpdateQuote,
  onMessageConsumer,
  onGoToOrder,
  onArchiveQuote,
  onViewOtherRequests,
  onDownloadReceipt,
  onViewReview,
  onMenuClick,
  className,
}: ProfessionalQuotationDetailTopBarProps) {
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;

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
          onClick={onBackToQuotations}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Quotations</span>
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-2.5 shrink-0 ml-auto">
        {status === "pending" && (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onViewHistory}
              leadingIcon={<History className="size-3.5" />}
              className="h-9 px-3.5 rounded-lg text-xs font-semibold"
            >
              View History
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancelQuote}
              leadingIcon={<Ban className="size-3.5 text-error" />}
              className="h-9 px-3.5 rounded-lg text-xs font-semibold text-error border-border hover:bg-error-bg/50 hover:text-error"
            >
              Cancel Quote
            </Button>

            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onUpdateQuote}
              leadingIcon={<SquarePen className="size-3.5" />}
              className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
            >
              Update Quote
            </Button>
          </>
        )}

        {status === "approved" && (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onMessageConsumer}
              leadingIcon={<MessageSquare className="size-3.5" />}
              className="h-9 px-3.5 rounded-lg text-xs font-semibold"
            >
              Message Consumer
            </Button>

            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onGoToOrder}
              trailingIcon={<ExternalLink className="size-3.5" />}
              className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
            >
              Go to Order #{orderCode}
            </Button>
          </>
        )}

        {status === "rejected" && (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onArchiveQuote}
              leadingIcon={<Archive className="size-3.5" />}
              className="h-9 px-3.5 rounded-lg text-xs font-semibold"
            >
              Archive Quote
            </Button>

            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onViewOtherRequests}
              className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
            >
              View Other Requests
            </Button>
          </>
        )}

        {status === "completed" && (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onDownloadReceipt}
              leadingIcon={<Download className="size-3.5" />}
              className="h-9 px-3.5 rounded-lg text-xs font-semibold"
            >
              Download Receipt
            </Button>

            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onViewReview}
              leadingIcon={<Star className="size-3.5 fill-current" />}
              className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
            >
              View Review
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export interface ProfessionalQuotationSubpageTopBarProps {
  backLabel?: string;
  onBack: () => void;
  rightBadgeLabel?: string;
  onMenuClick?: () => void;
  className?: string;
}

export function ProfessionalQuotationSubpageTopBar({
  backLabel = "Back to Quote Detail",
  onBack,
  rightBadgeLabel,
  onMenuClick,
  className,
}: ProfessionalQuotationSubpageTopBarProps) {
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;

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
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="size-4" />
          <span>{backLabel}</span>
        </button>
      </div>

      {rightBadgeLabel && (
        <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-[11px] font-bold uppercase tracking-wider shrink-0">
          {rightBadgeLabel}
        </span>
      )}
    </div>
  );
}
