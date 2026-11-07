export type OrderStatus =
  | "in-progress"
  | "pending"
  | "awaiting-confirmation"
  | "completed"
  | "cancelled";

export type OrderTabFilter = "all" | "active" | "completed" | "cancelled";

export type OrderDetailViewMode = "overview" | "status" | "completion";

export type MilestoneStatus = "released" | "in-escrow" | "pending";

export interface OrderMilestoneItem {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  status: MilestoneStatus;
}

export interface OrderTimelineStep {
  id: string;
  label: string;
  dateLabel: string;
  state: "completed" | "current" | "upcoming";
  statusSublabel?: string;
}

export interface OrderLatestUpdate {
  title: string;
  description: string;
  updatedAgo: string;
}

export interface OrderEscrowSummary {
  totalAmount: string;
  fundsReleased: string;
  remainingInEscrow: string;
  nextMilestoneName: string;
}

export interface ConsumerOrderItem {
  id: string;
  code: string;
  title: string;
  serviceArea: string;
  status: OrderStatus;
  providerId: string;
  providerName: string;
  providerVerified?: boolean;
  providerAvatar?: string;
  providerRating: number;
  providerReviewsCount: number;
  providerLocation: string;
  providerMemberSince: string;
  providerResponseTime: string;
  workAddress: string;
  quoteId: string;
  requestId: string;
  totalAmount: string;
  escrowStatusLabel: string;
  orderedAt: string;
  startedAt?: string;
  expectedStartAt?: string;
  estimatedCompletionAt?: string;
  completedAt?: string;
  cancelledReason?: string;
  refundStatusLabel?: string;
  lastUpdatedLabel?: string;
  completionPercentage: number;
  clientRating?: number;
  timelineSteps: OrderTimelineStep[];
  lifecycleSteps: OrderTimelineStep[];
  milestones: OrderMilestoneItem[];
  latestUpdate?: OrderLatestUpdate;
  escrowSummary: OrderEscrowSummary;
}

export interface OrderReviewFormValues {
  rating: number;
  comment: string;
  photos: string[];
  isAnonymous: boolean;
}

export interface OrderDisputeFormValues {
  reason: string;
  description: string;
}

export interface OrderStatusBadgeProps {
  status:
    | OrderStatus
    | "awaiting-feedback"
    | "released"
    | "in-escrow"
    | "secured";
  variant?: "card" | "detail" | "milestone";
  customLabel?: string;
  className?: string;
}

export interface OrderTabOption {
  id: OrderTabFilter;
  label: string;
}

export interface OrdersFilterTabsProps {
  activeTab: OrderTabFilter;
  onTabChange: (tab: OrderTabFilter) => void;
  className?: string;
}

export interface OrderCardProps {
  order: ConsumerOrderItem;
  onViewDetails: (order: ConsumerOrderItem) => void;
  onMessagePro: (order: ConsumerOrderItem) => void;
  onConfirmMilestone: (order: ConsumerOrderItem) => void;
  onDepositFunds: (order: ConsumerOrderItem) => void;
  onCancelOrder: (order: ConsumerOrderItem) => void;
  onDownloadReceipt: (order: ConsumerOrderItem) => void;
  onReorderService: (order: ConsumerOrderItem) => void;
  className?: string;
}

export interface OrderSupportCardProps {
  onContactSupport?: () => void;
  className?: string;
}

export interface OrderDetailModeSwitchProps {
  activeMode: OrderDetailViewMode;
  onModeChange: (mode: OrderDetailViewMode) => void;
  className?: string;
}

export interface OrderDetailOverviewProps {
  order: ConsumerOrderItem;
  onViewOriginalQuote: () => void;
  onReleaseFinalMilestone: () => void;
  onViewProfile: () => void;
  onLeaveReview: () => void;
  onDisputeOrder: () => void;
  onContactSupport: () => void;
}

export interface OrderStatusWorkspaceProps {
  order: ConsumerOrderItem;
  onViewPaymentHistory: () => void;
  onReleaseRemainingFunds: () => void;
  onViewProjectSpecs: () => void;
  onDisputeOrder: () => void;
  onEscrowFaq: () => void;
}

export interface OrderCompletionWorkspaceProps {
  order: ConsumerOrderItem;
  completedReferenceOrder?: ConsumerOrderItem;
  cancelledReferenceOrder?: ConsumerOrderItem;
  onConfirmAndRelease: () => void;
  onRaiseConcern: () => void;
  onLeaveReview: () => void;
  onViewReceipt: () => void;
  onDisputeResolution: () => void;
  onViewHistory: () => void;
}

export interface OrderFeedbackFormProps {
  order: ConsumerOrderItem;
  values: OrderReviewFormValues;
  onChange: (values: OrderReviewFormValues) => void;
  onSubmitReview: () => void;
  onRaiseDispute: () => void;
  onLearnResolutionPolicy: () => void;
}
