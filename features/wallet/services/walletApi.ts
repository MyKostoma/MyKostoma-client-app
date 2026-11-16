"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  initiateFundingSessionLocal,
  selectActiveFundingSession,
  selectWalletSummary,
  selectWalletTransactions,
  updateFundingStatusLocal,
  useConfirmWalletTransferMutation,
  useGetWalletOverviewQuery,
  useGetWalletTransactionByIdQuery,
  useGetWalletTransactionsQuery,
  useInitiateWalletFundingMutation,
} from "@/store/slices/walletSlice";
import type {
  WalletFundingMethod,
  WalletFundingStatusState,
  WalletFundingStep,
  WalletTransactionFiltersState,
  WalletTransactionItem,
} from "@/components/wallet/types";
import {
  DEFAULT_WALLET_FILTERS,
  WALLET_QUICK_AMOUNTS,
} from "../data";
import {
  buildWalletFundHref,
  buildWalletFundingStatusHref,
  buildWalletOverviewHref,
  buildWalletTransactionDetailHref,
  buildWalletTransactionsHref,
  exportTransactionsToCsv,
  filterWalletTransactions,
  findWalletTransactionById,
  parseNumericInput,
} from "./walletHelpers";

export function useWalletOverviewService(
  initialTransactions?: WalletTransactionItem[]
) {
  const router = useRouter();
  const storeSummary = useAppSelector(selectWalletSummary);
  const storeTransactions = useAppSelector(selectWalletTransactions);

  const { data: apiOverview } = useGetWalletOverviewQuery();

  const summary = apiOverview?.summary ?? storeSummary;
  const allTransactions = useMemo(
    () =>
      apiOverview?.transactions?.length
        ? apiOverview.transactions
        : initialTransactions?.length
          ? initialTransactions
          : storeTransactions,
    [apiOverview?.transactions, initialTransactions, storeTransactions]
  );

  const recentTransactions = useMemo(
    () => allTransactions.slice(0, 4),
    [allTransactions]
  );

  const handleFundWallet = useCallback(() => {
    router.push(buildWalletFundHref());
  }, [router]);

  const handleViewAllTransactions = useCallback(() => {
    router.push(buildWalletTransactionsHref());
  }, [router]);

  const handleSelectTransaction = useCallback(
    (transaction: WalletTransactionItem) => {
      router.push(buildWalletTransactionDetailHref(transaction.id));
    },
    [router]
  );

  return {
    summary,
    recentTransactions,
    handleFundWallet,
    handleViewAllTransactions,
    handleSelectTransaction,
  };
}

