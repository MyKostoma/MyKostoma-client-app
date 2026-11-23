import type {
  CompanyProfileDetails,
  ProfessionalProfileData,
  ProfilePortfolioItem,
  ProfileReviewFilter,
  ProfileReviewItem,
  ProfileServiceItem,
  ProfileSortPortfolio,
  ProfileSortReview,
  ProfileTabId,
} from "@/components/profile/types";
import type { ProfileResponseOverride } from "@/store/slices/profileSlice";

export function buildServiceInquiryPrefill(
  professionalName: string,
  service: ProfileServiceItem
): string {
  const firstName = professionalName.split(" ")[0] || professionalName;
  return `Hi ${firstName}, I'm interested in your ${service.title} service.`;
}

export function buildProfileHref(tab?: ProfileTabId): string {
  return tab && tab !== "overview" ? `/profile?tab=${tab}` : "/profile";
}

export function buildEditProfileHref(): string {
  return "/profile/edit";
}

export function buildProfilePhotoHref(): string {
  return "/profile/photo";
}

export function buildPublicProfileHref(
  id: string,
  tab?: ProfileTabId
): string {
  return tab && tab !== "overview"
    ? `/profile/${id}?tab=${tab}`
    : `/profile/${id}`;
}

export function buildCompanyProfileHref(tab?: ProfileTabId): string {
  return tab && tab !== "overview"
    ? `/profile/company?tab=${tab}`
    : "/profile/company";
}

export function buildEditCompanyProfileHref(): string {
  return "/profile/company/edit";
}

export function buildCompanyPhotoHref(): string {
  return "/profile/photo?mode=company";
}

export function resolveCompanyProfileDetails(
  profile: ProfessionalProfileData
): CompanyProfileDetails {
  if (profile.companyDetails) {
    return profile.companyDetails;
  }

  const monogram =
    profile.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("") || "CO";

  const primaryArea = profile.location.split(",")[0]?.trim() || profile.location;
  const stateLabel =
    profile.location.split(",")[1]?.trim()?.toUpperCase() || "NIGERIA";

  return {
    logoMonogram: monogram,
    teamStrength: "15+ Professionals",
    yearsActive: profile.experienceLabel || "5+ Years",
    projectsCompleted: "80+ Completed",
    activeCoverageLabel: `ACTIVE COVERAGE: ${stateLabel}`,
    hqLabel: `HQ: ${primaryArea.toUpperCase()}`,
    coverageZones: [primaryArea, "Lagos Mainland", "Lekki Axis"],
    cacNumber: "RC: VERIFIED",
    cacStatusLabel: "ACTIVE & VERIFIED",
    trustChecks: [
      { id: "identity", label: "Identity Check", verified: true },
      { id: "address", label: "Address Proof", verified: true },
      { id: "license", label: "Professional License", verified: true },
    ],
    operatingHours: [
      { day: "Monday - Friday", hours: "08:00 - 18:00" },
      { day: "Saturday", hours: "10:00 - 16:00" },
      { day: "Sunday", hours: "Closed", isClosed: true },
    ],
    isCurrentlyOpen: true,
    socialLinks: {
      website: "https://mykostoma.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  };
}

export function normalizeProfileTab(raw?: string | null): ProfileTabId {
  if (
    raw === "overview" ||
    raw === "services" ||
    raw === "portfolio" ||
    raw === "reviews"
  ) {
    return raw;
  }
  return "overview";
}

export function formatProfileDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function validateProfilePhotoFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const allowedMime = new Set(["image/png", "image/jpeg", "image/jpg"]);
  const extIndex = file.name.lastIndexOf(".");
  const ext = extIndex >= 0 ? file.name.slice(extIndex).toLowerCase() : "";
  const allowedExt = new Set([".png", ".jpg", ".jpeg"]);

  const isAllowed =
    (file.type && allowedMime.has(file.type.toLowerCase())) ||
    allowedExt.has(ext);

  if (!isAllowed) {
    return {
      valid: false,
      error: "Accepted formats are JPG and PNG only.",
    };
  }

  if (file.size > 5 * 1024 * 1024) {
    return {
      valid: false,
      error: "File size must not exceed 5MB.",
    };
  }

  return { valid: true };
}

export function mergeProfileWithOverrides(
  baseProfile: ProfessionalProfileData,
  customReviews: ProfileReviewItem[],
  responsesByReviewId: Record<string, ProfileResponseOverride>,
  helpfulReviewIds: string[]
): ProfessionalProfileData {
  const existingIds = new Set(baseProfile.reviews.map((r) => r.id));
  const combinedReviews = [
    ...customReviews.filter((r) => !existingIds.has(r.id)),
    ...baseProfile.reviews,
  ].map((review) => {
    const override = responsesByReviewId[review.id];
    const baseHelpful = review.helpfulCount ?? 0;
    const adjustedHelpful = helpfulReviewIds.includes(review.id)
      ? baseHelpful + 1
      : baseHelpful;

    return {
      ...review,
      helpfulCount: adjustedHelpful,
      professionalResponse: override?.text ?? review.professionalResponse,
      professionalResponseDate:
        override?.date ?? review.professionalResponseDate,
    };
  });

  if (customReviews.length === 0) {
    return {
      ...baseProfile,
      reviews: combinedReviews,
    };
  }

  // Only adjust summary rating & counts proportionally when user adds new reviews
  const nextCount = baseProfile.reviewCount + customReviews.length;
  const baseWeight = baseProfile.rating * baseProfile.reviewCount;
  const customWeight = customReviews.reduce((acc, r) => acc + r.rating, 0);
  const nextRating = Number(((baseWeight + customWeight) / nextCount).toFixed(1));

  const countsByStar: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const bar of baseProfile.ratingBreakdown) {
    countsByStar[bar.stars] = Math.round(
      (bar.percentage / 100) * baseProfile.reviewCount
    );
  }
  for (const r of customReviews) {
    const clamped = Math.max(1, Math.min(5, Math.round(r.rating)));
    countsByStar[clamped] = (countsByStar[clamped] ?? 0) + 1;
  }

  const nextBreakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    percentage: Math.round(((countsByStar[stars] ?? 0) / nextCount) * 100),
  }));

  return {
    ...baseProfile,
    rating: nextRating,
    reviewCount: nextCount,
    ratingBreakdown: nextBreakdown,
    reviews: combinedReviews,
  };
}

