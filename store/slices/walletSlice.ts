import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import type { RootState } from "../index";
import type {
  ProBankAccount,
  ProBankAccountFormValues,
  ProPayoutSchedule,
  ProPayoutSettingsState,
  ProTransactionFiltersState,
  ProWalletSummary,
  ProWalletTransactionItem,
  ProWithdrawalSession,
  WalletBalanceSummary,
  WalletFundingMethod,
  WalletFundingSession,
  WalletFundingStatusState,
  WalletTransactionItem,
} from "@/components/wallet/types";
import {
  DEFAULT_BANK_TRANSFER_DETAILS,
  DEFAULT_PRO_BANK_ACCOUNTS,
  DEFAULT_PRO_PAYOUT_SETTINGS,
  DEFAULT_PRO_WALLET_SUMMARY,
  DEFAULT_PRO_WALLET_TRANSACTIONS,
  DEFAULT_PRO_WITHDRAWAL_SESSION,
  DEFAULT_WALLET_FUNDING_SESSION,
  DEFAULT_WALLET_SUMMARY,
  DEFAULT_WALLET_TRANSACTIONS,
  PRO_WITHDRAWAL_FEE,
} from "@/features/wallet/data";

export interface WalletSliceState {
  summary: WalletBalanceSummary;
  transactions: WalletTransactionItem[];
  activeFundingSession: WalletFundingSession;
  proSummary: ProWalletSummary;
  proTransactions: ProWalletTransactionItem[];
  proBankAccounts: ProBankAccount[];
  proPayoutSettings: ProPayoutSettingsState;
  activeWithdrawalSession: ProWithdrawalSession;
}

const initialState: WalletSliceState = {
  summary: DEFAULT_WALLET_SUMMARY,
  transactions: DEFAULT_WALLET_TRANSACTIONS,
  activeFundingSession: DEFAULT_WALLET_FUNDING_SESSION,
  proSummary: DEFAULT_PRO_WALLET_SUMMARY,
  proTransactions: DEFAULT_PRO_WALLET_TRANSACTIONS,
  proBankAccounts: DEFAULT_PRO_BANK_ACCOUNTS,
  proPayoutSettings: DEFAULT_PRO_PAYOUT_SETTINGS,
  activeWithdrawalSession: DEFAULT_PRO_WITHDRAWAL_SESSION,
};

