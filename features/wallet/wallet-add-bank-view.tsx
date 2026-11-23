"use client";

import { useSearchParams } from "next/navigation";
import { ProAddBankForm } from "@/components/wallet/professional/pro-add-bank-form";
import { ProfessionalWalletTopBar } from "@/components/layouts/top-bars/wallet/professional-wallet-top-bar";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { useProBankAccountFormService } from "./services/walletApi";
import type { ProWalletAddBankViewProps } from "./types";

export function WalletAddBankView({ editBankId: propEditId }: ProWalletAddBankViewProps) {
  const searchParams = useSearchParams();
  const editBankId = propEditId ?? (searchParams.get("edit") || undefined);

  const {
    isEditing,
    profileName,
    bankOptions,
    values,
    isVerifying,
    verificationError,
    handleBankChange,
    handleAccountNumberChange,
    handleVerifyAccount,
    handleAccountTypeChange,
    handleCancel,
    handleSave,
  } = useProBankAccountFormService(editBankId);

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalWalletTopBar
          breadcrumbs={[
            { label: "Wallet", href: "/wallet" },
            { label: "Payout Settings", href: "/wallet/payout-settings" },
            { label: isEditing ? "Edit Bank Account" : "Add Bank Account" },
          ]}
        />
      </DashboardTopBarSlot>

      <ProAddBankForm
        isEditing={isEditing}
        profileName={profileName}
        bankOptions={bankOptions}
        values={values}
        isVerifying={isVerifying}
        verificationError={verificationError}
        onBankChange={handleBankChange}
        onAccountNumberChange={handleAccountNumberChange}
        onVerifyAccount={handleVerifyAccount}
        onAccountTypeChange={handleAccountTypeChange}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </>
  );
}

export default WalletAddBankView;
