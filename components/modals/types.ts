import type { Notification } from "@/store/slices/uiSlice";

export interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkSelectedAsRead?: (ids: string[]) => void;
  onMarkAllAsRead: () => void;
  onRemoveNotification: (id: string) => void;
  onClearAll?: () => void;
  onRestoreMock?: () => void;
  className?: string;
}

export interface CloseRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmClose: () => void;
}

export interface RejectQuotationModalProps {
  isOpen: boolean;
  providerName: string;
  onClose: () => void;
  onConfirmReject: (reason: string) => void;
}

export interface AcceptQuotationModalProps {
  isOpen: boolean;
  quoteCode: string;
  requestTitle: string;
  providerName: string;
  estimatedDuration: string;
  totalAmount: string;
  onClose: () => void;
  onConfirmAccept: () => void;
}

export interface ReleaseMilestoneModalProps {
  isOpen: boolean;
  orderCode: string;
  orderTitle: string;
  providerName: string;
  milestoneTitle: string;
  releaseAmount: string;
  onClose: () => void;
  onConfirmRelease: () => void;
}

export interface CancelOrderModalProps {
  isOpen: boolean;
  orderCode: string;
  providerName: string;
  onClose: () => void;
  onConfirmCancel: (reason: string) => void;
}

export interface RaiseDisputeModalProps {
  isOpen: boolean;
  orderCode: string;
  providerName: string;
  escrowAmount: string;
  onClose: () => void;
  onSubmitDispute: (reason: string, description: string) => void;
}

export interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateConversation: (payload: {
    participantName: string;
    participantRole: string;
    initialMessage: string;
  }) => void;
}

export interface DeleteServiceCardModalProps {
  isOpen: boolean;
  serviceTitle: string;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export interface DeleteBankAccountModalProps {
  isOpen: boolean;
  bankName: string;
  maskedAccountNumber: string;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export interface VerificationBenefitsModalProps {
  isOpen: boolean;
  isVerified?: boolean;
  onClose: () => void;
  onStartVerification: () => void;
}



