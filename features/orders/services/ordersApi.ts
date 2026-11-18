"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  cancelOrderLocal,
  completeProOrderLocal,
  confirmOrderCompletionLocal,
  depositOrderFundsLocal,
  disputeProOrderLocal,
  selectAllOrders,
  selectAllProOrders,
  selectOrdersActiveTab,
  selectOrdersSearchQuery,
  selectProOrdersActiveTab,
  selectProOrdersPage,
  selectProOrdersSearchQuery,
  setOrdersActiveTab,
  setOrdersSearchQuery,
  setProOrdersActiveTab,
  setProOrdersPage,
  setProOrdersSearchQuery,
  startProOrderLocal,
  submitOrderReviewLocal,
  useCancelOrderMutation,
  useCompleteProfessionalOrderMutation,
  useDepositOrderFundsMutation,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useGetProfessionalOrderByIdQuery,
  useGetProfessionalOrdersQuery,
  useRaiseOrderDisputeMutation,
  useReleaseOrderMilestoneMutation,
  useStartProfessionalOrderMutation,
  useSubmitOrderReviewMutation,
  useSubmitProfessionalOrderDisputeMutation,
  useSubmitProfessionalOrderReviewMutation,
} from "@/store/slices/ordersSlice";
import {
  DEFAULT_CONSUMER_ORDERS,
  DEFAULT_PROFESSIONAL_ORDERS,
  PRO_ORDERS_KPI_CARDS,
} from "../data";
import type {
  ConsumerOrderItem,
  OrderDetailViewMode,
  OrderReviewFormValues,
  OrderTabFilter,
  ProfessionalOrderDisputeFormValues,
  ProfessionalOrderItem,
  ProfessionalOrderReviewFormValues,
  ProfessionalOrderTabFilter,
} from "../types";
import {
  INITIAL_ORDER_REVIEW_VALUES,
  INITIAL_PRO_ORDER_DISPUTE_VALUES,
  INITIAL_PRO_ORDER_REVIEW_VALUES,
  filterOrdersList,
  filterProfessionalOrders,
  findOrderById,
  findProfessionalOrderById,
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

// ============================================================================
// PROFESSIONAL ORDERS SERVICE HOOKS
// ============================================================================

export function useProfessionalOrdersListService() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const storeOrders = useAppSelector(selectAllProOrders);
  const activeTab = useAppSelector(selectProOrdersActiveTab);
  const searchQuery = useAppSelector(selectProOrdersSearchQuery);
  const currentPage = useAppSelector(selectProOrdersPage);

  const { data: apiOrders, isFetching } = useGetProfessionalOrdersQuery(
    { tab: activeTab, search: searchQuery },
    { skip: false }
  );
  const [startOrderMutation] = useStartProfessionalOrderMutation();

  const orders = apiOrders ?? storeOrders ?? DEFAULT_PROFESSIONAL_ORDERS;

  const filteredOrders = useMemo(
    () => filterProfessionalOrders(orders, activeTab, searchQuery),
    [orders, activeTab, searchQuery]
  );

  const totalCount = 42;
  const totalPages = 3;

  const setActiveTab = (tab: ProfessionalOrderTabFilter) => {
    dispatch(setProOrdersActiveTab(tab));
  };

  const setSearchQuery = (query: string) => {
    dispatch(setProOrdersSearchQuery(query));
  };

  const setCurrentPage = (page: number) => {
    dispatch(setProOrdersPage(page));
  };

  const handleViewOrder = (order: ProfessionalOrderItem) => {
    router.push(`/orders/${encodeURIComponent(order.id)}`);
  };

  const handleRowPrimaryAction = async (order: ProfessionalOrderItem) => {
    if (order.status === "pending") {
      try {
        await startOrderMutation({ id: order.id }).unwrap();
      } catch {
        dispatch(startProOrderLocal(order.id));
      }
      toast.success(`Order #${order.code} started! Now In Progress.`);
      router.push(`/orders/${encodeURIComponent(order.id)}`);
      return;
    }
    if (order.status === "in-progress") {
      router.push(`/orders/${encodeURIComponent(order.id)}`);
      return;
    }
    if (order.status === "disputed") {
      router.push(`/orders/${encodeURIComponent(order.id)}/dispute`);
      return;
    }
    router.push(`/orders/${encodeURIComponent(order.id)}`);
  };

  const handleToggleFilters = () => {
    toast.info("Order filter options coming soon.");
  };

  const handleExportOrders = () => {
    toast.success("Exporting professional orders CSV...");
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalCount,
    totalPages,
    filteredOrders,
    isFetching,
    kpis: PRO_ORDERS_KPI_CARDS,
    handleViewOrder,
    handleRowPrimaryAction,
    handleToggleFilters,
    handleExportOrders,
  };
}

