"use client";

import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { SettingsTopBar } from "@/components/layouts/top-bars/settings/settings-top-bar";
import { SettingsOverviewGrid } from "@/components/settings/settings-overview-grid";
import { SettingsShell } from "@/components/settings/settings-shell";
import { useSettingsOverviewService } from "@/features/settings/services/settingsApi";

export function SettingsOverviewView() {
  const {
    isProfessional,
    verificationPercent,
    isVerified,
    walletBalanceFormatted,
    openDisputesCount,
    handleNavigate,
  } = useSettingsOverviewService();

  return (
    <>
      <DashboardTopBarSlot>
        <SettingsTopBar title="Settings" />
      </DashboardTopBarSlot>

      <SettingsShell activeSection="overview" isProfessional={isProfessional}>
        <SettingsOverviewGrid
          isProfessional={isProfessional}
          verificationPercent={verificationPercent}
          isVerified={isVerified}
          walletBalanceFormatted={walletBalanceFormatted}
          openDisputesCount={openDisputesCount}
          onNavigate={handleNavigate}
        />
      </SettingsShell>
    </>
  );
}
