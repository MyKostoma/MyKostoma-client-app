import type {
  QuotationItem,
  QuotationRevisionFormValues,
  QuotationTabFilter,
  ProfessionalQuotationItem,
  ProfessionalQuotationTabFilter,
  ProfessionalUpdateQuoteFormValues,
} from "../types";

export const INITIAL_REVISION_FORM_VALUES: QuotationRevisionFormValues = {
  changesDescription: "",
  attachments: [],
};

export function filterQuotationsList(
  quotations: QuotationItem[],
  activeTab: QuotationTabFilter,
  searchQuery: string,
  comparedIds: string[]
): QuotationItem[] {
  const q = searchQuery.trim().toLowerCase();

  return quotations.filter((item) => {
    if (activeTab === "pending") {
      if (item.status !== "pending" && item.status !== "updated") {
        return false;
      }
    } else if (activeTab === "accepted") {
      if (item.status !== "accepted") return false;
    } else if (activeTab === "rejected") {
      if (item.status !== "rejected") return false;
    } else if (activeTab === "comparison") {
      if (!comparedIds.includes(item.id)) return false;
    }

    if (q) {
      const haystack =
        `${item.providerName} ${item.requestTitle} ${item.requestCode} ${item.message}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

export function findQuotationById(
  quotations: QuotationItem[],
  quotationId: string
): QuotationItem | undefined {
  return quotations.find(
    (q) => q.id.toLowerCase() === quotationId.toLowerCase()
  );
}

export function resolveInitialCompareQuotes(
  quotations: QuotationItem[],
  selectedIds?: string[]
): QuotationItem[] {
  if (selectedIds && selectedIds.length > 0) {
    const matched = quotations.filter((q) => selectedIds.includes(q.id));
    if (matched.length > 0) return matched;
  }
  return quotations
    .filter((q) => q.status === "pending" || q.status === "updated")
    .slice(0, 3);
}

// ============================================================================
// PROFESSIONAL QUOTATIONS HELPERS
// ============================================================================

export function filterProfessionalQuotations(
  quotations: ProfessionalQuotationItem[],
  activeTab: ProfessionalQuotationTabFilter,
  searchQuery: string
): ProfessionalQuotationItem[] {
  const q = searchQuery.trim().toLowerCase();

  return quotations.filter((item) => {
    if (activeTab !== "all" && item.status !== activeTab) {
      return false;
    }

    if (q) {
      const haystack =
        `${item.code} ${item.title} ${item.description} ${item.consumerName} ${item.serviceRequested} ${item.price}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

export function findProfessionalQuotationById(
  quotations: ProfessionalQuotationItem[],
  quotationId: string
): ProfessionalQuotationItem | undefined {
  return quotations.find(
    (q) =>
      q.id.toLowerCase() === quotationId.toLowerCase() ||
      q.code.toLowerCase() === quotationId.toLowerCase()
  );
}

export function parseCurrencyNumber(value: string | number): number {
  if (typeof value === "number") return value;
  const cleaned = value.replace(/[^0-9.]/g, "");
  return Number(cleaned) || 0;
}

export function formatNairaWithDecimals(amount: number): string {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatNumberWithDecimals(amount: number): string {
  return amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function calculateUpdatedQuoteTotal(
  values: Pick<
    ProfessionalUpdateQuoteFormValues,
    "serviceFee" | "materialsCost" | "logisticsCost"
  >
): number {
  return (
    parseCurrencyNumber(values.serviceFee) +
    parseCurrencyNumber(values.materialsCost) +
    parseCurrencyNumber(values.logisticsCost)
  );
}

