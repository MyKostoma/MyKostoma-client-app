import type { SelectOption } from "@/components/ui/form-fields";
import type {
  WalletBalanceSummary,
  WalletBankTransferDetails,
  WalletFundingSession,
  WalletTransactionFiltersState,
  WalletTransactionItem,
} from "@/components/wallet/types";

export const DEFAULT_WALLET_SUMMARY: WalletBalanceSummary = {
  availableBalance: 245600,
  pendingBalance: 12450,
  escrowBalance: 85000,
  pendingCaption: "Clearing in 24-48 hours",
  escrowCaption: "Secured for active projects",
};

export const WALLET_QUICK_AMOUNTS: number[] = [5000, 10000, 20000, 50000];

export const DEFAULT_BANK_TRANSFER_DETAILS: WalletBankTransferDetails = {
  bankName: "Providus Bank",
  accountNumber: "1234567890",
  accountName: "MYKOSTOMA - ALEX MORGAN",
  reference: "MK-998822",
  expiresInSeconds: 1798, // 29:58
};

export const DEFAULT_WALLET_FUNDING_SESSION: WalletFundingSession = {
  id: "fund-session-998822",
  reference: "MK-998822",
  amount: 25000,
  method: "bank-transfer",
  status: "pending",
  bankDetails: DEFAULT_BANK_TRANSFER_DETAILS,
  failureTitle: "Payment Authorization Failed",
  failureMessage:
    "Unable to process your deposit. Please check your bank details and try again.",
  failureReason: "Transaction Timed Out",
  createdAt: "2026-05-12T14:32:00Z",
};

export const DEFAULT_WALLET_TRANSACTIONS: WalletTransactionItem[] = [
  {
    id: "MK-TRX-99201",
    reference: "MK-TRX-99201",
    dateISO: "2026-05-12",
    dateFormatted: "May 12, 2026",
    timeFormatted: "14:32 PM",
    description: "Interior Design Service Deposit",
    note: "Interior Design Service Deposit for Project #8821. Payment to ArchiStudio Limited for Phase 1 conceptualization and 3D modeling.",
    type: "escrow",
    typeLabel: "ESCROW",
    direction: "debit",
    amount: 45000,
    status: "held",
    statusLabel: "Held",
    paymentMethod: "Consumer Wallet",
  },
  {
    id: "MK-TRX-88122",
    reference: "MK-TRX-88122",
    dateISO: "2026-05-10",
    dateFormatted: "May 10, 2026",
    timeFormatted: "09:15 AM",
    description: "Wallet Top-up via Bank Transfer",
    note: "Instant wallet top-up funded via Providus Bank virtual transfer account (Ref: MK-TRX-88122).",
    type: "funding",
    typeLabel: "FUNDING",
    direction: "credit",
    amount: 100000,
    status: "completed",
    statusLabel: "Completed",
    paymentMethod: "Nigerian Bank Transfer",
  },
  {
    id: "MK-TRX-77402",
    reference: "MK-TRX-77402",
    dateISO: "2026-05-08",
    dateFormatted: "May 08, 2026",
    timeFormatted: "18:45 PM",
    description: "Professional Consultation Fee",
    note: "Direct consultation booking fee paid to Elena Rodriguez for on-site residential measurement.",
    type: "payment",
    typeLabel: "PAYMENT",
    direction: "debit",
    amount: 15000,
    status: "completed",
    statusLabel: "Completed",
    paymentMethod: "Consumer Wallet",
  },
  {
    id: "MK-TRX-66104",
    reference: "MK-TRX-66104",
    dateISO: "2026-05-06",
    dateFormatted: "May 06, 2026",
    timeFormatted: "11:20 AM",
    description: "Withdrawal to GTBank Account",
    note: "Requested wallet payout to Guarantee Trust Bank account ending in ••••4821.",
    type: "withdrawal",
    typeLabel: "WITHDRAWAL",
    direction: "debit",
    amount: 50000,
    status: "failed",
    statusLabel: "Failed",
    paymentMethod: "GTBank Payout",
    failureReason: "Bank Switch Timeout",
  },
  {
    id: "MK-TRX-55302",
    reference: "MK-TRX-55302",
    dateISO: "2026-05-05",
    dateFormatted: "May 05, 2026",
    timeFormatted: "10:05 AM",
    description: "Refund: Cancelled Booking #4920",
    note: "Full escrow refund credited back to your Consumer Wallet following mutual cancellation of Booking #4920.",
    type: "refund",
    typeLabel: "REFUND",
    direction: "credit",
    amount: 5200,
    status: "completed",
    statusLabel: "Completed",
    paymentMethod: "MyKostoma Escrow Refund",
  },
  {
    id: "MK-TRX-44910",
    reference: "MK-TRX-44910",
    dateISO: "2026-05-02",
    dateFormatted: "May 02, 2026",
    timeFormatted: "16:10 PM",
    description: "POP Ceiling Milestone #1 Release",
    note: "Milestone 1 escrow release to Adex Interior Designs Ltd. for material sourcing and delivery.",
    type: "escrow-release",
    typeLabel: "ESCROW RELEASE",
    direction: "debit",
    amount: 280000,
    status: "completed",
    statusLabel: "Completed",
    paymentMethod: "Consumer Wallet",
  },
  {
    id: "MK-TRX-33819",
    reference: "MK-TRX-33819",
    dateISO: "2026-04-28",
    dateFormatted: "Apr 28, 2026",
    timeFormatted: "12:04 PM",
    description: "Wallet Top-up via Debit Card",
    note: "Instant card top-up via Mastercard ending in ••••8819.",
    type: "deposit",
    typeLabel: "DEPOSIT",
    direction: "credit",
    amount: 150000,
    status: "completed",
    statusLabel: "Completed",
    paymentMethod: "Debit / Credit Card",
  },
];

export const DEFAULT_WALLET_FILTERS: WalletTransactionFiltersState = {
  dateRange: "Jan 01, 2026 - May 12, 2026",
  type: "all",
  status: "all",
  searchQuery: "",
};

export const WALLET_DATE_RANGE_OPTIONS: SelectOption[] = [
  { value: "Jan 01, 2026 - May 12, 2026", label: "Jan 01, 2026 - May 12, 2026" },
  { value: "Last 30 Days", label: "Last 30 Days" },
  { value: "Last 90 Days", label: "Last 90 Days" },
  { value: "All Time", label: "All Time" },
];

export const WALLET_TRANSACTION_TYPE_OPTIONS: SelectOption[] = [
  { value: "all", label: "All Types" },
  { value: "escrow", label: "Escrow" },
  { value: "funding", label: "Deposit / Funding" },
  { value: "payment", label: "Payment" },
  { value: "withdrawal", label: "Withdrawal" },
  { value: "refund", label: "Refund" },
];

export const WALLET_TRANSACTION_STATUS_OPTIONS: SelectOption[] = [
  { value: "all", label: "All Statuses" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending / Held" },
  { value: "failed", label: "Failed" },
];