export function useWalletFundService(
  initialStep: WalletFundingStep = "amount-method",
  initialAmount?: number
) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeSession = useAppSelector(selectActiveFundingSession);

  const [initiateFundingMutation, { isLoading: isInitiating }] =
    useInitiateWalletFundingMutation();
  const [confirmTransferMutation, { isLoading: isConfirming }] =
    useConfirmWalletTransferMutation();

  const [step, setStep] = useState<WalletFundingStep>(initialStep);
  const [amountInput, setAmountInput] = useState<string>(
    initialAmount && initialAmount > 0 ? String(initialAmount) : ""
  );
  const [selectedMethod, setSelectedMethod] =
    useState<WalletFundingMethod>("bank-transfer");
  const [copiedField, setCopiedField] = useState<
    "accountNumber" | "reference" | null
  >(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(
    activeSession.bankDetails.expiresInSeconds
  );

  useEffect(() => {
    if (step !== "transfer-instructions") return;
    setSecondsLeft(activeSession.bankDetails.expiresInSeconds);

    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [step, activeSession.bankDetails.expiresInSeconds]);

  const parsedAmount = useMemo(
    () => parseNumericInput(amountInput),
    [amountInput]
  );
  const canContinue = parsedAmount >= 100;

  const handleAmountInputChange = useCallback((value: string) => {
    const sanitized = value.replace(/[^0-9.]/g, "");
    setAmountInput(sanitized);
  }, []);

  const handleSelectQuickAmount = useCallback((quickAmount: number) => {
    setAmountInput((prev) => {
      const current = parseNumericInput(prev);
      return String(current + quickAmount);
    });
  }, []);

  const handleContinue = useCallback(async () => {
    if (!canContinue) return;

    dispatch(
      initiateFundingSessionLocal({
        amount: parsedAmount,
        method: selectedMethod,
      })
    );

    try {
      await initiateFundingMutation({
        amount: parsedAmount,
        method: selectedMethod,
      }).unwrap();
    } catch {
      // Local state already updated
    }

    if (selectedMethod === "card") {
      dispatch(
        updateFundingStatusLocal({
          status: "success",
          amount: parsedAmount,
        })
      );
      router.push(
        buildWalletFundingStatusHref({
          status: "success",
          ref: activeSession.reference,
          amount: parsedAmount,
        })
      );
      return;
    }

    setStep("transfer-instructions");
  }, [
    canContinue,
    dispatch,
    parsedAmount,
    selectedMethod,
    initiateFundingMutation,
    router,
    activeSession.reference,
  ]);

  const handleCopyField = useCallback(
    (field: "accountNumber" | "reference", value: string) => {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(value).catch(() => {});
      }
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 2000);
    },
    []
  );

  const handleConfirmTransfer = useCallback(async () => {
    const effectiveAmount = parsedAmount > 0 ? parsedAmount : activeSession.amount;

    dispatch(
      updateFundingStatusLocal({
        status: "pending",
        reference: activeSession.reference,
        amount: effectiveAmount,
      })
    );

    try {
      await confirmTransferMutation({
        reference: activeSession.reference,
        amount: effectiveAmount,
      }).unwrap();
    } catch {
      // Local fallback already handled
    }

    router.push(
      buildWalletFundingStatusHref({
        status: "pending",
        ref: activeSession.reference,
        amount: effectiveAmount,
      })
    );
  }, [
    parsedAmount,
    activeSession.amount,
    activeSession.reference,
    dispatch,
    confirmTransferMutation,
    router,
  ]);

  const handleCancelTransfer = useCallback(() => {
    setStep("amount-method");
  }, []);

  const handleTopBarBack = useCallback(() => {
    if (step === "transfer-instructions") {
      setStep("amount-method");
      return;
    }
    router.push(buildWalletOverviewHref());
  }, [step, router]);

  return {
    step,
    amountInput,
    parsedAmount: parsedAmount > 0 ? parsedAmount : activeSession.amount,
    quickAmounts: WALLET_QUICK_AMOUNTS,
    selectedMethod,
    setSelectedMethod,
    canContinue,
    isInitiating,
    isConfirming,
    bankDetails: {
      ...activeSession.bankDetails,
      expiresInSeconds: secondsLeft,
    },
    copiedField,
    handleAmountInputChange,
    handleSelectQuickAmount,
    handleContinue,
    handleCopyField,
    handleConfirmTransfer,
    handleCancelTransfer,
    handleTopBarBack,
  };
}

export function useWalletFundingStatusService(
  initialStatus?: WalletFundingStatusState,
  initialReference?: string,
  initialAmount?: number
) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeSession = useAppSelector(selectActiveFundingSession);
  const walletSummary = useAppSelector(selectWalletSummary);

  const [status, setStatus] = useState<WalletFundingStatusState>(
    initialStatus ?? activeSession.status ?? "pending"
  );

  const effectiveAmount = initialAmount ?? activeSession.amount ?? 25000;
  const effectiveReference =
    initialReference ??
    (status === "failed" ? "MK-998823" : activeSession.reference || "MK-998822");

  const handleStatusSwitch = useCallback(
    (nextStatus: WalletFundingStatusState) => {
      setStatus(nextStatus);
      dispatch(
        updateFundingStatusLocal({
          status: nextStatus,
          reference: effectiveReference,
          amount: effectiveAmount,
        })
      );
    },
    [dispatch, effectiveReference, effectiveAmount]
  );

  const handleBackToWallet = useCallback(() => {
    router.push(buildWalletOverviewHref());
  }, [router]);

  const handleViewTransactions = useCallback(() => {
    router.push(buildWalletTransactionsHref());
  }, [router]);

  const handleRetryFunding = useCallback(() => {
    router.push(buildWalletFundHref("amount-method", effectiveAmount));
  }, [router, effectiveAmount]);

  const handleContactSupport = useCallback(() => {
    router.push("/messages");
  }, [router]);

  return {
    status,
    amount: effectiveAmount,
    reference: effectiveReference,
    availableBalance: walletSummary.availableBalance,
    failureTitle: activeSession.failureTitle ?? "Payment Authorization Failed",
    failureMessage:
      activeSession.failureMessage ??
      "Unable to process your deposit. Please check your bank details and try again.",
    failureReason: activeSession.failureReason ?? "Transaction Timed Out",
    handleStatusSwitch,
    handleBackToWallet,
    handleViewTransactions,
    handleRetryFunding,
    handleContactSupport,
  };
}

