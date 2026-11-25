"use client";

import Link from "next/link";
import {
  AlertCircle,
  Award,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock,
  IdCard,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  SettingsStepStatus,
  VerificationSettingsPanelProps,
} from "./types";

function StepStatusPill({ status }: { status: SettingsStepStatus }) {
  if (status === "verified") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary text-foreground text-[10px] font-extrabold uppercase tracking-wider">
        <CheckCircle2 className="size-3 shrink-0" />
        <span>VERIFIED</span>
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary text-muted-foreground text-[10px] font-extrabold uppercase tracking-wider">
        <Clock className="size-3 shrink-0" />
        <span>PENDING REVIEW</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-foreground text-background text-[10px] font-extrabold uppercase tracking-wider">
      <AlertCircle className="size-3 shrink-0" />
      <span>ACTION REQUIRED</span>
    </span>
  );
}

export function VerificationSettingsPanel({
  identityVerified,
  businessInfo,
  credentialsInfo,
  completedSteps,
  totalSteps,
  statusHeadline,
  onOpenIdentityFlow,
  onOpenBusinessModal,
  onOpenCredentialsModal,
  onContactSupport,
}: VerificationSettingsPanelProps) {
  const identityStatus: SettingsStepStatus = identityVerified
    ? "verified"
    : "action-required";

  const progressWidth = Math.max(
    18,
    Math.round((completedSteps / Math.max(1, totalSteps)) * 100)
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Heading */}
      <div className="space-y-1.5">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link href="/settings" className="hover:text-foreground">
            Settings
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="font-semibold text-foreground">Verification</span>
        </nav>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Professional Verification
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Complete your verification to unlock premium features, build trust
          with clients, and enable payouts. Verified professionals receive a
          checkmark on their profile and higher ranking in search results.
        </p>
      </div>

      {/* Dark Status Banner */}
      <div className="rounded-2xl bg-foreground text-background p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs text-background/75">Current Status</p>
          <p className="text-lg sm:text-xl font-extrabold tracking-tight">
            {statusHeadline}
          </p>
        </div>

        <div className="w-full sm:w-52 space-y-2 sm:text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-background/80">
            STEP {completedSteps} OF {totalSteps} COMPLETE
          </p>
          <div className="h-1.5 w-full rounded-full bg-background/25 overflow-hidden">
            <div
              className={cn("h-full rounded-full bg-background transition-all")}
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>
      </div>

      {/* Verification Steps */}
      <div className="space-y-3.5">
        {/* Step 1: Identity Verification */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 min-w-0">
            <div className="size-10 rounded-xl bg-secondary text-foreground flex items-center justify-center shrink-0">
              <IdCard className="size-4" />
            </div>

            <div className="min-w-0 space-y-1.5">
              <h3 className="text-sm font-bold text-foreground">
                Identity Verification
              </h3>
              <p className="text-xs text-muted-foreground">
                Government-issued ID, NIN, Voter&rsquo;s Card, or Passport
                verification.
              </p>
              <StepStatusPill status={identityStatus} />
            </div>
          </div>

          <Button
            type="button"
            variant={identityVerified ? "secondary" : "default"}
            size="sm"
            onClick={onOpenIdentityFlow}
            className="h-9 px-4 rounded-lg text-xs font-bold shrink-0"
          >
            {identityVerified ? "Verified" : "Verify ID"}
          </Button>
        </div>

        {/* Step 2: Business Information */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 min-w-0">
            <div className="size-10 rounded-xl bg-secondary text-foreground flex items-center justify-center shrink-0">
              <Briefcase className="size-4" />
            </div>

            <div className="min-w-0 space-y-1.5">
              <h3 className="text-sm font-bold text-foreground">
                Business Information
              </h3>
              <p className="text-xs text-muted-foreground">
                {businessInfo.legalName} • {businessInfo.taxId}
              </p>
              <StepStatusPill status={businessInfo.status} />
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onOpenBusinessModal}
            className="h-9 px-4 rounded-lg text-xs font-bold shrink-0"
          >
            Edit Info
          </Button>
        </div>

        {/* Step 3: Professional Credentials */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 min-w-0">
            <div className="size-10 rounded-xl bg-secondary text-foreground flex items-center justify-center shrink-0">
              <Award className="size-4" />
            </div>

            <div className="min-w-0 space-y-1.5">
              <h3 className="text-sm font-bold text-foreground">
                Professional Credentials
              </h3>
              <p className="text-xs text-muted-foreground">
                {credentialsInfo.licenseName
                  ? `${credentialsInfo.licenseName} (${credentialsInfo.licenseNumber})`
                  : "License numbers, certifications, or trade registrations."}
              </p>
              <StepStatusPill status={credentialsInfo.status} />
            </div>
          </div>

          <Button
            type="button"
            variant={
              credentialsInfo.status === "action-required"
                ? "default"
                : "outline"
            }
            size="sm"
            onClick={onOpenCredentialsModal}
            className="h-9 px-4 rounded-lg text-xs font-bold shrink-0 shadow-xs"
          >
            {credentialsInfo.status === "action-required"
              ? "Upload Documents"
              : "Update Files"}
          </Button>
        </div>
      </div>

      {/* About Verification Notice */}
      <div className="rounded-2xl border border-border bg-secondary/45 p-5 flex items-start gap-3.5">
        <Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-foreground">
            ABOUT VERIFICATION
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Verification typically takes 24–48 hours. Once submitted, our
            compliance team will review your documents. You&rsquo;ll receive an
            email notification as soon as your status changes.
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground pt-1">
        Having trouble with the verification process?{" "}
        <button
          type="button"
          onClick={onContactSupport}
          className="font-bold text-foreground underline underline-offset-4 hover:text-primary cursor-pointer"
        >
          Contact Support
        </button>
      </p>
    </div>
  );
}
