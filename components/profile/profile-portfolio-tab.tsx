"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import type { ProfilePortfolioTabProps, ProfileSortPortfolio } from "./types";

export function ProfilePortfolioTab({
  items,
  categories,
  selectedCategory,
  sortBy,
  currentPage,
  totalPages,
  isOwner = false,
  onSelectCategory,
  onSortChange,
  onPageChange,
  onItemClick,
  onAddProject,
}: ProfilePortfolioTabProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const scrollPillIntoView = useCallback((cat: string) => {
    const container = containerRef.current;
    const pill = pillRefs.current[cat];
    if (!container || !pill) return;

    const targetLeft =
      pill.offsetLeft - container.offsetWidth / 2 + pill.offsetWidth / 2;
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const frameId = requestAnimationFrame(() =>
      scrollPillIntoView(selectedCategory)
    );
    return () => cancelAnimationFrame(frameId);
  }, [selectedCategory, scrollPillIntoView]);

  return (
    <section aria-label="Portfolio showcase" className="space-y-6">
      {/* Filter & Sort Controls Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div
          ref={containerRef}
          role="tablist"
          aria-label="Filter portfolio by category"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
        >
          {categories.map((category) => {
            const isActive = category === selectedCategory;
            return (
              <button
                key={category}
                ref={(el) => {
                  pillRefs.current[category] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  onSelectCategory(category);
                  scrollPillIntoView(category);
                }}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 border",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {isOwner && onAddProject && (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onAddProject}
              leadingIcon={<Plus className="size-3.5" />}
              className="h-9 px-4 rounded-xl text-xs font-semibold shadow-xs"
            >
              Add Project
            </Button>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Sort by:</span>
            <div className="relative">
              <select
                aria-label="Sort portfolio projects"
                value={sortBy}
                onChange={(e) =>
                  onSortChange(e.target.value as ProfileSortPortfolio)
                }
                className="h-9 pl-3.5 pr-8 rounded-xl border border-border bg-card text-xs font-semibold text-foreground appearance-none outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title (A–Z)</option>
              </select>
              <ChevronDown className="size-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Project Grid */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center space-y-2 shadow-2xs">
          <p className="text-sm font-semibold text-foreground">
            No portfolio projects in this category yet
          </p>
          <p className="text-xs text-muted-foreground">
            Switch categories or add a new completed project to showcase.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {items.map((item) => (
            <article
              key={item.id}
              onClick={() => onItemClick(item)}
              className="group rounded-2xl border border-border bg-card overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="aspect-16/10 w-full bg-secondary overflow-hidden">
                <FallbackImage
                  src={item.imageUrl}
                  alt={item.title}
                  fallbackType="portfolio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                />
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {item.category}
                      {item.dateLabel ? ` • ${item.dateLabel}` : ""}
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-secondary text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pt-2 flex justify-center">
          <Pagination className="justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={currentPage <= 1}
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={pageNum === currentPage}
                      onClick={() => onPageChange(pageNum)}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

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
      )}
    </section>
  );
}
