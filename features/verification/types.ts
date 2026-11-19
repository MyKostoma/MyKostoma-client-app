import type {
  VerificationDocumentOption,
  VerificationDocumentType,
  VerificationRecord,
  VerificationStatus,
  VerificationUploadedFile,
  VerificationBenefitItem,
} from "@/components/verification/types";

export type {
  VerificationDocumentOption,
  VerificationDocumentType,
  VerificationRecord,
  VerificationStatus,
  VerificationUploadedFile,
  VerificationBenefitItem,
};

export interface VerificationOverviewViewProps {
  initialStatus?: VerificationStatus;
}

export interface VerificationSubmitViewProps {
  defaultDocumentType?: VerificationDocumentType;
}

export interface VerificationStatusViewProps {
  initialStatus?: VerificationStatus;
}

export interface SubmitVerificationPayload {
  documentType: VerificationDocumentType;
  documentNumber: string;
  frontFileName: string;
  backFileName?: string;
}
