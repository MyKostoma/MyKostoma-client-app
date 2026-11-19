import type {
  ProTransactionFiltersState,
  ProWalletTransactionItem,
  WalletTransactionFiltersState,
  WalletTransactionItem,
  WalletTransactionStatus,
  WalletTransactionType,
} from "@/components/wallet/types";

export function formatWalletNaira(
  amount: number,
  options?: { showDecimals?: boolean; withSymbol?: boolean }
): string {
  const showDecimals = options?.showDecimals ?? true;
  const withSymbol = options?.withSymbol ?? true;
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });

  return withSymbol ? `₦${formatted}` : formatted;
}

export function formatSignedAmount(
  item: WalletTransactionItem,
  includeCurrencySymbol = true
): string {
  const sign = item.direction === "credit" ? "+" : "-";
  const value = formatWalletNaira(item.amount, {
    showDecimals: true,
    withSymbol: includeCurrencySymbol,
  });
  return `${sign} ${value}`;
}

export function formatCountdownTimer(seconds: number): string {
  const clamped = Math.max(0, seconds);
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function parseNumericInput(raw: string): number {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function buildWalletOverviewHref(): string {
  return "/wallet";
}

export function buildWalletFundHref(step?: string, amount?: number): string {
  const params = new URLSearchParams();
  if (step) params.set("step", step);
  if (amount && amount > 0) params.set("amount", String(amount));
  const query = params.toString();
  return query ? `/wallet/fund?${query}` : "/wallet/fund";
}

export function buildWalletFundingStatusHref(params?: {
  status?: string;
  ref?: string;
  amount?: number;
}): string {
  const search = new URLSearchParams();
  if (params?.status) search.set("status", params.status);
  if (params?.ref) search.set("ref", params.ref);
  if (params?.amount && params.amount > 0) {
    search.set("amount", String(params.amount));
  }
  const query = search.toString();
  return query ? `/wallet/fund/status?${query}` : "/wallet/fund/status";
}

export function buildWalletTransactionsHref(): string {
  return "/wallet/transactions";
}

export function buildWalletTransactionDetailHref(id: string): string {
  return `/wallet/transactions/${encodeURIComponent(id)}`;
}

export function findWalletTransactionById(
  transactions: WalletTransactionItem[],
  id: string
): WalletTransactionItem | undefined {
  const normalized = decodeURIComponent(id).toLowerCase();
  return (
    transactions.find(
      (item) =>
        item.id.toLowerCase() === normalized ||
        item.reference.toLowerCase() === normalized
    ) ?? transactions[0]
  );
}

export function filterWalletTransactions(
  transactions: WalletTransactionItem[],
  filters: WalletTransactionFiltersState
): WalletTransactionItem[] {
  const query = filters.searchQuery.trim().toLowerCase();

  return transactions.filter((tx) => {
    if (filters.type !== "all") {
      if (filters.type === "funding") {
        if (tx.type !== "funding" && tx.type !== "deposit") return false;
      } else if (filters.type === "escrow") {
        if (tx.type !== "escrow" && tx.type !== "escrow-release") return false;
      } else if (tx.type !== filters.type) {
        return false;
      }
    }

    if (filters.status !== "all") {
      if (filters.status === "pending") {
        if (tx.status !== "pending" && tx.status !== "held") return false;
      } else if (filters.status === "completed") {
        if (tx.status !== "completed" && tx.status !== "success") return false;
      } else if (tx.status !== filters.status) {
        return false;
      }
    }

    if (query) {
      const matchesDescription = tx.description.toLowerCase().includes(query);
      const matchesRef = tx.reference.toLowerCase().includes(query);
      const matchesType = tx.typeLabel.toLowerCase().includes(query);
      if (!matchesDescription && !matchesRef && !matchesType) return false;
    }

    return true;
  });
}

export function getTransactionTypeBadgeClasses(
  type: WalletTransactionType
): string {
  switch (type) {
    case "funding":
    case "deposit":
    case "refund":
      return "bg-success-bg text-success";
    case "escrow":
      return "bg-info-bg text-info";
    case "payment":
    case "withdrawal":
    case "escrow-release":
    default:
      return "bg-secondary text-muted-foreground";
  }
}

export function getTransactionStatusClasses(
  status: WalletTransactionStatus
): {
  dotClass: string;
  textClass: string;
} {
  switch (status) {
    case "completed":
    case "success":
      return {
        dotClass: "bg-success",
        textClass: "text-success",
      };
    case "held":
    case "pending":
      return {
        dotClass: "bg-warning",
        textClass: "text-warning",
      };
    case "failed":
    default:
      return {
        dotClass: "bg-error",
        textClass: "text-error",
      };
  }
}

export function exportTransactionsToCsv(
  transactions: WalletTransactionItem[]
): void {
  if (typeof window === "undefined") return;

  const headers = [
    "Date",
    "Time",
    "Description",
    "Reference",
    "Type",
    "Direction",
    "Amount (NGN)",
    "Status",
  ];

  const rows = transactions.map((tx) => [
    tx.dateISO,
    tx.timeFormatted,
    `"${tx.description.replace(/"/g, '""')}"`,
    tx.reference,
    tx.typeLabel,
    tx.direction,
    tx.amount.toFixed(2),
    tx.statusLabel,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `mykostoma-transactions-${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ============================================================================
// PROFESSIONAL WALLET HELPERS
// ============================================================================

export function buildProPayoutSettingsHref(): string {
  return "/wallet/payout-settings";
}

export function buildProAddBankHref(editId?: string): string {
  if (editId) {
    return `/wallet/payout-settings/add-bank?edit=${encodeURIComponent(editId)}`;
  }
  return "/wallet/payout-settings/add-bank";
}

export function buildProWithdrawHref(): string {
  return "/wallet/withdraw";
}

export function buildProWithdrawStatusHref(status?: string): string {
  if (status) {
    return `/wallet/withdraw/status?status=${encodeURIComponent(status)}`;
  }
  return "/wallet/withdraw/status";
}

export function filterProWalletTransactions(
  transactions: ProWalletTransactionItem[],
  filters: ProTransactionFiltersState
): ProWalletTransactionItem[] {
  const q = filters.searchQuery.trim().toLowerCase();

  return transactions.filter((tx) => {
    if (filters.month !== "all" && tx.monthKey !== filters.month) {
      return false;
    }

    if (filters.type !== "all" && tx.direction !== filters.type) {
      return false;
    }

    if (filters.status !== "all" && tx.status !== filters.status) {
      return false;
    }

    if (q) {
      const haystack =
        `${tx.title} ${tx.subtitle} ${tx.historySubtitle ?? ""} ${tx.id} ${tx.referenceId}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

export function findProWalletTransactionById(
  transactions: ProWalletTransactionItem[],
  id: string
): ProWalletTransactionItem | undefined {
  const normalized = decodeURIComponent(id).toLowerCase();
  return transactions.find(
    (item) =>
      item.id.toLowerCase() === normalized ||
      item.referenceId.toLowerCase() === normalized
  );
}

export function formatProSignedAmount(
  direction: "credit" | "debit",
  amount: number,
  withSymbol = true
): string {
  const sign = direction === "credit" ? "+" : "-";
  const formatted = formatWalletNaira(amount, {
    showDecimals: true,
    withSymbol,
  });
  return `${sign}${formatted}`;
}

export function maskBankLast4(last4: string): string {
  return `•••• ${last4}`;
}

export function extractBankShortName(bankName: string): string {
  const lower = bankName.toLowerCase();
  if (lower.includes("guaranty") || lower.includes("gtbank")) return "GTBank";
  if (lower.includes("zenith")) return "Zenith Bank";
  if (lower.includes("access")) return "Access Bank";
  if (lower.includes("united bank for africa") || lower.includes("uba")) {
    return "UBA";
  }
  if (lower.includes("first city") || lower.includes("fcmb")) return "FCMB";
  if (lower.includes("first bank")) return "First Bank";
  if (lower.includes("stanbic")) return "Stanbic IBTC";
  if (lower.includes("fidelity")) return "Fidelity Bank";
  if (lower.includes("sterling")) return "Sterling Bank";
  if (lower.includes("kuda")) return "Kuda Bank";
  return bankName;
}

export function resolveMockVerifiedAccountName(
  bankName: string,
  accountNumber: string,
  fallbackProfileName = "Alex Studio"
): string {
  if (!bankName || accountNumber.length !== 10) return "";
  if (fallbackProfileName.toLowerCase().includes("alex")) {
    return "Alex Studio Design LTD";
  }
  return fallbackProfileName.toUpperCase();
}

export function exportProTransactionsToCsv(
  transactions: ProWalletTransactionItem[]
): void {
  if (typeof window === "undefined") return;

  const headers = [
    "Date",
    "Transaction ID",
    "Title",
    "Subtitle",
    "Type",
    "Amount (NGN)",
    "Status",
    "Payment Method",
    "Reference ID",
  ];

  const rows = transactions.map((tx) => [
    `"${tx.dateFormatted}"`,
    tx.id,
    `"${tx.title.replace(/"/g, '""')}"`,
    `"${(tx.historySubtitle || tx.subtitle).replace(/"/g, '""')}"`,
    tx.direction.toUpperCase(),
    tx.amount.toFixed(2),
    tx.status,
    `"${tx.paymentMethod}"`,
    tx.referenceId,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `mykostoma-pro-transactions-${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


