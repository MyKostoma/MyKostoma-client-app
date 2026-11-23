"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentUser,
  selectUserRole,
} from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import {
  DEFAULT_CONSUMER_ORDERS,
  DEFAULT_PROFESSIONAL_ORDERS,
} from "@/features/orders/data";
import {
  deleteGivenReviewLocal,
  deleteReviewResponseLocal,
  reportReviewLocal,
  requestResponseEditLocal,
  saveDraftResponseLocal,
  selectDraftResponseByReviewId,
  selectEditRequestedReviewIds,
  selectGivenReviews,
  selectPendingReviewOrders,
  selectReceivedReviews,
  selectReportedReviewIds,
  selectReviewById,
  submitNewReviewLocal,
  submitReviewResponseLocal,
  updateReviewResponseLocal,
  useDeleteReviewResponseMutation,
  useReportReviewMutation,
  useRequestResponseEditMutation,
  useSubmitNewReviewMutation,
  useSubmitReviewResponseMutation,
  useUpdateReviewResponseMutation,
} from "@/store/slices/reviewsSlice";
import type {
  PendingReviewOrder,
  ReviewRatingFilter,
  ReviewRecord,
  ReviewResponseStatusFilter,
  ReviewSortOption,
  ReviewsTabId,
} from "@/components/reviews/types";
import { DEFAULT_RECEIVED_REVIEWS } from "../data";
import {
  computeReviewsKpi,
  filterAndSortReviewsList,
  formatReviewDisplayDate,
  normalizeReviewsTab,
  paginateReviews,
} from "./reviewsHelpers";

const REVIEWS_PAGE_SIZE = 5;

