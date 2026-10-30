"use client";

import * as React from "react";
import {
  BadgeCheck,
  Star,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Layers,
  MapPin,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox, Select, type SelectOption } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type {
  SearchFilterCategoryOption,
  SearchFilterState,
  VerificationType,
} from "./types";

export interface RatingFilterOption {
  value: number;
  label: string;
  starsCount?: number;
}

export interface SearchFiltersSidebarProps
  extends React.HTMLAttributes<HTMLElement> {
  categoryOptions: SearchFilterCategoryOption[];
  locationOptions: SelectOption[];
  ratingOptions?: RatingFilterOption[];
  filters: SearchFilterState;
  onToggleCategory: (categoryId: string) => void;
  onLocationChange: (location: string) => void;
  onToggleVerification: (verification: VerificationType) => void;
  onToggleRating: (rating: number) => void;
  onResetFilters: () => void;
  showStarsRow?: boolean;
  onClose?: () => void;
  onApply?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const DEFAULT_RATING_OPTIONS: RatingFilterOption[] = [
  { value: 1.0, label: "1.0 & Above", starsCount: 1 },
  { value: 2.0, label: "2.0 & Above", starsCount: 2 },
  { value: 3.0, label: "3.0 & Above", starsCount: 3 },
  { value: 4.0, label: "4.0 & Above", starsCount: 4 },
  { value: 4.5, label: "4.5 & Above", starsCount: 5 },
];

export function SearchFiltersSidebar({
  categoryOptions,
  locationOptions,
  ratingOptions = DEFAULT_RATING_OPTIONS,
  filters,
  onToggleCategory,
  onLocationChange,
  onToggleVerification,
  onToggleRating,
  onResetFilters,
  showStarsRow = false,
  onClose,
  onApply,
  isCollapsed = false,
  onToggleCollapse,
  className,
  ...props
}: SearchFiltersSidebarProps) {
  const activeCount = React.useMemo(() => {
    let count = 0;
    count += filters.categories.length;
    if (filters.location && filters.location !== "all") count += 1;
    count += filters.verifications.length;
    if (filters.minRating !== null) count += 1;
    return count;
  }, [filters]);

  // Collapsed slim rail UI for desktop
  if (isCollapsed) {
    return (
      <aside
        aria-label="Search filters (collapsed)"
        className={cn(
          "w-16 shrink-0 rounded-2xl border border-border bg-card p-3 shadow-2xs self-start flex flex-col items-center gap-3 transition-all duration-300",
          className
        )}
        {...props}
      >
        {/* Expand Sidebar Button */}
        <button
          type="button"
          onClick={onToggleCollapse}
          title="Expand filters"
          aria-label="Expand filters"
          className="size-10 rounded-xl border border-border bg-secondary/70 hover:bg-secondary hover:border-primary/50 text-foreground flex items-center justify-center transition-all cursor-pointer group shadow-2xs relative"
        >
          <PanelLeftOpen className="size-4.5 text-muted-foreground group-hover:text-primary transition-colors" />
          {activeCount > 0 && (
            <span
              title={`${activeCount} active filters`}
              className="absolute -top-1 -right-1 size-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center shadow-xs"
            >
              {activeCount}
            </span>
          )}
        </button>

        <div className="w-8 border-t border-border/70 my-0.5" />

        {/* Categories Icon */}
        <button
          type="button"
          onClick={onToggleCollapse}
          title={`Categories (${filters.categories.length} selected)`}
          aria-label="Categories filter"
          className={cn(
            "relative size-9 rounded-xl flex items-center justify-center transition-all cursor-pointer",
            filters.categories.length > 0
              ? "bg-primary/10 text-primary font-bold shadow-2xs"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
          )}
        >
          <Layers className="size-4" />
          {filters.categories.length > 0 && (
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
          )}
        </button>

        {/* Location Icon */}
        <button
          type="button"
          onClick={onToggleCollapse}
          title={`Location: ${filters.location !== "all" ? filters.location : "All Locations"}`}
          aria-label="Location filter"
          className={cn(
            "relative size-9 rounded-xl flex items-center justify-center transition-all cursor-pointer",
            filters.location !== "all"
              ? "bg-primary/10 text-primary font-bold shadow-2xs"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
          )}
        >
          <MapPin className="size-4" />
          {filters.location !== "all" && (
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
          )}
        </button>

        {/* Verification Icon */}
        <button
          type="button"
          onClick={onToggleCollapse}
          title={`Verification (${filters.verifications.length} selected)`}
          aria-label="Verification filter"
          className={cn(
            "relative size-9 rounded-xl flex items-center justify-center transition-all cursor-pointer",
            filters.verifications.length > 0
              ? "bg-primary/10 text-primary font-bold shadow-2xs"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
          )}
        >
          <BadgeCheck className="size-4" />
          {filters.verifications.length > 0 && (
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
          )}
        </button>

        {/* Rating Icon */}
        <button
          type="button"
          onClick={onToggleCollapse}
          title={`Rating: ${filters.minRating ? `${filters.minRating}+ stars` : "Any"}`}
          aria-label="Rating filter"
          className={cn(
            "relative size-9 rounded-xl flex items-center justify-center transition-all cursor-pointer",
            filters.minRating !== null
              ? "bg-warning/15 text-warning font-bold shadow-2xs"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
          )}
        >
          <Star className="size-4" />
          {filters.minRating !== null && (
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-warning" />
          )}
        </button>

        {/* Reset button in collapsed view if any active */}
        {activeCount > 0 && (
          <>
            <div className="w-8 border-t border-border/70 my-0.5" />
            <button
              type="button"
              onClick={onResetFilters}
              title="Reset all filters"
              aria-label="Reset all filters"
              className="size-9 rounded-xl text-muted-foreground hover:text-error hover:bg-error/10 flex items-center justify-center transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
            </button>
          </>
        )}
      </aside>
    );
  }

  // Normal / Expanded UI
  return (
    <aside
      aria-label="Search filters"
      className={cn(
        "w-full lg:w-68 xl:w-72 shrink-0 rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-6 shadow-2xs self-start transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Header Row: Filters + CLEAR ALL (+ Collapse icon / Close icon) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-foreground tracking-tight">
            Filters
          </h2>
          {activeCount > 0 && (
            <span className="size-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              {activeCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onResetFilters}
            className="text-[11px] font-bold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors cursor-pointer"
          >
            CLEAR ALL
          </button>

          {/* Desktop Collapse Icon Button */}
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              title="Collapse filters"
              aria-label="Collapse filters sidebar"
              className="size-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <PanelLeftClose className="size-4" />
            </button>
          )}

          {/* Mobile Drawer Close Button */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="size-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Group */}
      <div className="space-y-3">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          CATEGORY
        </h3>
        <div className="flex flex-col gap-2.5">
          {categoryOptions.map((cat) => {
            const isChecked = filters.categories.includes(cat.id);
            return (
              <Checkbox
                key={cat.id}
                id={`filter-cat-${cat.id}`}
                checked={isChecked}
                onCheckedChange={() => onToggleCategory(cat.id)}
                label={
                  <span
                    className={cn(
                      "text-xs sm:text-sm",
                      isChecked
                        ? "font-semibold text-foreground"
                        : "font-normal text-muted-foreground"
                    )}
                  >
                    {cat.label}
                  </span>
                }
              />
            );
          })}
        </div>
      </div>

      {/* Location Filter Group */}
      <div className="space-y-2.5">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          LOCATION
        </h3>
        <Select
          options={locationOptions}
          value={filters.location}
          onChange={onLocationChange}
          placeholder="Select location"
          className="h-10 text-xs sm:text-sm bg-secondary/50"
        />
      </div>

      {/* Verification Filter Group */}
      <div className="space-y-3">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          VERIFICATION
        </h3>
        <div className="flex flex-col gap-2.5">
          <Checkbox
            id="filter-verify-company"
            checked={filters.verifications.includes("company")}
            onCheckedChange={() => onToggleVerification("company")}
            label={
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                <BadgeCheck className="size-4 text-info fill-info/15 shrink-0" />
                <span
                  className={cn(
                    filters.verifications.includes("company") &&
                      "font-semibold text-foreground"
                  )}
                >
                  Company Verified
                </span>
              </span>
            }
          />

          <Checkbox
            id="filter-verify-individual"
            checked={filters.verifications.includes("individual")}
            onCheckedChange={() => onToggleVerification("individual")}
            label={
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                <BadgeCheck className="size-4 text-warning fill-warning/15 shrink-0" />
                <span
                  className={cn(
                    filters.verifications.includes("individual") &&
                      "font-semibold text-foreground"
                  )}
                >
                  Individual Verified
                </span>
              </span>
            }
          />
        </div>
      </div>

      {/* Rating Filter Group */}
      <div className="space-y-3">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          RATING
        </h3>
        <div className="flex flex-col gap-2.5">
          {ratingOptions.map((opt) => {
            const isChecked = filters.minRating === opt.value;
            return (
              <Checkbox
                key={opt.value}
                id={`filter-rating-${opt.value}`}
                checked={isChecked}
                onCheckedChange={() => onToggleRating(opt.value)}
                label={
                  showStarsRow ? (
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                      <span className="inline-flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={cn(
                              "size-3.5",
                              idx < (opt.starsCount ?? Math.floor(opt.value))
                                ? "text-warning fill-warning"
                                : "text-border fill-border"
                            )}
                          />
                        ))}
                      </span>
                      <span
                        className={cn(
                          isChecked
                            ? "font-bold text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {opt.label}
                      </span>
                    </span>
                  ) : (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs sm:text-sm",
                        isChecked
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <span>{opt.label}</span>
                      <Star className="size-3.5 text-warning fill-warning shrink-0" />
                    </span>
                  )
                }
              />
            );
          })}
        </div>
      </div>

      {/* Reset & Apply Filters Buttons */}
      <div className="space-y-2 pt-1">
        {onClose && (
          <Button
            variant="default"
            size="default"
            onClick={onApply ?? onClose}
            className="w-full h-10 text-xs font-bold uppercase tracking-wider rounded-lg shadow-2xs"
          >
            APPLY FILTERS
          </Button>
        )}
        <Button
          variant="secondary"
          size="default"
          onClick={onResetFilters}
          className="w-full h-10 text-xs font-bold uppercase tracking-wider rounded-lg"
        >
          RESET FILTERS
        </Button>
      </div>
    </aside>
  );
}

export default SearchFiltersSidebar;
