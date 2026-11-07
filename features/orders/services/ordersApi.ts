"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  cancelOrderLocal,
  confirmOrderCompletionLocal,
  depositOrderFundsLocal,
  selectAllOrders,
  selectOrdersActiveTab,
  selectOrdersSearchQuery,
  setOrdersActiveTab,
  setOrdersSearchQuery,
  submitOrderReviewLocal,
  useCancelOrderMutation,
  useDepositOrderFundsMutation,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useRaiseOrderDisputeMutation,
  useReleaseOrderMilestoneMutation,
  useSubmitOrderReviewMutation,
} from "@/store/slices/ordersSlice";
import { DEFAULT_CONSUMER_ORDERS } from "../data";
import type {
  ConsumerOrderItem,
  OrderDetailViewMode,
  OrderReviewFormValues,
  OrderTabFilter,
} from "../types";
import {
  INITIAL_ORDER_REVIEW_VALUES,
  filterOrdersList,
  findOrderById,
  resolveNextEscrowMilestone,
} from "./ordersHelpers";

export function useOrdersListService(initialOrders?: ConsumerOrderItem[]) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const storeOrders = useAppSelector(selectAllOrders);
  const activeTab = useAppSelector(selectOrdersActiveTab);
  const searchQuery = useAppSelector(selectOrdersSearchQuery);

  const { data: apiOrders, isFetching } = useGetOrdersQuery(
    { tab: activeTab, search: searchQuery },
    { skip: false }
  );

  const [depositOrderFundsMutation] = useDepositOrderFundsMutation();
  const [releaseOrderMilestoneMutation] = useReleaseOrderMilestoneMutation();
  const [cancelOrderMutation] = useCancelOrderMutation();

  const orders =
    initialOrders ?? apiOrders ?? storeOrders ?? DEFAULT_CONSUMER_ORDERS;

  const [releasingOrder, setReleasingOrder] =
    useState<ConsumerOrderItem | null>(null);
  const [cancellingOrder, setCancellingOrder] =
    useState<ConsumerOrderItem | null>(null);

  const filteredOrders = useMemo(
    () => filterOrdersList(orders, activeTab, searchQuery),
    [orders, activeTab, searchQuery]
  );

  const setActiveTab = (tab: OrderTabFilter) => {
    dispatch(setOrdersActiveTab(tab));
  };

  const setSearchQuery = (query: string) => {
    dispatch(setOrdersSearchQuery(query));
  };

  const handleViewDetails = (order: ConsumerOrderItem) => {
    router.push(`/orders/${encodeURIComponent(order.id)}`);
  };

  const handleMessagePro = (order: ConsumerOrderItem) => {
    toast.info(`Opening chat with ${order.providerName}...`);
    router.push("/messages");
  };

  const handleDepositFunds = async (order: ConsumerOrderItem) => {
    try {
      await depositOrderFundsMutation({ id: order.id }).unwrap();
    } catch {
      dispatch(depositOrderFundsLocal(order.id));
    }
    toast.success(
      `Escrow funds (${order.totalAmount}) deposited for Order #${order.code}!`
    );
  };

  const handleConfirmReleaseMilestone = async () => {
    if (!releasingOrder) return;
    try {
      await releaseOrderMilestoneMutation({ id: releasingOrder.id }).unwrap();
    } catch {
      dispatch(confirmOrderCompletionLocal(releasingOrder.id));
    }
    toast.success(
      `Milestone funds released to ${releasingOrder.providerName}!`
    );
    const targetId = releasingOrder.id;
    setReleasingOrder(null);
    router.push(`/orders/${encodeURIComponent(targetId)}/completion`);
  };

  const handleConfirmCancelOrder = async (reason: string) => {
    if (!cancellingOrder) return;
    try {
      await cancelOrderMutation({
        id: cancellingOrder.id,
        reason,
      }).unwrap();
    } catch {
      dispatch(cancelOrderLocal({ id: cancellingOrder.id, reason }));
    }
    toast.success(`Order #${cancellingOrder.code} has been cancelled.`);
    setCancellingOrder(null);
  };

  const handleDownloadReceipt = (order: ConsumerOrderItem) => {
    toast.success(`Downloading receipt for Order #${order.code}...`);
  };

  const handleReorderService = (order: ConsumerOrderItem) => {
    toast.info(`Starting a new request with ${order.providerName}...`);
    router.push("/requests/new");
  };

  const handleToggleFilters = () => {
    toast.info("Order filter options coming soon.");
  };

  const handleContactSupport = () => {
    toast.info("Connecting you with MyKostoma Resolution Center...");
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredOrders,
    isFetching,
    releasingOrder,
    setReleasingOrder,
    cancellingOrder,
    setCancellingOrder,
    handleViewDetails,
    handleMessagePro,
    handleDepositFunds,
    handleConfirmReleaseMilestone,
    handleConfirmCancelOrder,
    handleDownloadReceipt,
    handleReorderService,
    handleToggleFilters,
    handleContactSupport,
  };
}

