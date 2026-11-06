"use client";

import { ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDashboardMobileMenu } from "../../../providers/dashboard-top-bar-context";

export interface RequestFormTopBarProps {
  title: string;
  backLabel?: string;
  onBack: () => void;
  onSecondaryAction?: () => void;
  secondaryActionLabel?: string;
  primaryActionLabel: string;
  onPrimaryAction: () => void;
  onMenuClick?: () => void;
  showUtilities?: boolean;
  className?: string;
}

export function RequestFormTopBar({
  title,
  backLabel = "Back to Requests",
  onBack,
  onSecondaryAction,
  secondaryActionLabel,
  primaryActionLabel,
  onPrimaryAction,
  onMenuClick,
  className,
}: RequestFormTopBarProps) {
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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="size-3.5" />
          <span className="hidden sm:inline">{backLabel}</span>
          <span className="sm:hidden">Back</span>
        </button>

        <span aria-hidden="true" className="h-4 w-px bg-border shrink-0" />

        <h1 className="text-base sm:text-lg font-bold text-foreground tracking-tight truncate">
          {title}
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-2.5 sm:gap-3 shrink-0 ml-auto">
        {onSecondaryAction && secondaryActionLabel && (
          <button
            type="button"
            onClick={onSecondaryAction}
            className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {secondaryActionLabel}
          </button>
        )}

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onPrimaryAction}
          className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
        >
          {primaryActionLabel}
        </Button>
      </div>
    </div>
  );
}

export default RequestFormTopBar;

