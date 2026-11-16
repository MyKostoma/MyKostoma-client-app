"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setGlobalSearchQuery } from "@/store/slices/uiSlice";
import {
  selectSearchProfessionals,
  useSearchProfessionalsQuery,
} from "@/store/slices/discoverSlice";
import type {
  SearchFilterState,
  SearchProfessionalItem,
  VerificationType,
} from "@/components/consumer-search/types";
import {
  buildLocationSelectOptions,
  countActiveSearchFilters,
  filterAndSortProfessionals,
  getPaginationRange,
  matchesQueryText,
  SEARCH_ITEMS_PER_PAGE,
} from "./consumerSearchHelpers";

export function useConsumerSearchService(options?: {
  initialCategory?: string;
  initialQuery?: string;
  professionals?: SearchProfessionalItem[];
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const storeProfessionals = useAppSelector(selectSearchProfessionals);

  const queryParam = searchParams.get("q");
  const categoryParam = searchParams.get("category") ?? options?.initialCategory;

  const [searchQuery, setSearchQuery] = useState(
    queryParam ?? options?.initialQuery ?? ""
  );

  const [filters, setFilters] = useState<SearchFilterState>(() => ({
    categories: categoryParam ? [categoryParam] : [],
    location: "all",
    verifications: [],
    minRating: null,
  }));

  const [sortBy, setSortBy] = useState("best-match");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [hasUserManuallyToggled, setHasUserManuallyToggled] = useState(false);

  const { data: apiProfessionals, isLoading } = useSearchProfessionalsQuery(
    { query: searchQuery, filters, sortBy },
    { skip: true }
  );

  const professionals =
    options?.professionals ?? apiProfessionals ?? storeProfessionals;

  useEffect(() => {
    const handleResize = () => {
      if (!hasUserManuallyToggled) {
        setIsDesktopCollapsed(window.innerWidth < 1280);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasUserManuallyToggled]);

  const handleToggleDesktopCollapse = () => {
    setHasUserManuallyToggled(true);
    setIsDesktopCollapsed((prev) => !prev);
  };

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileFiltersOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileFiltersOpen]);

  useEffect(() => {
    const q = queryParam ?? "";
    setSearchQuery(q);
    dispatch(setGlobalSearchQuery(q));
    setCurrentPage(1);

    setFilters((prev) => {
      const nextCategories = categoryParam ? [categoryParam] : [];
      if (queryParam === null && !categoryParam) {
        return {
          categories: [],
          location: "all",
          verifications: [],
          minRating: null,
        };
      }
      return {
        ...prev,
        categories: nextCategories,
      };
    });
  }, [queryParam, categoryParam, dispatch]);

  const locationOptions = useMemo(
    () => buildLocationSelectOptions(professionals),
    [professionals]
  );

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
    dispatch(setGlobalSearchQuery(""));
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
    dispatch(setGlobalSearchQuery(term));
    setFilters({
      categories: [],
      location: "all",
      verifications: [],
      minRating: null,
    });
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const activeFilterCount = useMemo(
    () => countActiveSearchFilters(filters),
    [filters]
  );

  const isGlobalQueryUnmatched = useMemo(() => {
    const rawQuery = searchQuery.trim().toLowerCase();
    if (!rawQuery) return false;
    return !professionals.some((pro) => matchesQueryText(pro, rawQuery));
  }, [searchQuery, professionals]);

  const filteredProfessionals = useMemo(
    () =>
      filterAndSortProfessionals(professionals, searchQuery, filters, sortBy),
    [professionals, searchQuery, filters, sortBy]
  );

  const totalItems = filteredProfessionals.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / SEARCH_ITEMS_PER_PAGE)
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProfessionals = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * SEARCH_ITEMS_PER_PAGE;
    return filteredProfessionals.slice(
      startIndex,
      startIndex + SEARCH_ITEMS_PER_PAGE
    );
  }, [filteredProfessionals, safeCurrentPage]);

  const paginationItems = useMemo(
    () => getPaginationRange(safeCurrentPage, totalPages),
    [safeCurrentPage, totalPages]
  );

  return {
    router,
    searchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    currentPage,
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
    isLoading,
  };
}

