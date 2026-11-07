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
