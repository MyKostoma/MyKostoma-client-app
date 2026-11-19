"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  IdCard,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { VerificationStatusOverviewCardProps } from "./types";

export function VerificationStatusOverviewCard({
  record,
  isLoading = false,
  onGetVerified,
  onViewDetails,
  onResubmit,
}: VerificationStatusOverviewCardProps) {
  if (isLoading && record.status === "unverified") {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-start gap-4 flex-1">
          <Skeleton className="size-12 rounded-xl shrink-0" />
          <div className="space-y-2.5 flex-1">
            <Skeleton className="h-5 w-60 rounded-md" />
            <Skeleton className="h-4 w-full max-w-lg rounded-md" />
            <Skeleton className="h-3.5 w-64 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-10 w-32 rounded-lg shrink-0" />
      </div>
    );
  }

  if (record.status === "verified") {
    return (
      <div className="rounded-2xl border border-warning/45 bg-card p-5 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4 min-w-0">
          <div className="size-12 rounded-xl bg-warning-bg text-warning border border-warning/25 flex items-center justify-center shrink-0">
            <CheckCircle2 className="size-5" />
          </div>

          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                Individual Professional Status
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-warning-bg text-warning border border-warning/40 text-[10px] font-bold uppercase tracking-wider shrink-0">
                <CheckCircle2 className="size-3" />
                <span>Verified</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Verified on {record.verifiedDate || "Jan 12, 2026"}. Your identity
              has been successfully authenticated. This badge is displayed on
              your public profile.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground pt-0.5">
              <span>
                Ref ID:{" "}
                <strong className="font-semibold text-foreground">
                  {record.verificationId || "IND-8829-XL"}
                </strong>
              </span>
              {record.expiresAt && (
                <span>
                  Expires:{" "}
                  <strong className="font-semibold text-foreground">
                    {record.expiresAt}
                  </strong>
                </span>
              )}
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onViewDetails}
          className="h-9 px-5 rounded-lg text-xs font-semibold shrink-0 self-start md:self-center"
        >
          View Details
        </Button>
      </div>
    );
  }

  if (record.status === "pending") {
    return (
      <div className="rounded-2xl border border-info/35 bg-card p-5 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4 min-w-0">
          <div className="size-12 rounded-xl bg-info-bg text-info border border-info/25 flex items-center justify-center shrink-0">
            <Clock className="size-5" />
          </div>

          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                Government ID Verification
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-info-bg text-info border border-info/30 text-[10px] font-bold uppercase tracking-wider shrink-0">
                Under Review
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Your submitted document is currently being reviewed by our
              verification partner. You will receive a notification once
              completed.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground pt-0.5">
              {record.verificationId && (
                <span>
                  Ref ID:{" "}
                  <strong className="font-semibold text-foreground">
                    {record.verificationId}
                  </strong>
                </span>
              )}
              {record.submittedAt && <span>Submitted: {record.submittedAt}</span>}
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onViewDetails}
          className="h-9 px-5 rounded-lg text-xs font-semibold shrink-0 self-start md:self-center"
        >
          View Status
        </Button>
      </div>
    );
  }

  if (record.status === "rejected") {
    return (
      <div className="rounded-2xl border border-error/40 bg-card p-5 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4 min-w-0">
          <div className="size-12 rounded-xl bg-error-bg text-error border border-error/25 flex items-center justify-center shrink-0">
            <AlertCircle className="size-5" />
          </div>

          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                Government ID Verification
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-error-bg text-error border border-error/30 text-[10px] font-bold uppercase tracking-wider shrink-0">
                Action Required
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {record.rejectionReason ||
                "We could not verify your submitted document. Please upload clear, glare-free photos of a valid government-issued ID."}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onResubmit}
          className="h-10 px-6 rounded-lg text-xs sm:text-sm font-semibold shrink-0 self-start md:self-center shadow-xs"
        >
          Resubmit Document
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
      <div className="flex items-start gap-4 min-w-0">
        <div className="size-12 rounded-xl bg-secondary border border-border/60 text-muted-foreground flex items-center justify-center shrink-0">
          <IdCard className="size-5" />
        </div>

        <div className="space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
              Government ID Verification
            </h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border text-[10px] font-bold uppercase tracking-wider shrink-0">
              Unverified
            </span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
            To unlock premium features and increase your trust score, please
            verify your identity using a valid government-issued document.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground pt-0.5">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 shrink-0" />
              <span>Estimated time: 2–5 mins</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="size-3.5 shrink-0" />
              <span>Secure 256-bit encryption</span>
            </span>
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="default"
        size="sm"
        onClick={onGetVerified}
        className="h-10 px-6 rounded-lg text-xs sm:text-sm font-semibold shrink-0 self-start md:self-center shadow-xs"
      >
        Get Verified
      </Button>
    </div>
  );
}
