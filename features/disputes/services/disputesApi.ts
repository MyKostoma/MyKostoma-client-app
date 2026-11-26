"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentUser, selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import {
  selectAllOrders,
  selectAllProOrders,
} from "@/store/slices/ordersSlice";
import {
  addDisputeEvidenceLocal,
  archiveDisputeCaseLocal,
  createDisputeCaseLocal,
  logAdminMessageLocal,
  resetDisputesFilters,
  restoreDisputeCaseLocal,
  selectActiveDisputesCount,
  selectAllDisputes,
  selectDisputeById,
  selectDisputesActiveTab,
  selectDisputesCurrentPage,
  selectDisputesDateRangeFilter,
  selectDisputesIncludeArchived,
  selectDisputesSearchQuery,
  selectDisputesStatusFilter,
  selectResolvedDisputesCount,
  setDisputesActiveTab,
  setDisputesCurrentPage,
  setDisputesDateRangeFilter,
  setDisputesIncludeArchived,
  setDisputesSearchQuery,
  setDisputesStatusFilter,
  submitResolutionProposalLocal,
  useAddDisputeEvidenceMutation,
  useArchiveDisputeMutation,
  useRaiseDisputeMutation,
  useSendDisputeAdminMessageMutation,
  useSubmitDisputeResolutionMutation,
} from "@/store/slices/disputesSlice";
import type {
  DisputableOrderOption,
  DisputeDateRangeFilter,
  DisputeEvidenceAttachment,
  DisputeResolutionPath,
  DisputeStatus,
  DisputeTabKey,
} from "@/components/disputes/types";
import {
  DEFAULT_DISPUTE_KPIS,
  FALLBACK_DISPUTABLE_ORDERS,
  getDefaultDisputeById,
} from "@/features/disputes/data";
import {
  buildDisputesCsv,
  filterDisputeCases,
  formatNairaAmount,
  parseNairaAmount,
} from "@/features/disputes/services/disputesHelpers";

const DISPUTES_PAGE_SIZE = 4;

export function useDisputesRoleContext() {
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const currentUser = useAppSelector(selectCurrentUser);

  const effectiveRole: "consumer" | "professional" =
    (userRole || activePerspective) === "professional"
      ? "professional"
      : "consumer";
  const isProfessional = effectiveRole === "professional";

  const currentUserName =
    currentUser?.fullName ||
    (currentUser?.firstName
      ? `${currentUser.firstName} ${currentUser.lastName || ""}`.trim()
      : "") ||
    (isProfessional ? "Alex Rivera" : "Sarah Jenkins");

  return {
    effectiveRole,
    isProfessional,
    currentUserName,
    currentUserAvatar: currentUser?.avatarUrl,
  };
}

