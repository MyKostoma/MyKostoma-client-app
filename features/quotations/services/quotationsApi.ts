"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  acceptQuotationItem,
  clearComparedQuotations,
  rejectQuotationItem,
  restoreQuotationItem,
  selectAllQuotations,
  selectComparedQuotationIds,
  selectQuotationsActiveTab,
  selectQuotationsSearchQuery,
  setQuotationsActiveTab,
  setQuotationsSearchQuery,
  toggleComparedQuotationId,
  useAcceptQuotationMutation,
  useGetQuotationByIdQuery,
  useGetQuotationsQuery,
  useRejectQuotationMutation,
  useRequestQuotationRevisionMutation,
  useRestoreQuotationMutation,
} from "@/store/slices/quotationsSlice";
import { DEFAULT_QUOTATIONS } from "../data";
import type {
  QuotationItem,
  QuotationRevisionEntry,
  QuotationRevisionFormValues,
  QuotationStatus,
  QuotationTabFilter,
} from "../types";
import {
  INITIAL_REVISION_FORM_VALUES,
  filterQuotationsList,
  findQuotationById,
  resolveInitialCompareQuotes,
} from "./quotationsHelpers";

export function useQuotationsListService(initialQuotations?: QuotationItem[]) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const storeQuotations = useAppSelector(selectAllQuotations);
  const activeTab = useAppSelector(selectQuotationsActiveTab);
  const searchQuery = useAppSelector(selectQuotationsSearchQuery);
  const comparedIds = useAppSelector(selectComparedQuotationIds);

  const { data: apiQuotations, isFetching } = useGetQuotationsQuery(
    { tab: activeTab, search: searchQuery },
    { skip: false }
  );

  const [acceptQuotationMutation] = useAcceptQuotationMutation();
  const [rejectQuotationMutation] = useRejectQuotationMutation();
  const [restoreQuotationMutation] = useRestoreQuotationMutation();

  const quotations =
    initialQuotations ?? apiQuotations ?? storeQuotations ?? DEFAULT_QUOTATIONS;

  const [acceptingQuote, setAcceptingQuote] = useState<QuotationItem | null>(
    null
  );
  const [rejectingQuote, setRejectingQuote] = useState<QuotationItem | null>(
    null
  );

  const filteredQuotations = useMemo(
    () =>
      filterQuotationsList(quotations, activeTab, searchQuery, comparedIds),
    [quotations, activeTab, searchQuery, comparedIds]
  );

  const setActiveTab = (tab: QuotationTabFilter) => {
    dispatch(setQuotationsActiveTab(tab));
  };

  const setSearchQuery = (query: string) => {
    dispatch(setQuotationsSearchQuery(query));
  };

  const handleToggleCompare = (quote: QuotationItem) => {
    if (!comparedIds.includes(quote.id) && comparedIds.length >= 3) {
      toast.info("You can compare up to 3 quotes at a time.");
      return;
    }
    dispatch(toggleComparedQuotationId(quote.id));
  };

  const handleClearCompare = () => {
    dispatch(clearComparedQuotations());
  };

  const handleViewDetail = (quote: QuotationItem) => {
    router.push(`/quotations/${encodeURIComponent(quote.id)}`);
  };

  const handleConfirmAccept = async () => {
    if (!acceptingQuote) return;
    try {
      await acceptQuotationMutation({ id: acceptingQuote.id }).unwrap();
    } catch {
      dispatch(acceptQuotationItem({ id: acceptingQuote.id }));
    }
    toast.success(
      `Quote from ${acceptingQuote.providerName} accepted! Order created.`
    );
    const targetId = acceptingQuote.id;
    setAcceptingQuote(null);
    router.push(`/quotations/${encodeURIComponent(targetId)}`);
  };

  const handleConfirmReject = async () => {
    if (!rejectingQuote) return;
    try {
      await rejectQuotationMutation({ id: rejectingQuote.id }).unwrap();
    } catch {
      dispatch(rejectQuotationItem(rejectingQuote.id));
    }
    toast.success(`Quote from ${rejectingQuote.providerName} rejected.`);
    setRejectingQuote(null);
  };

  const handleRestoreQuote = async (quote: QuotationItem) => {
    try {
      await restoreQuotationMutation({ id: quote.id }).unwrap();
    } catch {
      dispatch(restoreQuotationItem(quote.id));
    }
    toast.success(`Quote from ${quote.providerName} restored.`);
  };

  const handleCompareNow = () => {
    const query =
      comparedIds.length > 0 ? `?ids=${comparedIds.join(",")}` : "";
    router.push(`/quotations/compare${query}`);
  };

  const handleToggleFilters = () => {
    toast.info("Filter options coming soon.");
  };

  const handlePromoteRequest = () => {
    toast.success(
      "Your request has been promoted to top professionals!"
    );
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    comparedIds,
    filteredQuotations,
    isFetching,
    acceptingQuote,
    setAcceptingQuote,
    rejectingQuote,
    setRejectingQuote,
    handleToggleCompare,
    handleClearCompare,
    handleViewDetail,
    handleConfirmAccept,
    handleConfirmReject,
    handleRestoreQuote,
    handleCompareNow,
    handleToggleFilters,
    handlePromoteRequest,
  };
}

