"use client";

import * as React from "react";
import { BadgeCheck, Star } from "lucide-react";
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
  className,
  ...props
}: SearchFiltersSidebarProps) {
  return (
    <aside
      aria-label="Search filters"
      className={cn(
        "w-full lg:w-68 xl:w-72 shrink-0 rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-6 shadow-2xs self-start",
        className
      )}
      {...props}
    >
      {/* Header Row: Filters + CLEAR ALL */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground tracking-tight">
          Filters
        </h2>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-[11px] font-bold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors cursor-pointer"
        >
          CLEAR ALL
        </button>
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

      {/* Reset Filters Button */}
      <Button
        variant="secondary"
        size="default"
        onClick={onResetFilters}
        className="w-full h-10 text-xs font-bold uppercase tracking-wider rounded-lg"
      >
        RESET FILTERS
      </Button>
    </aside>
  );
}
