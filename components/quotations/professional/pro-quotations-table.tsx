"use client";

import { MoreVertical } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import type { ProfessionalQuotationItem } from "../types";
import { ProQuotationStatusPill } from "./pro-quotation-status-pill";

export interface ProQuotationsTableProps {
  quotations: ProfessionalQuotationItem[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onSelectQuote: (quote: ProfessionalQuotationItem) => void;
  className?: string;
}

export function ProQuotationsTable({
  quotations,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  onSelectQuote,
  className,
}: ProQuotationsTableProps) {
  const startItem = quotations.length > 0 ? 1 : 0;
  const endItem = quotations.length;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-xl border border-border bg-card shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[740px]">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="py-3.5 px-5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground w-[42%]">
                  QUOTE CONTEXT
                </th>
                <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                  STATUS
                </th>
                <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  DATE SUBMITTED
                </th>
                <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  DURATION
                </th>
                <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  PRICE
                </th>
                <th className="py-3.5 px-5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {quotations.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 px-5 text-center text-xs sm:text-sm text-muted-foreground"
                  >
                    No quotations match your current filter.
                  </td>
                </tr>
              ) : (
                quotations.map((quote) => (
                  <tr
                    key={quote.id}
                    onClick={() => onSelectQuote(quote)}
                    className="group hover:bg-secondary/35 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-5">
                      <p className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {quote.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {quote.description}
                      </p>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <ProQuotationStatusPill
                        status={quote.status}
                        variant="table"
                      />
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-muted-foreground whitespace-nowrap">
                      {quote.dateSubmitted}
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-muted-foreground">
                      {quote.duration}
                    </td>
                    <td className="py-4 px-4 text-xs sm:text-sm font-bold text-foreground whitespace-nowrap">
                      {quote.price}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        type="button"
                        aria-label={`View quotation ${quote.code}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectQuote(quote);
                        }}
                        className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                      >
                        <MoreVertical className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        <p className="text-xs text-muted-foreground">
          Showing {startItem} to {endItem} of {totalCount} quotations
        </p>

        <Pagination className="w-auto mx-0 justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={currentPage <= 1}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                disabled={currentPage >= totalPages}
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
