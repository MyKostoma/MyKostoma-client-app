import type {
  ReviewRatingFilter,
  ReviewRecord,
  ReviewResponseStatusFilter,
  ReviewsKpiSummary,
  ReviewSortOption,
  ReviewsTabId,
} from "@/components/reviews/types";

export function normalizeReviewsTab(
  raw?: string | null,
  fallback: ReviewsTabId = "received"
): ReviewsTabId {
  const value = (raw ?? "").trim().toLowerCase();
  if (value === "received" || value === "given" || value === "pending") {
    return value;
  }
  return fallback;
}

export function computeReviewsKpi(
  reviews: ReviewRecord[],
  baselineTotal = 121
): ReviewsKpiSummary {
  if (reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      responseRatePercent: 0,
    };
  }

  const ratingSum = reviews.reduce((acc, item) => acc + item.rating, 0);
  const averageRating = Number((ratingSum / reviews.length).toFixed(1));
  const respondedCount = reviews.filter((item) => Boolean(item.response)).length;
  const responseRatePercent = Math.round(
    (respondedCount / reviews.length) * 100
  );

  return {
    averageRating,
    totalReviews: baselineTotal + reviews.length,
    responseRatePercent,
  };
}

export function filterAndSortReviewsList(
  reviews: ReviewRecord[],
  options: {
    query: string;
    rating: ReviewRatingFilter;
    responseStatus: ReviewResponseStatusFilter;
    sort: ReviewSortOption;
  }
): ReviewRecord[] {
  const normalizedQuery = options.query.trim().toLowerCase();

  const filtered = reviews.filter((review) => {
    if (normalizedQuery) {
      const haystack = [
        review.authorName,
        review.recipientName,
        review.headline ?? "",
        review.comment,
        review.orderCode,
        review.serviceTitle,
        review.locationLabel,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    if (options.rating === "5" && review.rating !== 5) return false;
    if (options.rating === "4" && review.rating !== 4) return false;
    if (options.rating === "3" && review.rating !== 3) return false;
    if (options.rating === "2-below" && review.rating > 2) return false;

    if (options.responseStatus === "responded" && !review.response) {
      return false;
    }
    if (options.responseStatus === "unresponded" && Boolean(review.response)) {
      return false;
    }
    if (
      options.responseStatus === "requires-attention" &&
      !(review.requiresAttention && !review.response)
    ) {
      return false;
    }

    return true;
  });

  return [...filtered].sort((a, b) => {
    if (options.sort === "highest") {
      if (b.rating !== a.rating) return b.rating - a.rating;
    }
    if (options.sort === "lowest") {
      if (a.rating !== b.rating) return a.rating - b.rating;
    }
    return b.createdAtISO.localeCompare(a.createdAtISO);
  });
}

export function paginateReviews<T>(
  items: T[],
  page: number,
  pageSize: number
): {
  items: T[];
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
} {
  const safeTotal = items.length;
  const totalPages = Math.max(1, Math.ceil(safeTotal / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const offset = (currentPage - 1) * pageSize;
  const sliced = items.slice(offset, offset + pageSize);

  return {
    items: sliced,
    currentPage,
    totalPages,
    startIndex: safeTotal === 0 ? 0 : offset + 1,
    endIndex: Math.min(offset + pageSize, safeTotal),
  };
}

export function getRatingSentimentLabel(
  rating: number,
  variant: "professional" | "consumer"
): string {
  const safeRating = Math.min(5, Math.max(0, Math.round(rating)));
  if (variant === "professional") {
    switch (safeRating) {
      case 5:
        return "EXCEPTIONAL CLIENT";
      case 4:
        return "GREAT CLIENT";
      case 3:
        return "GOOD EXPERIENCE";
      case 2:
        return "NEEDS IMPROVEMENT";
      case 1:
        return "POOR EXPERIENCE";
      default:
        return "SELECT A RATING";
    }
  }

  switch (safeRating) {
    case 5:
      return "OUTSTANDING SERVICE";
    case 4:
      return "GREAT SERVICE";
    case 3:
      return "GOOD SERVICE";
    case 2:
      return "FAIR SERVICE";
    case 1:
      return "POOR SERVICE";
    default:
      return "SELECT A RATING";
  }
}

export function formatReviewDisplayDate(date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
