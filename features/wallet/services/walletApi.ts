"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import {
  deleteProBankAccountLocal,
  initiateFundingSessionLocal,
  initiateProWithdrawalLocal,
  resolveProWithdrawalLocal,
  saveProBankAccountLocal,
  selectActiveFundingSession,
  selectActiveWithdrawalSession,
  selectProBankAccounts,
  selectProPayoutSettings,
  selectProWalletSummary,
  selectProWalletTransactions,
  selectWalletSummary,
  selectWalletTransactions,
  setProPayoutScheduleLocal,
  setProPrimaryBankAccountLocal,
  toggleProPayoutAlertsLocal,
  toggleProRequire2FALocal,
  updateFundingStatusLocal,
  useConfirmWalletTransferMutation,
  useDeleteProBankAccountMutation,
  useGetProWalletOverviewQuery,
  useGetProWalletTransactionByIdQuery,
  useGetProWalletTransactionsQuery,
  useGetWalletOverviewQuery,
  useGetWalletTransactionByIdQuery,
  useGetWalletTransactionsQuery,
  useInitiateProWithdrawalMutation,
  useInitiateWalletFundingMutation,
  useSaveProBankAccountMutation,
  useUpdateProPayoutSettingsMutation,
  useVerifyProBankAccountMutation,
} from "@/store/slices/walletSlice";
import type {
  ProBankAccount,
  ProBankAccountFormValues,
  ProBankAccountType,
  ProPayoutSchedule,
  ProTransactionFiltersState,
  ProWalletTransactionItem,
  ProWithdrawalStatusState,
  ProWithdrawalStep,
  WalletFundingMethod,
  WalletFundingStatusState,
  WalletFundingStep,
  WalletTransactionFiltersState,
  WalletTransactionItem,
} from "@/components/wallet/types";
import {
  DEFAULT_PRO_WALLET_FILTERS,
  DEFAULT_PRO_WALLET_TRANSACTIONS,
  DEFAULT_WALLET_FILTERS,
  PRO_NIGERIAN_BANKS_OPTIONS,
  PRO_WALLET_MONTH_OPTIONS,
  PRO_WALLET_STATUS_OPTIONS,
  PRO_WALLET_TYPE_OPTIONS,
  PRO_WITHDRAWAL_FEE,
  WALLET_QUICK_AMOUNTS,
} from "../data";
import {
  buildProAddBankHref,
  buildProPayoutSettingsHref,
  buildProWithdrawHref,
  buildProWithdrawStatusHref,
  buildWalletFundHref,
  buildWalletFundingStatusHref,
  buildWalletOverviewHref,
  buildWalletTransactionDetailHref,
  buildWalletTransactionsHref,
  exportProTransactionsToCsv,
  exportTransactionsToCsv,
  extractBankShortName,
  filterProWalletTransactions,
  filterWalletTransactions,
  findProWalletTransactionById,
  findWalletTransactionById,
  parseNumericInput,
  resolveMockVerifiedAccountName,
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

// ============================================================================
// PROFESSIONAL WALLET SERVICE HOOKS
// ============================================================================

export function useProWalletOverviewService() {
  const router = useRouter();
  const storeSummary = useAppSelector(selectProWalletSummary);
  const storeTransactions = useAppSelector(selectProWalletTransactions);
  const storeBankAccounts = useAppSelector(selectProBankAccounts);

  const { data: apiOverview } = useGetProWalletOverviewQuery(undefined, {
    skip: false,
  });

  const summary = apiOverview?.summary ?? storeSummary;
  const transactions = useMemo(
    () =>
      apiOverview?.transactions?.length
        ? apiOverview.transactions
        : storeTransactions,
    [apiOverview?.transactions, storeTransactions]
  );
  const bankAccounts = useMemo(
    () =>
      apiOverview?.bankAccounts?.length
        ? apiOverview.bankAccounts
        : storeBankAccounts,
    [apiOverview?.bankAccounts, storeBankAccounts]
  );

  const recentTransactions = useMemo(
    () => transactions.slice(0, 3),
    [transactions]
  );

  const primaryBankAccount = useMemo(
    () => bankAccounts.find((b) => b.isPrimary) ?? bankAccounts[0],
    [bankAccounts]
  );

  const handlePayoutSettings = useCallback(() => {
    router.push(buildProPayoutSettingsHref());
  }, [router]);

  const handleWithdrawFunds = useCallback(() => {
    router.push(buildProWithdrawHref());
  }, [router]);

  const handleViewAllTransactions = useCallback(() => {
    router.push(buildWalletTransactionsHref());
  }, [router]);

  const handleSelectTransaction = useCallback(
    (transaction: ProWalletTransactionItem) => {
      router.push(buildWalletTransactionDetailHref(transaction.id));
    },
    [router]
  );

  const handleEditBankDetails = useCallback(() => {
    if (primaryBankAccount) {
      router.push(buildProAddBankHref(primaryBankAccount.id));
      return;
    }
    router.push(buildProPayoutSettingsHref());
  }, [router, primaryBankAccount]);

  const handleLearnMoreEscrow = useCallback(() => {
    toast.info(
      "MyKostoma Secure Escrow holds client project payments until deliverables are confirmed."
    );
  }, []);

  const handleHelpCenter = useCallback(() => {
    router.push("/messages");
  }, [router]);

  return {
    summary,
    recentTransactions,
    primaryBankAccount,
    handlePayoutSettings,
    handleWithdrawFunds,
    handleViewAllTransactions,
    handleSelectTransaction,
    handleEditBankDetails,
    handleLearnMoreEscrow,
    handleHelpCenter,
  };
}

export function useProWalletTransactionsService() {
  const router = useRouter();
  const summary = useAppSelector(selectProWalletSummary);
  const storeTransactions = useAppSelector(selectProWalletTransactions);
  const [filters, setFilters] = useState<ProTransactionFiltersState>(
    DEFAULT_PRO_WALLET_FILTERS
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  const { data: apiTransactions } = useGetProWalletTransactionsQuery(filters, {
    skip: false,
  });

  const allTransactions = useMemo(
    () =>
      apiTransactions?.length ? apiTransactions : storeTransactions,
    [apiTransactions, storeTransactions]
  );

  const filteredTransactions = useMemo(
    () => filterProWalletTransactions(allTransactions, filters),
    [allTransactions, filters]
  );

  const isDefaultUnfiltered =
    !filters.searchQuery.trim() &&
    filters.type === "all" &&
    filters.status === "all" &&
    filters.month === "oct-2026";

  const totalItems = isDefaultUnfiltered ? 24 : filteredTransactions.length;
  const totalPages = Math.max(
    1,
    isDefaultUnfiltered ? 5 : Math.ceil(filteredTransactions.length / pageSize)
  );

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const slice = filteredTransactions.slice(start, start + pageSize);
    return slice.length > 0 ? slice : filteredTransactions.slice(0, pageSize);
  }, [filteredTransactions, currentPage]);

  const startIndex = filteredTransactions.length === 0 ? 0 : 1;
  const endIndex = Math.min(pageSize, filteredTransactions.length);

  const handleSearchChange = useCallback((searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }));
    setCurrentPage(1);
  }, []);

  const handleMonthChange = useCallback((month: string) => {
    setFilters((prev) => ({ ...prev, month }));
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

  const handleMoreFilters = useCallback(() => {
    setFilters({
      searchQuery: "",
      month: "all",
      type: "all",
      status: "all",
    });
    setCurrentPage(1);
    toast.info("Showing all transaction records across periods.");
  }, []);

  const handleExportCsv = useCallback(() => {
    exportProTransactionsToCsv(filteredTransactions);
    toast.success("Transaction history exported as CSV.");
  }, [filteredTransactions]);

  const handleSelectTransaction = useCallback(
    (transaction: ProWalletTransactionItem) => {
      router.push(buildWalletTransactionDetailHref(transaction.id));
    },
    [router]
  );

  const handleViewEscrowStatus = useCallback(() => {
    router.push("/orders");
  }, [router]);

  return {
    summary,
    filters,
    paginatedTransactions,
    monthOptions: PRO_WALLET_MONTH_OPTIONS,
    typeOptions: PRO_WALLET_TYPE_OPTIONS,
    statusOptions: PRO_WALLET_STATUS_OPTIONS,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems,
    handleSearchChange,
    handleMonthChange,
    handleTypeChange,
    handleStatusChange,
    handleMoreFilters,
    handleExportCsv,
    handleSelectTransaction,
    handleViewEscrowStatus,
  };
}

export function useProWalletTransactionDetailService(transactionId: string) {
  const router = useRouter();
  const storeTransactions = useAppSelector(selectProWalletTransactions);
  const { data: apiTransaction } =
    useGetProWalletTransactionByIdQuery(transactionId);

  const [copiedReference, setCopiedReference] = useState(false);

  const transaction = useMemo<ProWalletTransactionItem>(() => {
    return (
      apiTransaction ??
      findProWalletTransactionById(storeTransactions, transactionId) ??
      findProWalletTransactionById(
        DEFAULT_PRO_WALLET_TRANSACTIONS,
        transactionId
      ) ??
      findProWalletTransactionById(
        DEFAULT_PRO_WALLET_TRANSACTIONS,
        "TXN-987654321"
      ) ??
      DEFAULT_PRO_WALLET_TRANSACTIONS[0]
    );
  }, [apiTransaction, storeTransactions, transactionId]);

  const handleCopyReference = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(transaction.referenceId).catch(() => {});
    }
    setCopiedReference(true);
    toast.success(`Copied ${transaction.referenceId}`);
    window.setTimeout(() => setCopiedReference(false), 2000);
  }, [transaction.referenceId]);

  const handleBackToHistory = useCallback(() => {
    router.push(buildWalletTransactionsHref());
  }, [router]);

  const handleDownloadReceipt = useCallback(() => {
    exportProTransactionsToCsv([transaction]);
    toast.success(`Downloading receipt for #${transaction.id}...`);
  }, [transaction]);

  const handleOpenRelatedProject = useCallback(() => {
    if (transaction.relatedOrderId) {
      router.push(`/orders/${encodeURIComponent(transaction.relatedOrderId)}`);
      return;
    }
    router.push("/orders");
  }, [router, transaction.relatedOrderId]);

  const handleMessageClient = useCallback(() => {
    router.push("/messages");
  }, [router]);

  const handleContactSupport = useCallback(() => {
    router.push("/messages");
  }, [router]);

  const handleReportIssue = useCallback(() => {
    toast.info(`Issue report opened for transaction #${transaction.id}.`);
  }, [transaction.id]);

  return {
    transaction,
    copiedReference,
    handleCopyReference,
    handleBackToHistory,
    handleDownloadReceipt,
    handleOpenRelatedProject,
    handleMessageClient,
    handleContactSupport,
    handleReportIssue,
  };
}