export interface InitiateFundingPayload {
  amount: number;
  method: WalletFundingMethod;
}

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    initiateFundingSessionLocal(
      state,
      action: PayloadAction<InitiateFundingPayload>
    ) {
      const { amount, method } = action.payload;
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const reference = `MK-${randomSuffix}`;

      state.activeFundingSession = {
        id: `fund-session-${randomSuffix}`,
        reference,
        amount,
        method,
        status: "pending",
        bankDetails: {
          ...DEFAULT_BANK_TRANSFER_DETAILS,
          reference,
          expiresInSeconds: 1798,
        },
        failureTitle: "Payment Authorization Failed",
        failureMessage:
          "Unable to process your deposit. Please check your bank details and try again.",
        failureReason: "Transaction Timed Out",
        createdAt: new Date().toISOString(),
      };
    },

    updateFundingStatusLocal(
      state,
      action: PayloadAction<{
        status: WalletFundingStatusState;
        reference?: string;
        amount?: number;
      }>
    ) {
      const { status, reference, amount } = action.payload;
      const effectiveAmount = amount ?? state.activeFundingSession.amount;
      const effectiveReference =
        reference ?? state.activeFundingSession.reference;

      state.activeFundingSession.status = status;
      if (reference) {
        state.activeFundingSession.reference = reference;
      }
      if (amount) {
        state.activeFundingSession.amount = amount;
      }

      if (status === "success") {
        const alreadyRecorded = state.transactions.some(
          (tx) => tx.reference === effectiveReference
        );
        if (!alreadyRecorded) {
          state.summary.availableBalance += effectiveAmount;
          const now = new Date();
          const dateISO = now.toISOString().slice(0, 10);
          const dateFormatted = now.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });
          const timeFormatted = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          state.transactions.unshift({
            id: effectiveReference,
            reference: effectiveReference,
            dateISO,
            dateFormatted,
            timeFormatted,
            description:
              state.activeFundingSession.method === "card"
                ? "Wallet Top-up via Debit Card"
                : "Wallet Top-up via Bank Transfer",
            note: `Wallet funded with ₦${effectiveAmount.toLocaleString()} (Ref: ${effectiveReference}).`,
            type: "funding",
            typeLabel: "FUNDING",
            direction: "credit",
            amount: effectiveAmount,
            status: "completed",
            statusLabel: "Completed",
            paymentMethod:
              state.activeFundingSession.method === "card"
                ? "Debit / Credit Card"
                : "Nigerian Bank Transfer",
          });
        }
      }
    },

    setProPayoutScheduleLocal(
      state,
      action: PayloadAction<ProPayoutSchedule>
    ) {
      state.proPayoutSettings.schedule = action.payload;
    },

    toggleProPayoutAlertsLocal(state, action: PayloadAction<boolean>) {
      state.proPayoutSettings.payoutAlertsEnabled = action.payload;
    },

    toggleProRequire2FALocal(state, action: PayloadAction<boolean>) {
      state.proPayoutSettings.require2FAForWithdrawals = action.payload;
    },

    saveProBankAccountLocal(state, action: PayloadAction<ProBankAccount>) {
      const incoming = action.payload;
      const existingIdx = state.proBankAccounts.findIndex(
        (b) => b.id === incoming.id
      );

      if (existingIdx >= 0) {
        state.proBankAccounts[existingIdx] = incoming;
        return;
      }

      const shouldBePrimary = state.proBankAccounts.length === 0;
      state.proBankAccounts.push({
        ...incoming,
        isPrimary: shouldBePrimary ? true : incoming.isPrimary,
      });
    },

    deleteProBankAccountLocal(state, action: PayloadAction<string>) {
      const removed = state.proBankAccounts.find(
        (b) => b.id === action.payload
      );
      state.proBankAccounts = state.proBankAccounts.filter(
        (b) => b.id !== action.payload
      );
      if (removed?.isPrimary && state.proBankAccounts.length > 0) {
        state.proBankAccounts[0].isPrimary = true;
      }
    },

    setProPrimaryBankAccountLocal(state, action: PayloadAction<string>) {
      state.proBankAccounts = state.proBankAccounts.map((b) => ({
        ...b,
        isPrimary: b.id === action.payload,
      }));
    },

    initiateProWithdrawalLocal(
      state,
      action: PayloadAction<{
        amount: number;
        fee?: number;
        bankAccount: ProBankAccount;
      }>
    ) {
      const { amount, bankAccount } = action.payload;
      const fee = action.payload.fee ?? PRO_WITHDRAWAL_FEE;
      const netAmount = Math.max(0, amount - fee);
      const suffix = Math.floor(100000000 + Math.random() * 900000000);
      const transactionId = `TXN-${suffix}`;

      state.activeWithdrawalSession = {
        transactionId,
        amount,
        fee,
        netAmount,
        bankAccountId: bankAccount.id,
        bankName: bankAccount.bankName,
        bankShortName: bankAccount.bankShortName,
        last4: bankAccount.last4,
        accountName: bankAccount.accountName,
        status: "processing",
        errorCode: "BANK_REJECTED_01",
        createdAt: new Date().toISOString(),
      };
    },

    resolveProWithdrawalLocal(
      state,
      action: PayloadAction<{
        status: "success" | "failed";
        errorCode?: string;
      }>
    ) {
      const { status, errorCode } = action.payload;
      state.activeWithdrawalSession.status = status;
      if (errorCode) {
        state.activeWithdrawalSession.errorCode = errorCode;
      }

      if (status === "success") {
        const session = state.activeWithdrawalSession;
        const alreadyRecorded = state.proTransactions.some(
          (tx) => tx.id === session.transactionId
        );
        if (!alreadyRecorded) {
          state.proSummary.availableBalance = Math.max(
            0,
            state.proSummary.availableBalance - session.amount
          );
          state.proSummary.totalDebits += session.amount;

          const now = new Date();
          const dateFormatted = now.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });
          const timePart = now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          state.proTransactions.unshift({
            id: session.transactionId,
            referenceId: `#REF-${session.transactionId.slice(-5)}`,
            dateFormatted,
            dateTimeFormatted: `${dateFormatted}, ${timePart}`,
            dateISO: now.toISOString().slice(0, 10),
            monthKey: "oct-2026",
            title: `Withdrawal to ${session.bankShortName}`,
            subtitle: "Payout",
            historySubtitle: "Payout",
            description: `Withdrawal to ${session.bankName} account ending in •••• ${session.last4} (${session.accountName}).`,
            direction: "debit",
            typeDetailLabel: "Bank Withdrawal (Debit)",
            amount: session.amount,
            status: "completed",
            paymentMethod: "Nigerian Bank Transfer",
          });
        }
      }
    },
  },
});

export const {
  initiateFundingSessionLocal,
  updateFundingStatusLocal,
  setProPayoutScheduleLocal,
  toggleProPayoutAlertsLocal,
  toggleProRequire2FALocal,
  saveProBankAccountLocal,
  deleteProBankAccountLocal,
  setProPrimaryBankAccountLocal,
  initiateProWithdrawalLocal,
  resolveProWithdrawalLocal,
} = walletSlice.actions;

