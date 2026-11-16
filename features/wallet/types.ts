import type {
  WalletBalanceSummary,
  WalletBankTransferDetails,
  WalletFundingMethod,
  WalletFundingSession,
  WalletFundingStatusState,
  WalletFundingStep,
  WalletTransactionFiltersState,
  WalletTransactionItem,
  WalletTransactionStatus,
  WalletTransactionType,
} from "@/components/wallet/types";

export type {
  WalletBalanceSummary,
  WalletBankTransferDetails,
  WalletFundingMethod,
  WalletFundingSession,
  WalletFundingStatusState,
  WalletFundingStep,
  WalletTransactionFiltersState,
  WalletTransactionItem,
  WalletTransactionStatus,
  WalletTransactionType,
};

export interface WalletOverviewViewProps {
  initialTransactions?: WalletTransactionItem[];
}

export interface WalletFundViewProps {
  initialStep?: WalletFundingStep;
  initialAmount?: number;
}

export interface WalletFundingStatusViewProps {
  initialStatus?: WalletFundingStatusState;
  initialReference?: string;
  initialAmount?: number;
}

export interface WalletTransactionsViewProps {
  initialTransactions?: WalletTransactionItem[];
}

export interface WalletTransactionDetailViewProps {
  transactionId: string;
}

