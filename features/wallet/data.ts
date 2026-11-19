import type { SelectOption } from "@/components/ui/form-fields";
import type {
  ProBankAccount,
  ProPayoutSettingsState,
  ProTransactionFiltersState,
  ProWalletSummary,
  ProWalletTransactionItem,
  ProWithdrawalSession,
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

// ============================================================================
// PROFESSIONAL WALLET MODULE MOCK DATA
// ============================================================================

export const PRO_WITHDRAWAL_FEE = 50;

export const DEFAULT_PRO_WALLET_SUMMARY: ProWalletSummary = {
  availableBalance: 250000,
  currency: "NGN",
  pendingBalance: 45000,
  escrowBalance: 120000,
  totalCredits: 1240000,
  totalDebits: 450000,
};

export const DEFAULT_PRO_BANK_ACCOUNTS: ProBankAccount[] = [
  {
    id: "bank-zenith-4829",
    bankName: "Zenith Bank PLC",
    bankShortName: "Zenith Bank PLC",
    accountNumber: "2048194829",
    last4: "4829",
    accountName: "Alex Studio Design LTD",
    accountType: "current",
    isPrimary: true,
    isVerified: true,
  },
  {
    id: "bank-gtb-9012",
    bankName: "Guaranty Trust Bank",
    bankShortName: "GTBank",
    accountNumber: "0128499012",
    last4: "9012",
    accountName: "Alexander O. Studio",
    accountType: "savings",
    isPrimary: false,
    isVerified: true,
  },
];

export const DEFAULT_PRO_PAYOUT_SETTINGS: ProPayoutSettingsState = {
  schedule: "daily",
  payoutAlertsEnabled: true,
  require2FAForWithdrawals: true,
};

export const DEFAULT_PRO_WALLET_TRANSACTIONS: ProWalletTransactionItem[] = [
  {
    id: "TXN-4920194",
    referenceId: "#REF-49201",
    dateFormatted: "Oct 12, 2026",
    dateTimeFormatted: "Oct 12, 2026, 15:20",
    dateISO: "2026-10-12",
    monthKey: "oct-2026",
    title: "Brand Identity - Project Alpha",
    subtitle: "Project Payment",
    historySubtitle: "Project Milestone",
    description:
      "Brand Identity - Project Alpha — Final deliverable approval and escrow milestone payout.",
    direction: "credit",
    typeDetailLabel: "Service Payment (Credit)",
    amount: 85000,
    status: "completed",
    paymentMethod: "Escrow Release",
    relatedProjectTitle: "Brand Identity Design",
    relatedOrderId: "ORD-2026-089",
    clientName: "Elena Rodriguez",
  },
  {
    id: "TXN-3829102",
    referenceId: "#REF-38291",
    dateFormatted: "Oct 10, 2026",
    dateTimeFormatted: "Oct 10, 2026, 11:05",
    dateISO: "2026-10-10",
    monthKey: "oct-2026",
    title: "Withdrawal to Zenith Bank",
    subtitle: "Payout",
    historySubtitle: "Payout",
    description:
      "Manual wallet payout transferred to Zenith Bank PLC account ending in •••• 4829.",
    direction: "debit",
    typeDetailLabel: "Bank Withdrawal (Debit)",
    amount: 120000,
    status: "completed",
    paymentMethod: "Nigerian Bank Transfer",
  },
  {
    id: "TXN-9021832",
    referenceId: "#REF-90218",
    dateFormatted: "Oct 08, 2026",
    dateTimeFormatted: "Oct 08, 2026, 09:40",
    dateISO: "2026-10-08",
    monthKey: "oct-2026",
    title: "UI Audit - Beta Tech",
    subtitle: "Service Fee",
    historySubtitle: "Service Fee",
    description:
      "UI/UX Usability Audit for Beta Tech dashboard — Clearing pending standard 24-48 hour verification window.",
    direction: "credit",
    typeDetailLabel: "Service Payment (Credit)",
    amount: 45000,
    status: "pending",
    paymentMethod: "Escrow Release",
    relatedProjectTitle: "Beta Tech UI Audit",
    relatedOrderId: "ORD-2026-045",
    clientName: "Marcus Chen",
  },
  {
    id: "TXN-1120493",
    referenceId: "#REF-11204",
    dateFormatted: "Oct 05, 2026",
    dateTimeFormatted: "Oct 05, 2026, 16:12",
    dateISO: "2026-10-05",
    monthKey: "oct-2026",
    title: "Project Maintenance",
    subtitle: "Monthly Support",
    historySubtitle: "Monthly Support",
    description:
      "Monthly retainer billing failed due to expired client authorization.",
    direction: "credit",
    typeDetailLabel: "Service Payment (Credit)",
    amount: 25000,
    status: "failed",
    paymentMethod: "Card Authorization",
    relatedProjectTitle: "Monthly Support Retainer",
    clientName: "Urban Loft Co.",
  },
  {
    id: "TXN-0028472",
    referenceId: "#REF-00284",
    dateFormatted: "Oct 03, 2026",
    dateTimeFormatted: "Oct 03, 2026, 10:15",
    dateISO: "2026-10-03",
    monthKey: "oct-2026",
    title: "Consultation Fee",
    subtitle: "Hourly Rate",
    historySubtitle: "Hourly Rate",
    description:
      "Direct 1-on-1 design strategy and visual direction consultation session.",
    direction: "credit",
    typeDetailLabel: "Service Payment (Credit)",
    amount: 15000,
    status: "completed",
    paymentMethod: "Escrow Release",
    relatedProjectTitle: "Design Strategy Session",
    clientName: "Sarah Jenkins",
  },
  {
    id: "TXN-987654321",
    referenceId: "#REF-12345",
    dateFormatted: "Oct 24, 2026",
    dateTimeFormatted: "Oct 24, 2026, 14:30",
    dateISO: "2026-10-24",
    monthKey: "oct-2026",
    title: "Logo Design for Client XYZ",
    subtitle: "Service Payment",
    historySubtitle: "Service Payment",
    description:
      "Logo Design for Client XYZ — Final Milestone delivery and brand kit preparation.",
    direction: "credit",
    typeDetailLabel: "Service Payment (Credit)",
    amount: 50000,
    status: "completed",
    paymentMethod: "Escrow Release",
    relatedProjectTitle: "Brand Identity Design",
    relatedOrderId: "ORD-2026-001",
    clientName: "John Doe",
  },
];

export const DEFAULT_PRO_WITHDRAWAL_SESSION: ProWithdrawalSession = {
  transactionId: "TXN-123456789",
  amount: 100000,
  fee: PRO_WITHDRAWAL_FEE,
  netAmount: 99950,
  bankAccountId: "bank-gtb-9012",
  bankName: "Guaranty Trust Bank",
  bankShortName: "GTBank",
  last4: "9012",
  accountName: "Alexander O. Studio",
  status: "processing",
  errorCode: "BANK_REJECTED_01",
  createdAt: "2026-10-24T14:30:00Z",
};

export const PRO_NIGERIAN_BANKS_OPTIONS: SelectOption[] = [
  { value: "Zenith Bank PLC", label: "Zenith Bank PLC" },
  { value: "Guaranty Trust Bank", label: "Guaranty Trust Bank (GTBank)" },
  { value: "Access Bank PLC", label: "Access Bank PLC" },
  { value: "First Bank of Nigeria", label: "First Bank of Nigeria" },
  {
    value: "United Bank for Africa",
    label: "United Bank for Africa (UBA)",
  },
  { value: "Fidelity Bank PLC", label: "Fidelity Bank PLC" },
  {
    value: "First City Monument Bank",
    label: "First City Monument Bank (FCMB)",
  },
  { value: "Stanbic IBTC Bank", label: "Stanbic IBTC Bank" },
  { value: "Sterling Bank PLC", label: "Sterling Bank PLC" },
  { value: "Kuda Microfinance Bank", label: "Kuda Microfinance Bank" },
];

export const PRO_WALLET_MONTH_OPTIONS: SelectOption[] = [
  { value: "oct-2026", label: "Oct 2026" },
  { value: "sep-2026", label: "Sep 2026" },
  { value: "all", label: "All Time" },
];

export const PRO_WALLET_TYPE_OPTIONS: SelectOption[] = [
  { value: "all", label: "All Types" },
  { value: "credit", label: "Credit" },
  { value: "debit", label: "Debit" },
];

export const PRO_WALLET_STATUS_OPTIONS: SelectOption[] = [
  { value: "all", label: "All Status" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

export const DEFAULT_PRO_WALLET_FILTERS: ProTransactionFiltersState = {
  searchQuery: "",
  month: "oct-2026",
  type: "all",
  status: "all",
};


