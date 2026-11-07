import type { Notification } from "@/store/slices/uiSlice";

export interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkSelectedAsRead?: (ids: string[]) => void;
  onMarkAllAsRead: () => void;
  onRemoveNotification: (id: string) => void;
  onClearAll: () => void;
  onRestoreMock: () => void;
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
