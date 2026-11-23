"use client";

import type { FormEvent } from "react";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, Input } from "@/components/ui/form-fields";
import { VerificationUploadDropzone } from "./verification-upload-dropzone";
import { VerificationTrustFooter } from "./verification-trust-footer";
import type { CompanyVerificationSubmitFormProps } from "./types";

const COMPANY_ACCEPT_TYPES =
  ".png,.jpg,.jpeg,.pdf,image/png,image/jpeg,application/pdf";

export function CompanyVerificationSubmitForm({
  companyName,
  companyNameError,
  cacNumber,
  cacNumberError,
  cacCertificateFile,
  cacCertificateError,
  incorporationFile,
  incorporationError,
  requirements,
  isSubmitting = false,
  onCompanyNameChange,
  onCacNumberChange,
  onCacCertificateSelect,
  onCacCertificateRemove,
  onIncorporationSelect,
  onIncorporationRemove,
  onBack,
  onCancel,
  onSubmit,
}: CompanyVerificationSubmitFormProps) {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 pb-8">
      <div className="space-y-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Overview</span>
        </button>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Company Details &amp; Documents
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Provide your business information and upload the required
            incorporation documents.
          </p>
        </div>
      </div>

      <div className="border-t border-border" />

      <div className="space-y-4">
        <FormField
          id="company-official-name"
          label="Official Company Name"
          state={companyNameError ? "error" : "default"}
          errorMessage={companyNameError}
        >
          <Input
            id="company-official-name"
            type="text"
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
            placeholder="e.g. Rivera Creative Labs LLC"
            disabled={isSubmitting}
            state={companyNameError ? "error" : "default"}
            className="h-11 rounded-xl bg-card"
          />
        </FormField>

        <FormField
          id="company-cac-number"
          label="CAC Registration Number"
          state={cacNumberError ? "error" : "default"}
          errorMessage={cacNumberError}
        >
          <Input
            id="company-cac-number"
            type="text"
            value={cacNumber}
            onChange={(e) => onCacNumberChange(e.target.value)}
            placeholder="Enter your CAC registration number"
            disabled={isSubmitting}
            state={cacNumberError ? "error" : "default"}
            className="h-11 rounded-xl bg-card"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <VerificationUploadDropzone
          id="company-cac-certificate-upload"
          label="CAC Certificate"
          subtitle="PNG, JPG, PDF up to 10MB"
          accept={COMPANY_ACCEPT_TYPES}
          file={cacCertificateFile}
          error={cacCertificateError}
          disabled={isSubmitting}
          onFileSelect={onCacCertificateSelect}
          onFileRemove={onCacCertificateRemove}
        />

        <VerificationUploadDropzone
          id="company-incorporation-upload"
          label="Incorporation Document"
          subtitle="PNG, JPG, PDF up to 10MB"
          accept={COMPANY_ACCEPT_TYPES}
          file={incorporationFile}
          error={incorporationError}
          disabled={isSubmitting}
          onFileSelect={onIncorporationSelect}
          onFileRemove={onIncorporationRemove}
        />
      </div>

      <div className="rounded-xl border border-info/25 bg-info-bg p-4 sm:p-5 flex items-start gap-3">
        <div className="size-5 rounded-full bg-info text-info-foreground flex items-center justify-center shrink-0 mt-0.5">
          <Info className="size-3.5" />
        </div>

        <div className="space-y-1.5 min-w-0">
          <p className="text-xs sm:text-sm font-bold text-info">
            Document Requirements
          </p>
          <ul className="space-y-1 text-xs text-info list-disc list-inside">
            {requirements.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isSubmitting}
          onClick={onCancel}
          className="h-10 px-5 rounded-lg text-xs sm:text-sm font-semibold"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="default"
          size="sm"
          loading={isSubmitting}
          loadingText="Submitting..."
          className="h-10 px-6 rounded-lg text-xs sm:text-sm font-semibold shadow-xs"
        >
          Submit for Verification
        </Button>
      </div>

      <VerificationTrustFooter className="mt-2" />
    </form>
  );
}
