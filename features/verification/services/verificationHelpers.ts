import type {
  CompanyVerificationRecord,
  VerificationDocumentOption,
  VerificationDocumentType,
  VerificationRecord,
  VerificationStatus,
} from "../types";
import {
  DEFAULT_PENDING_COMPANY_RECORD,
  DEFAULT_PENDING_RECORD,
  DEFAULT_REJECTED_COMPANY_RECORD,
  DEFAULT_REJECTED_RECORD,
  DEFAULT_UNVERIFIED_COMPANY_RECORD,
  DEFAULT_UNVERIFIED_RECORD,
  DEFAULT_VERIFIED_COMPANY_RECORD,
  DEFAULT_VERIFIED_RECORD,
  VERIFICATION_DOCUMENT_OPTIONS,
} from "../data";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/jpg"]);
const ALLOWED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const ALLOWED_COMPANY_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
]);
const ALLOWED_COMPANY_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".pdf"]);

export function buildVerificationOverviewHref(
  status?: VerificationStatus
): string {
  return status ? `/verification?status=${status}` : "/verification";
}

export function buildVerificationSubmitHref(
  docType?: VerificationDocumentType
): string {
  return docType
    ? `/verification/submit?doc=${docType}`
    : "/verification/submit";
}

export function buildVerificationStatusHref(
  status?: VerificationStatus
): string {
  return status
    ? `/verification/status?status=${status}`
    : "/verification/status";
}

export function getVerificationDocumentOption(
  type: VerificationDocumentType
): VerificationDocumentOption {
  return (
    VERIFICATION_DOCUMENT_OPTIONS.find((opt) => opt.id === type) ??
    VERIFICATION_DOCUMENT_OPTIONS[0]
  );
}

export function formatDocumentTypeLabel(
  type?: VerificationDocumentType
): string {
  if (!type) return "Government ID";
  return getVerificationDocumentOption(type).title;
}

export function validateVerificationDocumentNumber(
  type: VerificationDocumentType,
  rawValue: string
): { valid: boolean; error?: string } {
  const trimmed = rawValue.trim();

  if (!trimmed) {
    const label = getVerificationDocumentOption(type).inputLabel;
    return { valid: false, error: `Please enter your ${label}.` };
  }

  if (type === "nin") {
    const digitsOnly = trimmed.replace(/\s+/g, "");
    if (!/^\d{11}$/.test(digitsOnly)) {
      return {
        valid: false,
        error: "NIN must be exactly 11 numeric digits.",
      };
    }
    return { valid: true };
  }

  if (type === "pvc") {
    const cleaned = trimmed.replace(/[\s-]+/g, "");
    if (cleaned.length < 15 || !/^[a-zA-Z0-9]+$/.test(cleaned)) {
      return {
        valid: false,
        error: "Please enter a valid 19-character Voter Identification Number.",
      };
    }
    return { valid: true };
  }

  if (type === "drivers_licence") {
    const cleaned = trimmed.replace(/[\s-]+/g, "");
    if (cleaned.length < 8 || !/^[a-zA-Z0-9]+$/.test(cleaned)) {
      return {
        valid: false,
        error: "Please enter a valid Nigerian Driver's Licence number.",
      };
    }
    return { valid: true };
  }

  const cleaned = trimmed.replace(/[\s-]+/g, "");
  if (cleaned.length < 8 || !/^[a-zA-Z0-9]+$/.test(cleaned)) {
    return {
      valid: false,
      error: "Please enter a valid International Passport number.",
    };
  }

  return { valid: true };
}

export function validateVerificationImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const normalizedType = file.type.toLowerCase();
  const extIndex = file.name.lastIndexOf(".");
  const ext = extIndex >= 0 ? file.name.slice(extIndex).toLowerCase() : "";

  const isAllowedType =
    (normalizedType && ALLOWED_MIME_TYPES.has(normalizedType)) ||
    ALLOWED_EXTENSIONS.has(ext);

  if (!isAllowedType) {
    return {
      valid: false,
      error: "Unsupported format. Please upload a PNG or JPG image.",
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: "File exceeds 10MB limit. Please choose a smaller image.",
    };
  }

  return { valid: true };
}

