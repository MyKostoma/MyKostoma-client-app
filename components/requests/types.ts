export type RequestStatus = "open" | "in-progress" | "completed" | "closed";

export type RequestTabFilter = "all" | "open" | "in-progress" | "completed";

export type RequestsPageViewState =
  | "default"
  | "loading"
  | "error"
  | "states-showcase";

export type MarketplaceDetailVariant =
  | "open-with-quotes"
  | "open-no-quotes"
  | "closed";

export interface RequestQuoteItem {
  id: string;
  providerName: string;
  rating?: number;
  reviewCount?: number;
  receivedAtLabel?: string;
  amount: string;
  avatarUrl: string;
}

export interface RequestActivityItem {
  id: string;
  title: string;
  subtitle: string;
  dotVariant: "success" | "warning" | "primary" | "muted";
}

export interface ConsumerRequestItem {
  id: string;
  code: string;
  title: string;
  category: string;
  dateLabel: string;
  postedDateFull: string;
  budget: string;
  budgetMin?: string;
  budgetMax?: string;
  budgetRangeLabel?: string;
  location: string;
  addressFull?: string;
  timeline: string;
  quotesCount: number;
  quotesBadgeLabel: string;
  status: RequestStatus;
  description: string;
  extraDescription?: string;
  photosCount?: number;
  quotes: RequestQuoteItem[];
  marketplaceQuotes?: RequestQuoteItem[];
  closedDateLabel?: string;
}

export interface RequestFormValues {
  title: string;
  category: string;
  description: string;
  budgetMin: string;
  budgetMax: string;
  timeline: string;
  location: string;
  photos: string[];
}
