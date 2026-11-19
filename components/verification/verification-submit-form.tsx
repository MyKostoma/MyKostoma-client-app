"use client";

import type { FormEvent } from "react";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, Input } from "@/components/ui/form-fields";
import { VerificationDocumentSelector } from "./verification-document-selector";
import { VerificationUploadDropzone } from "./verification-upload-dropzone";
import { VerificationTrustFooter } from "./verification-trust-footer";
import type { VerificationSubmitFormProps } from "./types";

export function VerificationSubmitForm({
  documentOptions,
  selectedOption,
  documentType,
  documentNumber,
  documentNumberError,
  frontFile,
  frontFileError,
  backFile,
  backFileError,
  guidelines,
  isSubmitting = false,
  onSelectDocumentType,
  onDocumentNumberChange,
  onFrontFileSelect,
  onFrontFileRemove,
  onBackFileSelect,
  onBackFileRemove,
  onBack,
  onCancel,
  onSubmit,
}: VerificationSubmitFormProps) {
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
            Select Identity Document
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Choose one of the following government-issued IDs to verify your
            identity.
          </p>
        </div>
      </div>

      <VerificationDocumentSelector
        options={documentOptions}
        selectedType={documentType}
        onSelect={onSelectDocumentType}
        disabled={isSubmitting}
      />

      <div className="border-t border-border" />

      <FormField
        id="verification-doc-number"
        label={selectedOption.inputLabel}
        state={documentNumberError ? "error" : "default"}
        errorMessage={documentNumberError}
        helperText={selectedOption.helperText}
      >
        <Input
          id="verification-doc-number"
          type="text"
          value={documentNumber}
          onChange={(e) => onDocumentNumberChange(e.target.value)}
          placeholder={selectedOption.inputPlaceholder}
          maxLength={selectedOption.maxLength}
          disabled={isSubmitting}
          state={documentNumberError ? "error" : "default"}
          className="h-11 rounded-xl bg-card"
        />
      </FormField>

      {selectedOption.requiresBackSide ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <VerificationUploadDropzone
            id="verification-front-upload"
            label="Front of ID"
            file={frontFile}
            error={frontFileError}
            disabled={isSubmitting}
            onFileSelect={onFrontFileSelect}
            onFileRemove={onFrontFileRemove}
          />
          <VerificationUploadDropzone
            id="verification-back-upload"
            label="Back of ID"
            file={backFile}
            error={backFileError}
            disabled={isSubmitting}
            onFileSelect={onBackFileSelect}
            onFileRemove={onBackFileRemove}
          />
        </div>
      ) : (
        <VerificationUploadDropzone
          id="verification-front-upload"
          label="Passport Data Page"
          file={frontFile}
          error={frontFileError}
          disabled={isSubmitting}
          onFileSelect={onFrontFileSelect}
          onFileRemove={onFrontFileRemove}
        />
      )}

      <div className="rounded-xl border border-info/25 bg-info-bg p-4 sm:p-5 flex items-start gap-3">
        <div className="size-5 rounded-full bg-info text-info-foreground flex items-center justify-center shrink-0 mt-0.5">
          <Info className="size-3.5" />
        </div>

        <div className="space-y-1.5 min-w-0">
          <p className="text-xs sm:text-sm font-bold text-info">
            Photo Quality Guidelines
          </p>
          <ul className="space-y-1 text-xs text-info list-disc list-inside">
            {guidelines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isSubmitting}
          onClick={onCancel}
          className="h-10 px-5 rounded-lg text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground"
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
