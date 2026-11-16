"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addRequestItem,
  closeRequestItem,
  selectAllRequests,
  selectRequestsActiveTab,
  selectRequestsSearchQuery,
  setRequestsActiveTab,
  setRequestsSearchQuery,
  updateRequestItem,
  useCloseRequestMutation,
  useCreateRequestMutation,
  useGetRequestByIdQuery,
  useGetRequestsQuery,
  useUpdateRequestMutation,
} from "@/store/slices/requestsSlice";
import { DEFAULT_CONSUMER_REQUESTS, DEFAULT_EDIT_REQUEST_VALUES } from "../data";
import type {
  ConsumerRequestItem,
  RequestFormValues,
  RequestTabFilter,
} from "../types";
import {
  INITIAL_REQUEST_FORM_VALUES,
  filterRequestsList,
  findRequestById,
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
