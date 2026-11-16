export type WalletTransactionType =
  | "escrow"
  | "funding"
  | "deposit"
  | "payment"
  | "withdrawal"
  | "refund"
  | "escrow-release";

export type WalletTransactionStatus =
  | "held"
  | "pending"
  | "completed"
  | "success"
  | "failed";

export type WalletFundingMethod = "bank-transfer" | "card";

export type WalletFundingStep = "amount-method" | "transfer-instructions";

export type WalletFundingStatusState = "pending" | "success" | "failed";

export interface WalletBalanceSummary {
  availableBalance: number;
  pendingBalance: number;
  escrowBalance: number;
  pendingCaption: string;
  escrowCaption: string;
}

export interface WalletTransactionItem {
  id: string;
  reference: string;
  dateISO: string;
  dateFormatted: string;
  timeFormatted: string;
  description: string;
  note: string;
  type: WalletTransactionType;
  typeLabel: string;
  direction: "credit" | "debit";
  amount: number;
  status: WalletTransactionStatus;
  statusLabel: string;
  paymentMethod: string;
  failureReason?: string;
}

export interface WalletBankTransferDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  reference: string;
  expiresInSeconds: number;
}

export interface WalletFundingSession {
  id: string;
  reference: string;
  amount: number;
  method: WalletFundingMethod;
  status: WalletFundingStatusState;
  bankDetails: WalletBankTransferDetails;
  failureTitle?: string;
  failureMessage?: string;
  failureReason?: string;
  createdAt: string;
}

export interface WalletTransactionFiltersState {
  dateRange: string;
  type: string;
  status: string;
  searchQuery: string;
}

export interface WalletBalanceCardsProps {
  summary: WalletBalanceSummary;
  onFundWallet: () => void;
  className?: string;
}

export interface WalletTransactionsTableProps {
  transactions: WalletTransactionItem[];
  variant?: "recent" | "full";
  onSelectTransaction?: (transaction: WalletTransactionItem) => void;
  onViewAll?: () => void;
  className?: string;
}

export interface WalletTransactionFiltersBarProps {
  filters: WalletTransactionFiltersState;
  onDateRangeChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onExportCsv: () => void;
  className?: string;
}

export interface WalletPaginationBarProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export interface WalletFundAmountFormProps {
  amountInput: string;
  quickAmounts: number[];
  selectedMethod: WalletFundingMethod;
  canContinue: boolean;
  onAmountInputChange: (value: string) => void;
  onSelectQuickAmount: (amount: number) => void;
  onSelectMethod: (method: WalletFundingMethod) => void;
  onContinue: () => void;
  className?: string;
}

export interface WalletBankTransferCardProps {
  amount: number;
  bankDetails: WalletBankTransferDetails;
  copiedField: "accountNumber" | "reference" | null;
  isConfirming?: boolean;
  onCopyField: (field: "accountNumber" | "reference", value: string) => void;
  onConfirmTransfer: () => void;
  onCancel: () => void;
  className?: string;
}

export interface WalletFundingStatusCardProps {
  status: WalletFundingStatusState;
  amount: number;
  reference: string;
  availableBalance: number;
  failureTitle?: string;
  failureMessage?: string;
  failureReason?: string;
  onBackToWallet: () => void;
  onViewTransactions: () => void;
  onRetryFunding: () => void;
  onContactSupport: () => void;
  onStatusSwitch?: (nextStatus: WalletFundingStatusState) => void;
  className?: string;
}

export interface WalletTransactionDetailCardsProps {
  transaction: WalletTransactionItem;
  copiedReference: boolean;
  onCopyReference: () => void;
  onDownloadReceipt: () => void;
  onShareDetails: () => void;
  onContactSupport: () => void;
  className?: string;
}

export interface WalletTrustFooterProps {
  className?: string;
}

