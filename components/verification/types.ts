export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

export type VerificationDocumentType =
  | "nin"
  | "pvc"
  | "drivers_licence"
  | "passport";

export interface VerificationDocumentOption {
  id: VerificationDocumentType;
  title: string;
  subtitle: string;
  inputLabel: string;
  inputPlaceholder: string;
  helperText?: string;
  maxLength: number;
  requiresBackSide: boolean;
}

export interface VerificationUploadedFile {
  name: string;
  size: number;
  sizeLabel: string;
  type: string;
  previewUrl: string;
}

export interface VerificationRecord {
  status: VerificationStatus;
  verificationId?: string;
  verifiedDate?: string;
  expiresAt?: string;
  submittedAt?: string;
  documentType?: VerificationDocumentType;
  documentNumberMasked?: string;
  rejectionReason?: string;
}

export interface VerificationBenefitItem {
  id: string;
  title: string;
  description: string;
}

export interface VerificationTrustFooterProps {
  className?: string;
}

export interface VerificationStatusOverviewCardProps {
  record: VerificationRecord;
  isLoading?: boolean;
  onGetVerified: () => void;
  onViewDetails: () => void;
  onResubmit: () => void;
}

export interface VerificationWhyCardProps {
  onLearnMore: () => void;
}

export interface VerificationDocumentSelectorProps {
  options: readonly VerificationDocumentOption[];
  selectedType: VerificationDocumentType;
  onSelect: (type: VerificationDocumentType) => void;
  disabled?: boolean;
}

export interface VerificationUploadDropzoneProps {
  id: string;
  label: string;
  subtitle?: string;
  file: VerificationUploadedFile | null;
  error?: string;
  disabled?: boolean;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
}

export interface VerificationSubmitFormProps {
  documentOptions: readonly VerificationDocumentOption[];
  selectedOption: VerificationDocumentOption;
  documentType: VerificationDocumentType;
  documentNumber: string;
  documentNumberError?: string;
  frontFile: VerificationUploadedFile | null;
  frontFileError?: string;
  backFile: VerificationUploadedFile | null;
  backFileError?: string;
  guidelines: readonly string[];
  isSubmitting?: boolean;
  onSelectDocumentType: (type: VerificationDocumentType) => void;
  onDocumentNumberChange: (value: string) => void;
  onFrontFileSelect: (file: File) => void;
  onFrontFileRemove: () => void;
  onBackFileSelect: (file: File) => void;
  onBackFileRemove: () => void;
  onBack: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export interface VerificationStatusResultCardProps {
  record: VerificationRecord;
  onViewProfile: () => void;
  onGoToDashboard: () => void;
  onBackToOverview: () => void;
  onStartVerification: () => void;
}
