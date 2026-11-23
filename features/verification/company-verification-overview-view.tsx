"use client";

import { useSearchParams } from "next/navigation";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { VerificationTopBar } from "@/components/layouts/top-bars/verification/verification-top-bar";
import { VerificationModeTabs } from "@/components/verification/verification-mode-tabs";
import { CompanyVerificationOverview } from "@/components/verification/company-verification-overview";
import { VerificationBenefitsModal } from "@/components/modals/verification-benefits-modal";
import { useCompanyVerificationOverviewService } from "./services/verificationApi";
import type { CompanyVerificationOverviewViewProps } from "./types";

export function CompanyVerificationOverviewView({
  initialStatus,
}: CompanyVerificationOverviewViewProps) {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status") ?? initialStatus;

  const {
    record,
    individualStatus,
    isLoading,
    benefitsModalOpen,
    handleStartVerification,
    handleViewDetails,
    handleResubmit,
    handleOpenBenefits,
    handleCloseBenefits,
  } = useCompanyVerificationOverviewService(statusParam);

  return (
    <>
      <DashboardTopBarSlot>
        <VerificationTopBar
          breadcrumbs={[
            { label: "Verification", href: "/verification" },
            { label: "Company Verification" },
          ]}
          highlightLastPrimary
        />
      </DashboardTopBarSlot>

      <div className="space-y-6 pb-8">
        <VerificationModeTabs
          activeTab="company"
          individualStatus={individualStatus}
          companyStatus={record.status}
        />

        <CompanyVerificationOverview
          record={record}
          isLoading={isLoading}
          onStartVerification={handleStartVerification}
          onViewDetails={handleViewDetails}
          onResubmit={handleResubmit}
          onLearnMore={handleOpenBenefits}
        />

        <VerificationBenefitsModal
          isOpen={benefitsModalOpen}
          isVerified={record.status === "verified"}
          ctaLabel="Start Company Verification"
          onClose={handleCloseBenefits}
          onStartVerification={handleStartVerification}
        />
      </div>
    </>
  );
}
