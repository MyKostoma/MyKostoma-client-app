import type {
  ConsumerRequestItem,
  RequestFormValues,
  RequestTabFilter,
  RequestStatus,
} from "@/components/requests/types";

export type {
  ConsumerRequestItem,
  RequestFormValues,
  RequestTabFilter,
  RequestStatus,
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
