"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReviewsPaginationProps } from "./types";

export function ReviewsPagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  itemNoun = "reviews",
  onPageChange,
}: ReviewsPaginationProps) {
  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
      <p className="text-xs text-muted-foreground">
        Showing {startIndex}–{endIndex} of {totalItems} {itemNoun}
      </p>

      <div className="flex items-center gap-1.5 flex-wrap">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="h-8 px-3 rounded-lg text-xs font-semibold"
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => onPageChange(pageNum)}
              className={cn(
                "size-8 rounded-lg border text-xs font-bold flex items-center justify-center transition-colors cursor-pointer",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                  : "border-border bg-card text-foreground hover:bg-secondary"
              )}
            >
              {pageNum}
            </button>
          );
        })}

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="h-8 px-3 rounded-lg text-xs font-semibold"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
