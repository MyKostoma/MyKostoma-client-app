"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, Rows3 } from "lucide-react";
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
import { Select } from "@/components/ui/form-fields";
import {
  SearchEmptyState,
  SearchFiltersSidebar,
  SearchResultHorizontalCard,
  SearchResultStudioCard,
  type SearchCardLayout,
  type SearchFilterState,
  type SearchProfessionalItem,
  type VerificationType,
} from "@/components/consumer-search";
import { cn } from "@/lib/utils";
import {
  INTERIOR_CATEGORY_OPTIONS,
  PLUMBING_CATEGORY_OPTIONS,
  SEARCH_LOCATION_OPTIONS,
  SEARCH_PROFESSIONALS_DATA,
  SEARCH_SORT_OPTIONS,
} from "./data";

export interface ConsumerSearchViewProps {
  initialCategory?: string;
  initialQuery?: string;
  professionals?: SearchProfessionalItem[];
}

export function ConsumerSearchView({
  initialCategory,
  initialQuery = "Plumbers in Lagos",
  professionals = SEARCH_PROFESSIONALS_DATA,
}: ConsumerSearchViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParam = searchParams.get("q");
  const categoryParam = searchParams.get("category") ?? initialCategory;

  const isInitialInterior =
    categoryParam === "interior-design" ||
    queryParam?.toLowerCase().includes("interior");

  const [searchQuery, setSearchQuery] = React.useState(
    queryParam ??
      (isInitialInterior ? "Interior Designers in Lagos" : initialQuery)
  );

  const [cardLayout, setCardLayout] = React.useState<SearchCardLayout>(
    isInitialInterior ? "studio" : "horizontal"
  );

  const [filters, setFilters] = React.useState<SearchFilterState>(() => {
    if (isInitialInterior) {
      return {
        categories: ["interior-design", "home-staging"],
        location: "all",
        verifications: ["company"],
        minRating: 4.0,
      };
    }
    return {
      categories: ["plumbing"],
      location: "lagos-mainland",
      verifications: [],
      minRating: null,
    };
  });

  const [sortBy, setSortBy] = React.useState("best-match");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([]);

  // Determine active category filter options based on current mode
  const isInteriorMode =
    cardLayout === "studio" ||
    filters.categories.some((c) =>
      ["interior-design", "home-staging", "furniture-design"].includes(c)
    ) ||
    searchQuery.toLowerCase().includes("interior");

  const activeCategoryOptions = isInteriorMode
    ? INTERIOR_CATEGORY_OPTIONS
    : PLUMBING_CATEGORY_OPTIONS;

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
    setSearchQuery("Plumbers in Lagos");
    setCardLayout("horizontal");
    setFilters({
      categories: ["plumbing"],
      location: "lagos-mainland",
      verifications: [],
      minRating: null,
    });
  };

  const handleToggleFavorite = (proId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(proId)
        ? prev.filter((id) => id !== proId)
        : [...prev, proId]
    );
  };

  const applyPreset = (preset: "plumbers" | "interior" | "empty") => {
    setCurrentPage(1);
    if (preset === "plumbers") {
      setSearchQuery("Plumbers in Lagos");
      setCardLayout("horizontal");
      setFilters({
        categories: ["plumbing"],
        location: "lagos-mainland",
        verifications: [],
        minRating: null,
      });
    } else if (preset === "interior") {
      setSearchQuery("Interior Designers in Lagos");
      setCardLayout("studio");
      setFilters({
        categories: ["interior-design", "home-staging"],
        location: "all",
        verifications: ["company"],
        minRating: 4.0,
      });
    } else {
      setSearchQuery("Astronauts in Lagos");
      setFilters({
        categories: [],
        location: "all",
        verifications: [],
        minRating: null,
      });
    }
  };

  const handlePopularSearchSelect = (term: string) => {
    if (term.toLowerCase().includes("interior")) {
      applyPreset("interior");
    } else {
      setSearchQuery(`${term} in Lagos`);
      setCardLayout("horizontal");
      setFilters({
        categories: ["plumbing"],
        location: "all",
        verifications: [],
        minRating: null,
      });
    }
  };

  // Filter & sort professionals
  const filteredProfessionals = React.useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    // Check if query explicitly triggers empty state (e.g., "astronauts" or non-existent service)
    if (
      normalizedQuery.includes("astronaut") ||
      normalizedQuery.includes("none") ||
      normalizedQuery.includes("xyz")
    ) {
      return [];
    }

    return professionals
      .filter((pro) => {
        // Category match
        if (filters.categories.length > 0) {
          const hasMatchingCategory = pro.categoryIds.some((catId) =>
            filters.categories.includes(catId)
          );
          if (!hasMatchingCategory) return false;
        }

        // Verification match
        if (
          filters.verifications.length > 0 &&
          !filters.verifications.includes(pro.verification)
        ) {
          return false;
        }

        // Minimum rating match
        if (filters.minRating !== null && pro.rating < filters.minRating) {
          return false;
        }

        return true;
      })
      .map((pro) => ({
        ...pro,
        isFavorite: favoriteIds.includes(pro.id),
      }))
      .sort((a, b) => {
        if (sortBy === "rating-desc") return b.rating - a.rating;
        if (sortBy === "reviews-desc")
          return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
        return 0;
      });
  }, [professionals, searchQuery, filters, sortBy, favoriteIds]);

  const isEmptyState = filteredProfessionals.length === 0;
  const totalPages = isInteriorMode ? 8 : 12;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top App Header */}
      <div className="w-full bg-card border-b border-border/70 sticky top-0 z-40">
        <div className="container px-4 sm:px-6 lg:px-8">
          <AppHeader
            searchValue={searchQuery}
            onSearchChange={(val) => {
              setSearchQuery(val);
              if (val.toLowerCase().includes("interior")) {
                setCardLayout("studio");
                setFilters((prev) => ({
                  ...prev,
                  categories: ["interior-design", "home-staging"],
                }));
              } else if (val.toLowerCase().includes("plumb")) {
                setCardLayout("horizontal");
                setFilters((prev) => ({
                  ...prev,
                  categories: ["plumbing"],
                }));
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
            {/* Top Bar: Breadcrumb + Quick View Switcher */}
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
                      {isInteriorMode ? "Professionals" : "Search Results"}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {isInteriorMode
                        ? "Interior Designers"
                        : `"${searchQuery}"`}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Quick Figma Flow Switcher Pills */}
              <div className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-card border border-border rounded-lg p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => applyPreset("plumbers")}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer",
                    cardLayout === "horizontal" && !isEmptyState
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Rows3 className="size-3.5" />
                  <span>Plumbers View</span>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset("interior")}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer",
                    cardLayout === "studio" && !isEmptyState
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <LayoutGrid className="size-3.5" />
                  <span>Studio View</span>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset("empty")}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <span>Empty State</span>
                </button>
              </div>
            </div>

            {/* 2-Column Layout: Left Filters Sidebar + Right Results Area */}
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
              <SearchFiltersSidebar
                categoryOptions={activeCategoryOptions}
                locationOptions={SEARCH_LOCATION_OPTIONS}
                filters={filters}
                onToggleCategory={handleToggleCategory}
                onLocationChange={handleLocationChange}
                onToggleVerification={handleToggleVerification}
                onToggleRating={handleToggleRating}
                onResetFilters={handleResetFilters}
                showStarsRow={isInteriorMode}
                ratingOptions={
                  isInteriorMode
                    ? [
                        { value: 4.0, label: "4.0 & Above", starsCount: 4 },
                        { value: 3.0, label: "3.0 & Above", starsCount: 3 },
                      ]
                    : [
                        { value: 4.5, label: "4.5 & Above" },
                        { value: 4.0, label: "4.0 & Above" },
                      ]
                }
              />

              {/* Right Results Column */}
              <div className="flex-1 w-full space-y-6">
                {/* Results Summary & Sort Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {isInteriorMode ? (
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Found{" "}
                      <span className="font-bold text-foreground">24</span>{" "}
                      professionals for &ldquo;Interior Designers&rdquo;
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Showing{" "}
                      <span className="font-bold text-foreground">1-12</span> of{" "}
                      <span className="font-bold text-foreground">48</span>{" "}
                      professionals found
                    </p>
                  )}

                  <div className="flex items-center gap-2.5 self-end sm:self-auto">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground shrink-0">
                      Sort by:
                    </span>
                    <div className="w-40">
                      <Select
                        options={SEARCH_SORT_OPTIONS}
                        value={sortBy}
                        onChange={setSortBy}
                        className="h-9 text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  {filteredProfessionals.map((pro) =>
                    cardLayout === "studio" ? (
                      <SearchResultStudioCard
                        key={pro.id}
                        professional={pro}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ) : (
                      <SearchResultHorizontalCard
                        key={pro.id}
                        professional={pro}
                      />
                    )
                  )}
                </div>

                {/* Pagination Bar */}
                <div className="pt-6 flex justify-center">
                  <Pagination className="justify-center">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          disabled={currentPage === 1}
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                        />
                      </PaginationItem>

                      {[1, 2, 3].map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={currentPage === page}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationLink
                          isActive={currentPage === totalPages}
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationNext
                          disabled={currentPage === totalPages}
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
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
