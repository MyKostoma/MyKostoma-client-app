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
    <div className="space-y-6 sm:space-y-8 pb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6">
          <ActiveRequestsCard requests={data.activeRequests} />
        </div>

        <div className="lg:col-span-6">
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
