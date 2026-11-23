"use client";

import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock,
  IdCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDocumentTypeLabel } from "@/features/verification/services/verificationHelpers";
import { VerificationTrustFooter } from "./verification-trust-footer";
import type { VerificationStatusResultCardProps } from "./types";

export function VerificationStatusResultCard({
  record,
  onViewProfile,
  onGoToDashboard,
  onBackToOverview,
  onStartVerification,
}: VerificationStatusResultCardProps) {
  if (record.status === "verified") {
    return (
      <div className="max-w-lg mx-auto py-4 sm:py-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="size-16 rounded-full bg-warning text-warning-foreground flex items-center justify-center shadow-sm">
            <Check className="size-8 stroke-[2.5]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pt-1">
            Individual Verified
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
            Congratulations! Your identity has been successfully verified. You
            now have access to premium features.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-2xs divide-y divide-border overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-warning">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>Verified</span>
            </span>
          </div>

          <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <span className="text-muted-foreground">Verification ID</span>
            <span className="font-semibold text-foreground">
              {record.verificationId || "IND-8829-XL"}
            </span>
          </div>

          <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <span className="text-muted-foreground">Verified Date</span>
            <span className="font-semibold text-foreground">
              {record.verifiedDate || "Jan 12, 2026"}
            </span>
          </div>

          {record.documentType && (
            <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
              <span className="text-muted-foreground">Document</span>
              <span className="font-semibold text-foreground">
                {formatDocumentTypeLabel(record.documentType)}
              </span>
            </div>
          )}

          {record.expiresAt && (
            <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
              <span className="text-muted-foreground">Expires</span>
              <span className="font-semibold text-foreground">
                {record.expiresAt}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-1">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onViewProfile}
            className="w-full h-11 rounded-lg text-sm font-semibold shadow-xs"
          >
            View Profile
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onGoToDashboard}
            className="w-full h-11 rounded-lg text-sm font-semibold"
          >
            Go to Dashboard
          </Button>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={onBackToOverview}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Back to Verification Overview
            </button>
          </div>
        </div>

        <VerificationTrustFooter />
      </div>
    );
  }

  if (record.status === "pending") {
    return (
      <div className="max-w-lg mx-auto py-4 sm:py-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="size-16 rounded-full bg-info-bg text-info border border-info/30 flex items-center justify-center shadow-2xs">
            <Clock className="size-7" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pt-1">
            Verification Under Review
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
            Your identity documents have been received and are being reviewed by
            our verification partner. This typically takes 2–5 minutes.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-2xs divide-y divide-border overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-info">
              <Clock className="size-4 shrink-0" />
              <span>Under Review</span>
            </span>
          </div>

          {record.verificationId && (
            <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
              <span className="text-muted-foreground">Verification ID</span>
              <span className="font-semibold text-foreground">
                {record.verificationId}
              </span>
            </div>
          )}

          {record.submittedAt && (
            <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
              <span className="text-muted-foreground">Submitted</span>
              <span className="font-semibold text-foreground">
                {record.submittedAt}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-1">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onGoToDashboard}
            className="w-full h-11 rounded-lg text-sm font-semibold shadow-xs"
          >
            Go to Dashboard
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onBackToOverview}
            className="w-full h-11 rounded-lg text-sm font-semibold"
          >
            Back to Verification Overview
          </Button>
        </div>

        <VerificationTrustFooter />
      </div>
    );
  }

  if (record.status === "rejected") {
    return (
      <div className="max-w-lg mx-auto py-4 sm:py-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="size-16 rounded-full bg-error-bg text-error border border-error/30 flex items-center justify-center shadow-2xs">
            <AlertCircle className="size-7" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pt-1">
            Verification Unsuccessful
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
            {record.rejectionReason ||
              "We could not validate the document images provided. Please upload clearer photos of a valid government-issued ID."}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-2xs divide-y divide-border overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-error">
              <AlertCircle className="size-4 shrink-0" />
              <span>Action Required</span>
            </span>
          </div>

          {record.verificationId && (
            <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
              <span className="text-muted-foreground">Verification ID</span>
              <span className="font-semibold text-foreground">
                {record.verificationId}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-1">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onStartVerification}
            className="w-full h-11 rounded-lg text-sm font-semibold shadow-xs"
          >
            Resubmit Document
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onBackToOverview}
            className="w-full h-11 rounded-lg text-sm font-semibold"
          >
            Back to Verification Overview
          </Button>
        </div>

        <VerificationTrustFooter />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-4 sm:py-8 space-y-6">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="size-16 rounded-full bg-secondary text-muted-foreground border border-border flex items-center justify-center shadow-2xs">
          <IdCard className="size-7" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pt-1">
          Not Yet Verified
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
          You haven&apos;t submitted a government-issued identity document yet.
          Verify your identity in 2–5 minutes to unlock full professional
          benefits.
        </p>
      </div>

      <div className="space-y-3 pt-1">
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onStartVerification}
          className="w-full h-11 rounded-lg text-sm font-semibold shadow-xs"
        >
          Get Verified
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onBackToOverview}
          className="w-full h-11 rounded-lg text-sm font-semibold"
        >
          Back to Verification Overview
        </Button>
      </div>

      <VerificationTrustFooter />
    </div>
  );
}
