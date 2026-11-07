"use client";

import { Menu, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";
import type { OrdersListTopBarProps } from "../types";

export type { OrdersListTopBarProps } from "../types";

export function OrdersListTopBar({
  totalCountLabel = "8 Total",
  searchQuery,
  onSearchChange,
  onToggleFilters,
  onMenuClick,
  className,
}: OrdersListTopBarProps) {
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

        <div className="flex items-center gap-2.5 min-w-0">
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground truncate">
            My Orders
          </h1>
          <span className="px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px] font-bold tracking-wider select-none shrink-0">
            {totalCountLabel}
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2.5 sm:gap-3 shrink-0 ml-auto">
        <div className="w-48 lg:w-64">
          <SearchInput
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search orders..."
            className="h-9 text-xs bg-secondary/40"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onToggleFilters}
          leadingIcon={<SlidersHorizontal className="size-3.5" />}
          className="h-9 px-3.5 rounded-lg text-xs font-semibold shrink-0"
        >
          Filters
        </Button>
      </div>
    </div>
  );
}

export default OrdersListTopBar;

