"use client";

import { useSearchParams } from "next/navigation";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { VerificationTopBar } from "@/components/layouts/top-bars/verification/verification-top-bar";
import { VerificationSubmitForm } from "@/components/verification/verification-submit-form";
import {
  PHOTO_QUALITY_GUIDELINES,
  VERIFICATION_DOCUMENT_OPTIONS,
} from "./data";
import { useVerificationSubmitService } from "./services/verificationApi";
import type {
  VerificationDocumentType,
  VerificationSubmitViewProps,
} from "./types";

function resolveDocType(
  raw: string | null,
  fallback: VerificationDocumentType = "nin"
): VerificationDocumentType {
  if (!raw) return fallback;
  const match = VERIFICATION_DOCUMENT_OPTIONS.find((opt) => opt.id === raw);
  return match ? match.id : fallback;
}

export function VerificationSubmitView({
  defaultDocumentType = "nin",
}: VerificationSubmitViewProps) {
  const searchParams = useSearchParams();
  const resolvedDefault = resolveDocType(
    searchParams.get("doc"),
    defaultDocumentType
  );

  const {
    documentType,
    selectedOption,
    documentNumber,
    documentNumberError,
    frontFile,
    frontFileError,
    backFile,
    backFileError,
    isSubmitting,
    handleSelectDocumentType,
    handleDocumentNumberChange,
    handleFrontFileSelect,
    handleFrontFileRemove,
    handleBackFileSelect,
    handleBackFileRemove,
    handleCancel,
    handleSubmit,
  } = useVerificationSubmitService(resolvedDefault);

  return (
    <>
      <DashboardTopBarSlot>
        <VerificationTopBar
          breadcrumbs={[
            { label: "Verification", href: "/verification" },
            { label: "Select Identity Document" },
          ]}
          highlightLastPrimary
        />
      </DashboardTopBarSlot>

      <VerificationSubmitForm
        documentOptions={VERIFICATION_DOCUMENT_OPTIONS}
        selectedOption={selectedOption}
        documentType={documentType}
        documentNumber={documentNumber}
        documentNumberError={documentNumberError}
        frontFile={frontFile}
        frontFileError={frontFileError}
        backFile={backFile}
        backFileError={backFileError}
        guidelines={PHOTO_QUALITY_GUIDELINES}
        isSubmitting={isSubmitting}
        onSelectDocumentType={handleSelectDocumentType}
        onDocumentNumberChange={handleDocumentNumberChange}
        onFrontFileSelect={handleFrontFileSelect}
        onFrontFileRemove={handleFrontFileRemove}
        onBackFileSelect={handleBackFileSelect}
        onBackFileRemove={handleBackFileRemove}
        onBack={handleCancel}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </>
  );
}