export function useOrderDetailService(
  orderId = "ORD-5547",
  initialMode: OrderDetailViewMode = "overview"
) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeOrders = useAppSelector(selectAllOrders);

  const { data: apiOrder } = useGetOrderByIdQuery(orderId);
  const [releaseOrderMilestoneMutation] = useReleaseOrderMilestoneMutation();

  const [activeMode, setActiveMode] =
    useState<OrderDetailViewMode>(initialMode);
  const [releaseModalOpen, setReleaseModalOpen] = useState(false);

  const order = useMemo<ConsumerOrderItem>(() => {
    return (
      apiOrder ??
      findOrderById(storeOrders, orderId) ??
      findOrderById(DEFAULT_CONSUMER_ORDERS, orderId) ??
      DEFAULT_CONSUMER_ORDERS[1] ??
      DEFAULT_CONSUMER_ORDERS[0]
    );
  }, [apiOrder, storeOrders, orderId]);

  const completedReferenceOrder = useMemo(
    () =>
      storeOrders.find((o) => o.code === "ORD-7720") ??
      DEFAULT_CONSUMER_ORDERS.find((o) => o.code === "ORD-7720"),
    [storeOrders]
  );

  const cancelledReferenceOrder = useMemo(
    () =>
      storeOrders.find((o) => o.code === "ORD-9012") ??
      DEFAULT_CONSUMER_ORDERS.find((o) => o.code === "ORD-9012"),
    [storeOrders]
  );

  const nextMilestone = useMemo(
    () => resolveNextEscrowMilestone(order),
    [order]
  );

  const handleBackToOrders = () => {
    router.push("/orders");
  };

  const handleMessagePro = () => {
    toast.info(`Opening chat with ${order.providerName}...`);
    router.push("/messages");
  };

  const handleManageOrder = () => {
    setActiveMode((prev) => (prev === "overview" ? "status" : "completion"));
  };

  const handleViewOriginalQuote = () => {
    router.push(`/quotations/${encodeURIComponent(order.quoteId)}`);
  };

  const handleViewProfile = () => {
    router.push(`/profile/${encodeURIComponent(order.providerId)}`);
  };

  const handleLeaveReview = () => {
    router.push(`/orders/${encodeURIComponent(order.id)}/feedback`);
  };

  const handleDisputeOrder = () => {
    router.push(`/orders/${encodeURIComponent(order.id)}/feedback`);
  };

  const handleContactSupport = () => {
    toast.info("Connecting you with MyKostoma Support...");
  };

  const handleViewPaymentHistory = () => {
    toast.info(`Viewing escrow payment ledger for Order #${order.code}...`);
  };

  const handleViewProjectSpecs = () => {
    router.push(`/requests/${encodeURIComponent(order.requestId)}`);
  };

  const handleEscrowFaq = () => {
    toast.info(
      "Escrow holds your payment safely and only releases milestones upon your approval."
    );
  };

  const handleViewReceipt = () => {
    toast.success(`Downloading official receipt for Order #${order.code}...`);
  };

  const handleConfirmRelease = async () => {
    try {
      await releaseOrderMilestoneMutation({
        id: order.id,
        milestoneId: nextMilestone.id,
      }).unwrap();
    } catch {
      dispatch(confirmOrderCompletionLocal(order.id));
    }
    setReleaseModalOpen(false);
    setActiveMode("completion");
    toast.success(
      `Escrow funds released to ${order.providerName}! Order marked as completed.`
    );
  };

  return {
    order,
    completedReferenceOrder,
    cancelledReferenceOrder,
    nextMilestone,
    activeMode,
    setActiveMode,
    releaseModalOpen,
    setReleaseModalOpen,
    handleBackToOrders,
    handleMessagePro,
    handleManageOrder,
    handleViewOriginalQuote,
    handleViewProfile,
    handleLeaveReview,
    handleDisputeOrder,
    handleContactSupport,
    handleViewPaymentHistory,
    handleViewProjectSpecs,
    handleEscrowFaq,
    handleViewReceipt,
    handleConfirmRelease,
  };
}

export function useOrderFeedbackService(orderId = "ORD-8821") {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeOrders = useAppSelector(selectAllOrders);

  const [submitReviewMutation] = useSubmitOrderReviewMutation();
  const [raiseDisputeMutation] = useRaiseOrderDisputeMutation();

  const order = useMemo<ConsumerOrderItem>(() => {
    return (
      findOrderById(storeOrders, orderId) ??
      findOrderById(DEFAULT_CONSUMER_ORDERS, orderId) ??
      DEFAULT_CONSUMER_ORDERS[0]
    );
  }, [storeOrders, orderId]);

  const [formValues, setFormValues] = useState<OrderReviewFormValues>(
    INITIAL_ORDER_REVIEW_VALUES
  );
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);

  const handleBackToOrder = () => {
    router.push(`/orders/${encodeURIComponent(order.id)}`);
  };

  const handleMessagePro = () => {
    toast.info(`Opening chat with ${order.providerName}...`);
    router.push("/messages");
  };

  const handleSubmitReview = async () => {
    try {
      await submitReviewMutation({
        id: order.id,
        values: formValues,
      }).unwrap();
    } catch {
      dispatch(
        submitOrderReviewLocal({ id: order.id, rating: formValues.rating })
      );
    }
    toast.success(
      `Thank you! Your ${formValues.rating}.0-star review for ${order.providerName} has been submitted.`
    );
    router.push(`/orders/${encodeURIComponent(order.id)}`);
  };

  const handleConfirmDispute = async (reason: string, description: string) => {
    try {
      await raiseDisputeMutation({
        id: order.id,
        values: { reason, description },
      }).unwrap();
    } catch {
      // Fallback simulated dispute creation
    }
    setDisputeModalOpen(false);
    toast.success(
      `Resolution ticket opened for Order #${order.code}. Escrow funds are now frozen pending review.`
    );
    router.push(`/orders/${encodeURIComponent(order.id)}`);
  };

  const handleLearnResolutionPolicy = () => {
    toast.info(
      "MyKostoma's Resolution Center mediates all escrow disputes within 24–48 business hours."
    );
  };

  return {
    order,
    formValues,
    setFormValues,
    disputeModalOpen,
    setDisputeModalOpen,
    handleBackToOrder,
    handleMessagePro,
    handleSubmitReview,
    handleConfirmDispute,
    handleLearnResolutionPolicy,
  };
}
