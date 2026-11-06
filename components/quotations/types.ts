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

