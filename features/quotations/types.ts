import type {
  QuotationItem,
  QuotationRevisionFormValues,
  QuotationStatus,
  QuotationTabFilter,
  QuotationBreakdownItem,
  QuotationRevisionEntry,
} from "@/components/quotations/types";

export type {
  QuotationItem,
  QuotationRevisionFormValues,
  QuotationStatus,
  QuotationTabFilter,
  QuotationBreakdownItem,
  QuotationRevisionEntry,
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