export const selectWalletSummary = (state: RootState) => state.wallet.summary;
export const selectWalletTransactions = (state: RootState) =>
  state.wallet.transactions;
export const selectActiveFundingSession = (state: RootState) =>
  state.wallet.activeFundingSession;

export const selectProWalletSummary = (state: RootState) =>
  state.wallet.proSummary;
export const selectProWalletTransactions = (state: RootState) =>
  state.wallet.proTransactions;
export const selectProBankAccounts = (state: RootState) =>
  state.wallet.proBankAccounts;
export const selectProPayoutSettings = (state: RootState) =>
  state.wallet.proPayoutSettings;
export const selectActiveWithdrawalSession = (state: RootState) =>
  state.wallet.activeWithdrawalSession;

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWalletOverview: builder.query<
      {
        summary: WalletBalanceSummary;
        transactions: WalletTransactionItem[];
      },
      void
    >({
      query: () => "/wallet/overview",
      providesTags: ["User"],
    }),
    getWalletTransactions: builder.query<WalletTransactionItem[], void>({
      query: () => "/wallet/transactions",
      providesTags: ["User"],
    }),
    getWalletTransactionById: builder.query<WalletTransactionItem, string>({
      query: (id) => `/wallet/transactions/${encodeURIComponent(id)}`,
      providesTags: (_result, _err, id) => [{ type: "User", id }],
    }),
    initiateWalletFunding: builder.mutation<
      WalletFundingSession,
      InitiateFundingPayload
    >({
      query: (body) => ({
        url: "/wallet/fund/initiate",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    confirmWalletTransfer: builder.mutation<
      { status: WalletFundingStatusState; reference: string },
      { reference: string; amount: number }
    >({
      query: (body) => ({
        url: "/wallet/fund/confirm",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // Professional Wallet Endpoints
    getProWalletOverview: builder.query<
      {
        summary: ProWalletSummary;
        transactions: ProWalletTransactionItem[];
        bankAccounts: ProBankAccount[];
      },
      void
    >({
      query: () => "/professional/wallet/overview",
      providesTags: ["Wallet"],
    }),
    getProWalletTransactions: builder.query<
      ProWalletTransactionItem[],
      Partial<ProTransactionFiltersState> | void
    >({
      query: (params) => ({
        url: "/professional/wallet/transactions",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Wallet"],
    }),
    getProWalletTransactionById: builder.query<ProWalletTransactionItem, string>(
      {
        query: (id) =>
          `/professional/wallet/transactions/${encodeURIComponent(id)}`,
        providesTags: (_result, _err, id) => [{ type: "Wallet", id }],
      }
    ),
    updateProPayoutSettings: builder.mutation<
      ProPayoutSettingsState,
      Partial<ProPayoutSettingsState>
    >({
      query: (body) => ({
        url: "/professional/wallet/payout-settings",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Wallet"],
    }),
    verifyProBankAccount: builder.mutation<
      { accountName: string; verified: boolean },
      { bankName: string; accountNumber: string }
    >({
      query: (body) => ({
        url: "/professional/wallet/bank-accounts/verify",
        method: "POST",
        body,
      }),
    }),
    saveProBankAccount: builder.mutation<
      ProBankAccount,
      ProBankAccountFormValues & { id?: string }
    >({
      query: (body) => ({
        url: body.id
          ? `/professional/wallet/bank-accounts/${encodeURIComponent(body.id)}`
          : "/professional/wallet/bank-accounts",
        method: body.id ? "PUT" : "POST",
        body,
      }),
      invalidatesTags: ["Wallet"],
    }),
    deleteProBankAccount: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/professional/wallet/bank-accounts/${encodeURIComponent(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wallet"],
    }),
    initiateProWithdrawal: builder.mutation<
      ProWithdrawalSession,
      { amount: number; bankAccountId: string }
    >({
      query: (body) => ({
        url: "/professional/wallet/withdraw",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wallet"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWalletOverviewQuery,
  useGetWalletTransactionsQuery,
  useGetWalletTransactionByIdQuery,
  useInitiateWalletFundingMutation,
  useConfirmWalletTransferMutation,
  useGetProWalletOverviewQuery,
  useGetProWalletTransactionsQuery,
  useGetProWalletTransactionByIdQuery,
  useUpdateProPayoutSettingsMutation,
  useVerifyProBankAccountMutation,
  useSaveProBankAccountMutation,
  useDeleteProBankAccountMutation,
  useInitiateProWithdrawalMutation,
} = walletApi;

export default walletSlice.reducer;