export function useQuotationDetailService(quotationId = "QT-8821-A") {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeQuotations = useAppSelector(selectAllQuotations);

  const { data: apiQuotation } = useGetQuotationByIdQuery(quotationId);
  const [acceptQuotationMutation] = useAcceptQuotationMutation();
  const [rejectQuotationMutation] = useRejectQuotationMutation();
  const [restoreQuotationMutation] = useRestoreQuotationMutation();

  const matchedQuote = useMemo<QuotationItem>(() => {
    return (
      apiQuotation ??
      findQuotationById(storeQuotations, quotationId) ??
      findQuotationById(DEFAULT_QUOTATIONS, quotationId) ??
      DEFAULT_QUOTATIONS[0]
    );
  }, [apiQuotation, storeQuotations, quotationId]);

  const [statusOverride, setStatusOverride] = useState<QuotationStatus | null>(
    null
  );
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const effectiveStatus = statusOverride ?? matchedQuote.status;
  const quotation: QuotationItem = useMemo(
    () => ({
      ...matchedQuote,
      status: effectiveStatus,
    }),
    [matchedQuote, effectiveStatus]
  );

  const isUpdated = effectiveStatus === "updated";
  const canManage =
    effectiveStatus === "pending" || effectiveStatus === "updated";

  const handleBackToQuotes = () => {
    router.push("/quotations");
  };

  const handleCompare = () => {
    router.push("/quotations/compare");
  };

  const handleRequestUpdate = () => {
    router.push(`/quotations/${encodeURIComponent(quotation.id)}/revision`);
  };

  const handleConfirmAccept = async () => {
    try {
      await acceptQuotationMutation({ id: quotation.id }).unwrap();
    } catch {
      dispatch(acceptQuotationItem({ id: quotation.id }));
    }
    setAcceptModalOpen(false);
    setStatusOverride("accepted");
    toast.success("Quote accepted and converted into an active order!");
  };

  const handleConfirmReject = async () => {
    try {
      await rejectQuotationMutation({ id: quotation.id }).unwrap();
    } catch {
      dispatch(rejectQuotationItem(quotation.id));
    }
    setRejectModalOpen(false);
    setStatusOverride("rejected");
    toast.success("Quote has been rejected.");
  };

  const handleRestoreQuote = async () => {
    try {
      await restoreQuotationMutation({ id: quotation.id }).unwrap();
    } catch {
      dispatch(restoreQuotationItem(quotation.id));
    }
    setStatusOverride("pending");
    toast.success("Quote restored to pending review.");
  };

  const handleGoToOrder = () => {
    router.push("/orders");
  };

  const handleViewReceipt = () => {
    toast.info("Downloading order receipt...");
  };

  const handleMessageArtisan = () => {
    router.push("/messages");
  };

  const handleViewOriginalRequest = () => {
    router.push(`/requests/${encodeURIComponent(quotation.requestId)}`);
  };

  const handleViewProfile = () => {
    toast.info(`Viewing profile for ${quotation.providerName}`);
  };

  const handleSelectRevision = (rev: QuotationRevisionEntry) => {
    toast.info(`Viewing ${rev.versionLabel} (${rev.amount})`);
  };

  return {
    quotation,
    isUpdated,
    canManage,
    acceptModalOpen,
    setAcceptModalOpen,
    rejectModalOpen,
    setRejectModalOpen,
    handleBackToQuotes,
    handleCompare,
    handleRequestUpdate,
    handleConfirmAccept,
    handleConfirmReject,
    handleRestoreQuote,
    handleGoToOrder,
    handleViewReceipt,
    handleMessageArtisan,
    handleViewOriginalRequest,
    handleViewProfile,
    handleSelectRevision,
  };
}