export function useReviewsDashboardService() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const currentUser = useAppSelector(selectCurrentUser);
  const receivedReviews = useAppSelector(selectReceivedReviews);
  const givenReviews = useAppSelector(selectGivenReviews);
  const pendingOrders = useAppSelector(selectPendingReviewOrders);
  const reportedReviewIds = useAppSelector(selectReportedReviewIds);

  const effectiveRole = userRole || activePerspective || "consumer";
  const defaultTab: ReviewsTabId =
    effectiveRole === "consumer" ? "given" : "received";

  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<ReviewsTabId>(() =>
    normalizeReviewsTab(tabFromUrl, defaultTab)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<ReviewRatingFilter>("all");
  const [responseStatusFilter, setResponseStatusFilter] =
    useState<ReviewResponseStatusFilter>("all");
  const [sortBy, setSortBy] = useState<ReviewSortOption>("recent");
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteResponseTarget, setDeleteResponseTarget] =
    useState<ReviewRecord | null>(null);
  const [reportTarget, setReportTarget] = useState<ReviewRecord | null>(null);
  const [quickRateTarget, setQuickRateTarget] =
    useState<PendingReviewOrder | null>(null);
  const [submittedModalOpen, setSubmittedModalOpen] = useState(false);
  const [submittedVariant, setSubmittedVariant] = useState<
    "professional" | "consumer"
  >("professional");

  const [updateReviewResponseMutation] = useUpdateReviewResponseMutation();
  const [deleteReviewResponseMutation] = useDeleteReviewResponseMutation();
  const [reportReviewMutation] = useReportReviewMutation();
  const [submitNewReviewMutation] = useSubmitNewReviewMutation();

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(normalizeReviewsTab(tabFromUrl, defaultTab));
      setCurrentPage(1);
    }
  }, [defaultTab, tabFromUrl]);

  const kpiSummary = useMemo(
    () => computeReviewsKpi(receivedReviews),
    [receivedReviews]
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count += 1;
    if (ratingFilter !== "all") count += 1;
    if (activeTab === "received" && responseStatusFilter !== "all") count += 1;
    if (sortBy !== "recent") count += 1;
    return count;
  }, [activeTab, ratingFilter, responseStatusFilter, searchQuery, sortBy]);

  const filteredReviews = useMemo(() => {
    const baseList =
      activeTab === "received" ? receivedReviews : givenReviews;
    return filterAndSortReviewsList(baseList, {
      query: searchQuery,
      rating: ratingFilter,
      responseStatus:
        activeTab === "received" ? responseStatusFilter : "all",
      sort: sortBy,
    });
  }, [
    activeTab,
    givenReviews,
    ratingFilter,
    receivedReviews,
    responseStatusFilter,
    searchQuery,
    sortBy,
  ]);

  const filteredPendingOrders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return pendingOrders;
    return pendingOrders.filter((order) =>
      [order.recipientName, order.serviceTitle, order.orderCode]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [pendingOrders, searchQuery]);

  const paginatedReviews = useMemo(
    () => paginateReviews(filteredReviews, currentPage, REVIEWS_PAGE_SIZE),
    [currentPage, filteredReviews]
  );

  const paginatedPending = useMemo(
    () => paginateReviews(filteredPendingOrders, currentPage, REVIEWS_PAGE_SIZE),
    [currentPage, filteredPendingOrders]
  );

  const handleTabChange = useCallback(
    (tab: ReviewsTabId) => {
      setActiveTab(tab);
      setCurrentPage(1);
      router.replace(`/reviews?tab=${tab}`, { scroll: false });
    },
    [router]
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const handleRatingChange = useCallback((value: ReviewRatingFilter) => {
    setRatingFilter(value);
    setCurrentPage(1);
  }, []);

  const handleResponseStatusChange = useCallback(
    (value: ReviewResponseStatusFilter) => {
      setResponseStatusFilter(value);
      setCurrentPage(1);
    },
    []
  );

  const handleSortChange = useCallback((value: ReviewSortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setRatingFilter("all");
    setResponseStatusFilter("all");
    setSortBy("recent");
    setCurrentPage(1);
  }, []);

  const handleSaveInlineResponse = useCallback(
    async (reviewId: string, text: string) => {
      const repliedAtLabel = formatReviewDisplayDate(new Date());
      try {
        await updateReviewResponseMutation({ reviewId, text }).unwrap();
      } catch {
        // Fallback persists in Redux
      }
      dispatch(updateReviewResponseLocal({ reviewId, text, repliedAtLabel }));
      toast.success("Your public response has been updated.");
    },
    [dispatch, updateReviewResponseMutation]
  );

  const handleConfirmDeleteResponse = useCallback(async () => {
    if (!deleteResponseTarget) return;
    const targetId = deleteResponseTarget.id;
    try {
      await deleteReviewResponseMutation(targetId).unwrap();
    } catch {
      // Fallback persists in Redux
    }
    dispatch(deleteReviewResponseLocal({ reviewId: targetId }));
    setDeleteResponseTarget(null);
    toast.success("Your response has been deleted.");
  }, [deleteResponseTarget, deleteReviewResponseMutation, dispatch]);

  const handleConfirmReportReview = useCallback(
    async (payload: { reason: string; details: string }) => {
      if (!reportTarget) return;
      const targetId = reportTarget.id;
      try {
        await reportReviewMutation({
          reviewId: targetId,
          reason: payload.reason,
          details: payload.details,
        }).unwrap();
      } catch {
        // Fallback persists in Redux
      }
      dispatch(reportReviewLocal({ reviewId: targetId }));
      setReportTarget(null);
      toast.success("Review flagged for Trust & Safety team review.");
    },
    [dispatch, reportReviewMutation, reportTarget]
  );

  const handleSubmitQuickRate = useCallback(
    async (payload: { rating: number; comment: string }) => {
      if (!quickRateTarget) return;
      const now = new Date();
      const authorName =
        currentUser?.fullName ||
        (effectiveRole === "consumer" ? "Sarah Jenkins" : "Dr. Alex Rivers");
      const newReview: ReviewRecord = {
        id: `rev-${Date.now()}`,
        direction: "given",
        authorName,
        authorRole:
          effectiveRole === "consumer"
            ? "Verified Consumer"
            : "Verified Provider",
        authorAvatarUrl: currentUser?.avatarUrl || "",
        recipientName: quickRateTarget.recipientName,
        recipientRole: quickRateTarget.recipientSubtitle,
        recipientAvatarUrl: quickRateTarget.recipientAvatarUrl,
        rating: payload.rating,
        comment:
          payload.comment ||
          `Completed ${quickRateTarget.serviceTitle} (${quickRateTarget.orderCode}).`,
        dateLabel: formatReviewDisplayDate(now),
        createdAtISO: now.toISOString().slice(0, 10),
        orderId: quickRateTarget.orderId,
        orderCode: quickRateTarget.orderCode,
        serviceTitle: quickRateTarget.serviceTitle,
        verifiedPurchase: true,
        locationLabel: "Lagos, Nigeria",
      };

      try {
        await submitNewReviewMutation({
          orderId: quickRateTarget.orderId,
          rating: payload.rating,
          comment: newReview.comment,
          recipientName: quickRateTarget.recipientName,
          targetRole: quickRateTarget.targetRole,
          serviceTitle: quickRateTarget.serviceTitle,
          completedDateLabel: quickRateTarget.completedDateLabel,
        }).unwrap();
      } catch {
        // Fallback persists locally
      }

      dispatch(
        submitNewReviewLocal({
          review: newReview,
          completedOrderId: quickRateTarget.orderId,
        })
      );
      setSubmittedVariant(
        quickRateTarget.targetRole === "consumer" ? "professional" : "consumer"
      );
      setQuickRateTarget(null);
      setSubmittedModalOpen(true);
    },
    [
      currentUser?.avatarUrl,
      currentUser?.fullName,
      dispatch,
      effectiveRole,
      quickRateTarget,
      submitNewReviewMutation,
    ]
  );

  const handleNavigateDetail = useCallback(
    (reviewId: string) => {
      router.push(`/reviews/${encodeURIComponent(reviewId)}`);
    },
    [router]
  );

  const handleNavigateRatePage = useCallback(
    (orderId: string) => {
      router.push(`/reviews/rate/${encodeURIComponent(orderId)}`);
    },
    [router]
  );

  const handleBrowseOrders = useCallback(() => {
    router.push("/orders");
  }, [router]);

  return {
    activeTab,
    receivedCount: receivedReviews.length,
    givenCount: givenReviews.length,
    pendingCount: pendingOrders.length,
    kpiSummary,
    searchQuery,
    filterOpen,
    setFilterOpen,
    ratingFilter,
    responseStatusFilter,
    sortBy,
    activeFilterCount,
    filteredReviewsCount: filteredReviews.length,
    paginatedReviews,
    filteredPendingCount: filteredPendingOrders.length,
    paginatedPending,
    reportedReviewIds,
    setCurrentPage,
    deleteResponseTarget,
    setDeleteResponseTarget,
    reportTarget,
    setReportTarget,
    quickRateTarget,
    setQuickRateTarget,
    submittedModalOpen,
    setSubmittedModalOpen,
    submittedVariant,
    handleTabChange,
    handleSearchChange,
    handleRatingChange,
    handleResponseStatusChange,
    handleSortChange,
    handleResetFilters,
    handleSaveInlineResponse,
    handleConfirmDeleteResponse,
    handleConfirmReportReview,
    handleSubmitQuickRate,
    handleNavigateDetail,
    handleNavigateRatePage,
    handleBrowseOrders,
    handleDeleteGivenReview: (reviewId: string) =>
      dispatch(deleteGivenReviewLocal({ reviewId })),
  };
}