export function useProfessionalOrderDetailService(orderId = "ORD-2026-001") {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeOrders = useAppSelector(selectAllProOrders);

  const { data: apiOrder } = useGetProfessionalOrderByIdQuery(orderId);
  const [startOrderMutation] = useStartProfessionalOrderMutation();
  const [completeOrderMutation] = useCompleteProfessionalOrderMutation();

  const order = useMemo<ProfessionalOrderItem>(() => {
    return (
      apiOrder ??
      findProfessionalOrderById(storeOrders, orderId) ??
      findProfessionalOrderById(DEFAULT_PROFESSIONAL_ORDERS, orderId) ??
      DEFAULT_PROFESSIONAL_ORDERS[0]
    );
  }, [apiOrder, storeOrders, orderId]);

  const [completionNotes, setCompletionNotes] = useState("");
  const [uploadedDeliverableName, setUploadedDeliverableName] = useState<
    string | null
  >(null);

  const handleBackToOrders = () => {
    router.push("/orders");
  };

  const handleBackToOrderDetail = () => {
    router.push(`/orders/${encodeURIComponent(order.id)}`);
  };

  const handleStartOrder = async () => {
    try {
      await startOrderMutation({ id: order.id }).unwrap();
    } catch {
      dispatch(startProOrderLocal(order.id));
    }
    toast.success(`Order #${order.code} is now In Progress.`);
  };

  const handleMarkCompleted = async () => {
    try {
      await completeOrderMutation({
        id: order.id,
        completionNote: completionNotes,
        deliverableName:
          uploadedDeliverableName ?? "Final_Brand_Package_v1.zip",
      }).unwrap();
    } catch {
      dispatch(
        completeProOrderLocal({
          id: order.id,
          completionNote:
            completionNotes.trim() ||
            order.completionNote ||
            "Hi! I've completed the work as requested and uploaded all final deliverables. It was a pleasure working with you!",
          deliverableName:
            uploadedDeliverableName ?? "Final_Brand_Package_v1.zip",
        })
      );
    }
    toast.success(
      `Order #${order.code} submitted for review! The consumer has been notified.`
    );
  };

  const handleUploadDeliverable = (fileName: string) => {
    setUploadedDeliverableName(fileName);
    toast.success(`Attached "${fileName}" as final deliverable.`);
  };

  const handleMessageConsumer = () => {
    router.push("/messages");
  };

  const handleViewConsumerProfile = () => {
    router.push("/profile");
  };

  const handleViewEscrowDetails = () => {
    router.push(`/orders/${encodeURIComponent(order.id)}/status`);
  };

  const handleRaiseDispute = () => {
    router.push(`/orders/${encodeURIComponent(order.id)}/dispute`);
  };

  const handleLeaveReview = () => {
    router.push(`/orders/${encodeURIComponent(order.id)}/feedback`);
  };

  const handleDownloadAttachment = (fileName: string) => {
    toast.success(`Downloading ${fileName}...`);
  };

  const handleOrderGuidelines = () => {
    toast.info("Opening MyKostoma Order Guidelines...");
  };

  const handleContactSupport = () => {
    toast.info("Connecting you with MyKostoma 24/7 Support...");
  };

  const handleReadEscrowPolicy = () => {
    toast.info("Opening MyKostoma Escrow Protection Policy...");
  };

  return {
    order,
    completionNotes,
    setCompletionNotes,
    uploadedDeliverableName,
    handleBackToOrders,
    handleBackToOrderDetail,
    handleStartOrder,
    handleMarkCompleted,
    handleUploadDeliverable,
    handleMessageConsumer,
    handleViewConsumerProfile,
    handleViewEscrowDetails,
    handleRaiseDispute,
    handleLeaveReview,
    handleDownloadAttachment,
    handleOrderGuidelines,
    handleContactSupport,
    handleReadEscrowPolicy,
  };
}

