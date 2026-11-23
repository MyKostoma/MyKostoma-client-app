export type ReviewsTabId = "received" | "given" | "pending";

export type ReviewDirection = "received" | "given";

export type ReviewRatingFilter = "all" | "5" | "4" | "3" | "2-below";

export type ReviewResponseStatusFilter =
  | "all"
  | "responded"
  | "unresponded"
  | "requires-attention";

export type ReviewSortOption = "recent" | "highest" | "lowest";

export interface ReviewResponseRecord {
  text: string;
  repliedAtLabel: string;
  repliedAtISO: string;
  editRequested?: boolean;
}

export interface ReviewRecord {
  id: string;
  direction: ReviewDirection;
  authorName: string;
  authorRole: string;
  authorAvatarUrl: string;
  recipientName: string;
  recipientRole: string;
  recipientAvatarUrl: string;
  rating: number;
  headline?: string;
  comment: string;
  dateLabel: string;
  createdAtISO: string;
  orderId: string;
  orderCode: string;
  serviceTitle: string;
  verifiedPurchase: boolean;
  locationLabel: string;
  requiresAttention?: boolean;
  response?: ReviewResponseRecord;
}

export interface PendingReviewOrder {
  id: string;
  orderId: string;
  orderCode: string;
  targetRole: "consumer" | "professional";
  recipientName: string;
  recipientSubtitle: string;
  recipientAvatarUrl: string;
  serviceTitle: string;
  completedDateLabel: string;
  feeFormatted: string;
}

export interface ReviewsKpiSummary {
  averageRating: number;
  totalReviews: number;
  responseRatePercent: number;
}

export interface ReviewsTabsNavProps {
  activeTab: ReviewsTabId;
  receivedCount: number;
  givenCount: number;
  pendingCount: number;
  onTabChange: (tab: ReviewsTabId) => void;
  className?: string;
}

export interface ReviewsKpiRowProps {
  summary: ReviewsKpiSummary;
  className?: string;
}

export interface ReviewsFilterBarProps {
  isOpen: boolean;
  ratingFilter: ReviewRatingFilter;
  responseStatusFilter: ReviewResponseStatusFilter;
  sortBy: ReviewSortOption;
  activeFilterCount: number;
  showResponseStatusFilter?: boolean;
  onRatingChange: (rating: ReviewRatingFilter) => void;
  onResponseStatusChange: (status: ReviewResponseStatusFilter) => void;
  onSortChange: (sort: ReviewSortOption) => void;
  onResetFilters: () => void;
}

export interface ReviewCardProps {
  review: ReviewRecord;
  isReported?: boolean;
  onOpenDetail: (reviewId: string) => void;
  onRespondClick: (reviewId: string) => void;
  onSaveInlineResponse: (reviewId: string, text: string) => void;
  onRequestDeleteResponse: (review: ReviewRecord) => void;
  onRequestReportReview: (review: ReviewRecord) => void;
}

export interface PendingReviewCardProps {
  order: PendingReviewOrder;
  onQuickRate: (order: PendingReviewOrder) => void;
  onRateOnPage: (orderId: string) => void;
}

export interface ReviewsPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  itemNoun?: string;
  onPageChange: (page: number) => void;
}

export interface ReviewsEmptyStateProps {
  tab: ReviewsTabId;
  hasActiveFilters: boolean;
  onClearFilters?: () => void;
  onBrowseOrders?: () => void;
}

export interface ReviewDetailCardProps {
  review: ReviewRecord;
}

export interface ReviewResponsePanelProps {
  review: ReviewRecord;
  draftText: string;
  isSavingDraft?: boolean;
  isSubmitting?: boolean;
  isEditRequested?: boolean;
  onDraftChange: (value: string) => void;
  onSaveDraft: () => void;
  onSubmitResponse: () => void;
  onRequestEdit: () => void;
}

export interface RateConsumerFormProps {
  order: PendingReviewOrder;
  rating: number;
  comment: string;
  isSubmitting?: boolean;
  onRatingChange: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export interface ReviewSuccessStateProps {
  title?: string;
  description?: string;
  backLabel?: string;
  redirectSeconds?: number;
  onBackToReviews: () => void;
}
