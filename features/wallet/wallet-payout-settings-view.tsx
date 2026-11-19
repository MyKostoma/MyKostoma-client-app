"use client";

import { ProPayoutSettingsSections } from "@/components/wallet/professional/pro-payout-settings-sections";
import { DeleteBankAccountModal } from "@/components/modals/delete-bank-account-modal";
import { ProfessionalWalletTopBar } from "@/components/layouts/top-bars/wallet/professional-wallet-top-bar";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { maskBankLast4 } from "./services/walletHelpers";
import { useProPayoutSettingsService } from "./services/walletApi";

export function WalletPayoutSettingsView() {
  const {
    settings,
    bankAccounts,
    deletingAccount,
    setDeletingAccount,
    handleSelectSchedule,
    handleTogglePayoutAlerts,
    handleToggleRequire2FA,
    handleAddBankAccount,
    handleEditBankAccount,
    handleConfirmDeleteBankAccount,
    handleSetPrimaryBankAccount,
    handleConfigure2FA,
    handleContactSupport,
  } = useProPayoutSettingsService();

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalWalletTopBar
          breadcrumbs={[
            { label: "Wallet", href: "/wallet" },
            { label: "Payout Settings" },
          ]}
        />
      </DashboardTopBarSlot>

      <ProPayoutSettingsSections
        settings={settings}
        bankAccounts={bankAccounts}
        onAddBankAccount={handleAddBankAccount}
        onSelectSchedule={handleSelectSchedule}
        onEditBankAccount={handleEditBankAccount}
        onRequestDeleteBankAccount={setDeletingAccount}
        onSetPrimaryBankAccount={handleSetPrimaryBankAccount}
        onTogglePayoutAlerts={handleTogglePayoutAlerts}
        onToggleRequire2FA={handleToggleRequire2FA}
        onConfigure2FA={handleConfigure2FA}
        onContactSupport={handleContactSupport}
      />

      <DeleteBankAccountModal
        isOpen={Boolean(deletingAccount)}
        bankName={deletingAccount?.bankName || ""}
        maskedAccountNumber={
          deletingAccount ? maskBankLast4(deletingAccount.last4) : ""
        }
        onClose={() => setDeletingAccount(null)}
        onConfirmDelete={handleConfirmDeleteBankAccount}
      />
    </>
  );
}

export default WalletPayoutSettingsView;
