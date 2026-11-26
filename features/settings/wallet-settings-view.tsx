"use client";

import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { SettingsTopBar } from "@/components/layouts/top-bars/settings/settings-top-bar";
import { EditPayoutScheduleModal } from "@/components/modals/settings-modals";
import { SettingsProOnlyGate } from "@/components/settings/settings-pro-only-gate";
import { SettingsShell } from "@/components/settings/settings-shell";
import { WalletPayoutSettingsPanel } from "@/components/settings/wallet-payout-settings-panel";
import { useWalletSettingsService } from "@/features/settings/services/settingsApi";

export function WalletSettingsView() {
  const {
    isProfessional,
    availableBalanceFormatted,
    pendingBalanceFormatted,
    bankAccounts,
    schedule,
    nextPayoutDateLabel,
    minTransferFormatted,
    processingTimeLabel,
    recentTransactions,
    scheduleModalOpen,
    setScheduleModalOpen,
    handleBackToSettings,
    handleOpenConsumerWallet,
    handleWithdrawFunds,
    handleAddMethod,
    handleSetPrimaryMethod,
    handleDeleteMethod,
    handleSaveSchedule,
    handleViewAllTransactions,
    handleLearnSecurity,
    handleOpenSupportResource,
    handleExportCsv,
  } = useWalletSettingsService();

  return (
    <>
      <DashboardTopBarSlot>
        <SettingsTopBar title="Wallet & Payouts" />
      </DashboardTopBarSlot>

      <SettingsShell activeSection="wallet" isProfessional={isProfessional}>
        {!isProfessional ? (
          <SettingsProOnlyGate
            featureTitle="Payout Settings for Professionals"
            description="Payout schedules and bank withdrawal methods belong to Professional accounts. Customers can fund and manage escrow payments in My Wallet."
            secondaryLabel="Open My Wallet"
            onBackToSettings={handleBackToSettings}
            onSecondaryAction={handleOpenConsumerWallet}
          />
        ) : (
          <WalletPayoutSettingsPanel
            availableBalanceFormatted={availableBalanceFormatted}
            pendingBalanceFormatted={pendingBalanceFormatted}
            bankAccounts={bankAccounts}
            schedule={schedule}
            nextPayoutDateLabel={nextPayoutDateLabel}
            minTransferFormatted={minTransferFormatted}
            processingTimeLabel={processingTimeLabel}
            recentTransactions={recentTransactions}
            onWithdrawFunds={handleWithdrawFunds}
            onAddMethod={handleAddMethod}
            onSetPrimaryMethod={handleSetPrimaryMethod}
            onDeleteMethod={handleDeleteMethod}
            onViewAllTransactions={handleViewAllTransactions}
            onEditSchedule={() => setScheduleModalOpen(true)}
            onLearnSecurity={handleLearnSecurity}
            onOpenSupportResource={handleOpenSupportResource}
            onExportCsv={handleExportCsv}
          />
        )}
      </SettingsShell>

      {isProfessional && (
        <EditPayoutScheduleModal
          isOpen={scheduleModalOpen}
          currentSchedule={schedule}
          onClose={() => setScheduleModalOpen(false)}
          onSaveSchedule={handleSaveSchedule}
        />
      )}
    </>
  );
}