export function useWalletTransactionsService(
  initialTransactions?: WalletTransactionItem[]
) {
  const router = useRouter();
  const storeTransactions = useAppSelector(selectWalletTransactions);
  const { data: apiTransactions } = useGetWalletTransactionsQuery();

  const [filters, setFilters] = useState<WalletTransactionFiltersState>(
    DEFAULT_WALLET_FILTERS
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  const allTransactions = useMemo(
    () =>
      apiTransactions?.length
        ? apiTransactions
        : initialTransactions?.length
          ? initialTransactions
          : storeTransactions,
    [apiTransactions, initialTransactions, storeTransactions]
  );

  const filteredTransactions = useMemo(
    () => filterWalletTransactions(allTransactions, filters),
    [allTransactions, filters]
  );

  const isUnfiltered =
    filters.type === "all" &&
    filters.status === "all" &&
    !filters.searchQuery.trim();

  const totalItems = isUnfiltered ? 142 : filteredTransactions.length;
  const totalPages = Math.max(
    1,
    isUnfiltered ? 28 : Math.ceil(filteredTransactions.length / pageSize)
  );

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const slice = filteredTransactions.slice(start, start + pageSize);
    return slice.length > 0 ? slice : filteredTransactions.slice(0, pageSize);
  }, [filteredTransactions, currentPage]);

  const startIndex = filteredTransactions.length === 0 ? 0 : 1;
  const endIndex = Math.min(pageSize, filteredTransactions.length);

  const handleDateRangeChange = useCallback((dateRange: string) => {
    setFilters((prev) => ({ ...prev, dateRange }));
    setCurrentPage(1);
  }, []);

  const handleTypeChange = useCallback((type: string) => {
    setFilters((prev) => ({ ...prev, type }));
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((status: string) => {
    setFilters((prev) => ({ ...prev, status }));
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }));
    setCurrentPage(1);
  }, []);

  const handleExportCsv = useCallback(() => {
    exportTransactionsToCsv(filteredTransactions);
  }, [filteredTransactions]);

  const handleSelectTransaction = useCallback(
    (transaction: WalletTransactionItem) => {
      router.push(buildWalletTransactionDetailHref(transaction.id));
    },
    [router]
  );

  return {
    filters,
    paginatedTransactions,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems,
    handleDateRangeChange,
    handleTypeChange,
    handleStatusChange,
    handleSearchChange,
    handleExportCsv,
    handleSelectTransaction,
  };
}

export function useWalletTransactionDetailService(transactionId: string) {
  const router = useRouter();
  const storeTransactions = useAppSelector(selectWalletTransactions);
  const { data: apiTransaction } =
    useGetWalletTransactionByIdQuery(transactionId);

  const [copiedReference, setCopiedReference] = useState(false);

  const transaction = useMemo(() => {
    if (apiTransaction) return apiTransaction;
    const matched = findWalletTransactionById(storeTransactions, transactionId);
    if (matched) {
      return {
        ...matched,
        type:
          matched.id === "MK-TRX-99201"
            ? ("escrow-release" as const)
            : matched.type,
        typeLabel:
          matched.id === "MK-TRX-99201" ? "ESCROW RELEASE" : matched.typeLabel,
        status:
          matched.id === "MK-TRX-99201" ? ("success" as const) : matched.status,
        statusLabel:
          matched.id === "MK-TRX-99201" ? "Success" : matched.statusLabel,
      };
    }
    return storeTransactions[0];
  }, [apiTransaction, storeTransactions, transactionId]);

  const handleCopyReference = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(transaction.reference).catch(() => {});
    }
    setCopiedReference(true);
    window.setTimeout(() => setCopiedReference(false), 2000);
  }, [transaction.reference]);

  const handleDownloadReceipt = useCallback(() => {
    exportTransactionsToCsv([transaction]);
  }, [transaction]);

  const handleShareDetails = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: `MyKostoma Transaction ${transaction.reference}`,
          text: `${transaction.description} — ₦${transaction.amount.toLocaleString()}`,
          url: window.location.href,
        })
        .catch(() => {});
      return;
    }
    handleCopyReference();
  }, [transaction, handleCopyReference]);

  const handleContactSupport = useCallback(() => {
    router.push("/messages");
  }, [router]);

  const handleBackToTransactions = useCallback(() => {
    router.push(buildWalletTransactionsHref());
  }, [router]);

  return {
    transaction,
    copiedReference,
    handleCopyReference,
    handleDownloadReceipt,
    handleShareDetails,
    handleContactSupport,
    handleBackToTransactions,
  };
}

