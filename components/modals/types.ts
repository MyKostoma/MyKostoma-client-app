import type { Notification } from "@/store/slices/uiSlice";
import type {
  ConsumerSavedAddress,
  ProfilePortfolioItem,
} from "@/components/profile/types";
import type {
  ManagedReelItem,
  ReelItem,
  ReelVisibility,
} from "@/components/reels/types";
import type {
  DisputeRecord,
  SettingsBusinessInfo,
  SettingsCredentialsInfo,
} from "@/components/settings/types";
import type {
  DisputableOrderOption,
  DisputeEvidenceAttachment,
} from "@/components/disputes/types";
import type { DisputeGuidelineSection } from "@/features/disputes/data";
import type { ProPayoutSchedule } from "@/components/wallet/types";
import type {
  AddPortfolioProjectPayload,
  ConsumerAddressFormValues,
  RequestContactUpdatePayload,
} from "@/features/profile/types";

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
  ctaLabel?: string;
  onClose: () => void;
  onStartVerification: () => void;
}

export interface PortfolioProjectModalProps {
  isOpen: boolean;
  mode: "view" | "create";
  project?: ProfilePortfolioItem | null;
  categories?: string[];
  isOwner?: boolean;
  onClose: () => void;
  onCreateProject?: (payload: AddPortfolioProjectPayload) => void;
  onDeleteProject?: (projectId: string) => void;
}

export interface WriteReviewModalProps {
  isOpen: boolean;
  recipientName: string;
  onClose: () => void;
  onSubmitReview: (payload: { rating: number; comment: string }) => void;
}

export interface RequestContactUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (payload: RequestContactUpdatePayload) => void;
}

export interface ConsumerAddressModalProps {
  isOpen: boolean;
  editingAddress?: ConsumerSavedAddress | null;
  areaPresets?: readonly string[];
  onClose: () => void;
  onSaveAddress: (values: ConsumerAddressFormValues) => void;
}

export interface RateExperienceModalProps {
  isOpen: boolean;
  variant: "professional" | "consumer";
  recipientName: string;
  recipientAvatarUrl?: string;
  serviceTitle: string;
  completedDateLabel: string;
  orderCode?: string;
  feeFormatted?: string;
  onClose: () => void;
  onSubmitReview: (payload: { rating: number; comment: string }) => void;
}

export interface ReviewSubmittedModalProps {
  isOpen: boolean;
  variant?: "professional" | "consumer";
  title?: string;
  description?: string;
  actionLabel?: string;
  onClose: () => void;
  onPrimaryAction?: () => void;
}

export interface ReportReviewModalProps {
  isOpen: boolean;
  authorName: string;
  reasons: readonly string[];
  onClose: () => void;
  onSubmitReport: (payload: { reason: string; details: string }) => void;
}

export interface DeleteReviewResponseModalProps {
  isOpen: boolean;
  authorName: string;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export interface RequestEditResponseModalProps {
  isOpen: boolean;
  currentResponse: string;
  onClose: () => void;
  onSubmitRequest: (payload: { revisedText: string; reason: string }) => void;
}

export interface EditReelModalProps {
  isOpen: boolean;
  reel: ManagedReelItem | null;
  onClose: () => void;
  onSaveReel: (payload: {
    reelId: string;
    title: string;
    caption: string;
    hashtags: string[];
    status: ReelVisibility;
    audioLabel: string;
  }) => void;
}

export interface DeleteReelModalProps {
  isOpen: boolean;
  reelTitle: string;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export interface ReportReelModalProps {
  isOpen: boolean;
  creatorName: string;
  reasons: readonly string[];
  onClose: () => void;
  onSubmitReport: (payload: { reason: string; details: string }) => void;
}

export interface ReelPlayerModalProps {
  isOpen: boolean;
  reels: ReelItem[];
  activeIndex: number;
  likedReelIds: string[];
  followedCreatorIds: string[];
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
  onToggleLike: (reelId: string) => void;
  onToggleFollow: (creatorId: string, creatorName: string) => void;
  onShare: (reel: ReelItem) => void;
}

export interface ConfirmAccountDeletionModalProps {
  isOpen: boolean;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  onContactSupport: () => void;
}

export interface ChangeEmailModalProps {
  isOpen: boolean;
  currentEmail: string;
  onClose: () => void;
  onSubmitChange: (payload: { newEmail: string; currentPassword: string }) => void;
}

export interface BusinessInfoModalProps {
  isOpen: boolean;
  initialInfo: SettingsBusinessInfo;
  onClose: () => void;
  onSaveInfo: (payload: {
    legalName: string;
    taxId: string;
    registeredAddress: string;
  }) => void;
}

export interface UploadCredentialsModalProps {
  isOpen: boolean;
  initialCredentials: SettingsCredentialsInfo;
  onClose: () => void;
  onSubmitCredentials: (payload: {
    licenseName: string;
    issuingBody: string;
    licenseNumber: string;
    fileName: string;
  }) => void;
}

export interface EditPayoutScheduleModalProps {
  isOpen: boolean;
  currentSchedule: ProPayoutSchedule;
  onClose: () => void;
  onSaveSchedule: (schedule: ProPayoutSchedule) => void;
}

export interface StartDisputeModalProps {
  isOpen: boolean;
  reasons: readonly string[];
  onClose: () => void;
  onCreateDispute: (payload: {
    transactionTitle: string;
    transactionRef: string;
    reason: string;
    description: string;
  }) => void;
}

export interface DisputeDetailModalProps {
  isOpen: boolean;
  dispute: DisputeRecord | null;
  onClose: () => void;
  onContactSupport: () => void;
}

export interface RaiseDisputeWizardModalProps {
  isOpen: boolean;
  orderOptions: DisputableOrderOption[];
  reasons: readonly string[];
  defaultOrderId?: string;
  onClose: () => void;
  onSubmitDispute: (payload: {
    orderId: string;
    reason: string;
    description: string;
    attachments: DisputeEvidenceAttachment[];
  }) => Promise<{ id: string; code: string } | null>;
  onViewDisputeDetail: (disputeId: string) => void;
  onOpenHelpCenter: () => void;
  onContactSupport: () => void;
}

export interface AddDisputeEvidenceModalProps {
  isOpen: boolean;
  disputeCode: string;
  onClose: () => void;
  onSubmitEvidence: (payload: {
    message: string;
    attachments: DisputeEvidenceAttachment[];
  }) => Promise<void> | void;
}

export interface MessageDisputeAdminModalProps {
  isOpen: boolean;
  disputeCode: string;
  onClose: () => void;
  onSendMessage: (payload: {
    subject: string;
    message: string;
  }) => Promise<void> | void;
  onOpenMessagesHub: () => void;
}

export interface DisputeGuidelinesModalProps {
  isOpen: boolean;
  sections: DisputeGuidelineSection[];
  onClose: () => void;
  onContactSupport: () => void;
}

export interface EvidencePreviewModalProps {
  isOpen: boolean;
  attachment: DisputeEvidenceAttachment | null;
  onClose: () => void;
}