export function useProPayoutSettingsService() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const settings = useAppSelector(selectProPayoutSettings);
  const bankAccounts = useAppSelector(selectProBankAccounts);

  const [updatePayoutSettings] = useUpdateProPayoutSettingsMutation();
  const [deleteBankMutation] = useDeleteProBankAccountMutation();

  const [deletingAccount, setDeletingAccount] =
    useState<ProBankAccount | null>(null);

  const handleSelectSchedule = useCallback(
    async (schedule: ProPayoutSchedule) => {
      dispatch(setProPayoutScheduleLocal(schedule));
      try {
        await updatePayoutSettings({ schedule }).unwrap();
      } catch {
        // Local state already updated
      }
      const label =
        schedule === "daily"
          ? "Daily Payouts"
          : schedule === "weekly"
            ? "Weekly Payouts"
            : "Monthly Payouts";
      toast.success(`Payout schedule updated to ${label}.`);
    },
    [dispatch, updatePayoutSettings]
  );

  const handleTogglePayoutAlerts = useCallback(
    async (checked: boolean) => {
      dispatch(toggleProPayoutAlertsLocal(checked));
      try {
        await updatePayoutSettings({ payoutAlertsEnabled: checked }).unwrap();
      } catch {
        // Local fallback
      }
      toast.success(
        checked ? "Payout alerts enabled." : "Payout alerts disabled."
      );
    },
    [dispatch, updatePayoutSettings]
  );

  const handleToggleRequire2FA = useCallback(
    async (checked: boolean) => {
      dispatch(toggleProRequire2FALocal(checked));
      try {
        await updatePayoutSettings({
          require2FAForWithdrawals: checked,
        }).unwrap();
      } catch {
        // Local fallback
      }
      toast.success(
        checked
          ? "2FA required for manual withdrawals."
          : "2FA requirement turned off."
      );
    },
    [dispatch, updatePayoutSettings]
  );

  const handleAddBankAccount = useCallback(() => {
    router.push(buildProAddBankHref());
  }, [router]);

  const handleEditBankAccount = useCallback(
    (account: ProBankAccount) => {
      router.push(buildProAddBankHref(account.id));
    },
    [router]
  );

  const handleConfirmDeleteBankAccount = useCallback(async () => {
    if (!deletingAccount) return;
    try {
      await deleteBankMutation(deletingAccount.id).unwrap();
    } catch {
      // Local fallback
    }
    dispatch(deleteProBankAccountLocal(deletingAccount.id));
    toast.success(`${deletingAccount.bankName} removed from payout accounts.`);
    setDeletingAccount(null);
  }, [deletingAccount, deleteBankMutation, dispatch]);

  const handleSetPrimaryBankAccount = useCallback(
    (accountId: string) => {
      dispatch(setProPrimaryBankAccountLocal(accountId));
      toast.success("Primary payout account updated.");
    },
    [dispatch]
  );

  const handleConfigure2FA = useCallback(() => {
    router.push("/settings");
  }, [router]);

  const handleContactSupport = useCallback(() => {
    router.push("/messages");
  }, [router]);

  return {
    settings,
    bankAccounts,
    deletingAccount,
    setDeletingAccount,
    handleSelectSchedule,
    handleTogglePayoutAlerts,
    handleToggleRequire2FA,
    handleAddBankAccount,
    handleEditBankAccount,
    handleConfirmDeleteBankAccount,
    handleSetPrimaryBankAccount,
    handleConfigure2FA,
    handleContactSupport,
  };
}

