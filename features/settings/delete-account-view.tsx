"use client";

import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { SettingsTopBar } from "@/components/layouts/top-bars/settings/settings-top-bar";
import { ConfirmAccountDeletionModal } from "@/components/modals/settings-modals";
import { DeleteAccountPanel } from "@/components/settings/delete-account-panel";
import { SettingsShell } from "@/components/settings/settings-shell";
import { ACCOUNT_DELETION_REASONS } from "@/features/settings/data";
import { useDeleteAccountService } from "@/features/settings/services/settingsApi";

export function DeleteAccountView() {
  const {
    isProfessional,
    walletBalanceFormatted,
    reason,
    setReason,
    details,
    setDetails,
    acknowledged,
    setAcknowledged,
    confirmModalOpen,
    setConfirmModalOpen,
    isDeleting,
    handleKeepAccount,
    handleContactSupport,
    handleConfirmDeleteAccount,
  } = useDeleteAccountService();

  return (
    <>
      <DashboardTopBarSlot>
        <SettingsTopBar title="Delete Account" />
      </DashboardTopBarSlot>

      <SettingsShell
        activeSection="delete-account"
        isProfessional={isProfessional}
      >
        <DeleteAccountPanel
          isProfessional={isProfessional}
          walletBalanceFormatted={walletBalanceFormatted}
          reason={reason}
          details={details}
          acknowledged={acknowledged}
          reasonOptions={ACCOUNT_DELETION_REASONS}
          onReasonChange={setReason}
          onDetailsChange={setDetails}
          onAcknowledgedChange={setAcknowledged}
          onKeepAccount={handleKeepAccount}
          onOpenConfirmModal={() => setConfirmModalOpen(true)}
          onContactSupport={handleContactSupport}
        />
      </SettingsShell>

      <ConfirmAccountDeletionModal
        isOpen={confirmModalOpen}
        isDeleting={isDeleting}
        onClose={() => setConfirmModalOpen(false)}
        onConfirmDelete={handleConfirmDeleteAccount}
        onContactSupport={handleContactSupport}
      />
    </>
  );
}
