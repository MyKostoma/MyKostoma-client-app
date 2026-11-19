import type {
  ProBankAccount,
  ProBankAccountFormValues,
  ProBankAccountType,
  ProPayoutSchedule,
  ProPayoutSettingsState,
  ProTransactionDirection,
  ProTransactionFiltersState,
  ProTransactionStatus,
  ProWalletSummary,
  ProWalletTransactionItem,
  ProWithdrawalSession,
  ProWithdrawalStatusState,
  ProWithdrawalStep,
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
  ProBankAccount,
  ProBankAccountFormValues,
  ProBankAccountType,
  ProPayoutSchedule,
  ProPayoutSettingsState,
  ProTransactionDirection,
  ProTransactionFiltersState,
  ProTransactionStatus,
  ProWalletSummary,
  ProWalletTransactionItem,
  ProWithdrawalSession,
  ProWithdrawalStatusState,
  ProWithdrawalStep,
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

export interface ProWalletWithdrawViewProps {
  initialStep?: ProWithdrawalStep;
}

export interface ProWalletWithdrawStatusViewProps {
  initialStatus?: ProWithdrawalStatusState;
}

export interface ProWalletAddBankViewProps {
  editBankId?: string;
}

