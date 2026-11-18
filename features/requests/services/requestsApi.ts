"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addRequestItem,
  closeRequestItem,
  resetProRequestsFilters,
  saveProSubmittedQuoteLocal,
  selectAllProRequests,
  selectAllRequests,
  selectProRequestsFilters,
  selectProRequestsPage,
  selectProSavedRequestIds,
  selectRequestsActiveTab,
  selectRequestsSearchQuery,
  setProRequestsFilters,
  setProRequestsPage,
  setRequestsActiveTab,
  setRequestsSearchQuery,
  toggleProSavedRequest,
  updateRequestItem,
  useCloseRequestMutation,
  useCreateRequestMutation,
  useGetProfessionalRequestByIdQuery,
  useGetProfessionalRequestsQuery,
  useGetRequestByIdQuery,
  useGetRequestsQuery,
  useSubmitProfessionalQuoteMutation,
  useToggleSaveProfessionalRequestMutation,
  useUpdateRequestMutation,
  useWithdrawProfessionalQuoteMutation,
  withdrawProSubmittedQuoteLocal,
} from "@/store/slices/requestsSlice";
import {
  DEFAULT_CONSUMER_REQUESTS,
  DEFAULT_EDIT_REQUEST_VALUES,
  DEFAULT_PROFESSIONAL_REQUESTS,
} from "../data";
import type {
  ConsumerRequestItem,
  ProfessionalRequestItem,
  ProfessionalRequestsFilterState,
  ProfessionalSubmittedQuote,
  ProfessionalSubmitQuoteFormValues,
  RequestFormValues,
  RequestTabFilter,
} from "../types";
import {
  INITIAL_REQUEST_FORM_VALUES,
  calculateMilestoneAllocation,
  filterProfessionalRequests,
  filterRequestsList,
  findProfessionalRequestById,
  findRequestById,
  formatNairaCompact,
  parseNairaAmount,
} from "./requestsHelpers";

export function useRequestsListService(initialRequests?: ConsumerRequestItem[]) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const storeRequests = useAppSelector(selectAllRequests);
  const activeTab = useAppSelector(selectRequestsActiveTab);
  const searchQuery = useAppSelector(selectRequestsSearchQuery);

  const { data: apiRequests, isFetching } = useGetRequestsQuery(
    { status: activeTab, search: searchQuery },
    { skip: false }
  );

  const requests =
    initialRequests ?? apiRequests ?? storeRequests ?? DEFAULT_CONSUMER_REQUESTS;

  const filteredRequests = useMemo(
    () => filterRequestsList(requests, activeTab, searchQuery),
    [requests, activeTab, searchQuery]
  );

  const setActiveTab = (tab: RequestTabFilter) => {
    dispatch(setRequestsActiveTab(tab));
  };

  const setSearchQuery = (query: string) => {
    dispatch(setRequestsSearchQuery(query));
  };

  const handleViewDetails = (request: ConsumerRequestItem) => {
    router.push(`/requests/${encodeURIComponent(request.id)}`);
  };

  const handleCreateRequest = () => {
    router.push("/requests/new");
  };

  const handleContactSupport = () => {
    toast.info("Connecting you with MyKostoma 24/7 Support...");
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredRequests,
    isFetching,
    handleViewDetails,
    handleCreateRequest,
    handleContactSupport,
  };
}

export function useRequestDetailService(requestId = "REQ-2026-0842") {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeRequests = useAppSelector(selectAllRequests);

  const { data: apiRequest } = useGetRequestByIdQuery(requestId);
  const [closeRequestMutation] = useCloseRequestMutation();

  const [closeModalOpen, setCloseModalOpen] = useState(false);

  const request = useMemo<ConsumerRequestItem | undefined>(() => {
    return (
      apiRequest ??
      findRequestById(storeRequests, requestId) ??
      findRequestById(DEFAULT_CONSUMER_REQUESTS, requestId)
    );
  }, [apiRequest, storeRequests, requestId]);

  const resolvedRequest = request ?? DEFAULT_CONSUMER_REQUESTS[0];

  const handleBackToRequests = () => {
    router.push("/requests");
  };

  const handleEditRequest = () => {
    router.push(`/requests/${encodeURIComponent(resolvedRequest.id)}/edit`);
  };

  const handleViewQuote = (quote: { id: string }) => {
    router.push(`/quotations/${encodeURIComponent(quote.id)}`);
  };

  const handlePromoteRequest = () => {
    toast.success("Your request has been promoted!");
  };

  const handleConfirmClose = async () => {
    try {
      await closeRequestMutation({ id: resolvedRequest.id }).unwrap();
    } catch {
      dispatch(closeRequestItem(resolvedRequest.id));
    }
    setCloseModalOpen(false);
    toast.success("Request has been closed and archived.");
    router.push("/requests");
  };

  return {
    resolvedRequest,
    closeModalOpen,
    setCloseModalOpen,
    handleBackToRequests,
    handleEditRequest,
    handleViewQuote,
    handlePromoteRequest,
    handleConfirmClose,
  };
}

