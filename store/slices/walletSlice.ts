import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import type { RootState } from "../index";
import type {
  WalletBalanceSummary,
  WalletFundingMethod,
  WalletFundingSession,
  WalletFundingStatusState,
  WalletTransactionItem,
} from "@/components/wallet/types";
import {
  DEFAULT_BANK_TRANSFER_DETAILS,
  DEFAULT_WALLET_FUNDING_SESSION,
  DEFAULT_WALLET_SUMMARY,
  DEFAULT_WALLET_TRANSACTIONS,
} from "@/features/wallet/data";

export interface WalletSliceState {
  summary: WalletBalanceSummary;
  transactions: WalletTransactionItem[];
  activeFundingSession: WalletFundingSession;
}

const initialState: WalletSliceState = {
  summary: DEFAULT_WALLET_SUMMARY,
  transactions: DEFAULT_WALLET_TRANSACTIONS,
  activeFundingSession: DEFAULT_WALLET_FUNDING_SESSION,
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
  },
});

export const { initiateFundingSessionLocal, updateFundingStatusLocal } =
  walletSlice.actions;

export const selectWalletSummary = (state: RootState) => state.wallet.summary;
export const selectWalletTransactions = (state: RootState) =>
  state.wallet.transactions;
export const selectActiveFundingSession = (state: RootState) =>
  state.wallet.activeFundingSession;

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
  }),
  overrideExisting: false,
});

export const {
  useGetWalletOverviewQuery,
  useGetWalletTransactionsQuery,
  useGetWalletTransactionByIdQuery,
  useInitiateWalletFundingMutation,
  useConfirmWalletTransferMutation,
} = walletApi;

export default walletSlice.reducer;

