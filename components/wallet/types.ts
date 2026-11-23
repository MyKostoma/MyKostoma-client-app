import type { SelectOption } from "@/components/ui/form-fields";

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

// ============================================================================
// PROFESSIONAL WALLET MODULE TYPES
// ============================================================================

export type ProPayoutSchedule = "daily" | "weekly" | "monthly";
export type ProBankAccountType = "savings" | "current";
export type ProTransactionDirection = "credit" | "debit";
export type ProTransactionStatus = "completed" | "pending" | "failed";
export type ProWithdrawalStep = "form" | "confirm";
export type ProWithdrawalStatusState = "processing" | "success" | "failed";

export interface ProWalletSummary {
  availableBalance: number;
  currency: string;
  pendingBalance: number;
  escrowBalance: number;
  totalCredits: number;
  totalDebits: number;
}

export interface ProBankAccount {
  id: string;
  bankName: string;
  bankShortName: string;
  accountNumber: string;
  last4: string;
  accountName: string;
  accountType: ProBankAccountType;
  isPrimary: boolean;
  isVerified: boolean;
}

export interface ProWalletTransactionItem {
  id: string;
  referenceId: string;
  dateFormatted: string;
  dateTimeFormatted: string;
  dateISO: string;
  monthKey: string;
  title: string;
  subtitle: string;
  historySubtitle?: string;
  description: string;
  direction: ProTransactionDirection;
  typeDetailLabel: string;
  amount: number;
  status: ProTransactionStatus;
  paymentMethod: string;
  relatedProjectTitle?: string;
  relatedOrderId?: string;
  clientName?: string;
  clientAvatarUrl?: string;
}

export interface ProPayoutSettingsState {
  schedule: ProPayoutSchedule;
  payoutAlertsEnabled: boolean;
  require2FAForWithdrawals: boolean;
}

export interface ProWithdrawalSession {
  transactionId: string;
  amount: number;
  fee: number;
  netAmount: number;
  bankAccountId: string;
  bankName: string;
  bankShortName: string;
  last4: string;
  accountName: string;
  status: ProWithdrawalStatusState;
  errorCode?: string;
  createdAt: string;
}

export interface ProTransactionFiltersState {
  searchQuery: string;
  month: string;
  type: string;
  status: string;
}

export interface ProBankAccountFormValues {
  bankName: string;
  accountNumber: string;
  accountName: string;
  accountType: ProBankAccountType;
  isVerified: boolean;
}

export interface ProWalletBalanceSectionProps {
  summary: ProWalletSummary;
  onPayoutSettings: () => void;
  onWithdrawFunds: () => void;
  className?: string;
}

export interface ProWalletRecentTransactionsProps {
  transactions: ProWalletTransactionItem[];
  primaryBankAccount?: ProBankAccount;
  onViewAllTransactions: () => void;
  onSelectTransaction: (transaction: ProWalletTransactionItem) => void;
  onEditBankDetails: () => void;
  onLearnMoreEscrow: () => void;
  className?: string;
}

export interface ProWalletTransactionsHistoryProps {
  summary: ProWalletSummary;
  transactions: ProWalletTransactionItem[];
  filters: ProTransactionFiltersState;
  monthOptions: SelectOption[];
  typeOptions: SelectOption[];
  statusOptions: SelectOption[];
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onSearchChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onMoreFilters: () => void;
  onExportCsv: () => void;
  onSelectTransaction: (transaction: ProWalletTransactionItem) => void;
  onPageChange: (page: number) => void;
  onViewEscrowStatus: () => void;
  className?: string;
}

export interface ProWalletTransactionDetailProps {
  transaction: ProWalletTransactionItem;
  copiedReference: boolean;
  onBackToHistory: () => void;
  onCopyReference: () => void;
  onOpenRelatedProject: () => void;
  onMessageClient: () => void;
  onDownloadReceipt: () => void;
  onContactSupport: () => void;
  onReportIssue: () => void;
  className?: string;
}

export interface ProPayoutSettingsSectionsProps {
  settings: ProPayoutSettingsState;
  bankAccounts: ProBankAccount[];
  onAddBankAccount: () => void;
  onSelectSchedule: (schedule: ProPayoutSchedule) => void;
  onEditBankAccount: (account: ProBankAccount) => void;
  onRequestDeleteBankAccount: (account: ProBankAccount) => void;
  onSetPrimaryBankAccount?: (accountId: string) => void;
  onTogglePayoutAlerts: (checked: boolean) => void;
  onToggleRequire2FA: (checked: boolean) => void;
  onConfigure2FA: () => void;
  onContactSupport: () => void;
  className?: string;
}

export interface ProAddBankFormProps {
  isEditing: boolean;
  profileName: string;
  bankOptions: SelectOption[];
  values: ProBankAccountFormValues;
  isVerifying: boolean;
  verificationError?: string | null;
  onBankChange: (bankName: string) => void;
  onAccountNumberChange: (value: string) => void;
  onVerifyAccount: () => void;
  onAccountTypeChange: (type: ProBankAccountType) => void;
  onCancel: () => void;
  onSave: () => void;
  className?: string;
}

export interface ProWithdrawFormCardProps {
  availableBalance: number;
  amountInput: string;
  activePercent: number | null;
  selectedBankId: string;
  bankAccounts: ProBankAccount[];
  fee: number;
  validationError?: string | null;
  onAmountChange: (value: string) => void;
  onSelectPercent: (percent: 25 | 50 | 75 | 100) => void;
  onSelectBank: (bankId: string) => void;
  onAddNewBank: () => void;
  onReviewWithdrawal: () => void;
  onCancel: () => void;
  className?: string;
}

export interface ProWithdrawConfirmCardProps {
  amount: number;
  fee: number;
  netAmount: number;
  bankAccount: ProBankAccount;
  isSubmitting?: boolean;
  onConfirmWithdraw: () => void;
  onBackToEdit: () => void;
  className?: string;
}

export interface ProWithdrawStatusCardProps {
  session: ProWithdrawalSession;
  processingStage: 1 | 2 | 3;
  onBackToWallet: () => void;
  onViewTransactionDetails: () => void;
  onDownloadReceipt: () => void;
  onTryAgain: () => void;
  onCheckPayoutSettings: () => void;
  onContactSupport: () => void;
  className?: string;
}


