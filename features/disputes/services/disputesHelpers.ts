import type {
  DisputeCase,
  DisputeDateRangeFilter,
  DisputeEscrowStatus,
  DisputeStatus,
  DisputeTabKey,
} from "@/components/disputes/types";

export function formatNairaAmount(amount: number): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  return `₦${Math.round(safe).toLocaleString("en-NG")}`;
}

export function parseNairaAmount(formatted: string): number {
  const numeric = Number(formatted.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

export function getDisputeStatusMeta(status: DisputeStatus): {
  label: string;
  badgeClass: string;
  dotClass: string;
  isResolvedCheck?: boolean;
} {
  switch (status) {
    case "open":
      return {
        label: "Open",
        badgeClass: "bg-primary text-primary-foreground",
        dotClass: "bg-primary-foreground",
      };
    case "under-review":
      return {
        label: "Under Review",
        badgeClass: "bg-secondary text-foreground border border-border",
        dotClass: "bg-muted-foreground",
      };
    case "resolved":
      return {
        label: "Resolved",
        badgeClass: "bg-success-bg text-success border border-success/25",
        dotClass: "bg-success",
        isResolvedCheck: true,
      };
    case "archived":
      return {
        label: "Archived",
        badgeClass: "bg-secondary text-muted-foreground border border-border",
        dotClass: "bg-muted-foreground",
      };
  }
}

export function getEscrowStatusMeta(escrowStatus: DisputeEscrowStatus): {
  label: string;
  toneClass: string;
} {
  switch (escrowStatus) {
    case "frozen":
      return { label: "FROZEN", toneClass: "text-foreground" };
    case "released":
      return { label: "RELEASED", toneClass: "text-success" };
    case "refunded":
      return { label: "REFUNDED", toneClass: "text-info" };
    case "split":
      return { label: "SPLIT SETTLED", toneClass: "text-warning" };
  }
}

export function getCounterpartyDisplay(
  dispute: DisputeCase,
  isProfessional: boolean
): {
  name: string;
  roleLabel: string;
  avatarUrl?: string;
} {
  if (isProfessional) {
    return {
      name: dispute.consumerName,
      roleLabel: "Consumer",
      avatarUrl: dispute.consumerAvatarUrl,
    };
  }
  return {
    name: dispute.professionalName,
    roleLabel: "Professional",
    avatarUrl: dispute.professionalAvatarUrl,
  };
}

export function filterDisputeCases(
  cases: DisputeCase[],
  options: {
    activeTab: DisputeTabKey;
    searchQuery: string;
    statusFilter: "all" | DisputeStatus;
    dateRangeFilter: DisputeDateRangeFilter;
    includeArchived: boolean;
    isProfessional: boolean;
  }
): DisputeCase[] {
  const {
    activeTab,
    searchQuery,
    statusFilter,
    dateRangeFilter,
    includeArchived,
    isProfessional,
  } = options;

  const query = searchQuery.trim().toLowerCase();
  const now = Date.now();
  const cutoffMs =
    dateRangeFilter === "30d"
      ? 30 * 24 * 60 * 60 * 1000
      : dateRangeFilter === "90d"
      ? 90 * 24 * 60 * 60 * 1000
      : 0;

  return cases.filter((item) => {
    if (activeTab === "active") {
      if (item.status !== "open" && item.status !== "under-review") {
        return false;
      }
    } else {
      const isResolvedBucket =
        item.status === "resolved" ||
        (includeArchived && item.status === "archived");
      if (!isResolvedBucket) return false;
    }

    if (statusFilter !== "all" && item.status !== statusFilter) {
      return false;
    }

    if (cutoffMs > 0) {
      const createdTime = Date.parse(item.createdAtISO);
      if (Number.isFinite(createdTime) && now - createdTime > cutoffMs) {
        return false;
      }
    }

    if (query) {
      const counterparty = getCounterpartyDisplay(item, isProfessional);
      const haystack = [
        item.code,
        item.orderCode,
        item.serviceTitle,
        item.reason,
        counterparty.name,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

export function computeSplitAmounts(
  totalAmount: number,
  consumerPercent: number
): { consumerAmount: number; professionalAmount: number } {
  const clamped = Math.max(0, Math.min(100, Math.round(consumerPercent)));
  const consumerAmount = Math.round((totalAmount * clamped) / 100);
  const professionalAmount = Math.max(0, totalAmount - consumerAmount);
  return { consumerAmount, professionalAmount };
}

export function buildDisputesCsv(
  cases: DisputeCase[],
  isProfessional: boolean
): string {
  const headers = [
    "Dispute ID",
    "Order ID",
    "Service",
    "Party Involved",
    "Party Role",
    "Amount (NGN)",
    "Escrow Status",
    "Date Raised",
    "Status",
    "Reason",
  ];

  const escapeCsv = (val: string | number) => {
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = cases.map((item) => {
    const party = getCounterpartyDisplay(item, isProfessional);
    return [
      item.code,
      item.orderCode,
      item.serviceTitle,
      party.name,
      party.roleLabel,
      item.totalAmount,
      item.escrowStatus,
      item.dateRaisedLabel,
      item.status,
      item.reason,
    ]
      .map(escapeCsv)
      .join(",");
  });

  return [headers.map(escapeCsv).join(","), ...rows].join("\n");
}
