import type {
  ConsumerRequestItem,
  ProfessionalQuoteMilestone,
  ProfessionalRequestItem,
  ProfessionalRequestsFilterState,
  RequestFormValues,
  RequestTabFilter,
} from "../types";

export const INITIAL_REQUEST_FORM_VALUES: RequestFormValues = {
  title: "",
  category: "",
  description: "",
  budgetMin: "",
  budgetMax: "",
  timeline: "",
  location: "",
  photos: [],
};

export function filterRequestsList(
  requests: ConsumerRequestItem[],
  activeTab: RequestTabFilter,
  searchQuery: string
): ConsumerRequestItem[] {
  const q = searchQuery.trim().toLowerCase();
  return requests.filter((req) => {
    if (activeTab !== "all" && req.status !== activeTab) {
      return false;
    }
    if (q) {
      const text =
        `${req.title} ${req.category} ${req.location} ${req.code}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });
}

export function findRequestById(
  requests: ConsumerRequestItem[],
  requestId: string
): ConsumerRequestItem | undefined {
  return requests.find(
    (r) => r.id.toLowerCase() === requestId.toLowerCase()
  );
}

// ============================================================================
// PROFESSIONAL REQUESTS HELPERS
// ============================================================================

export function filterProfessionalRequests(
  requests: ProfessionalRequestItem[],
  filters: ProfessionalRequestsFilterState
): ProfessionalRequestItem[] {
  return requests.filter((req) => {
    if (filters.category !== "all" && req.categorySlug !== filters.category) {
      return false;
    }
    if (
      filters.budgetRange !== "any" &&
      req.budgetTier !== filters.budgetRange
    ) {
      return false;
    }
    if (filters.location !== "all" && req.locationType !== filters.location) {
      return false;
    }
    return true;
  });
}

export function findProfessionalRequestById(
  requests: ProfessionalRequestItem[],
  requestId: string
): ProfessionalRequestItem | undefined {
  return requests.find(
    (r) =>
      r.id.toLowerCase() === requestId.toLowerCase() ||
      r.code.toLowerCase() === requestId.toLowerCase()
  );
}

export function parseNairaAmount(value: string | number): number {
  if (typeof value === "number") return value;
  const cleaned = value.replace(/[^0-9.]/g, "");
  return Number(cleaned) || 0;
}

export function formatNairaCompact(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function calculateMilestoneAllocation(
  milestones: ProfessionalQuoteMilestone[]
): number {
  return milestones.reduce((sum, m) => sum + parseNairaAmount(m.amount), 0);
}

