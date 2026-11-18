"use client";

import Link from "next/link";
import { ArrowLeft, Bell, ChevronDown, Menu } from "lucide-react";
import { SearchInput } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";

export interface ProfessionalOrdersListTopBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onMenuClick?: () => void;
  className?: string;
}

export function ProfessionalOrdersListTopBar({
  searchQuery,
  onSearchChange,
  onMenuClick,
  className,
}: ProfessionalOrdersListTopBarProps) {
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;

  return (
    <div
      className={cn(
        "h-16 px-4 md:px-6 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-xs select-none sticky top-0 z-20 shrink-0 gap-3",
        className
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
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

        <div className="hidden sm:block w-full max-w-sm">
          <SearchInput
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search orders, clients, or services..."
            className="h-9 text-xs bg-secondary/40"
          />
        </div>
        <h1 className="sm:hidden text-base font-bold text-foreground truncate">
          Orders
        </h1>
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-auto">
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative size-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
            3
          </span>
        </Link>

        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <span>English</span>
          <ChevronDown className="size-3.5" />
        </span>
      </div>
    </div>
  );
}

export interface ProfessionalOrderSubpageTopBarProps {
  backLabel: string;
  onBack: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export function ProfessionalOrderSubpageTopBar({
  backLabel,
  onBack,
  onMenuClick,
  className,
}: ProfessionalOrderSubpageTopBarProps) {
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

      <div className="flex items-center gap-3 shrink-0 ml-auto">
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative size-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
            3
          </span>
        </Link>

        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <span>English</span>
          <ChevronDown className="size-3.5" />
        </span>
      </div>
    </div>
  );
}
