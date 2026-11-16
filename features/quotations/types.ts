import type {
  QuotationItem,
  QuotationRevisionFormValues,
  QuotationStatus,
  QuotationTabFilter,
  QuotationBreakdownItem,
  QuotationRevisionEntry,
  ProfessionalQuotationStatus,
  ProfessionalQuotationTabFilter,
  ProfessionalQuotationVersionItem,
  ProfessionalQuotationClientReview,
  ProfessionalQuotationItem,
  ProfessionalUpdateQuoteFormValues,
  ProfessionalQuotationKpiMetric,
} from "@/components/quotations/types";

export type {
  QuotationItem,
  QuotationRevisionFormValues,
  QuotationStatus,
  QuotationTabFilter,
  QuotationBreakdownItem,
  QuotationRevisionEntry,
  ProfessionalQuotationStatus,
  ProfessionalQuotationTabFilter,
  ProfessionalQuotationVersionItem,
  ProfessionalQuotationClientReview,
  ProfessionalQuotationItem,
  ProfessionalUpdateQuoteFormValues,
  ProfessionalQuotationKpiMetric,
};

export interface QuotationsListViewProps {
  initialQuotations?: QuotationItem[];
  totalCountLabel?: string;
}

export interface QuotationDetailViewProps {
  quotationId?: string;
}

export interface CompareQuotationsViewProps {
  selectedIds?: string[];
}

export interface RequestRevisionViewProps {
  quotationId?: string;
}

export interface QuotationHistoryViewProps {
  quotationId?: string;
}