export function useProBankAccountFormService(editBankId?: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const bankAccounts = useAppSelector(selectProBankAccounts);
  const currentUser = useAppSelector(selectCurrentUser);

  const [verifyBankMutation] = useVerifyProBankAccountMutation();
  const [saveBankMutation] = useSaveProBankAccountMutation();

  const profileName = useMemo(
    () =>
      currentUser?.fullName ||
      (currentUser?.firstName
        ? `${currentUser.firstName} ${currentUser.lastName || ""}`.trim()
        : "") ||
      "Alex Studio",
    [currentUser]
  );

  const existingAccount = useMemo(
    () =>
      editBankId
        ? bankAccounts.find((b) => b.id === editBankId)
        : undefined,
    [bankAccounts, editBankId]
  );

  const [values, setValues] = useState<ProBankAccountFormValues>(() => {
    if (existingAccount) {
      return {
        bankName: existingAccount.bankName,
        accountNumber: existingAccount.accountNumber,
        accountName: existingAccount.accountName,
        accountType: existingAccount.accountType,
        isVerified: existingAccount.isVerified,
      };
    }
    return {
      bankName: "",
      accountNumber: "",
      accountName: "",
      accountType: "savings",
      isVerified: false,
    };
  });

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  const handleBankChange = useCallback((bankName: string) => {
    setValues((prev) => ({
      ...prev,
      bankName,
      accountName: "",
      isVerified: false,
    }));
    setVerificationError(null);
  }, []);

  const handleAccountNumberChange = useCallback((raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    setValues((prev) => ({
      ...prev,
      accountNumber: digits,
      accountName: "",
      isVerified: false,
    }));
    setVerificationError(null);
  }, []);

  const handleVerifyAccount = useCallback(async () => {
    if (!values.bankName) {
      setVerificationError("Please select your bank first.");
      return;
    }
    if (values.accountNumber.length !== 10) {
      setVerificationError("Enter a valid 10-digit NUBAN account number.");
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);

    let resolvedName = resolveMockVerifiedAccountName(
      values.bankName,
      values.accountNumber,
      profileName
    );

    try {
      const response = await verifyBankMutation({
        bankName: values.bankName,
        accountNumber: values.accountNumber,
      }).unwrap();
      if (response.verified && response.accountName) {
        resolvedName = response.accountName;
      }
    } catch {
      await new Promise((resolve) => window.setTimeout(resolve, 450));
    }

    setValues((prev) => ({
      ...prev,
      accountName: resolvedName || "Alex Studio Design LTD",
      isVerified: true,
    }));
    setIsVerifying(false);
    toast.success("Bank account verified successfully.");
  }, [values.bankName, values.accountNumber, profileName, verifyBankMutation]);

  const handleAccountTypeChange = useCallback((accountType: ProBankAccountType) => {
    setValues((prev) => ({ ...prev, accountType }));
  }, []);

  const handleCancel = useCallback(() => {
    router.push(buildProPayoutSettingsHref());
  }, [router]);

  const handleSave = useCallback(async () => {
    if (!values.bankName) {
      toast.error("Please select a bank.");
      return;
    }
    if (values.accountNumber.length !== 10) {
      toast.error("Please enter a 10-digit account number.");
      return;
    }
    if (!values.isVerified || !values.accountName) {
      toast.error("Please verify your account number before saving.");
      return;
    }

    const accountPayload: ProBankAccount = {
      id: existingAccount?.id ?? `bank-${Date.now()}`,
      bankName: values.bankName,
      bankShortName: extractBankShortName(values.bankName),
      accountNumber: values.accountNumber,
      last4: values.accountNumber.slice(-4),
      accountName: values.accountName,
      accountType: values.accountType,
      isPrimary: existingAccount?.isPrimary ?? false,
      isVerified: true,
    };

    try {
      await saveBankMutation({
        ...values,
        id: existingAccount?.id,
      }).unwrap();
    } catch {
      // Fallback to local state
    }

    dispatch(saveProBankAccountLocal(accountPayload));
    toast.success(
      existingAccount
        ? "Bank account updated successfully."
        : "Bank account connected successfully."
    );
    router.push(buildProPayoutSettingsHref());
  }, [values, existingAccount, saveBankMutation, dispatch, router]);

  return {
    isEditing: Boolean(existingAccount),
    profileName,
    bankOptions: PRO_NIGERIAN_BANKS_OPTIONS,
    values,
    isVerifying,
    verificationError,
    handleBankChange,
    handleAccountNumberChange,
    handleVerifyAccount,
    handleAccountTypeChange,
    handleCancel,
    handleSave,
  };
}

