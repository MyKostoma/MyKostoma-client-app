"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WalletPaginationBarProps } from "./types";

export function WalletPaginationBar({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
  className,
}: WalletPaginationBarProps) {
  const visiblePages = [1, 2, 3];
  const showLastPage = totalPages > 3;

  return (
    <div
      className={cn(
        "px-5 sm:px-6 py-4 border-t border-border/70 bg-card flex flex-col sm:flex-row items-center justify-between gap-3 text-xs",
        className
      )}
    >
      <p className="text-muted-foreground">
        Showing{" "}
        <span className="font-bold text-foreground">
          {startIndex} - {endIndex}
        </span>{" "}
        of <span className="font-bold text-foreground">{totalItems}</span>{" "}
        transactions
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          aria-label="Previous page"
          className="size-8 rounded-lg border border-border bg-card hover:bg-secondary/60 disabled:opacity-40 text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft className="size-3.5" />
        </button>

        {visiblePages
          .filter((page) => page <= totalPages)
          .map((page) => {
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={cn(
                  "size-8 rounded-lg text-xs font-bold flex items-center justify-center transition-colors cursor-pointer",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "border border-border bg-card hover:bg-secondary/60 text-foreground"
                )}
              >
                {page}
              </button>
            );
          })}

        {showLastPage && (
          <>
            <span className="px-1 text-muted-foreground select-none">...</span>
            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              className={cn(
                "min-w-8 h-8 px-2 rounded-lg text-xs font-bold flex items-center justify-center transition-colors cursor-pointer",
                currentPage === totalPages
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "border border-border bg-card hover:bg-secondary/60 text-foreground"
              )}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          aria-label="Next page"
          className="size-8 rounded-lg border border-border bg-card hover:bg-secondary/60 disabled:opacity-40 text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