export function useCreateRequestService(initialSubmitted = false) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createRequestMutation] = useCreateRequestMutation();

  const [isSubmitted, setIsSubmitted] = useState(initialSubmitted);
  const [formValues, setFormValues] = useState<RequestFormValues>(
    INITIAL_REQUEST_FORM_VALUES
  );

  const handleSaveDraft = () => {
    toast.success("Request saved as draft.");
  };

  const handleSubmit = async () => {
    try {
      const created = await createRequestMutation(formValues).unwrap();
      dispatch(addRequestItem(created));
    } catch {
      // Fallback simulated creation
    }
    setIsSubmitted(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBackToRequests = () => {
    router.push("/requests");
  };

  const handleViewRequestDetail = () => {
    router.push("/requests/REQ-2026-0842");
  };

  const handleNotificationsClick = () => {
    router.push("/dashboard");
  };

  const handleInboxClick = () => {
    router.push("/messages");
  };

  const handleSettingsClick = () => {
    router.push("/settings");
  };

  return {
    isSubmitted,
    formValues,
    setFormValues,
    handleSaveDraft,
    handleSubmit,
    handleBackToRequests,
    handleViewRequestDetail,
    handleNotificationsClick,
    handleInboxClick,
    handleSettingsClick,
  };
}

export function useEditRequestService(
  requestId = "REQ-2026-0842",
  initialValues: RequestFormValues = DEFAULT_EDIT_REQUEST_VALUES
) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [updateRequestMutation] = useUpdateRequestMutation();

  const [formValues, setFormValues] =
    useState<RequestFormValues>(initialValues);

  const handleBackToDetail = () => {
    router.push(`/requests/${encodeURIComponent(requestId)}`);
  };

  const handleSaveChanges = async () => {
    try {
      const updated = await updateRequestMutation({
        id: requestId,
        values: formValues,
      }).unwrap();
      dispatch(updateRequestItem(updated));
    } catch {
      // Fallback simulated update
    }
    toast.success("Request changes saved successfully.");
    router.push(`/requests/${encodeURIComponent(requestId)}`);
  };

  return {
    formValues,
    setFormValues,
    handleBackToDetail,
    handleSaveChanges,
  };
}

// ============================================================================
// PROFESSIONAL REQUESTS SERVICE HOOKS
// ============================================================================

export function useProfessionalRequestsListService() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const storeRequests = useAppSelector(selectAllProRequests);
  const appliedFilters = useAppSelector(selectProRequestsFilters);
  const savedIds = useAppSelector(selectProSavedRequestIds);
  const currentPage = useAppSelector(selectProRequestsPage);

  const [draftFilters, setDraftFilters] =
    useState<ProfessionalRequestsFilterState>(appliedFilters);

  const { data: apiRequests, isFetching } = useGetProfessionalRequestsQuery(
    appliedFilters,
    { skip: false }
  );
  const [toggleSaveMutation] = useToggleSaveProfessionalRequestMutation();

  const requests =
    apiRequests ?? storeRequests ?? DEFAULT_PROFESSIONAL_REQUESTS;

  const filteredRequests = useMemo(
    () => filterProfessionalRequests(requests, appliedFilters),
    [requests, appliedFilters]
  );

  const totalPages = 3;

  const handleApplyFilters = () => {
    dispatch(setProRequestsFilters(draftFilters));
    toast.success("Request filters updated.");
  };

  const handleResetFilters = () => {
    const empty: ProfessionalRequestsFilterState = {
      category: "all",
      budgetRange: "any",
      location: "all",
    };
    setDraftFilters(empty);
    dispatch(resetProRequestsFilters());
    toast.info("Filters reset.");
  };

  const handlePageChange = (page: number) => {
    dispatch(setProRequestsPage(page));
  };

  const handleViewDetails = (request: ProfessionalRequestItem) => {
    router.push(`/requests/${encodeURIComponent(request.id)}`);
  };

  const handleToggleSave = async (request: ProfessionalRequestItem) => {
    const isCurrentlySaved = savedIds.includes(request.id);
    try {
      await toggleSaveMutation({ requestId: request.id }).unwrap();
    } catch {
      // Fallback to local state toggle
    }
    dispatch(toggleProSavedRequest(request.id));
    toast.success(
      isCurrentlySaved
        ? `Removed "${request.title}" from saved requests.`
        : `Saved "${request.title}" for later.`
    );
  };

  const handleLearnMoreVerification = () => {
    router.push("/verification");
  };

  return {
    draftFilters,
    setDraftFilters,
    filteredRequests,
    savedIds,
    currentPage,
    totalPages,
    isFetching,
    handleApplyFilters,
    handleResetFilters,
    handlePageChange,
    handleViewDetails,
    handleToggleSave,
    handleLearnMoreVerification,
  };
}