export function useProWithdrawFlowService(
  initialStep: ProWithdrawalStep = "form"
) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const summary = useAppSelector(selectProWalletSummary);
  const bankAccounts = useAppSelector(selectProBankAccounts);
  const [initiateWithdrawalMutation] = useInitiateProWithdrawalMutation();

  const [step, setStep] = useState<ProWithdrawalStep>(initialStep);
  const [amountInput, setAmountInput] = useState<string>("");
  const [activePercent, setActivePercent] = useState<number | null>(100);
  const [selectedBankId, setSelectedBankId] = useState<string>(() => {
    const primary = bankAccounts.find((b) => b.isPrimary) ?? bankAccounts[0];
    return primary?.id ?? "";
  });
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBank = useMemo<ProBankAccount | undefined>(
    () => bankAccounts.find((b) => b.id === selectedBankId) ?? bankAccounts[0],
    [bankAccounts, selectedBankId]
  );

  const parsedAmount = useMemo(
    () => parseNumericInput(amountInput),
    [amountInput]
  );
  const fee = PRO_WITHDRAWAL_FEE;
  const netAmount = Math.max(0, parsedAmount - fee);

  const handleAmountChange = useCallback((value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, "");
    setAmountInput(cleaned);
    setActivePercent(null);
    setValidationError(null);
  }, []);

  const handleSelectPercent = useCallback(
    (percent: 25 | 50 | 75 | 100) => {
      const computed = Math.floor((summary.availableBalance * percent) / 100);
      setAmountInput(String(computed));
      setActivePercent(percent);
      setValidationError(null);
    },
    [summary.availableBalance]
  );

  const handleSelectBank = useCallback((bankId: string) => {
    setSelectedBankId(bankId);
    setValidationError(null);
  }, []);

  const handleAddNewBank = useCallback(() => {
    router.push(buildProAddBankHref());
  }, [router]);

  const handleCancel = useCallback(() => {
    router.push(buildWalletOverviewHref());
  }, [router]);

  const handleReviewWithdrawal = useCallback(() => {
    if (parsedAmount <= 0) {
      setValidationError("Enter a valid withdrawal amount.");
      return;
    }
    if (parsedAmount < 100) {
      setValidationError("Minimum withdrawal amount is ₦100.00.");
      return;
    }
    if (parsedAmount > summary.availableBalance) {
      setValidationError("Withdrawal amount exceeds your available balance.");
      return;
    }
    if (!selectedBank) {
      setValidationError("Please add and select a destination bank account.");
      return;
    }
    setValidationError(null);
    setStep("confirm");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [parsedAmount, summary.availableBalance, selectedBank]);

  const handleBackToEdit = useCallback(() => {
    setStep("form");
  }, []);

  const handleConfirmWithdraw = useCallback(async () => {
    if (!selectedBank || isSubmitting) return;
    setIsSubmitting(true);

    dispatch(
      initiateProWithdrawalLocal({
        amount: parsedAmount,
        fee,
        bankAccount: selectedBank,
      })
    );

    try {
      await initiateWithdrawalMutation({
        amount: parsedAmount,
        bankAccountId: selectedBank.id,
      }).unwrap();
    } catch {
      // Local withdrawal session handles flow
    }

    router.push(buildProWithdrawStatusHref());
  }, [
    selectedBank,
    isSubmitting,
    dispatch,
    parsedAmount,
    fee,
    initiateWithdrawalMutation,
    router,
  ]);

  return {
    step,
    availableBalance: summary.availableBalance,
    amountInput,
    parsedAmount,
    fee,
    netAmount,
    activePercent,
    bankAccounts,
    selectedBankId: selectedBank?.id ?? "",
    selectedBank,
    validationError,
    isSubmitting,
    handleAmountChange,
    handleSelectPercent,
    handleSelectBank,
    handleAddNewBank,
    handleCancel,
    handleReviewWithdrawal,
    handleBackToEdit,
    handleConfirmWithdraw,
  };
}

