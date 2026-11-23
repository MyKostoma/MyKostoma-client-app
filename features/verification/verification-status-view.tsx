"use client";

import { useSearchParams } from "next/navigation";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { VerificationTopBar } from "@/components/layouts/top-bars/verification/verification-top-bar";
import { VerificationStatusResultCard } from "@/components/verification/verification-status-result-card";
import { useVerificationStatusService } from "./services/verificationApi";
import type { VerificationStatusViewProps } from "./types";

export function VerificationStatusView({
  initialStatus,
}: VerificationStatusViewProps) {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status") ?? initialStatus;

  const {
    record,
    handleViewProfile,
    handleGoToDashboard,
    handleBackToOverview,
    handleStartVerification,
  } = useVerificationStatusService(statusParam);

  return (
    <>
      <DashboardTopBarSlot>
        <VerificationTopBar
          breadcrumbs={[
            { label: "Verification", href: "/verification" },
            { label: "Status" },
          ]}
          highlightLastPrimary
        />
      </DashboardTopBarSlot>

      <VerificationStatusResultCard
        record={record}
        onViewProfile={handleViewProfile}
        onGoToDashboard={handleGoToDashboard}
        onBackToOverview={handleBackToOverview}
        onStartVerification={handleStartVerification}
      />
    </>
  );
}
