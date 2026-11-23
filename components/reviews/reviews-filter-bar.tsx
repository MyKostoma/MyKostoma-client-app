"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, Select } from "@/components/ui/form-fields";
import type {
  ReviewRatingFilter,
  ReviewResponseStatusFilter,
  ReviewSortOption,
  ReviewsFilterBarProps,
} from "./types";

const RATING_OPTIONS = [
  { value: "all", label: "All Ratings" },
  { value: "5", label: "5 Stars Only" },
  { value: "4", label: "4 Stars Only" },
  { value: "3", label: "3 Stars Only" },
  { value: "2-below", label: "2 Stars & Below" },
];

const RESPONSE_STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "unresponded", label: "Needs Response" },
  { value: "responded", label: "Responded" },
  { value: "requires-attention", label: "Requires Attention" },
];

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "highest", label: "Highest Rated" },
  { value: "lowest", label: "Lowest Rated" },
];

export function ReviewsFilterBar({
  isOpen,
  ratingFilter,
  responseStatusFilter,
  sortBy,
  activeFilterCount,
  showResponseStatusFilter = true,
  onRatingChange,
  onResponseStatusChange,
  onSortChange,
  onResetFilters,
}: ReviewsFilterBarProps) {
  if (!isOpen && activeFilterCount === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
        <FormField id="reviews-filter-rating" label="Star Rating">
          <Select
            id="reviews-filter-rating"
            value={ratingFilter}
            onChange={(value) => onRatingChange(value as ReviewRatingFilter)}
            options={RATING_OPTIONS}
          />
        </FormField>

        {showResponseStatusFilter && (
          <FormField id="reviews-filter-status" label="Response Status">
            <Select
              id="reviews-filter-status"
              value={responseStatusFilter}
              onChange={(value) =>
                onResponseStatusChange(value as ReviewResponseStatusFilter)
              }
              options={RESPONSE_STATUS_OPTIONS}
            />
          </FormField>
        )}

        <FormField id="reviews-filter-sort" label="Sort Order">
          <Select
            id="reviews-filter-sort"
            value={sortBy}
            onChange={(value) => onSortChange(value as ReviewSortOption)}
            options={SORT_OPTIONS}
          />
        </FormField>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={activeFilterCount === 0}
            onClick={onResetFilters}
            leadingIcon={<RotateCcw className="size-3.5" />}
            className="h-10 px-4 rounded-lg text-xs font-semibold w-full sm:w-auto"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
