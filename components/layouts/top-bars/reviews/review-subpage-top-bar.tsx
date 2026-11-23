"use client";

import { ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";
import type { ReviewSubpageTopBarProps } from "../types";

export type { ReviewSubpageTopBarProps } from "../types";

export function ReviewSubpageTopBar({
  title,
  backLabel,
  onBack,
  actionLabel,
  onAction,
  actionDisabled = false,
  onMenuClick,
  className,
}: ReviewSubpageTopBarProps) {
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
            <Menu className="size-5" />
          </button>
        )}

        <div className="min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5 shrink-0" />
            <span className="truncate">{backLabel}</span>
          </button>

          <h1 className="text-sm sm:text-lg font-extrabold text-foreground tracking-tight truncate leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {actionLabel && onAction && (
        <div className="hidden sm:flex items-center shrink-0 ml-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={actionDisabled}
            onClick={onAction}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ReviewSubpageTopBar;
