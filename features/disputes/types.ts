import type {
  DisputeEvidenceAttachment,
  DisputeResolutionPath,
} from "@/components/disputes/types";

export interface RaiseDisputePayload {
  orderId: string;
  orderCode: string;
  serviceTitle: string;
  totalAmount: number;
  counterpartyName: string;
  counterpartyAvatarUrl?: string;
  reason: string;
  description: string;
  attachments?: DisputeEvidenceAttachment[];
}

export interface AddDisputeEvidencePayload {
  disputeId: string;
  message: string;
  attachments: DisputeEvidenceAttachment[];
}

export interface SubmitResolutionProposalPayload {
  disputeId: string;
  path: DisputeResolutionPath;
  splitConsumerPercent?: number;
  note?: string;
}

export interface MessageAdminPayload {
  disputeId: string;
  subject: string;
  message: string;
}

export interface DisputeDetailViewProps {
  disputeId: string;
}
