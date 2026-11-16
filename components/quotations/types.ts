export type QuotationStatus = "pending" | "updated" | "accepted" | "rejected";

export type QuotationTabFilter =
  | "all"
  | "pending"
  | "accepted"
  | "comparison"
  | "rejected";

export interface QuotationBreakdownItem {
  id: string;
  label: string;
  amount: string;
  previousAmount?: string;
  savingsLabel?: string;
}

export interface QuotationRevisionEntry {
  id: string;
  versionLabel: string;
  versionBadge?: string;
  dateLabel: string;
  amount: string;
  note: string;
  isLatest?: boolean;
  breakdown?: QuotationBreakdownItem[];
}

export interface QuotationItem {
  id: string;
  code: string;
  status: QuotationStatus;
  versionBadge?: string;
  providerName: string;
  providerContactName?: string;
  providerRole: string;
  providerVerified?: boolean;
  rating: number;
  reviewsCount: number;
  jobsCompleted: number;
  warrantyLabel: string;
  requestId: string;
  requestCode: string;
  requestTitle: string;
  requestLocation: string;
  requestService: string;
  totalAmount: string;
  previousTotalAmount?: string;
  totalSavingsNote?: string;
  priceSubtitle?: string;
  estimatedDuration: string;
  durationDeltaBadge?: string;
  expiresAt: string;
  receivedAt: string;
  updatedAgo?: string;
  rejectedAt?: string;
  orderCode?: string;
  message: string;
  proposalSummary: string;
  breakdown: QuotationBreakdownItem[];
  revisions?: QuotationRevisionEntry[];
}

export interface QuotationRevisionFormValues {
  changesDescription: string;
  attachments: string[];
}

// ============================================================================
// PROFESSIONAL QUOTATIONS MODULE TYPES
// ============================================================================

export type ProfessionalQuotationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "completed";

export type ProfessionalQuotationTabFilter =
  | "all"
  | "pending"
  | "approved"
  | "rejected"
  | "completed";

export interface ProfessionalQuotationVersionItem {
  id: string;
  versionNumber: string;
  versionTitle: string;
  badgeLabel: string;
  timestampLabel: string;
  changeSummaryTitle: string;
  totalLabel: string;
  professionalNote: string;
  isCurrent?: boolean;
}

export interface ProfessionalQuotationClientReview {
  clientName: string;
  clientAvatarUrl?: string;
  verifiedLabel: string;
  rating: number;
  comment: string;
}

export interface ProfessionalQuotationItem {
  id: string;
  code: string;
  title: string;
  description: string;
  status: ProfessionalQuotationStatus;
  dateSubmitted: string;
  createdAtLabel: string;
  validUntilLabel: string;
  validityDateInput: string;
  validityPeriodLabel: string;
  duration: string;
  price: string;
  totalAmountFormatted: string;
  serviceFee: number;
  serviceFeeLabel: string;
  materialsCost: number;
  previousMaterialsCost?: number;
  logisticsCost: number;
  serviceRequested: string;
  consumerName: string;
  consumerAvatarUrl?: string;
  location: string;
  requestedDateTime: string;
  originalRequestDescription: string;
  professionalNote: string;
  consumerFeedback?: string;
  orderCode?: string;
  hiredDateLabel?: string;
  referenceCode?: string;
  rejectedDateLabel?: string;
  rejectionReason?: string;
  consumerRejectionNote?: string;
  nextStepsNote?: string;
  analysisNote?: string;
  completedDateTimeLabel?: string;
  completionDateLabel?: string;
  completedDurationLabel?: string;
  completionSummary?: string;
  completionPhotos?: string[];
  clientReview?: ProfessionalQuotationClientReview;
  versions: ProfessionalQuotationVersionItem[];
}

export interface ProfessionalUpdateQuoteFormValues {
  serviceFee: string;
  materialsCost: string;
  logisticsCost: string;
  estimatedDuration: string;
  validityPeriod: string;
  updatedNote: string;
}

export interface ProfessionalQuotationKpiMetric {
  id: string;
  label: string;
  value: string;
  showStar?: boolean;
}
