import type { SelectOption } from "@/components/ui/form-fields";
import type {
  SearchFilterState,
  SearchProfessionalItem,
} from "@/components/consumer-search/types";

export const SEARCH_ITEMS_PER_PAGE = 10;

export function matchesQueryText(
  pro: SearchProfessionalItem,
  rawQuery: string
): boolean {
  if (!rawQuery) return true;
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

  return searchTokens.every((token) => {
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
}

export function getPaginationRange(
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

export function buildLocationSelectOptions(
  professionals: SearchProfessionalItem[]
): SelectOption[] {
  const uniqueLocations = Array.from(
    new Set(professionals.map((pro) => pro.location.trim()).filter(Boolean))
  );
  return [
    { value: "all", label: "All Locations" },
    ...uniqueLocations.map((loc) => ({
      value: loc,
      label: loc,
    })),
  ];
}

export function countActiveSearchFilters(filters: SearchFilterState): number {
  let count = 0;
  count += filters.categories.length;
  if (filters.location && filters.location !== "all") count += 1;
  count += filters.verifications.length;
  if (filters.minRating !== null) count += 1;
  return count;
}

export function filterAndSortProfessionals(
  professionals: SearchProfessionalItem[],
  searchQuery: string,
  filters: SearchFilterState,
  sortBy: string
): SearchProfessionalItem[] {
  const rawQuery = searchQuery.trim().toLowerCase();

  return professionals
    .filter((pro) => {
      if (rawQuery && !matchesQueryText(pro, rawQuery)) {
        return false;
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
      if (sortBy === "rating-asc") return a.rating - b.rating;
      if (sortBy === "reviews-desc")
        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      if (sortBy === "reviews-asc")
        return (a.reviewCount ?? 0) - (b.reviewCount ?? 0);
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });
}

