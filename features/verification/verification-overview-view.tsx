"use client";

import { useSearchParams } from "next/navigation";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { VerificationTopBar } from "@/components/layouts/top-bars/verification/verification-top-bar";
import { VerificationStatusOverviewCard } from "@/components/verification/verification-status-overview-card";
import { VerificationWhyCard } from "@/components/verification/verification-why-card";
import { VerificationBenefitsModal } from "@/components/modals/verification-benefits-modal";
import { useVerificationOverviewService } from "./services/verificationApi";
import type { VerificationOverviewViewProps } from "./types";

export function VerificationOverviewView({
  initialStatus,
}: VerificationOverviewViewProps) {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status") ?? initialStatus;

  const {
    record,
    isLoading,
    benefitsModalOpen,
    handleGetVerified,
    handleViewDetails,
    handleResubmit,
    handleOpenBenefits,
    handleCloseBenefits,
  } = useVerificationOverviewService(statusParam);

  return (
    <>
      <DashboardTopBarSlot>
        <VerificationTopBar title="Verification" />
      </DashboardTopBarSlot>

      <div className="space-y-6 pb-8">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Professional Verification
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Manage and view the status of your personal and business credentials
            to unlock premium features and increase your trust score.
          </p>
        </div>

        <VerificationStatusOverviewCard
          record={record}
          isLoading={isLoading}
          onGetVerified={handleGetVerified}
          onViewDetails={handleViewDetails}
          onResubmit={handleResubmit}
        />

        <VerificationWhyCard onLearnMore={handleOpenBenefits} />

        <VerificationBenefitsModal
          isOpen={benefitsModalOpen}
          isVerified={record.status === "verified"}
          onClose={handleCloseBenefits}
          onStartVerification={handleGetVerified}
        />
      </div>
    </>
  );
}
