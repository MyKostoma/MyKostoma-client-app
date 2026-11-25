import type { ReactNode } from "react";
import type {
  ProBankAccount,
  ProPayoutSchedule,
  ProWalletTransactionItem,
} from "@/components/wallet/types";

export type SettingsSectionId =
  | "overview"
  | "profile"
  | "password"
  | "notifications"
  | "verification"
  | "wallet"
  | "disputes"
  | "delete-account";

export type NotificationChannelKey = "email" | "push" | "sms";

export type NotificationCategoryKey =
  | "accountUpdates"
  | "newMessages"
  | "transactionAlerts"
  | "marketingPromotions";

export type NotificationChannelMatrix = Record<
  NotificationCategoryKey,
  Record<NotificationChannelKey, boolean>
>;

export interface QuietHoursConfig {
  enabled: boolean;
  from: string;
  to: string;
}

export interface NotificationPreferencesState {
  channels: NotificationChannelMatrix;
  quietHours: QuietHoursConfig;
}

export type SettingsStepStatus = "verified" | "pending" | "action-required";

export interface SettingsBusinessInfo {
  legalName: string;
  taxId: string;
  registeredAddress: string;
  status: SettingsStepStatus;
}

export interface SettingsCredentialsInfo {
  licenseName: string;
  issuingBody: string;
  licenseNumber: string;
  fileName?: string;
  status: SettingsStepStatus;
}

export type DisputeStatus = "under-review" | "open" | "resolved";

export interface DisputeRecord {
  id: string;
  code: string;
  transactionTitle: string;
  transactionRef: string;
  dateInitiatedLabel: string;
  createdAtISO: string;
  status: DisputeStatus;
  reason: string;
  description: string;
  amountFormatted: string;
  resolutionNotes?: string;
}

export type PasswordStrengthLevel =
  | "empty"
  | "weak"
  | "fair"
  | "good"
  | "strong";

export interface PasswordStrengthReport {
  score: 0 | 1 | 2 | 3 | 4;
  level: PasswordStrengthLevel;
  label: string;
  hasMinLength: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export interface SettingsShellProps {
  activeSection: SettingsSectionId;
  isProfessional: boolean;
  children: ReactNode;
}

export interface SettingsOverviewGridProps {
  isProfessional: boolean;
  verificationPercent: number;
  isVerified: boolean;
  walletBalanceFormatted: string;
  openDisputesCount: number;
  onNavigate: (href: string) => void;
}

export interface ProfileSettingsFormProps {
  isProfessional: boolean;
  avatarUrl: string;
  fullName: string;
  fullNameError?: string;
  email: string;
  emailChangePending?: boolean;
  phone: string;
  phoneError?: string;
  location: string;
  locationError?: string;
  bio: string;
  bioError?: string;
  isSaving?: boolean;
  onPhotoSelect: (file: File) => void;
  onFullNameChange: (value: string) => void;
  onRequestEmailChange: () => void;
  onPhoneChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export interface PasswordSettingsFormProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  showCurrent: boolean;
  showNew: boolean;
  showConfirm: boolean;
  strength: PasswordStrengthReport;
  currentError?: string;
  newError?: string;
  confirmError?: string;
  isSaving?: boolean;
  onCurrentChange: (value: string) => void;
  onNewChange: (value: string) => void;
  onConfirmChange: (value: string) => void;
  onToggleShowCurrent: () => void;
  onToggleShowNew: () => void;
  onToggleShowConfirm: () => void;
  onForgotPassword: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export interface VerificationSettingsPanelProps {
  identityVerified: boolean;
  businessInfo: SettingsBusinessInfo;
  credentialsInfo: SettingsCredentialsInfo;
  completedSteps: number;
  totalSteps: number;
  statusHeadline: string;
  onOpenIdentityFlow: () => void;
  onOpenBusinessModal: () => void;
  onOpenCredentialsModal: () => void;
  onContactSupport: () => void;
}

export interface WalletPayoutSettingsPanelProps {
  availableBalanceFormatted: string;
  pendingBalanceFormatted: string;
  bankAccounts: ProBankAccount[];
  schedule: ProPayoutSchedule;
  nextPayoutDateLabel: string;
  minTransferFormatted: string;
  processingTimeLabel: string;
  recentTransactions: ProWalletTransactionItem[];
  onWithdrawFunds: () => void;
  onAddMethod: () => void;
  onSetPrimaryMethod: (accountId: string) => void;
  onDeleteMethod: (accountId: string) => void;
  onViewAllTransactions: () => void;
  onEditSchedule: () => void;
  onLearnSecurity: () => void;
  onOpenSupportResource: (topic: string) => void;
  onExportCsv: () => void;
}

export interface NotificationPreferencesPanelProps {
  preferences: NotificationPreferencesState;
  hasUnsavedChanges: boolean;
  isSaving?: boolean;
  timeOptions: readonly { value: string; label: string }[];
  onToggleChannel: (
    category: NotificationCategoryKey,
    channel: NotificationChannelKey
  ) => void;
  onToggleQuietHours: (enabled: boolean) => void;
  onQuietHoursFromChange: (value: string) => void;
  onQuietHoursToChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onNavigateProfile: () => void;
}

export interface DisputesSettingsPanelProps {
  disputes: DisputeRecord[];
  totalDisputesCount: number;
  searchQuery: string;
  statusFilter: "all" | DisputeStatus;
  dateRangeFilter: "all" | "30d" | "90d";
  currentPage: number;
  totalPages: number;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: "all" | DisputeStatus) => void;
  onDateRangeFilterChange: (value: "all" | "30d" | "90d") => void;
  onPageChange: (page: number) => void;
  onStartDispute: () => void;
  onViewDisputeDetail: (dispute: DisputeRecord) => void;
  onOpenHelpCenter: () => void;
  onReadDisputePolicies: () => void;
}

export interface DeleteAccountPanelProps {
  isProfessional: boolean;
  walletBalanceFormatted: string;
  reason: string;
  details: string;
  acknowledged: boolean;
  reasonOptions: readonly { value: string; label: string }[];
  onReasonChange: (value: string) => void;
  onDetailsChange: (value: string) => void;
  onAcknowledgedChange: (checked: boolean) => void;
  onKeepAccount: () => void;
  onOpenConfirmModal: () => void;
  onContactSupport: () => void;
}

export interface SettingsProOnlyGateProps {
  featureTitle: string;
  description: string;
  secondaryLabel?: string;
  onBackToSettings: () => void;
  onSecondaryAction?: () => void;
}