export function useReviewDetailService(reviewId: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const storedReview = useAppSelector(selectReviewById(reviewId));
  const storedDraft = useAppSelector(
    selectDraftResponseByReviewId(storedReview?.id ?? reviewId)
  );
  const reportedIds = useAppSelector(selectReportedReviewIds);
  const editRequestedIds = useAppSelector(selectEditRequestedReviewIds);

  const review = storedReview ?? DEFAULT_RECEIVED_REVIEWS[0];
  const [draftText, setDraftText] = useState(storedDraft);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [editRequestModalOpen, setEditRequestModalOpen] = useState(false);

  const [submitReviewResponseMutation] = useSubmitReviewResponseMutation();
  const [reportReviewMutation] = useReportReviewMutation();
  const [requestResponseEditMutation] = useRequestResponseEditMutation();

  useEffect(() => {
    setDraftText(storedDraft);
  }, [review.id, storedDraft]);

  const isReported = reportedIds.includes(review.id);
  const isEditRequested =
    editRequestedIds.includes(review.id) ||
    Boolean(review.response?.editRequested);

  const handleBack = useCallback(() => {
    const tabParam = review.direction === "given" ? "given" : "received";
    router.push(`/reviews?tab=${tabParam}`);
  }, [review.direction, router]);

  const handleSaveDraft = useCallback(() => {
    setIsSavingDraft(true);
    dispatch(saveDraftResponseLocal({ reviewId: review.id, text: draftText }));
    setIsSavingDraft(false);
    toast.success("Response draft saved.");
  }, [dispatch, draftText, review.id]);

  const handleSubmitResponse = useCallback(async () => {
    const trimmed = draftText.trim();
    if (!trimmed) {
      toast.error("Please write a response before submitting.");
      return;
    }

    setIsSubmitting(true);
    const now = new Date();
    const repliedAtLabel = formatReviewDisplayDate(now);
    const repliedAtISO = now.toISOString().slice(0, 10);

    try {
      await submitReviewResponseMutation({
        reviewId: review.id,
        text: trimmed,
      }).unwrap();
    } catch {
      // Fallback persists locally
    }

    dispatch(
      submitReviewResponseLocal({
        reviewId: review.id,
        text: trimmed,
        repliedAtLabel,
        repliedAtISO,
      })
    );
    setDraftText("");
    setIsSubmitting(false);
    toast.success("Public response published to your profile.");
  }, [dispatch, draftText, review.id, submitReviewResponseMutation]);

  const handleConfirmReport = useCallback(
    async (payload: { reason: string; details: string }) => {
      try {
        await reportReviewMutation({
          reviewId: review.id,
          reason: payload.reason,
          details: payload.details,
        }).unwrap();
      } catch {
        // Fallback persists locally
      }
      dispatch(reportReviewLocal({ reviewId: review.id }));
      setReportModalOpen(false);
      toast.success("Review reported to MyKostoma Trust & Safety.");
    },
    [dispatch, reportReviewMutation, review.id]
  );

  const handleConfirmEditRequest = useCallback(
    async (payload: { revisedText: string; reason: string }) => {
      try {
        await requestResponseEditMutation({
          reviewId: review.id,
          revisedText: payload.revisedText,
          reason: payload.reason,
        }).unwrap();
      } catch {
        // Fallback persists locally
      }
      dispatch(requestResponseEditLocal({ reviewId: review.id }));
      setEditRequestModalOpen(false);
      toast.success("Edit request submitted to MyKostoma Support.");
    },
    [dispatch, requestResponseEditMutation, review.id]
  );

  return {
    review,
    draftText,
    setDraftText,
    isSavingDraft,
    isSubmitting,
    reportModalOpen,
    setReportModalOpen,
    editRequestModalOpen,
    setEditRequestModalOpen,
    isReported,
    isEditRequested,
    handleBack,
    handleSaveDraft,
    handleSubmitResponse,
    handleConfirmReport,
    handleConfirmEditRequest,
  };
}

