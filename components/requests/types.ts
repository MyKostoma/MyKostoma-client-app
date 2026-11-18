export type RequestStatus = "open" | "in-progress" | "completed" | "closed";

export type RequestTabFilter =
  | "all"
  | "open"
  | "in-progress"
  | "completed"
  | "closed";

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

// ============================================================================
// PROFESSIONAL REQUESTS MODULE TYPES
// ============================================================================

export type ProfessionalRequestAvailabilityState =
  | "open"
  | "quote-submitted"
  | "unavailable"
  | "permission-error";

export interface ProfessionalRequestAttachment {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
}

export interface ProfessionalRequestClientInfo {
  name: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
  memberSince: string;
  verifiedIdentity: boolean;
  paymentMethodVerified: boolean;
}

export interface ProfessionalQuoteMilestone {
  id: string;
  name: string;
  amount: string;
}

export interface ProfessionalSubmittedQuote {
  totalPrice: number;
  totalPriceFormatted: string;
  estimatedDuration: string;
  professionalNote: string;
  milestones: { id: string; name: string; amountFormatted: string; amount: number }[];
  submittedAtLabel: string;
}

export interface ProfessionalRequestItem {
  id: string;
  code: string;
  title: string;
  category: string;
  categorySlug: string;
  postedAgoLabel: string;
  postedDateLabel: string;
  shortDescription: string;
  fullDescription: string[];
  budgetLabel: string;
  budgetRangeShort: string;
  budgetTier: "low" | "mid" | "high";
  location: string;
  locationType: "remote" | "hybrid" | "onsite";
  engagementType: string;
  timeline: string;
  requirements: string[];
  attachment?: ProfessionalRequestAttachment;
  client: ProfessionalRequestClientInfo;
  availabilityState: ProfessionalRequestAvailabilityState;
  restrictedCategory?: string;
  permissionReasons?: {
    id: string;
    label: string;
    isIssue: boolean;
  }[];
  submittedQuote?: ProfessionalSubmittedQuote;
}

export interface ProfessionalRequestsFilterState {
  category: string;
  budgetRange: string;
  location: string;
}

export interface ProfessionalSubmitQuoteFormValues {
  totalQuotePrice: string;
  estimatedDuration: string;
  professionalNote: string;
  milestones: ProfessionalQuoteMilestone[];
}