export function useCompareQuotationsService(selectedIds?: string[]) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeQuotations = useAppSelector(selectAllQuotations);
  const [acceptQuotationMutation] = useAcceptQuotationMutation();
  const [rejectQuotationMutation] = useRejectQuotationMutation();

  const initialQuotes = useMemo(
    () =>
      resolveInitialCompareQuotes(
        storeQuotations.length > 0 ? storeQuotations : DEFAULT_QUOTATIONS,
        selectedIds
      ),
    [storeQuotations, selectedIds]
  );

  const [comparedQuotes, setComparedQuotes] =
    useState<QuotationItem[]>(initialQuotes);
  const [acceptingQuote, setAcceptingQuote] = useState<QuotationItem | null>(
    null
  );
  const [rejectingQuote, setRejectingQuote] = useState<QuotationItem | null>(
    null
  );

  const primaryQuote = comparedQuotes[0] ?? DEFAULT_QUOTATIONS[0];

  const handleBackToQuotes = () => {
    router.push("/quotations");
  };

  const handleDownloadComparison = () => {
    toast.success("Downloading PDF comparison summary...");
  };

  const handleViewDetail = (quote: QuotationItem) => {
    router.push(`/quotations/${encodeURIComponent(quote.id)}`);
  };

  const handleConfirmAccept = async () => {
    if (!acceptingQuote) return;
    try {
      await acceptQuotationMutation({ id: acceptingQuote.id }).unwrap();
    } catch {
      dispatch(acceptQuotationItem({ id: acceptingQuote.id }));
    }
    toast.success(
      `Quote from ${acceptingQuote.providerName} accepted! Redirecting...`
    );
    const targetId = acceptingQuote.id;
    setAcceptingQuote(null);
    router.push(`/quotations/${encodeURIComponent(targetId)}`);
  };

  const handleConfirmReject = async () => {
    if (!rejectingQuote) return;
    try {
      await rejectQuotationMutation({ id: rejectingQuote.id }).unwrap();
    } catch {
      dispatch(rejectQuotationItem(rejectingQuote.id));
    }
    setComparedQuotes((prev) =>
      prev.filter((q) => q.id !== rejectingQuote.id)
    );
    toast.success(
      `Quote from ${rejectingQuote.providerName} rejected and removed from comparison.`
    );
    setRejectingQuote(null);
  };

  return {
    comparedQuotes,
    primaryQuote,
    acceptingQuote,
    setAcceptingQuote,
    rejectingQuote,
    setRejectingQuote,
    handleBackToQuotes,
    handleDownloadComparison,
    handleViewDetail,
    handleConfirmAccept,
    handleConfirmReject,
  };
}

export function useRequestRevisionService(quotationId = "QT-8821-A") {
  const router = useRouter();
  const storeQuotations = useAppSelector(selectAllQuotations);
  const [requestRevisionMutation] = useRequestQuotationRevisionMutation();

  const quotation = useMemo<QuotationItem>(() => {
    return (
      findQuotationById(storeQuotations, quotationId) ??
      findQuotationById(DEFAULT_QUOTATIONS, quotationId) ??
      DEFAULT_QUOTATIONS[0]
    );
  }, [storeQuotations, quotationId]);

  const [formValues, setFormValues] = useState<QuotationRevisionFormValues>(
    INITIAL_REVISION_FORM_VALUES
  );

  const handleBackToQuote = () => {
    router.push(`/quotations/${encodeURIComponent(quotation.id)}`);
  };

  const handleSubmit = async () => {
    if (!formValues.changesDescription.trim()) {
      toast.error("Please describe the updates you need before submitting.");
      return;
    }
    try {
      await requestRevisionMutation({
        id: quotation.id,
        values: formValues,
      }).unwrap();
    } catch {
      // Fallback simulated revision request
    }
    toast.success(
      `Revision request sent to ${quotation.providerName}. You will be notified once updated.`
    );
    router.push(`/quotations/${encodeURIComponent(quotation.id)}`);
  };

  return {
    quotation,
    formValues,
    setFormValues,
    handleBackToQuote,
    handleSubmit,
  };
}
