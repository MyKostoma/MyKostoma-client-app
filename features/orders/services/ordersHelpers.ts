import type {
  ConsumerOrderItem,
  OrderMilestoneItem,
  OrderReviewFormValues,
  OrderTabFilter,
} from "../types";

export const INITIAL_ORDER_REVIEW_VALUES: OrderReviewFormValues = {
  rating: 4,
  comment: "",
  photos: [],
  isAnonymous: false,
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