export function extractPortfolioCategories(
  items: ProfilePortfolioItem[]
): string[] {
  const seen = new Set<string>();
  const cats: string[] = ["All Projects"];
  for (const item of items) {
    const cat = (item.filterCategory || item.category || "").trim();
    if (cat && !seen.has(cat)) {
      seen.add(cat);
      cats.push(cat);
    }
  }
  return cats;
}

export function filterAndSortPortfolioItems(
  items: ProfilePortfolioItem[],
  category: string,
  sortBy: ProfileSortPortfolio
): ProfilePortfolioItem[] {
  const filtered =
    !category || category === "All Projects"
      ? items
      : items.filter(
          (item) =>
            (item.filterCategory || item.category).toLowerCase() ===
            category.toLowerCase()
        );

  return [...filtered].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    const dateA = a.createdAtISO ?? "";
    const dateB = b.createdAtISO ?? "";
    if (sortBy === "oldest") {
      return dateA.localeCompare(dateB);
    }
    return dateB.localeCompare(dateA);
  });
}

export function filterAndSortReviews(
  reviews: ProfileReviewItem[],
  sortBy: ProfileSortReview,
  filterBy: ProfileReviewFilter
): ProfileReviewItem[] {
  const filtered = reviews.filter((review) => {
    if (filterBy === "5") return review.rating === 5;
    if (filterBy === "4") return review.rating === 4;
    if (filterBy === "3") return review.rating <= 3;
    if (filterBy === "with-photos") return Boolean(review.photos?.length);
    if (filterBy === "needs-reply") return !review.professionalResponse;
    return true;
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === "highest") {
      if (b.rating !== a.rating) return b.rating - a.rating;
    } else if (sortBy === "lowest") {
      if (a.rating !== b.rating) return a.rating - b.rating;
    }
    const dateA = a.createdAtISO ?? "";
    const dateB = b.createdAtISO ?? "";
    return dateB.localeCompare(dateA);
  });
}

export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number
): {
  items: T[];
  currentPage: number;
  totalPages: number;
} {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    currentPage: safePage,
    totalPages,
  };
}
