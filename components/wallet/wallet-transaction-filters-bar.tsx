"use client";

import { Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput, Select } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import {
  WALLET_DATE_RANGE_OPTIONS,
  WALLET_TRANSACTION_STATUS_OPTIONS,
  WALLET_TRANSACTION_TYPE_OPTIONS,
} from "@/features/wallet/data";
import type { WalletTransactionFiltersBarProps } from "./types";

export function WalletTransactionFiltersBar({
  filters,
  onDateRangeChange,
  onTypeChange,
  onStatusChange,
  onSearchChange,
  onExportCsv,
  className,
}: WalletTransactionFiltersBarProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-2xs",
        className
      )}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
        {/* Date Range */}
        <div className="lg:col-span-3 space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            DATE RANGE
          </label>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground z-10" />
            <Select
              value={filters.dateRange}
              onChange={(val) => onDateRangeChange(val)}
              options={WALLET_DATE_RANGE_OPTIONS}
              className="h-9 pl-8 text-xs"
            />
          </div>
        </div>

        {/* Type */}
        <div className="lg:col-span-2 space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            TYPE
          </label>
          <Select
            value={filters.type}
            onChange={(val) => onTypeChange(val)}
            options={WALLET_TRANSACTION_TYPE_OPTIONS}
            className="h-9 text-xs"
          />
        </div>

        {/* Status */}
        <div className="lg:col-span-2 space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            STATUS
          </label>
          <Select
            value={filters.status}
            onChange={(val) => onStatusChange(val)}
            options={WALLET_TRANSACTION_STATUS_OPTIONS}
            className="h-9 text-xs"
          />
        </div>

        {/* Search */}
        <div className="lg:col-span-3 space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            SEARCH
          </label>
          <SearchInput
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by description or reference..."
            className="h-9 text-xs"
          />
        </div>

        {/* Export CSV */}
        <div className="lg:col-span-2">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onExportCsv}
            leadingIcon={<Download className="size-3.5" />}
            className="w-full h-9 rounded-lg text-xs font-bold shadow-xs"
          >
            Export CSV
          </Button>
        </div>
      </div>
    </div>
  );
}
