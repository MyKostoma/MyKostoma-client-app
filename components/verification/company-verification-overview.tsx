"use client";

import {
  AlertCircle,
  Briefcase,
  Building2,
  Clock,
  FileText,
  IdCard,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { COMPANY_VERIFICATION_REQUIREMENTS } from "@/features/verification/data";
import { VerificationTrustFooter } from "./verification-trust-footer";
import { VerificationWhyCard } from "./verification-why-card";
import type {
  CompanyRequirementItem,
  CompanyVerificationOverviewProps,
} from "./types";

const REQUIREMENT_ICONS: Record<
  CompanyRequirementItem["icon"],
  typeof Building2
> = {
  building: IdCard,
  document: FileText,
  person: UserCheck,
};

export function CompanyVerificationOverview({
  record,
  isLoading = false,
  onStartVerification,
  onViewDetails,
  onResubmit,
  onLearnMore,
}: CompanyVerificationOverviewProps) {
  if (isLoading && record.status === "unverified") {
    return (
      <div className="max-w-lg mx-auto py-4 sm:py-8 space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <Skeleton className="size-14 rounded-full" />
          <Skeleton className="h-8 w-56 rounded-lg" />
          <Skeleton className="h-4 w-72 rounded-md" />
        </div>
        <Skeleton className="h-56 w-full rounded-2xl" />
      </div>
    );
  }

  if (record.status === "verified") {
    const companyName = record.companyName || "Rivera Creative Labs LLC";
    const documentsCount = record.documentsCount ?? 3;

    return (
      <div className="space-y-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Company Verification
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Manage and view the status of your personal and business credentials
            to unlock premium features and increase your trust score.
          </p>
        </div>

        <div className="rounded-2xl border border-border border-l-4 border-l-info bg-card p-5 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4 min-w-0">
            <div className="size-12 rounded-xl bg-info-bg text-info border border-info/25 flex items-center justify-center shrink-0">
              <Building2 className="size-5" />
            </div>

            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                  Business Entity Verification
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-info text-info-foreground text-[10px] font-bold uppercase tracking-wider shrink-0">
                  <span className="size-1.5 rounded-full bg-info-foreground" />
                  <span>Verified</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                &ldquo;{companyName}&rdquo; is a verified business entity. All
                registration documents and tax filings have been audited.
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs pt-0.5">
                <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                  <span className="size-1.5 rounded-full bg-info shrink-0" />
                  <span>
                    {record.incorporationStatus || "Active Incorporation"}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <FileText className="size-3.5 shrink-0" />
                  <span>
                    {documentsCount}{" "}
                    {documentsCount === 1
                      ? "Document Attached"
                      : "Documents Attached"}
                  </span>
                </span>
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

        <VerificationWhyCard onLearnMore={onLearnMore} />
      </div>
    );
  }

  if (record.status === "pending") {
    return (
      <div className="space-y-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Company Verification
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Verify your business entity to unlock corporate features and
            enterprise contract eligibility.
          </p>
        </div>

        <div className="rounded-2xl border border-info/35 bg-card p-5 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4 min-w-0">
            <div className="size-12 rounded-xl bg-info-bg text-info border border-info/25 flex items-center justify-center shrink-0">
              <Clock className="size-5" />
            </div>

            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                  Business Entity Verification
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-info-bg text-info border border-info/30 text-[10px] font-bold uppercase tracking-wider shrink-0">
                  Under Review
                </span>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                CAC documents for{" "}
                <strong className="font-semibold text-foreground">
                  {record.companyName || "your company"}
                </strong>{" "}
                are currently being audited by our compliance team.
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
                {record.submittedAt && (
                  <span>Submitted: {record.submittedAt}</span>
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
            View Status
          </Button>
        </div>

        <VerificationWhyCard onLearnMore={onLearnMore} />
      </div>
    );
  }

  if (record.status === "rejected") {
    return (
      <div className="space-y-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Company Verification
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Please review the feedback below and resubmit your company
            incorporation documents.
          </p>
        </div>

        <div className="rounded-2xl border border-error/40 bg-card p-5 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4 min-w-0">
            <div className="size-12 rounded-xl bg-error-bg text-error border border-error/25 flex items-center justify-center shrink-0">
              <AlertCircle className="size-5" />
            </div>

            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                  Business Entity Verification
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-error-bg text-error border border-error/30 text-[10px] font-bold uppercase tracking-wider shrink-0">
                  Action Required
                </span>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {record.rejectionReason ||
                  "We could not verify your submitted incorporation documents. Please submit clear, legible certified true copies."}
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
            Resubmit Documents
          </Button>
        </div>

        <VerificationWhyCard onLearnMore={onLearnMore} />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-4 sm:py-8 space-y-6">
      <div className="flex flex-col items-center text-center space-y-2.5">
        <div className="size-14 rounded-full bg-secondary border border-border/70 text-foreground flex items-center justify-center shadow-2xs">
          <Briefcase className="size-6" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pt-1">
          Company Verification
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
          Verify your business entity to unlock corporate features.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-2xs space-y-5">
        <h2 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
          Requirements
        </h2>

        <ul className="space-y-3.5">
          {COMPANY_VERIFICATION_REQUIREMENTS.map((item) => {
            const Icon = REQUIREMENT_ICONS[item.icon] ?? FileText;
            return (
              <li
                key={item.id}
                className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground"
              >
                <Icon className="size-4 text-foreground/80 shrink-0" />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onStartVerification}
          className="w-full h-11 rounded-lg text-sm font-semibold shadow-xs"
        >
          Start Company Verification
        </Button>
      </div>

      <VerificationTrustFooter />
    </div>
  );
}