export function useProWithdrawStatusService(
  initialStatus?: ProWithdrawalStatusState
) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const session = useAppSelector(selectActiveWithdrawalSession);
  const summary = useAppSelector(selectProWalletSummary);
  const bankAccounts = useAppSelector(selectProBankAccounts);

  const [processingStage, setProcessingStage] = useState<1 | 2 | 3>(2);

  const effectiveSession = useMemo(() => {
    if (initialStatus) {
      return {
        ...session,
        status: initialStatus,
      };
    }
    return session;
  }, [session, initialStatus]);

  useEffect(() => {
    if (initialStatus) return;
    if (session.status !== "processing") return;

    const linkedBank = bankAccounts.find((b) => b.id === session.bankAccountId);
    const shouldFail =
      session.amount > summary.availableBalance ||
      (linkedBank !== undefined && !linkedBank.isVerified);

    const stepTimer = window.setTimeout(() => {
      setProcessingStage(3);
    }, 1100);

    const resolveTimer = window.setTimeout(() => {
      dispatch(
        resolveProWithdrawalLocal({
          status: shouldFail ? "failed" : "success",
          errorCode: shouldFail ? "BANK_REJECTED_01" : undefined,
        })
      );
    }, 2400);

    return () => {
      window.clearTimeout(stepTimer);
      window.clearTimeout(resolveTimer);
    };
  }, [
    initialStatus,
    session.status,
    session.amount,
    session.bankAccountId,
    summary.availableBalance,
    bankAccounts,
    dispatch,
  ]);

  const handleBackToWallet = useCallback(() => {
    router.push(buildWalletOverviewHref());
  }, [router]);

  const handleViewTransactionDetails = useCallback(() => {
    router.push(buildWalletTransactionDetailHref(effectiveSession.transactionId));
  }, [router, effectiveSession.transactionId]);

  const handleDownloadReceipt = useCallback(() => {
    exportProTransactionsToCsv([
      {
        id: effectiveSession.transactionId,
        referenceId: `#REF-${effectiveSession.transactionId.slice(-5)}`,
        dateFormatted: "Oct 24, 2026",
        dateTimeFormatted: "Oct 24, 2026, 14:30",
        dateISO: "2026-10-24",
        monthKey: "oct-2026",
        title: `Withdrawal to ${effectiveSession.bankShortName}`,
        subtitle: "Payout",
        description: `Payout to ${effectiveSession.bankName} (•••• ${effectiveSession.last4}).`,
        direction: "debit",
        typeDetailLabel: "Bank Withdrawal (Debit)",
        amount: effectiveSession.netAmount,
        status: effectiveSession.status === "failed" ? "failed" : "completed",
        paymentMethod: "Nigerian Bank Transfer",
      },
    ]);
    toast.success("Withdrawal receipt downloaded.");
  }, [effectiveSession]);

  const handleTryAgain = useCallback(() => {
    router.push(buildProWithdrawHref());
  }, [router]);

  const handleCheckPayoutSettings = useCallback(() => {
    router.push(buildProPayoutSettingsHref());
  }, [router]);

  const handleContactSupport = useCallback(() => {
    router.push("/messages");
  }, [router]);

  return {
    session: effectiveSession,
    processingStage,
    handleBackToWallet,
    handleViewTransactionDetails,
    handleDownloadReceipt,
    handleTryAgain,
    handleCheckPayoutSettings,
    handleContactSupport,
  };
}


