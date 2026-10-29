"use client";

import { ChevronLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SearchEmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  popularSearchesTitle?: string;
  popularSearches?: string[];
  onClearFilters?: () => void;
  onBackToBrowse?: () => void;
  onPopularSearchSelect?: (term: string) => void;
}

export const DEFAULT_POPULAR_SEARCHES = [
  "Top Plumbers",
  "Electricians",
  "AC Repair",
  "Cleaning Services",
  "Carpenters",
];

export function SearchEmptyState({
  title = "No professionals found",
  description = "We couldn't find any professionals matching your current search criteria. Try adjusting your filters or search for something else.",
  popularSearchesTitle = "POPULAR SEARCHES IN LAGOS",
  popularSearches = DEFAULT_POPULAR_SEARCHES,
  onClearFilters,
  onBackToBrowse,
  onPopularSearchSelect,
  className,
  ...props
}: SearchEmptyStateProps) {
  return (
    <div
      className={cn(
        "w-full py-12 sm:py-16 px-4 flex flex-col items-center text-center max-w-xl mx-auto",
        className
      )}
      {...props}
    >
      {/* Layered Circular Illustration */}
      <div className="relative size-40 sm:size-44 rounded-full bg-accent/60 flex items-center justify-center mb-8 select-none">
        <div className="size-32 sm:size-36 rounded-full bg-primary/10 flex items-center justify-center relative">
          {/* Decorative Floating Dots */}
          <span
            aria-hidden="true"
            className="absolute top-3 left-4 size-2.5 rounded-full bg-chart-5/40"
          />
          <span
            aria-hidden="true"
            className="absolute right-3 top-1/2 -translate-y-1/2 size-2 rounded-full bg-info/40"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-5 size-4 rounded-full bg-primary/30"
          />

          {/* Center Search Card */}
          <div className="size-16 sm:size-18 rounded-2xl bg-card border border-border/60 shadow-md flex items-center justify-center text-foreground">
            <Search className="size-7 stroke-[2.2]" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h2>

      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mt-2.5">
        {description}
      </p>

      {/* Primary & Secondary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
        <Button
          variant="default"
          size="default"
          onClick={onClearFilters}
          className="h-11 px-6 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm"
        >
          CLEAR ALL FILTERS
        </Button>

        <Button
          variant="outline"
          size="default"
          onClick={onBackToBrowse}
          leadingIcon={<ChevronLeft className="size-4" />}
          className="h-11 px-6 text-xs font-bold uppercase tracking-wider rounded-xl"
        >
          BACK TO BROWSE
        </Button>
      </div>

      {/* Divider + Popular Searches */}
      {popularSearches && popularSearches.length > 0 && (
        <div className="w-full pt-10 mt-10 border-t border-border/70 space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {popularSearchesTitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => onPopularSearchSelect?.(term)}
                className="px-4 py-1.5 rounded-full border border-border bg-card hover:bg-accent hover:border-primary/30 text-xs font-medium text-foreground hover:text-primary transition-all shadow-2xs cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
