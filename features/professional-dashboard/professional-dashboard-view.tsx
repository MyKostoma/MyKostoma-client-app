"use client";

import { useProfessionalDashboardService } from "./services/professionalDashboardApi";
import { ProfessionalWelcomeBanner } from "@/components/dashboard/professional/professional-welcome-banner";
import { ProfessionalQuickStats } from "@/components/dashboard/professional/professional-quick-stats";
import { ActiveRequestsCard } from "@/components/dashboard/professional/active-requests-card";
import { EarningsSummaryCard } from "@/components/dashboard/professional/earnings-summary-card";
import { PendingQuotationsTable } from "@/components/dashboard/professional/pending-quotations-table";
import type { ProfessionalDashboardData } from "./types";

export interface ProfessionalDashboardViewProps {
  initialData?: ProfessionalDashboardData;
}

export function ProfessionalDashboardView({
  initialData,
}: ProfessionalDashboardViewProps) {
  const {
    data,
    handleNewProduct,
    handleCreateQuote,
    handleWithdrawFunds,
  } = useProfessionalDashboardService(initialData);

  return (
    <div className="space-y-6 sm:space-y-8 pb-8 max-w-[1200px] mx-auto">
      <ProfessionalWelcomeBanner
        firstName={data.firstName}
        fullName={data.fullName}
        avatarUrl={data.avatarUrl}
        isVerified={data.isVerified}
        verificationLabel={data.verificationLabel}
        newRequestsCount={data.newRequestsCount}
        pendingQuotationsCount={data.pendingQuotationsCount}
        onNewProduct={handleNewProduct}
        onCreateQuote={handleCreateQuote}
      />

      <ProfessionalQuickStats stats={data.quickStats} />

      <div className="grid lg:flex grid-cols-1 lg: gap-6 xl:gap-12 items-start justify-between">
        <div className="lg:col-span-6 flex-10">
          <ActiveRequestsCard requests={data.activeRequests} />
        </div>

        <div className="lg:col-span-6 flex-15">
          <EarningsSummaryCard
            currentBalance={data.currentBalance}
            weeklyEarnings={data.weeklyEarnings}
            transactions={data.recentTransactions}
            onWithdrawFunds={handleWithdrawFunds}
          />
        </div>
      </div>

      <PendingQuotationsTable quotations={data.pendingQuotations} />
    </div>
  );
}

export default ProfessionalDashboardView;