export function formatVerificationFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function maskDocumentNumber(rawValue: string): string {
  const cleaned = rawValue.replace(/\s+/g, "");
  if (!cleaned) return "••••";
  if (cleaned.length <= 4) return cleaned;
  const visible = cleaned.slice(-4);
  return `${"•".repeat(Math.min(7, cleaned.length - 4))}${visible}`;
}

export function generateVerificationId(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `IND-${digits}-XL`;
}

export function formatVerificationDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatVerificationExpiryDate(date: Date): string {
  const expiry = new Date(date);
  expiry.setFullYear(expiry.getFullYear() + 2);
  return expiry.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function resolveVerificationRecordForStatus(
  record: VerificationRecord,
  overrideStatus?: string | null
): VerificationRecord {
  const normalized = overrideStatus?.trim().toLowerCase();
  if (!normalized) return record;

  if (normalized === "verified") {
    return record.status === "verified" ? record : DEFAULT_VERIFIED_RECORD;
  }
  if (normalized === "pending") {
    return record.status === "pending" ? record : DEFAULT_PENDING_RECORD;
  }
  if (normalized === "rejected") {
    return record.status === "rejected" ? record : DEFAULT_REJECTED_RECORD;
  }
  if (normalized === "unverified") {
    return DEFAULT_UNVERIFIED_RECORD;
  }

  return record;
}

export function buildCompanyVerificationOverviewHref(
  status?: VerificationStatus
): string {
  return status
    ? `/verification/company?status=${status}`
    : "/verification/company";
}

export function buildCompanyVerificationSubmitHref(): string {
  return "/verification/company/submit";
}

export function buildCompanyVerificationStatusHref(
  status?: VerificationStatus
): string {
  return status
    ? `/verification/company/status?status=${status}`
    : "/verification/company/status";
}

export function validateCompanyName(rawValue: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return { valid: false, error: "Please enter your official company name." };
  }
  if (trimmed.length < 2) {
    return {
      valid: false,
      error: "Company name must be at least 2 characters.",
    };
  }
  return { valid: true };
}

export function validateCacRegistrationNumber(rawValue: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return {
      valid: false,
      error: "Please enter your CAC Registration Number.",
    };
  }
  const cleaned = trimmed.replace(/[\s-]+/g, "");
  if (cleaned.length < 5 || !/^[a-zA-Z0-9]+$/.test(cleaned)) {
    return {
      valid: false,
      error: "Please enter a valid CAC Registration Number (e.g. RC 1849204).",
    };
  }
  return { valid: true };
}

export function validateCompanyDocumentFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const normalizedType = file.type.toLowerCase();
  const extIndex = file.name.lastIndexOf(".");
  const ext = extIndex >= 0 ? file.name.slice(extIndex).toLowerCase() : "";

  const isAllowedType =
    (normalizedType && ALLOWED_COMPANY_MIME_TYPES.has(normalizedType)) ||
    ALLOWED_COMPANY_EXTENSIONS.has(ext);

  if (!isAllowedType) {
    return {
      valid: false,
      error: "Unsupported format. Please upload a PNG, JPG, or PDF document.",
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: "File exceeds 10MB limit. Please choose a smaller document.",
    };
  }

  return { valid: true };
}

export function generateCompanyVerificationId(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `BUS-${digits}-CK9`;
}

export function resolveCompanyVerificationRecordForStatus(
  record: CompanyVerificationRecord,
  overrideStatus?: string | null
): CompanyVerificationRecord {
  const normalized = overrideStatus?.trim().toLowerCase();
  if (!normalized) return record;

  if (normalized === "verified") {
    return record.status === "verified"
      ? record
      : DEFAULT_VERIFIED_COMPANY_RECORD;
  }
  if (normalized === "pending") {
    return record.status === "pending"
      ? record
      : DEFAULT_PENDING_COMPANY_RECORD;
  }
  if (normalized === "rejected") {
    return record.status === "rejected"
      ? record
      : DEFAULT_REJECTED_COMPANY_RECORD;
  }
  if (normalized === "unverified") {
    return DEFAULT_UNVERIFIED_COMPANY_RECORD;
  }

  return record;
}
