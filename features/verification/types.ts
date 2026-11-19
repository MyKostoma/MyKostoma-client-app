import type {
  CompanyRequirementItem,
  CompanyVerificationRecord,
  VerificationDocumentOption,
  VerificationDocumentType,
  VerificationModeTab,
  VerificationRecord,
  VerificationStatus,
  VerificationUploadedFile,
  VerificationBenefitItem,
} from "@/components/verification/types";

export type {
  CompanyRequirementItem,
  CompanyVerificationRecord,
  VerificationDocumentOption,
  VerificationDocumentType,
  VerificationModeTab,
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

export interface CompanyVerificationOverviewViewProps {
  initialStatus?: VerificationStatus;
}

export interface CompanyVerificationStatusViewProps {
  initialStatus?: VerificationStatus;
}

export interface SubmitCompanyVerificationPayload {
  companyName: string;
  cacRegistrationNumber: string;
  cacCertificateFileName: string;
  incorporationFileName: string;
}
