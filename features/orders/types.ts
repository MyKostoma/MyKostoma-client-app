import type {
  ConsumerOrderItem,
  MilestoneStatus,
  OrderDetailViewMode,
  OrderDisputeFormValues,
  OrderEscrowSummary,
  OrderLatestUpdate,
  OrderMilestoneItem,
  OrderReviewFormValues,
  OrderStatus,
  OrderTabFilter,
  OrderTimelineStep,
  ProfessionalOrderStatus,
  ProfessionalOrderTabFilter,
  ProfessionalEscrowStatus,
  ProfessionalOrderFileAttachment,
  ProfessionalOrderTimelineStep,
  ProfessionalEscrowTimelineStep,
  ProfessionalOrderItem,
  ProfessionalOrderDisputeFormValues,
  ProfessionalOrderReviewFormValues,
  ProfessionalOrderKpiCard,
} from "@/components/orders/types";

export type {
  ConsumerOrderItem,
  MilestoneStatus,
  OrderDetailViewMode,
  OrderDisputeFormValues,
  OrderEscrowSummary,
  OrderLatestUpdate,
  OrderMilestoneItem,
  OrderReviewFormValues,
  OrderStatus,
  OrderTabFilter,
  OrderTimelineStep,
  ProfessionalOrderStatus,
  ProfessionalOrderTabFilter,
  ProfessionalEscrowStatus,
  ProfessionalOrderFileAttachment,
  ProfessionalOrderTimelineStep,
  ProfessionalEscrowTimelineStep,
  ProfessionalOrderItem,
  ProfessionalOrderDisputeFormValues,
  ProfessionalOrderReviewFormValues,
  ProfessionalOrderKpiCard,
};

export interface OrdersListViewProps {
  initialOrders?: ConsumerOrderItem[];
  totalCountLabel?: string;
}

export interface OrderDetailViewProps {
  orderId?: string;
  initialMode?: OrderDetailViewMode;
}

export interface OrderFeedbackViewProps {
  orderId?: string;
}

export interface OrderDisputeViewProps {
  orderId?: string;
}