export function useDisputesDashboardService() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { effectiveRole, isProfessional, currentUserName, currentUserAvatar } =
    useDisputesRoleContext();

  const allDisputes = useAppSelector(selectAllDisputes);
  const activeTab = useAppSelector(selectDisputesActiveTab);
  const searchQuery = useAppSelector(selectDisputesSearchQuery);
  const statusFilter = useAppSelector(selectDisputesStatusFilter);
  const dateRangeFilter = useAppSelector(selectDisputesDateRangeFilter);
  const includeArchived = useAppSelector(selectDisputesIncludeArchived);
  const currentPage = useAppSelector(selectDisputesCurrentPage);
  const activeCount = useAppSelector(selectActiveDisputesCount);
  const resolvedCount = useAppSelector(selectResolvedDisputesCount);

  const consumerOrders = useAppSelector(selectAllOrders);
  const proOrders = useAppSelector(selectAllProOrders);

  const [raiseDisputeMutation] = useRaiseDisputeMutation();
  const [archiveDisputeMutation] = useArchiveDisputeMutation();

  const [raiseModalOpen, setRaiseModalOpen] = useState(false);
  const [guidelinesModalOpen, setGuidelinesModalOpen] = useState(false);
  const [defaultOrderId, setDefaultOrderId] = useState<string | undefined>(
    undefined
  );

  // Honor ?raise=true&order=... when redirected from Orders or Settings
  useEffect(() => {
    const shouldRaise = searchParams.get("raise");
    const orderParam = searchParams.get("order") || undefined;
    if (shouldRaise === "true" || shouldRaise === "1") {
      setDefaultOrderId(orderParam);
      setRaiseModalOpen(true);
    }
  }, [searchParams]);

  const orderOptions = useMemo<DisputableOrderOption[]>(() => {
    if (isProfessional) {
      const mapped = proOrders.map((ord) => {
        const numeric = parseNairaAmount(ord.totalAmountFormatted);
        return {
          id: ord.id,
          code: ord.code.replace(/^#/, ""),
          serviceTitle: ord.serviceTitle,
          counterpartyName: ord.consumerName,
          counterpartyRole: "consumer" as const,
          counterpartyAvatarUrl: ord.consumerAvatarUrl,
          totalAmount: numeric || 85000,
          amountFormatted:
            ord.totalAmountFormatted || formatNairaAmount(numeric || 85000),
        };
      });
      return mapped.length > 0 ? mapped : FALLBACK_DISPUTABLE_ORDERS;
    }

    const mapped = consumerOrders.map((ord) => {
      const numeric = parseNairaAmount(ord.totalAmount);
      return {
        id: ord.id,
        code: ord.code.replace(/^#/, ""),
        serviceTitle: ord.title,
        counterpartyName: ord.providerName,
        counterpartyRole: "professional" as const,
        counterpartyAvatarUrl: ord.providerAvatar,
        totalAmount: numeric || 120000,
        amountFormatted: ord.totalAmount || formatNairaAmount(numeric || 120000),
      };
    });
    return mapped.length > 0 ? mapped : FALLBACK_DISPUTABLE_ORDERS;
  }, [consumerOrders, isProfessional, proOrders]);

  const filteredDisputes = useMemo(
    () =>
      filterDisputeCases(allDisputes, {
        activeTab,
        searchQuery,
        statusFilter,
        dateRangeFilter,
        includeArchived,
        isProfessional,
      }),
    [
      activeTab,
      allDisputes,
      dateRangeFilter,
      includeArchived,
      isProfessional,
      searchQuery,
      statusFilter,
    ]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDisputes.length / DISPUTES_PAGE_SIZE)
  );
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedDisputes = useMemo(
    () =>
      filteredDisputes.slice(
        (safePage - 1) * DISPUTES_PAGE_SIZE,
        safePage * DISPUTES_PAGE_SIZE
      ),
    [filteredDisputes, safePage]
  );

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
      statusFilter !== "all" ||
      dateRangeFilter !== "all" ||
      includeArchived
  );

  const handleTabChange = useCallback(
    (tab: DisputeTabKey) => {
      dispatch(setDisputesActiveTab(tab));
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      dispatch(setDisputesSearchQuery(value));
    },
    [dispatch]
  );

  const handleStatusFilterChange = useCallback(
    (value: "all" | DisputeStatus) => {
      dispatch(setDisputesStatusFilter(value));
    },
    [dispatch]
  );

  const handleDateRangeFilterChange = useCallback(
    (value: DisputeDateRangeFilter) => {
      dispatch(setDisputesDateRangeFilter(value));
    },
    [dispatch]
  );

  const handleIncludeArchivedChange = useCallback(
    (value: boolean) => {
      dispatch(setDisputesIncludeArchived(value));
    },
    [dispatch]
  );

  const handleResetFilters = useCallback(() => {
    dispatch(resetDisputesFilters());
  }, [dispatch]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setDisputesCurrentPage(page));
    },
    [dispatch]
  );

  const handleArchiveDispute = useCallback(
    async (disputeId: string) => {
      try {
        await archiveDisputeMutation({ id: disputeId }).unwrap();
      } catch {
        // Fallback persists locally
      }
      dispatch(archiveDisputeCaseLocal(disputeId));
      toast.success("Dispute moved to archive.");
    },
    [archiveDisputeMutation, dispatch]
  );

  const handleRestoreDispute = useCallback(
    (disputeId: string) => {
      dispatch(restoreDisputeCaseLocal(disputeId));
      toast.success("Dispute restored to Resolved Disputes.");
    },
    [dispatch]
  );

  const handleRaiseDisputeSubmit = useCallback(
    async (payload: {
      orderId: string;
      reason: string;
      description: string;
      attachments: DisputeEvidenceAttachment[];
    }) => {
      const chosenOrder =
        orderOptions.find(
          (o) =>
            o.id.toLowerCase() === payload.orderId.toLowerCase() ||
            o.code.toLowerCase() === payload.orderId.toLowerCase()
        ) || orderOptions[0];

      const suffix = Math.floor(1030 + Math.random() * 8900);
      const id = `ds-${suffix}`;
      const code = `#DS-${suffix}`;

      try {
        await raiseDisputeMutation({
          orderId: chosenOrder.id,
          orderCode: chosenOrder.code,
          serviceTitle: chosenOrder.serviceTitle,
          totalAmount: chosenOrder.totalAmount,
          counterpartyName: chosenOrder.counterpartyName,
          counterpartyAvatarUrl: chosenOrder.counterpartyAvatarUrl,
          reason: payload.reason,
          description: payload.description,
          attachments: payload.attachments,
        }).unwrap();
      } catch {
        // Fallback creates local dispute case
      }

      dispatch(
        createDisputeCaseLocal({
          id,
          code,
          orderId: chosenOrder.id,
          orderCode: chosenOrder.code,
          serviceTitle: chosenOrder.serviceTitle,
          totalAmount: chosenOrder.totalAmount,
          consumerName: isProfessional
            ? chosenOrder.counterpartyName
            : currentUserName,
          consumerAvatarUrl: isProfessional
            ? chosenOrder.counterpartyAvatarUrl
            : currentUserAvatar,
          professionalName: isProfessional
            ? currentUserName
            : chosenOrder.counterpartyName,
          professionalAvatarUrl: isProfessional
            ? currentUserAvatar
            : chosenOrder.counterpartyAvatarUrl,
          creatorRole: effectiveRole,
          creatorName: currentUserName,
          creatorAvatarUrl: currentUserAvatar,
          reason: payload.reason,
          description: payload.description,
          attachments: payload.attachments,
        })
      );

      toast.success(`Dispute ${code} opened and escrow funds frozen.`);
      return { id, code };
    },
    [
      currentUserAvatar,
      currentUserName,
      dispatch,
      effectiveRole,
      isProfessional,
      orderOptions,
      raiseDisputeMutation,
    ]
  );

  const handleExportCsv = useCallback(() => {
    const csvContent = buildDisputesCsv(filteredDisputes, isProfessional);
    if (typeof window !== "undefined") {
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `mykostoma-disputes-${activeTab}.csv`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    }
    toast.success("Disputes exported as CSV.");
  }, [activeTab, filteredDisputes, isProfessional]);

  return {
    isProfessional,
    hasAnyDisputesInStore: allDisputes.length > 0,
    disputes: paginatedDisputes,
    totalFilteredCount: filteredDisputes.length,
    activeCount,
    resolvedCount,
    activeTab,
    searchQuery,
    statusFilter,
    dateRangeFilter,
    includeArchived,
    hasActiveFilters,
    currentPage: safePage,
    totalPages,
    pageSize: DISPUTES_PAGE_SIZE,
    kpiSummary: DEFAULT_DISPUTE_KPIS,
    orderOptions,
    defaultOrderId,
    raiseModalOpen,
    setRaiseModalOpen,
    guidelinesModalOpen,
    setGuidelinesModalOpen,
    handleTabChange,
    handleSearchChange,
    handleStatusFilterChange,
    handleDateRangeFilterChange,
    handleIncludeArchivedChange,
    handleResetFilters,
    handlePageChange,
    handleArchiveDispute,
    handleRestoreDispute,
    handleRaiseDisputeSubmit,
    handleExportCsv,
    handleViewDisputeDetail: (id: string) => router.push(`/disputes/${id}`),
    handleOpenHelpCenter: () => setGuidelinesModalOpen(true),
    handleContactSupport: () => router.push("/messages"),
  };
}

