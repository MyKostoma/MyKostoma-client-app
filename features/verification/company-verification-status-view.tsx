"use client";

import { useSearchParams } from "next/navigation";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { VerificationTopBar } from "@/components/layouts/top-bars/verification/verification-top-bar";
import { CompanyVerificationStatusCard } from "@/components/verification/company-verification-status-card";
import { useCompanyVerificationStatusService } from "./services/verificationApi";
import type { CompanyVerificationStatusViewProps } from "./types";

export function CompanyVerificationStatusView({
  initialStatus,
}: CompanyVerificationStatusViewProps) {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status") ?? initialStatus;

  const {
    record,
    hasCopiedShareLink,
    handleViewCompanyProfile,
    handleGoToDashboard,
    handleShareVerifiedStatus,
    handleBackToOverview,
    handleStartVerification,
  } = useCompanyVerificationStatusService(statusParam);

  return (
    <>
      <DashboardTopBarSlot>
        <VerificationTopBar
          breadcrumbs={[
            { label: "Verification", href: "/verification" },
            { label: "Company", href: "/verification/company" },
            { label: "Status" },
          ]}
          highlightLastPrimary
        />
      </DashboardTopBarSlot>

      <CompanyVerificationStatusCard
        record={record}
        hasCopiedShareLink={hasCopiedShareLink}
        onViewCompanyProfile={handleViewCompanyProfile}
        onGoToDashboard={handleGoToDashboard}
        onShareVerifiedStatus={handleShareVerifiedStatus}
        onBackToOverview={handleBackToOverview}
        onStartVerification={handleStartVerification}
      />
    </>
  );
}