export function useProfessionalRequestDetailService(
  requestId = "RQ-2026-882"
) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const storeRequests = useAppSelector(selectAllProRequests);
  const savedIds = useAppSelector(selectProSavedRequestIds);

  const { data: apiRequest } = useGetProfessionalRequestByIdQuery(requestId);
  const [toggleSaveMutation] = useToggleSaveProfessionalRequestMutation();
  const [withdrawQuoteMutation] = useWithdrawProfessionalQuoteMutation();

  const request = useMemo<ProfessionalRequestItem>(() => {
    return (
      apiRequest ??
      findProfessionalRequestById(storeRequests, requestId) ??
      findProfessionalRequestById(DEFAULT_PROFESSIONAL_REQUESTS, requestId) ??
      DEFAULT_PROFESSIONAL_REQUESTS[0]
    );
  }, [apiRequest, storeRequests, requestId]);

  const isSaved = savedIds.includes(request.id);

  const handleBackToRequests = () => {
    router.push("/requests");
  };

  const handleSubmitQuote = () => {
    router.push(`/requests/${encodeURIComponent(request.id)}/quote`);
  };

  const handleToggleSave = async () => {
    try {
      await toggleSaveMutation({ requestId: request.id }).unwrap();
    } catch {
      // Local fallback
    }
    dispatch(toggleProSavedRequest(request.id));
    toast.success(
      isSaved
        ? `Removed "${request.title}" from saved requests.`
        : `Saved "${request.title}" for later.`
    );
  };

  const handleDownloadAttachment = () => {
    if (!request.attachment) return;
    toast.success(`Downloading ${request.attachment.fileName}...`);
  };

  const handleEditQuote = () => {
    router.push(`/requests/${encodeURIComponent(request.id)}/quote`);
  };

  const handleWithdrawQuote = async () => {
    try {
      await withdrawQuoteMutation({ requestId: request.id }).unwrap();
    } catch {
      // Local fallback
    }
    dispatch(withdrawProSubmittedQuoteLocal(request.id));
    toast.success("Your submitted quote has been withdrawn.");
  };

  const handleCompleteVerification = () => {
    router.push("/verification");
  };

  const handleUpdateProfileCategory = () => {
    router.push("/settings");
  };

  const handleContactSupport = () => {
    toast.info("Opening MyKostoma Professional Support...");
  };

  return {
    request,
    isSaved,
    handleBackToRequests,
    handleSubmitQuote,
    handleToggleSave,
    handleDownloadAttachment,
    handleEditQuote,
    handleWithdrawQuote,
    handleCompleteVerification,
    handleUpdateProfileCategory,
    handleContactSupport,
  };
}

