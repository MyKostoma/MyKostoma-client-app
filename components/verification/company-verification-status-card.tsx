"use client";

import {
  AlertCircle,
  Briefcase,
  Check,
  Clock,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationTrustFooter } from "./verification-trust-footer";
import type { CompanyVerificationStatusCardProps } from "./types";

export function CompanyVerificationStatusCard({
  record,
  hasCopiedShareLink = false,
  onViewCompanyProfile,
  onGoToDashboard,
  onShareVerifiedStatus,
  onBackToOverview,
  onStartVerification,
}: CompanyVerificationStatusCardProps) {
  if (record.status === "verified") {
    const companyName = record.companyName || "Rivera Creative Labs LLC";

    return (
      <div className="max-w-lg mx-auto py-4 sm:py-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="size-16 rounded-full bg-info text-info-foreground ring-8 ring-info-bg flex items-center justify-center shadow-sm">
            <Briefcase className="size-7" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pt-2">
            Business Verified
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
            Congratulations! Your business entity has been successfully
            verified. {companyName} is now a trusted verified company.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-2xs divide-y divide-border overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-info">
              <span className="size-2 rounded-full bg-info shrink-0" />
              <span>Verified</span>
            </span>
          </div>

          <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <span className="text-muted-foreground">Verification ID</span>
            <span className="font-semibold text-foreground">
              {record.verificationId || "BUS-4471-CK9"}
            </span>
          </div>

          <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <span className="text-muted-foreground">Company Name</span>
            <span className="font-semibold text-foreground text-right">
              {companyName}
            </span>
          </div>

          <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <span className="text-muted-foreground">Verified Date</span>
            <span className="font-semibold text-foreground">
              {record.verifiedDate || "Jan 12, 2026"}
            </span>
          </div>

          {record.cacRegistrationNumber && (
            <div className="px-5 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
              <span className="text-muted-foreground">CAC Number</span>
              <span className="font-semibold text-foreground">
                {record.cacRegistrationNumber}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-1">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onViewCompanyProfile}
            className="w-full h-11 rounded-lg text-sm font-semibold shadow-xs"
          >
            View Company Profile
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
        </div>

        <div className="flex flex-col items-center gap-2.5 pt-1">
          <p className="text-xs text-muted-foreground text-center">
            Share your verified business status
          </p>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onShareVerifiedStatus}
            leadingIcon={
              hasCopiedShareLink ? (
                <Check className="size-3.5 text-success" />
              ) : (
                <Share2 className="size-3.5" />
              )
            }
            className="h-10 px-5 rounded-lg text-xs font-semibold"
          >
            {hasCopiedShareLink
              ? "Verified Link Copied"
              : "Share Verified Status"}
          </Button>

          <button
            type="button"
            onClick={onBackToOverview}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer pt-1"
          >
            Back to Company Verification
          </button>
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
            Company Under Review
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
            Your incorporation documents for{" "}
            <strong className="font-semibold text-foreground">
              {record.companyName || "your business"}
            </strong>{" "}
            have been received and are being reviewed by our compliance team.
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
            Back to Company Verification
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
            Company Verification Unsuccessful
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
            {record.rejectionReason ||
              "We could not validate the submitted CAC incorporation documents. Please upload certified true copies showing official stamps."}
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
            Resubmit Documents
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onBackToOverview}
            className="w-full h-11 rounded-lg text-sm font-semibold"
          >
            Back to Company Verification
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
          <Briefcase className="size-7" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pt-1">
          Company Not Yet Verified
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
          Submit your official CAC incorporation documents to verify your
          business entity and unlock corporate features.
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
          Start Company Verification
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onBackToOverview}
          className="w-full h-11 rounded-lg text-sm font-semibold"
        >
          Back to Company Verification
        </Button>
      </div>

      <VerificationTrustFooter />
    </div>
  );
}
