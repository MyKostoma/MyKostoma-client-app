import type {
  ConsumerOrderItem,
  OrderMilestoneItem,
  OrderReviewFormValues,
  OrderTabFilter,
  ProfessionalOrderDisputeFormValues,
  ProfessionalOrderItem,
  ProfessionalOrderReviewFormValues,
  ProfessionalOrderTabFilter,
} from "../types";

export const INITIAL_ORDER_REVIEW_VALUES: OrderReviewFormValues = {
  rating: 4,
  comment: "",
  photos: [],
  isAnonymous: false,
};

export const INITIAL_PRO_ORDER_DISPUTE_VALUES: ProfessionalOrderDisputeFormValues =
  {
    reason: "",
    description: "",
    evidenceFiles: ["chat_history_export.pdf"],
  };

export const INITIAL_PRO_ORDER_REVIEW_VALUES: ProfessionalOrderReviewFormValues =
  {
    overallRating: 4,
    communicationRating: 5,
    requirementsClarityRating: 4,
    feedback: "",
    wouldRecommend: true,
  };

export function filterOrdersList(
  orders: ConsumerOrderItem[],
  activeTab: OrderTabFilter,
  searchQuery: string
): ConsumerOrderItem[] {
  const q = searchQuery.trim().toLowerCase();

  return orders.filter((order) => {
    if (activeTab === "active") {
      if (
        order.status !== "in-progress" &&
        order.status !== "pending" &&
        order.status !== "awaiting-confirmation"
      ) {
        return false;
      }
    } else if (activeTab === "completed") {
      if (order.status !== "completed") return false;
    } else if (activeTab === "cancelled") {
      if (order.status !== "cancelled") return false;
    }

    if (q) {
      const haystack =
        `${order.title} ${order.providerName} ${order.code} ${order.serviceArea}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

export function findOrderById(
  orders: ConsumerOrderItem[],
  orderId: string
): ConsumerOrderItem | undefined {
  return orders.find(
    (o) =>
      o.id.toLowerCase() === orderId.toLowerCase() ||
      o.code.toLowerCase() === orderId.toLowerCase()
  );
}

export function resolveNextEscrowMilestone(
  order: ConsumerOrderItem
): OrderMilestoneItem {
  const active =
    order.milestones.find((m) => m.status === "in-escrow") ??
    order.milestones.find((m) => m.status === "pending") ??
    order.milestones[order.milestones.length - 1];

  return (
    active ?? {
      id: "ms-final",
      title: order.escrowSummary.nextMilestoneName || "Final Project Milestone",
      subtitle: "In Progress",
      amount:
        order.escrowSummary.remainingInEscrow !== "₦0.00"
          ? order.escrowSummary.remainingInEscrow
          : order.totalAmount,
      status: "in-escrow",
    }
  );
}

// ============================================================================
// PROFESSIONAL ORDERS HELPERS
// ============================================================================

export function filterProfessionalOrders(
  orders: ProfessionalOrderItem[],
  activeTab: ProfessionalOrderTabFilter,
  searchQuery: string
): ProfessionalOrderItem[] {
  const q = searchQuery.trim().toLowerCase();

  return orders.filter((order) => {
    if (activeTab === "pending" && order.status !== "pending") return false;
    if (activeTab === "active" && order.status !== "in-progress") return false;
    if (activeTab === "completed" && order.status !== "completed") return false;
    if (activeTab === "disputed" && order.status !== "disputed") return false;

    if (q) {
      const haystack =
        `${order.code} ${order.consumerName} ${order.serviceTitle} ${order.tableAmount}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

export function findProfessionalOrderById(
  orders: ProfessionalOrderItem[],
  orderId: string
): ProfessionalOrderItem | undefined {
  return orders.find(
    (o) =>
      o.id.toLowerCase() === orderId.toLowerCase() ||
      o.code.toLowerCase() === orderId.toLowerCase()
  );
}