export function useRateConsumerService(orderId: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const currentUser = useAppSelector(selectCurrentUser);
  const pendingOrders = useAppSelector(selectPendingReviewOrders);

  const effectiveRole = userRole || activePerspective || "consumer";
  const fromParam = searchParams.get("from");
  const cameFromOrders = fromParam === "orders";

  const resolvedOrder = useMemo<PendingReviewOrder>(() => {
    const normalized = decodeURIComponent(orderId).trim().toLowerCase();
    const fromPending = pendingOrders.find(
      (item) =>
        item.orderId.toLowerCase() === normalized ||
        item.orderCode.toLowerCase() === normalized ||
        item.id.toLowerCase() === normalized
    );
    if (fromPending) return fromPending;

    const fromProOrders = DEFAULT_PROFESSIONAL_ORDERS.find(
      (item) =>
        item.id.toLowerCase() === normalized ||
        item.code.toLowerCase() === normalized
    );
    if (fromProOrders) {
      return {
        id: `pending-${fromProOrders.id}`,
        orderId: fromProOrders.id,
        orderCode: fromProOrders.code,
        targetRole: "consumer",
        recipientName: fromProOrders.consumerName,
        recipientSubtitle: "Consumer Profile",
        recipientAvatarUrl: fromProOrders.consumerAvatarUrl ?? "",
        serviceTitle: fromProOrders.serviceTitle,
        completedDateLabel:
          fromProOrders.completedAtLabel || fromProOrders.dateShort,
        feeFormatted: fromProOrders.totalAmountFormatted,
      };
    }

    const fromConsumerOrders = DEFAULT_CONSUMER_ORDERS.find(
      (item) =>
        item.id.toLowerCase() === normalized ||
        item.code.toLowerCase() === normalized
    );
    if (fromConsumerOrders) {
      return {
        id: `pending-${fromConsumerOrders.id}`,
        orderId: fromConsumerOrders.id,
        orderCode: fromConsumerOrders.code,
        targetRole: "professional",
        recipientName: fromConsumerOrders.providerName,
        recipientSubtitle: "Verified Professional",
        recipientAvatarUrl: "",
        serviceTitle: fromConsumerOrders.title,
        completedDateLabel:
          fromConsumerOrders.completedAt || fromConsumerOrders.orderedAt,
        feeFormatted: fromConsumerOrders.totalAmount,
      };
    }

    return {
      id: `pending-${orderId}`,
      orderId,
      orderCode: orderId.toUpperCase(),
      targetRole: effectiveRole === "professional" ? "consumer" : "professional",
      recipientName:
        effectiveRole === "professional" ? "Sarah Jenkins" : "Chiamaka Okafor",
      recipientSubtitle:
        effectiveRole === "professional"
          ? "Consumer Profile"
          : "Verified Professional",
      recipientAvatarUrl: "",
      serviceTitle: "Completed Service Order",
      completedDateLabel: formatReviewDisplayDate(new Date()),
      feeFormatted: "₦150,000",
    };
  }, [effectiveRole, orderId, pendingOrders]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const [submitNewReviewMutation] = useSubmitNewReviewMutation();

  const backLabel = cameFromOrders ? "Back to Orders" : "Back to Reviews";
  const backHref = cameFromOrders ? "/orders" : "/reviews?tab=pending";

  const handleBack = useCallback(() => {
    router.push(backHref);
  }, [backHref, router]);

  const handleBackToReviews = useCallback(() => {
    router.push("/reviews?tab=given");
  }, [router]);

  const handleSubmit = useCallback(async () => {
    if (rating < 1) {
      toast.error("Please select a star rating from 1 to 5.");
      return;
    }

    setIsSubmitting(true);
    const now = new Date();
    const authorName =
      currentUser?.fullName ||
      (effectiveRole === "consumer" ? "Sarah Jenkins" : "Dr. Alex Rivers");

    const trimmedComment =
      comment.trim() ||
      `Completed ${resolvedOrder.serviceTitle} (#${resolvedOrder.orderCode}).`;

    const newReview: ReviewRecord = {
      id: `rev-${Date.now()}`,
      direction: "given",
      authorName,
      authorRole:
        effectiveRole === "consumer"
          ? "Verified Consumer"
          : "Verified Provider",
      authorAvatarUrl: currentUser?.avatarUrl || "",
      recipientName: resolvedOrder.recipientName,
      recipientRole: resolvedOrder.recipientSubtitle,
      recipientAvatarUrl: resolvedOrder.recipientAvatarUrl,
      rating,
      comment: trimmedComment,
      dateLabel: formatReviewDisplayDate(now),
      createdAtISO: now.toISOString().slice(0, 10),
      orderId: resolvedOrder.orderId,
      orderCode: resolvedOrder.orderCode,
      serviceTitle: resolvedOrder.serviceTitle,
      verifiedPurchase: true,
      locationLabel: "Lagos, Nigeria",
    };

    try {
      await submitNewReviewMutation({
        orderId: resolvedOrder.orderId,
        rating,
        comment: trimmedComment,
        recipientName: resolvedOrder.recipientName,
        targetRole: resolvedOrder.targetRole,
        serviceTitle: resolvedOrder.serviceTitle,
        completedDateLabel: resolvedOrder.completedDateLabel,
      }).unwrap();
    } catch {
      // Fallback persists locally
    }

    dispatch(
      submitNewReviewLocal({
        review: newReview,
        completedOrderId: resolvedOrder.orderId,
      })
    );
    setIsSubmitting(false);
    setSubmittedSuccess(true);
    toast.success("Your review has been submitted!");
  }, [
    comment,
    currentUser?.avatarUrl,
    currentUser?.fullName,
    dispatch,
    effectiveRole,
    rating,
    resolvedOrder.completedDateLabel,
    resolvedOrder.orderCode,
    resolvedOrder.orderId,
    resolvedOrder.recipientAvatarUrl,
    resolvedOrder.recipientName,
    resolvedOrder.recipientSubtitle,
    resolvedOrder.serviceTitle,
    resolvedOrder.targetRole,
    submitNewReviewMutation,
  ]);

  return {
    order: resolvedOrder,
    backLabel,
    rating,
    setRating,
    comment,
    setComment,
    isSubmitting,
    submittedSuccess,
    handleBack,
    handleBackToReviews,
    handleSubmit,
  };
}