export function useProfessionalOrderDisputeService(orderId = "ORD-2026-001") {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeOrders = useAppSelector(selectAllProOrders);
  const [submitDisputeMutation] = useSubmitProfessionalOrderDisputeMutation();

  const order = useMemo<ProfessionalOrderItem>(() => {
    return (
      findProfessionalOrderById(storeOrders, orderId) ??
      findProfessionalOrderById(DEFAULT_PROFESSIONAL_ORDERS, orderId) ??
      DEFAULT_PROFESSIONAL_ORDERS[0]
    );
  }, [storeOrders, orderId]);

  const [values, setValues] = useState<ProfessionalOrderDisputeFormValues>(
    INITIAL_PRO_ORDER_DISPUTE_VALUES
  );

  const handleBackToEscrow = () => {
    router.push(`/orders/${encodeURIComponent(order.id)}/status`);
  };

  const handleAddEvidence = (fileName: string) => {
    setValues((prev) => ({
      ...prev,
      evidenceFiles: [...prev.evidenceFiles, fileName],
    }));
    toast.success(`Added evidence file "${fileName}".`);
  };

  const handleRemoveEvidence = (fileName: string) => {
    setValues((prev) => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles.filter((f) => f !== fileName),
    }));
  };

  const handleSubmitDispute = async () => {
    if (!values.reason) {
      toast.error("Please select a reason for the dispute.");
      return;
    }
    try {
      await submitDisputeMutation({ id: order.id, values }).unwrap();
    } catch {
      dispatch(disputeProOrderLocal(order.id));
    }
    toast.success(
      `Dispute opened for Order #${order.code}. Escrow funds are frozen pending moderation.`
    );
    router.push(`/orders/${encodeURIComponent(order.id)}`);
  };

  const handleMessageConsumer = () => {
    router.push("/messages");
  };

  const handleContactSupport = () => {
    toast.info("Opening MyKostoma Arbitration Support...");
  };

  return {
    order,
    values,
    setValues,
    handleBackToEscrow,
    handleAddEvidence,
    handleRemoveEvidence,
    handleSubmitDispute,
    handleMessageConsumer,
    handleContactSupport,
  };
}

export function useProfessionalOrderReviewService(orderId = "ORD-2026-001") {
  const router = useRouter();
  const storeOrders = useAppSelector(selectAllProOrders);
  const [submitReviewMutation] = useSubmitProfessionalOrderReviewMutation();

  const order = useMemo<ProfessionalOrderItem>(() => {
    return (
      findProfessionalOrderById(storeOrders, orderId) ??
      findProfessionalOrderById(DEFAULT_PROFESSIONAL_ORDERS, orderId) ??
      DEFAULT_PROFESSIONAL_ORDERS[0]
    );
  }, [storeOrders, orderId]);

  const [values, setValues] = useState<ProfessionalOrderReviewFormValues>(
    INITIAL_PRO_ORDER_REVIEW_VALUES
  );

  const handleBackToDetail = () => {
    router.push(`/orders/${encodeURIComponent(order.id)}`);
  };

  const handleSubmitReview = async () => {
    try {
      await submitReviewMutation({ id: order.id, values }).unwrap();
    } catch {
      // Fallback simulated submission
    }
    toast.success(
      `Your ${values.overallRating}.0-star review for ${order.consumerName} has been submitted!`
    );
    router.push(`/orders/${encodeURIComponent(order.id)}`);
  };

  const handleMessageConsumer = () => {
    router.push("/messages");
  };

  const handleContactSupport = () => {
    toast.info("Connecting you with MyKostoma Support...");
  };

  return {
    order,
    values,
    setValues,
    handleBackToDetail,
    handleSubmitReview,
    handleMessageConsumer,
    handleContactSupport,
  };
}

