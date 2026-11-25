export type DisputeStatus = "open" | "under-review" | "resolved" | "archived";

export type DisputeEscrowStatus = "frozen" | "released" | "refunded" | "split";

export type DisputeTabKey = "active" | "resolved";

export type DisputeDateRangeFilter = "all" | "30d" | "90d";

export type DisputeResolutionPath =
  | "release-to-professional"
  | "refund-to-consumer"
  | "split";

export interface DisputeEvidenceAttachment {
  id: string;
  label: string;
  fileName: string;
  fileType: "image" | "document";
  previewUrl?: string;
  sizeLabel?: string;
}

export interface DisputeResponseEntry {
  id: string;
  authorName: string;
  authorRole: "consumer" | "professional" | "admin";
  authorAvatarUrl?: string;
  timestampLabel: string;
  message: string;
  attachments?: DisputeEvidenceAttachment[];
}

export interface DisputeTimelineEntry {
  id: string;
  title: string;
  timestampLabel: string;
  state: "completed" | "current" | "upcoming";
  note?: string;
}

export interface DisputeResolutionProposal {
  path: DisputeResolutionPath;
  splitConsumerPercent?: number;
  note?: string;
  proposedByRole: "consumer" | "professional";
  proposedAtLabel: string;
  finalized: boolean;
}

export interface DisputeCase {
  id: string;
  code: string;
  orderId: string;
  orderCode: string;
  serviceTitle: string;
  totalAmount: number;
  currency: string;
  escrowStatus: DisputeEscrowStatus;
  consumerName: string;
  consumerAvatarUrl?: string;
  professionalName: string;
  professionalAvatarUrl?: string;
  dateRaisedLabel: string;
  createdAtISO: string;
  status: DisputeStatus;
  reason: string;
  description: string;
  timeline: DisputeTimelineEntry[];
  responses: DisputeResponseEntry[];
  resolutionProposal?: DisputeResolutionProposal;
}

export interface DisputableOrderOption {
  id: string;
  code: string;
  serviceTitle: string;
  counterpartyName: string;
  counterpartyRole: "consumer" | "professional";
  counterpartyAvatarUrl?: string;
  totalAmount: number;
  amountFormatted: string;
}

export interface DisputeKpiSummary {
  avgResolutionDays: string;
  avgResolutionTrend: string;
  successRatePercent: string;
  successRateTrend: string;
}

export interface DisputesTabsProps {
  activeTab: DisputeTabKey;
  activeCount: number;
  resolvedCount: number;
  onTabChange: (tab: DisputeTabKey) => void;
}

export interface DisputesToolbarProps {
  searchQuery: string;
  statusFilter: "all" | DisputeStatus;
  dateRangeFilter: DisputeDateRangeFilter;
  includeArchived: boolean;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: "all" | DisputeStatus) => void;
  onDateRangeFilterChange: (value: DisputeDateRangeFilter) => void;
  onIncludeArchivedChange: (value: boolean) => void;
  onResetFilters: () => void;
  onExportCsv: () => void;
}

export interface DisputesTableProps {
  disputes: DisputeCase[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  isProfessional: boolean;
  onPageChange: (page: number) => void;
  onArchiveDispute: (disputeId: string) => void;
  onRestoreDispute: (disputeId: string) => void;
}

export interface DisputesEmptyStateProps {
  variant: "no-disputes" | "no-matches";
  onRaiseDispute: () => void;
  onClearFilters: () => void;
  onReadGuidelines: () => void;
}

export interface DisputesSummaryCardsProps {
  summary: DisputeKpiSummary;
  onReadDocumentation: () => void;
}

export interface DisputeRelatedOrderCardProps {
  dispute: DisputeCase;
  totalAmountFormatted: string;
}

export interface DisputeEvidenceThreadProps {
  responses: DisputeResponseEntry[];
  isProfessional: boolean;
  isResolved: boolean;
  onPreviewAttachment: (attachment: DisputeEvidenceAttachment) => void;
  onAddEvidence: () => void;
}

export interface DisputeTimelineCardProps {
  timeline: DisputeTimelineEntry[];
}

export interface DisputeResolutionCardProps {
  dispute: DisputeCase;
  selectedPath: DisputeResolutionPath | null;
  splitConsumerPercent: number;
  resolutionNote: string;
  isFinalizing: boolean;
  isProfessional: boolean;
  onSelectPath: (path: DisputeResolutionPath) => void;
  onSplitPercentChange: (percent: number) => void;
  onResolutionNoteChange: (note: string) => void;
  onFinalizeDecision: () => void;
}
