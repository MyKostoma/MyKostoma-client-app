import type {
  ConsumerRequestItem,
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
