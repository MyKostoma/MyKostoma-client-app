"use client";

import { useState } from "react";
import { Download, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox, SearchInput, Select } from "@/components/ui/form-fields";
import type {
  DisputeDateRangeFilter,
  DisputeStatus,
  DisputesToolbarProps,
} from "./types";

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "open", label: "Open" },
  { value: "under-review", label: "Under Review" },
  { value: "resolved", label: "Resolved" },
  { value: "archived", label: "Archived" },
];

const DATE_RANGE_OPTIONS = [
  { value: "all", label: "All Time" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
];

export function DisputesToolbar({
  searchQuery,
  statusFilter,
  dateRangeFilter,
  includeArchived,
  hasActiveFilters,
  onSearchChange,
  onStatusFilterChange,
  onDateRangeFilterChange,
  onIncludeArchivedChange,
  onResetFilters,
  onExportCsv,
}: DisputesToolbarProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="w-full sm:max-w-sm">
          <SearchInput
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search disputes..."
            aria-label="Search disputes"
            className="rounded-xl"
          />
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <Button
            type="button"
            variant={filtersOpen || hasActiveFilters ? "secondary" : "outline"}
            size="sm"
            onClick={() => setFiltersOpen((prev) => !prev)}
            className="h-10 px-4 rounded-xl text-xs font-semibold gap-2"
          >
            <SlidersHorizontal className="size-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="size-2 rounded-full bg-primary" />
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onExportCsv}
            className="h-10 px-4 rounded-xl text-xs font-semibold gap-2"
          >
            <Download className="size-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {filtersOpen && (
        <div className="rounded-2xl border border-border bg-card p-4 flex flex-col lg:flex-row lg:items-end justify-between gap-4 shadow-2xs animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Status
              </label>
              <Select
                value={statusFilter}
                onChange={(val) =>
                  onStatusFilterChange(val as "all" | DisputeStatus)
                }
                options={STATUS_OPTIONS}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Date Raised
              </label>
              <Select
                value={dateRangeFilter}
                onChange={(val) =>
                  onDateRangeFilterChange(val as DisputeDateRangeFilter)
                }
                options={DATE_RANGE_OPTIONS}
              />
            </div>

            <div className="flex items-center sm:pb-2.5">
              <Checkbox
                checked={includeArchived}
                onCheckedChange={onIncludeArchivedChange}
                label="Include archived disputes"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="h-9 px-3 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground gap-1.5 self-start lg:self-end"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