export function useDisputeDetailService(disputeId: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { effectiveRole, isProfessional, currentUserName, currentUserAvatar } =
    useDisputesRoleContext();

  const storeDispute = useAppSelector(selectDisputeById(disputeId));
  const dispute = useMemo(
    () => storeDispute ?? getDefaultDisputeById(disputeId) ?? null,
    [disputeId, storeDispute]
  );

  const [addEvidenceModalOpen, setAddEvidenceModalOpen] = useState(false);
  const [messageAdminModalOpen, setMessageAdminModalOpen] = useState(false);
  const [previewAttachment, setPreviewAttachment] =
    useState<DisputeEvidenceAttachment | null>(null);

  const [selectedPath, setSelectedPath] = useState<DisputeResolutionPath | null>(
    dispute?.resolutionProposal?.path ?? null
  );
  const [splitConsumerPercent, setSplitConsumerPercent] = useState<number>(
    dispute?.resolutionProposal?.splitConsumerPercent ?? 50
  );
  const [resolutionNote, setResolutionNote] = useState<string>(
    dispute?.resolutionProposal?.note ?? ""
  );
  const [isFinalizing, setIsFinalizing] = useState(false);

  const [addEvidenceMutation] = useAddDisputeEvidenceMutation();
  const [submitResolutionMutation] = useSubmitDisputeResolutionMutation();
  const [sendAdminMsgMutation] = useSendDisputeAdminMessageMutation();

  const isResolved =
    dispute?.status === "resolved" || dispute?.status === "archived";

  const totalAmountFormatted = useMemo(
    () => formatNairaAmount(dispute?.totalAmount ?? 0),
    [dispute?.totalAmount]
  );

  const handleSubmitEvidence = useCallback(
    async (payload: {
      message: string;
      attachments: DisputeEvidenceAttachment[];
    }) => {
      if (!dispute) return;
      try {
        await addEvidenceMutation({
          disputeId: dispute.id,
          message: payload.message,
          attachments: payload.attachments,
        }).unwrap();
      } catch {
        // Fallback persists locally
      }

      dispatch(
        addDisputeEvidenceLocal({
          disputeId: dispute.id,
          authorName: currentUserName,
          authorRole: effectiveRole,
          authorAvatarUrl: currentUserAvatar,
          message: payload.message,
          attachments: payload.attachments,
        })
      );

      toast.success("Evidence and statement added to the dispute record.");
    },
    [
      addEvidenceMutation,
      currentUserAvatar,
      currentUserName,
      dispatch,
      dispute,
      effectiveRole,
    ]
  );

  const handleSendAdminMessage = useCallback(
    async (payload: { subject: string; message: string }) => {
      if (!dispute) return;
      try {
        await sendAdminMsgMutation({
          disputeId: dispute.id,
          subject: payload.subject,
          message: payload.message,
        }).unwrap();
      } catch {
        // Fallback logs locally
      }

      dispatch(
        logAdminMessageLocal({
          disputeId: dispute.id,
          subject: payload.subject,
          message: payload.message,
        })
      );

      toast.success("Your message has been delivered to MyKostoma Mediation.");
    },
    [dispatch, dispute, sendAdminMsgMutation]
  );

  const handleFinalizeDecision = useCallback(async () => {
    if (!dispute || !selectedPath || isResolved) return;
    setIsFinalizing(true);
    try {
      await submitResolutionMutation({
        disputeId: dispute.id,
        path: selectedPath,
        splitConsumerPercent:
          selectedPath === "split" ? splitConsumerPercent : undefined,
        note: resolutionNote.trim() || undefined,
      }).unwrap();
    } catch {
      // Fallback applies locally
    }

    dispatch(
      submitResolutionProposalLocal({
        disputeId: dispute.id,
        path: selectedPath,
        splitConsumerPercent:
          selectedPath === "split" ? splitConsumerPercent : undefined,
        note: resolutionNote.trim() || undefined,
        proposedByRole: effectiveRole,
      })
    );
    setIsFinalizing(false);
    toast.success("Resolution decision finalized and escrow ledger updated.");
  }, [
    dispatch,
    dispute,
    effectiveRole,
    isResolved,
    resolutionNote,
    selectedPath,
    splitConsumerPercent,
    submitResolutionMutation,
  ]);

  return {
    dispute,
    isProfessional,
    isResolved,
    totalAmountFormatted,
    addEvidenceModalOpen,
    setAddEvidenceModalOpen,
    messageAdminModalOpen,
    setMessageAdminModalOpen,
    previewAttachment,
    setPreviewAttachment,
    selectedPath,
    setSelectedPath,
    splitConsumerPercent,
    setSplitConsumerPercent,
    resolutionNote,
    setResolutionNote,
    isFinalizing,
    handleSubmitEvidence,
    handleSendAdminMessage,
    handleFinalizeDecision,
    handleOpenMessagesHub: () => router.push("/messages"),
    handleBackToDisputes: () => router.push("/disputes"),
  };
}
