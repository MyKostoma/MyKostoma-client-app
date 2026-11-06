"use client";

import * as React from "react";
import { ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDashboardMobileMenu } from "./dashboard-top-bar-context";
import { TopBarUtilities } from "./top-bar-utilities";

export interface RequestDetailTopBarProps {
  requestCode: string;
  onBackToRequests: () => void;
  onEditRequest?: () => void;
  onCloseRequest?: () => void;
  canClose?: boolean;
  onMenuClick?: () => void;
  showUtilities?: boolean;
  className?: string;
}

/**
 * Top bar header component for the Request Detail page.
 */
export function RequestDetailTopBar({
  requestCode,
  onBackToRequests,
  onEditRequest,
  onCloseRequest,
  canClose = true,
  onMenuClick,
  className,
}: RequestDetailTopBarProps) {
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;

  return (
    <div
      className={cn(
        "h-16 px-4 md:px-6 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-xs select-none sticky top-0 z-20 shrink-0 gap-3",
        className
      )}
    >
      {/* Left: Mobile Menu + Back to Requests + Request Code */}
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
          onClick={onBackToRequests}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="size-3.5" />
          <span className="hidden sm:inline">Back to Requests</span>
          <span className="sm:hidden">Back</span>
        </button>

        <span aria-hidden="true" className="h-4 w-px bg-border shrink-0" />

        <span className="text-xs sm:text-sm font-bold text-foreground tracking-tight truncate">
          {requestCode}
        </span>
      </div>

      {/* Right: Close Request + Edit Request Actions + Utilities */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 ml-auto">
        {canClose && onCloseRequest && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCloseRequest}
            className="h-9 px-3.5 sm:px-4 rounded-lg text-xs font-semibold"
          >
            Close Request
          </Button>
        )}

        {onEditRequest && (
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onEditRequest}
            className="h-9 px-3.5 sm:px-4 rounded-lg text-xs font-semibold shadow-xs"
          >
            Edit Request
          </Button>
        )}
      </div>
    </div>
  );
}

export default RequestDetailTopBar;

