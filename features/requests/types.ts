import type {
  ConsumerRequestItem,
  RequestFormValues,
  RequestTabFilter,
  RequestStatus,
  ProfessionalRequestAvailabilityState,
  ProfessionalRequestAttachment,
  ProfessionalRequestClientInfo,
  ProfessionalQuoteMilestone,
  ProfessionalSubmittedQuote,
  ProfessionalRequestItem,
  ProfessionalRequestsFilterState,
  ProfessionalSubmitQuoteFormValues,
} from "@/components/requests/types";

export type {
  ConsumerRequestItem,
  RequestFormValues,
  RequestTabFilter,
  RequestStatus,
  ProfessionalRequestAvailabilityState,
  ProfessionalRequestAttachment,
  ProfessionalRequestClientInfo,
  ProfessionalQuoteMilestone,
  ProfessionalSubmittedQuote,
  ProfessionalRequestItem,
  ProfessionalRequestsFilterState,
  ProfessionalSubmitQuoteFormValues,
};

export interface RequestsListViewProps {
  requests?: ConsumerRequestItem[];
  totalCountLabel?: string;
  error?: string | null;
  onRetry?: () => void;
}

export interface RequestDetailViewProps {
  requestId?: string;
  error?: string | null;
  onRetry?: () => void;
}

export interface CreateRequestViewProps {
  initialSubmitted?: boolean;
}

export interface EditRequestViewProps {
  requestId?: string;
  initialValues?: RequestFormValues;
}

export interface SubmitQuoteViewProps {
  requestId?: string;
}
