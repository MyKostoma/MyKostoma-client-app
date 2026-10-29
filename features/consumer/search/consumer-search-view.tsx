"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppHeader } from "@/components/ui/headers";
import { AppFooter } from "@/components/ui/footers";
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
import { Select, type SelectOption } from "@/components/ui/form-fields";
import {
  SearchEmptyState,
  SearchFiltersSidebar,
  type SearchFilterState,
  type SearchProfessionalItem,
  type VerificationType,
} from "@/components/consumer-search";
import { ProfessionalCard } from "@/components/consumer-home";
import {
  SEARCH_CATEGORY_OPTIONS,
  SEARCH_PROFESSIONALS_DATA,
  SEARCH_SORT_OPTIONS,
} from "./data";

const ITEMS_PER_PAGE = 10;

function getPaginationRange(
  currentPage: number,
  totalPages: number
): (number | "ellipsis-start" | "ellipsis-end")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-end", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis-start",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis-start",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-end",
    totalPages,
  ];
}

export interface ConsumerSearchViewProps {
  initialCategory?: string;
  initialQuery?: string;
  professionals?: SearchProfessionalItem[];
}

export function ConsumerSearchView({
  initialCategory,
  initialQuery = "",
  professionals = SEARCH_PROFESSIONALS_DATA,
}: ConsumerSearchViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParam = searchParams.get("q");
  const categoryParam = searchParams.get("category") ?? initialCategory;

  const [searchQuery, setSearchQuery] = React.useState(
    queryParam ?? initialQuery
  );

  const [filters, setFilters] = React.useState<SearchFilterState>(() => ({
    categories: categoryParam ? [categoryParam] : [],
    location: "all",
    verifications: [],
    minRating: null,
  }));

  const [sortBy, setSortBy] = React.useState("best-match");
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setSearchQuery(queryParam ?? "");
    setCurrentPage(1);
  }, [queryParam]);

  React.useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({
        ...prev,
        categories: [categoryParam],
      }));
      setCurrentPage(1);
    }
  }, [categoryParam]);

  const locationOptions = React.useMemo<SelectOption[]>(() => {
    const uniqueLocations = Array.from(
      new Set(
        professionals.map((pro) => pro.location.trim()).filter(Boolean)
      )
    );
    return [
      { value: "all", label: "All Locations" },
      ...uniqueLocations.map((loc) => ({
        value: loc,
        label: loc,
      })),
    ];
  }, [professionals]);

  const handleToggleCategory = (categoryId: string) => {
    setCurrentPage(1);
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const handleLocationChange = (location: string) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, location }));
  };

  const handleToggleVerification = (verification: VerificationType) => {
    setCurrentPage(1);
    setFilters((prev) => ({
      ...prev,
      verifications: prev.verifications.includes(verification)
        ? prev.verifications.filter((v) => v !== verification)
        : [...prev.verifications, verification],
    }));
  };

  const handleToggleRating = (rating: number) => {
    setCurrentPage(1);
    setFilters((prev) => ({
      ...prev,
      minRating: prev.minRating === rating ? null : rating,
    }));
  };

  const handleResetFilters = () => {
    setCurrentPage(1);
    setSearchQuery("");
    setFilters({
      categories: [],
      location: "all",
      verifications: [],
      minRating: null,
    });
    router.push("/search");
  };

  const handlePopularSearchSelect = (term: string) => {
    setCurrentPage(1);
    setSearchQuery(term);
    setFilters({
      categories: [],
      location: "all",
      verifications: [],
      minRating: null,
    });
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const filteredProfessionals = React.useMemo(() => {
    const rawQuery = searchQuery.trim().toLowerCase();

    return professionals
      .filter((pro) => {
        if (rawQuery) {
          const stopWords = new Set([
            "in",
            "at",
            "for",
            "the",
            "a",
            "an",
            "of",
            "and",
            "near",
            "to",
            "top",
            "services",
          ]);
          const tokens = rawQuery
            .split(/\s+/)
            .map((t) => t.replace(/^[^\w]+|[^\w]+$/g, ""))
            .filter((t) => t.length > 0 && !stopWords.has(t));

          const searchTokens = tokens.length > 0 ? tokens : [rawQuery];

          const proText = [
            pro.name,
            pro.subtitle,
            pro.location,
            pro.cityGroup ?? "",
            ...pro.categoryIds.map((c) => c.replace(/-/g, " ")),
          ]
            .join(" ")
            .toLowerCase();

          const matchesAllTokens = searchTokens.every((token) => {
            if (proText.includes(token)) return true;
            if (
              token.endsWith("s") &&
              token.length > 3 &&
              proText.includes(token.slice(0, -1))
            ) {
              return true;
            }
            if (
              token.endsWith("ing") &&
              token.length > 4 &&
              proText.includes(token.slice(0, -3))
            ) {
              return true;
            }
            return false;
          });

          if (!matchesAllTokens) return false;
        }

        if (filters.categories.length > 0) {
          const hasMatchingCategory = pro.categoryIds.some((catId) =>
            filters.categories.includes(catId)
          );
          if (!hasMatchingCategory) return false;
        }

        if (filters.location && filters.location !== "all") {
          const normalizedFilterLoc = filters.location.toLowerCase();
          const matchLoc =
            pro.location.toLowerCase() === normalizedFilterLoc ||
            pro.location.toLowerCase().includes(normalizedFilterLoc) ||
            pro.cityGroup?.toLowerCase() === normalizedFilterLoc;
          if (!matchLoc) return false;
        }

        if (
          filters.verifications.length > 0 &&
          !filters.verifications.includes(pro.verification)
        ) {
          return false;
        }

        if (filters.minRating !== null && pro.rating < filters.minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating-desc") return b.rating - a.rating;
        if (sortBy === "reviews-desc")
          return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
        return 0;
      });
  }, [professionals, searchQuery, filters, sortBy]);

  const totalItems = filteredProfessionals.length;
  const isEmptyState = totalItems === 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProfessionals = React.useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredProfessionals.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredProfessionals, safeCurrentPage]);

  const paginationItems = React.useMemo(
    () => getPaginationRange(safeCurrentPage, totalPages),
    [safeCurrentPage, totalPages]
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top App Header */}
      <div className="w-full bg-card border-b border-border/70 sticky top-0 z-40">
        <div className="container px-4 sm:px-6 lg:px-8">
          <AppHeader
            searchValue={searchQuery}
            onSearchChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            onSearchSubmit={(val) => {
              const trimmed = val.trim();
              setSearchQuery(trimmed);
              setCurrentPage(1);
              if (trimmed) {
                router.push(`/search?q=${encodeURIComponent(trimmed)}`);
              } else {
                router.push("/search");
              }
            }}
            onProfileClick={() => router.push("/dashboard")}
            onSettingsClick={() => router.push("/settings")}
            onMessagesClick={() => router.push("/messages")}
            className="rounded-none border-0 shadow-none px-0 py-3.5"
          />
        </div>
      </div>

      {/* Main Content Container */}
      <main className="flex-1 container px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {isEmptyState ? (
          <SearchEmptyState
            onClearFilters={handleResetFilters}
            onBackToBrowse={() => router.push("/home")}
            onPopularSearchSelect={handlePopularSearchSelect}
          />
        ) : (
          <div className="space-y-6">
            {/* Top Bar: Breadcrumb */}
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
                        : "All Professionals"}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* 2-Column Layout: Left Filters Sidebar + Right Results Area */}
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
              <SearchFiltersSidebar
                categoryOptions={SEARCH_CATEGORY_OPTIONS}
                locationOptions={locationOptions}
                filters={filters}
                onToggleCategory={handleToggleCategory}
                onLocationChange={handleLocationChange}
                onToggleVerification={handleToggleVerification}
                onToggleRating={handleToggleRating}
                onResetFilters={handleResetFilters}
              />

              {/* Right Results Column */}
              <div className="flex-1 w-full space-y-6">
                {/* Results Summary & Sort Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

                  <div className="flex items-center gap-2.5 self-end sm:self-auto">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground shrink-0">
                      Sort by:
                    </span>
                    <div className="w-40">
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

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
                  {paginatedProfessionals.map((pro) => (
                    <ProfessionalCard
                      key={pro.id}
                      professional={pro}
                      variant="horizontal"
                    />
                  ))}
                </div>

                {/* Dynamic Pagination Bar */}
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
              </div>
            </div>
          </div>
        )}
      </main>

      <AppFooter className="mt-8" />
    </div>
  );
}
