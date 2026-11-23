import type {
  CompanyRequirementItem,
  CompanyVerificationRecord,
  VerificationBenefitItem,
  VerificationDocumentOption,
  VerificationRecord,
} from "./types";

export const VERIFICATION_DOCUMENT_OPTIONS: readonly VerificationDocumentOption[] = [
  {
    id: "nin",
    title: "National ID (NIN)",
    subtitle: "NIN Slip or Plastic Card",
    inputLabel: "National Identification Number (NIN)",
    inputPlaceholder: "Enter your 11-digit NIN",
    helperText: "Enter the 11-digit number printed on your NIN slip or card.",
    maxLength: 11,
    requiresBackSide: true,
  },
  {
    id: "pvc",
    title: "Voter's Card / PVC",
    subtitle: "Permanent Voter's Card",
    inputLabel: "Voter Identification Number (VIN)",
    inputPlaceholder: "Enter your 19-character VIN",
    helperText: "Located at the top section of your Permanent Voter's Card.",
    maxLength: 24,
    requiresBackSide: true,
  },
  {
    id: "drivers_licence",
    title: "Driver's Licence",
    subtitle: "Valid Nigerian Licence",
    inputLabel: "Driver's Licence Number",
    inputPlaceholder: "Enter your Nigerian Driver's Licence number",
    helperText: "Must match a valid Federal Road Safety Corps (FRSC) licence.",
    maxLength: 20,
    requiresBackSide: true,
  },
  {
    id: "passport",
    title: "International Passport",
    subtitle: "Data Page Only",
    inputLabel: "International Passport Number",
    inputPlaceholder: "Enter your International Passport number",
    helperText: "Upload a clear image showing the full bio-data page only.",
    maxLength: 15,
    requiresBackSide: false,
  },
];

export const PHOTO_QUALITY_GUIDELINES: readonly string[] = [
  "Ensure all four corners of the document are visible",
  "Avoid glare or shadows on the document",
  "Text must be clearly legible and not blurry",
  "Use a dark, flat surface as the background",
];

export const VERIFICATION_BENEFITS: readonly VerificationBenefitItem[] = [
  {
    id: "badge",
    title: "Verified Professional Badge",
    description:
      "Display the official verified credential badge across your public profile, quotes, and shop cards to build immediate client confidence.",
  },
  {
    id: "requests",
    title: "3x More Collaboration Requests",
    description:
      "Verified specialists rank higher in discovery results and attract significantly more project invitations from clients.",
  },
  {
    id: "contracts",
    title: "Access High-Value Contracts",
    description:
      "Unlock verified-only enterprise requests, larger milestone contracts, and priority escrow payout eligibility.",
  },
  {
    id: "privacy",
    title: "NDPR-Compliant 256-Bit Security",
    description:
      "Your government ID documents are encrypted end-to-end, processed solely through accredited identity partners, and never shared publicly.",
  },
];

export const DEFAULT_UNVERIFIED_RECORD: VerificationRecord = {
  status: "unverified",
};

export const DEFAULT_VERIFIED_RECORD: VerificationRecord = {
  status: "verified",
  verificationId: "IND-8829-XL",
  verifiedDate: "Jan 12, 2026",
  expiresAt: "Jan 2028",
  documentType: "nin",
  documentNumberMasked: "•••••••4829",
};

export const DEFAULT_PENDING_RECORD: VerificationRecord = {
  status: "pending",
  verificationId: "VER-4012-PD",
  submittedAt: "Just now",
  documentType: "nin",
  documentNumberMasked: "•••••••4829",
};

export const DEFAULT_REJECTED_RECORD: VerificationRecord = {
  status: "rejected",
  verificationId: "VER-3908-RJ",
  submittedAt: "Oct 18, 2026",
  documentType: "nin",
  documentNumberMasked: "•••••••4829",
  rejectionReason:
    "The uploaded document image appeared slightly blurry around the identification number. Please upload clear, glare-free photos showing all four corners.",
};

export const COMPANY_VERIFICATION_REQUIREMENTS: readonly CompanyRequirementItem[] = [
  {
    id: "name",
    label: "Official Company Name and Registration Number",
    icon: "building",
  },
  {
    id: "cac",
    label: "Valid CAC Certificate or Incorporation Document",
    icon: "document",
  },
  {
    id: "authorized",
    label: "Authorized person identification",
    icon: "person",
  },
];

export const COMPANY_DOCUMENT_REQUIREMENTS: readonly string[] = [
  "Document must be the original or certified true copy",
  "All text must be clearly legible and not blurry",
  "Ensure the company stamp/seal is visible where applicable",
  "Files must not exceed 10MB per document",
];

export const DEFAULT_UNVERIFIED_COMPANY_RECORD: CompanyVerificationRecord = {
  status: "unverified",
};

export const DEFAULT_VERIFIED_COMPANY_RECORD: CompanyVerificationRecord = {
  status: "verified",
  verificationId: "BUS-4471-CK9",
  companyName: "Rivera Creative Labs LLC",
  cacRegistrationNumber: "RC 1849204",
  verifiedDate: "Jan 12, 2026",
  incorporationStatus: "Active Incorporation",
  documentsCount: 3,
};

export const DEFAULT_PENDING_COMPANY_RECORD: CompanyVerificationRecord = {
  status: "pending",
  verificationId: "BUS-4109-PD",
  companyName: "Rivera Creative Labs LLC",
  cacRegistrationNumber: "RC 1849204",
  submittedAt: "Just now",
};

export const DEFAULT_REJECTED_COMPANY_RECORD: CompanyVerificationRecord = {
  status: "rejected",
  verificationId: "BUS-3892-RJ",
  companyName: "Rivera Creative Labs LLC",
  cacRegistrationNumber: "RC 1849204",
  submittedAt: "Oct 18, 2026",
  rejectionReason:
    "The uploaded CAC Certificate was missing the company seal. Please submit a certified true copy showing the registration stamp.",
};
