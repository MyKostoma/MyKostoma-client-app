export type {
  PendingReviewOrder,
  ReviewDirection,
  ReviewRatingFilter,
  ReviewRecord,
  ReviewResponseRecord,
  ReviewResponseStatusFilter,
  ReviewsKpiSummary,
  ReviewSortOption,
  ReviewsTabId,
} from "@/components/reviews/types";

export interface ReviewDetailViewProps {
  reviewId: string;
}

export interface RateConsumerViewProps {
  orderId: string;
}

export interface SubmitReviewResponsePayload {
  reviewId: string;
  text: string;
}

export interface SubmitNewReviewPayload {
  orderId: string;
  rating: number;
  comment: string;
  recipientName: string;
  targetRole: "consumer" | "professional";
  serviceTitle: string;
  completedDateLabel: string;
}

export interface ReportReviewPayload {
  reviewId: string;
  reason: string;
  details?: string;
}

export interface RequestResponseEditPayload {
  reviewId: string;
  revisedText: string;
  reason: string;
}
