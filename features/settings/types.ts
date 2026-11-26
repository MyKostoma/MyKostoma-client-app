export type {
  DisputeRecord,
  DisputeStatus,
  NotificationCategoryKey,
  NotificationChannelKey,
  NotificationChannelMatrix,
  NotificationPreferencesState,
  PasswordStrengthLevel,
  PasswordStrengthReport,
  QuietHoursConfig,
  SettingsBusinessInfo,
  SettingsCredentialsInfo,
  SettingsSectionId,
  SettingsStepStatus,
} from "@/components/settings/types";

export interface ProfileSettingsFormValues {
  avatarUrl: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface CreateDisputePayload {
  transactionTitle: string;
  transactionRef: string;
  reason: string;
  description: string;
}

export interface BusinessInfoFormValues {
  legalName: string;
  taxId: string;
  registeredAddress: string;
}

export interface CredentialsUploadValues {
  licenseName: string;
  issuingBody: string;
  licenseNumber: string;
  fileName: string;
}

export interface DeleteAccountPayload {
  reason?: string;
  details?: string;
}