export function useProfessionalSubmitQuoteService(requestId = "RQ-2026-882") {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const storeRequests = useAppSelector(selectAllProRequests);
  const [submitQuoteMutation] = useSubmitProfessionalQuoteMutation();

  const request = useMemo<ProfessionalRequestItem>(() => {
    return (
      findProfessionalRequestById(storeRequests, requestId) ??
      findProfessionalRequestById(DEFAULT_PROFESSIONAL_REQUESTS, requestId) ??
      DEFAULT_PROFESSIONAL_REQUESTS[0]
    );
  }, [storeRequests, requestId]);

  const [values, setValues] = useState<ProfessionalSubmitQuoteFormValues>(
    () => {
      if (request.submittedQuote) {
        return {
          totalQuotePrice: String(request.submittedQuote.totalPrice),
          estimatedDuration: request.submittedQuote.estimatedDuration,
          professionalNote: request.submittedQuote.professionalNote,
          milestones: request.submittedQuote.milestones.map((m) => ({
            id: m.id,
            name: m.name,
            amount: String(m.amount),
          })),
        };
      }
      return {
        totalQuotePrice: "",
        estimatedDuration: "",
        professionalNote: "",
        milestones: [
          {
            id: "ms-1",
            name: "Initial Deposit & Material Sourcing",
            amount: "150,000",
          },
          {
            id: "ms-2",
            name: "",
            amount: "",
          },
        ],
      };
    }
  );

  const [submittedQuote, setSubmittedQuote] =
    useState<ProfessionalSubmittedQuote | null>(null);

  const totalMilestoneAllocation = useMemo(
    () => calculateMilestoneAllocation(values.milestones),
    [values.milestones]
  );

  const totalQuoteNumeric = useMemo(
    () => parseNairaAmount(values.totalQuotePrice),
    [values.totalQuotePrice]
  );

  const handleAddMilestone = () => {
    setValues((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        {
          id: `ms-${Date.now()}`,
          name: "",
          amount: "",
        },
      ],
    }));
  };

  const handleRemoveMilestone = (milestoneId: string) => {
    setValues((prev) => {
      if (prev.milestones.length <= 1) return prev;
      return {
        ...prev,
        milestones: prev.milestones.filter((m) => m.id !== milestoneId),
      };
    });
  };

  const handleUpdateMilestone = (
    milestoneId: string,
    field: "name" | "amount",
    value: string
  ) => {
    setValues((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === milestoneId ? { ...m, [field]: value } : m
      ),
    }));
  };

  const handleSubmit = async () => {
    const effectiveTotal =
      totalQuoteNumeric > 0
        ? totalQuoteNumeric
        : totalMilestoneAllocation > 0
          ? totalMilestoneAllocation
          : 580000;

    const effectiveDuration =
      values.estimatedDuration.trim() || "10-14 Business Days";

    const effectiveNote =
      values.professionalNote.trim() ||
      "I have extensive experience with residential rewiring in Lagos. My quote includes premium materials and a 12-month warranty on labor.";

    const nonEmptyMilestones = values.milestones
      .filter((m) => m.name.trim() || parseNairaAmount(m.amount) > 0)
      .map((m, idx) => {
        const amt = parseNairaAmount(m.amount);
        return {
          id: m.id,
          name: m.name.trim() || `Milestone ${idx + 1}`,
          amount: amt,
          amountFormatted: formatNairaCompact(amt),
        };
      });

    const resolvedMilestones =
      nonEmptyMilestones.length > 0
        ? nonEmptyMilestones
        : [
            {
              id: "ms-default-1",
              name: "Initial Deposit & Materials",
              amount: 150000,
              amountFormatted: "₦150,000",
            },
            {
              id: "ms-default-2",
              name: "Wiring Completion",
              amount: 300000,
              amountFormatted: "₦300,000",
            },
            {
              id: "ms-default-3",
              name: "Final Testing & Handover",
              amount: 130000,
              amountFormatted: "₦130,000",
            },
          ];

    const summary: ProfessionalSubmittedQuote = {
      totalPrice: effectiveTotal,
      totalPriceFormatted: formatNairaCompact(effectiveTotal),
      estimatedDuration: effectiveDuration,
      professionalNote: effectiveNote,
      milestones: resolvedMilestones,
      submittedAtLabel: "Just now",
    };

    try {
      await submitQuoteMutation({
        requestId: request.id,
        values,
      }).unwrap();
    } catch {
      // Fallback to local state persistence
    }

    dispatch(
      saveProSubmittedQuoteLocal({
        requestId: request.id,
        quote: summary,
      })
    );

    setSubmittedQuote(summary);
    toast.success("Quote submitted successfully!");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBackToDetail = () => {
    router.push(`/requests/${encodeURIComponent(request.id)}`);
  };

  const handleGoToMyQuotes = () => {
    router.push("/quotations");
  };

  const handleDone = () => {
    router.push(`/requests/${encodeURIComponent(request.id)}`);
  };

  return {
    request,
    values,
    setValues,
    submittedQuote,
    totalMilestoneAllocation,
    totalMilestoneAllocationFormatted: formatNairaCompact(
      totalMilestoneAllocation
    ),
    totalQuoteNumeric,
    handleAddMilestone,
    handleRemoveMilestone,
    handleUpdateMilestone,
    handleSubmit,
    handleBackToDetail,
    handleGoToMyQuotes,
    handleDone,
  };
}

