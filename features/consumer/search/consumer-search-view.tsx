"use client";

import { Filter, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select } from "@/components/ui/form-fields";
import { SearchEmptyState } from "@/components/consumer-search/search-empty-state";
import { SearchFiltersSidebar } from "@/components/consumer-search/search-filters-sidebar";
import { ProfessionalCard } from "@/components/consumer-home/professional-card";
import { SEARCH_CATEGORY_OPTIONS, SEARCH_SORT_OPTIONS } from "./data";
import { useConsumerSearchService } from "./services/consumerSearchApi";
import type { ConsumerSearchViewProps } from "./types";

export type { ConsumerSearchViewProps };

export function ConsumerSearchView({
  initialCategory,
  initialQuery = "",
  professionals,
}: ConsumerSearchViewProps) {
  const {
    router,
    searchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    setCurrentPage,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    isDesktopCollapsed,
    handleToggleDesktopCollapse,
    locationOptions,
    handleToggleCategory,
    handleLocationChange,
    handleToggleVerification,
    handleToggleRating,
    handleResetFilters,
    handlePopularSearchSelect,
    activeFilterCount,
    isGlobalQueryUnmatched,
    paginatedProfessionals,
    totalItems,
    totalPages,
    safeCurrentPage,
    paginationItems,
  } = useConsumerSearchService({
    initialCategory,
    initialQuery,
    professionals,
  });

  return (
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
      {isGlobalQueryUnmatched ? (
        <SearchEmptyState
          onClearFilters={handleResetFilters}
          onBackToBrowse={() => router.push("/home")}
          onPopularSearchSelect={handlePopularSearchSelect}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => router.push("/home")}>
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={handleResetFilters}>
                    Search Results
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {searchQuery
                      ? `"${searchQuery}"`
                      : filters.categories.length === 1
                      ? SEARCH_CATEGORY_OPTIONS.find(
                          (c) => c.id === filters.categories[0]
                        )?.label ?? "Category"
                      : "All Professionals"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {mobileFiltersOpen && (
            <div
              className="lg:hidden fixed inset-0 z-50 flex"
              role="dialog"
              aria-modal="true"
              aria-label="Search filters drawer"
            >
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
                onClick={() => setMobileFiltersOpen(false)}
                aria-hidden="true"
              />

              <div className="relative z-10 w-full max-w-xs sm:max-w-sm h-full bg-card text-foreground shadow-2xl flex flex-col animate-in slide-in-from-left duration-200 overflow-y-auto no-scrollbar">
                <SearchFiltersSidebar
                  categoryOptions={SEARCH_CATEGORY_OPTIONS}
                  locationOptions={locationOptions}
                  filters={filters}
                  onToggleCategory={handleToggleCategory}
                  onLocationChange={handleLocationChange}
                  onToggleVerification={handleToggleVerification}
                  onToggleRating={handleToggleRating}
                  onResetFilters={handleResetFilters}
                  onClose={() => setMobileFiltersOpen(false)}
                  onApply={() => setMobileFiltersOpen(false)}
                  className="w-full border-0 shadow-none rounded-none p-5 sm:p-6"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
            <div className="hidden lg:block shrink-0 transition-all duration-300">
              <SearchFiltersSidebar
                categoryOptions={SEARCH_CATEGORY_OPTIONS}
                locationOptions={locationOptions}
                filters={filters}
                onToggleCategory={handleToggleCategory}
                onLocationChange={handleLocationChange}
                onToggleVerification={handleToggleVerification}
                onToggleRating={handleToggleRating}
                onResetFilters={handleResetFilters}
                isCollapsed={isDesktopCollapsed}
                onToggleCollapse={handleToggleDesktopCollapse}
              />
            </div>

            <div className="flex-1 w-full space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between gap-3 lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  aria-label="Open search filters"
                  className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card hover:bg-secondary text-foreground text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  <Filter className="size-4 text-primary shrink-0" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="size-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground shrink-0 hidden xs:inline">
                    Sort by:
                  </span>
                  <div className="w-44">
                    <Select
                      options={SEARCH_SORT_OPTIONS}
                      value={sortBy}
                      onChange={(val) => {
                        setSortBy(val);
                        setCurrentPage(1);
                      }}
                      className="h-9 text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-bold text-foreground">
                    {paginatedProfessionals.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-foreground">
                    {totalItems}
                  </span>{" "}
                  professionals found
                </p>

                <div className="hidden lg:flex items-center gap-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground shrink-0">
                    Sort by:
                  </span>
                  <div className="w-52">
                    <Select
                      options={SEARCH_SORT_OPTIONS}
                      value={sortBy}
                      onChange={(val) => {
                        setSortBy(val);
                        setCurrentPage(1);
                      }}
                      className="h-9 text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>

              {totalItems === 0 ? (
                <div className="w-full rounded-2xl border border-dashed border-border bg-card/60 p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 my-2">
                  <div className="size-16 rounded-2xl bg-secondary/80 flex items-center justify-center text-muted-foreground shadow-2xs">
                    <FilterX className="size-8 text-muted-foreground/70" />
                  </div>
                  <div className="space-y-1.5 max-w-md">
                    <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                      No professionals found
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {filters.categories.length > 0
                        ? "There are currently no registered professionals in this category matching your active filters."
                        : "No professionals match your current filter selections. Try broadening your criteria."}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleResetFilters}
                      className="h-9 px-4 text-xs font-semibold rounded-lg shadow-2xs"
                    >
                      Clear all filters
                    </Button>
                    {filters.categories.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, categories: [] }));
                          setCurrentPage(1);
                        }}
                        className="h-9 px-4 text-xs font-semibold rounded-lg"
                      >
                        View all categories
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3 sm:gap-6 items-stretch">
                    {paginatedProfessionals.map((pro) => (
                      <ProfessionalCard
                        key={pro.id}
                        professional={pro}
                        variant="horizontal"
                        onViewDetails={(id) => router.push(`/profile/${id}`)}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="pt-6 flex justify-center">
                      <Pagination className="justify-center">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              disabled={safeCurrentPage <= 1}
                              onClick={() =>
                                setCurrentPage(Math.max(1, safeCurrentPage - 1))
                              }
                            />
                          </PaginationItem>

                          {paginationItems.map((item) => {
                            if (
                              item === "ellipsis-start" ||
                              item === "ellipsis-end"
                            ) {
                              return (
                                <PaginationItem key={item}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              );
                            }

                            return (
                              <PaginationItem key={item}>
                                <PaginationLink
                                  isActive={safeCurrentPage === item}
                                  onClick={() => setCurrentPage(item)}
                                >
                                  {item}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}

                          <PaginationItem>
                            <PaginationNext
                              disabled={safeCurrentPage >= totalPages}
                              onClick={() =>
                                setCurrentPage(
                                  Math.min(totalPages, safeCurrentPage + 1)
                                )
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ConsumerSearchView;
