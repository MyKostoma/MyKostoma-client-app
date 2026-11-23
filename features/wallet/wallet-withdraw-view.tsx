"use client";

import { ProWithdrawFormCard } from "@/components/wallet/professional/pro-withdraw-form-card";
import { ProWithdrawConfirmCard } from "@/components/wallet/professional/pro-withdraw-confirm-card";
import { ProfessionalWalletTopBar } from "@/components/layouts/top-bars/wallet/professional-wallet-top-bar";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { useProWithdrawFlowService } from "./services/walletApi";
import type { ProWalletWithdrawViewProps } from "./types";

export function WalletWithdrawView({
  initialStep = "form",
}: ProWalletWithdrawViewProps) {
  const {
    step,
    availableBalance,
    amountInput,
    parsedAmount,
    fee,
    netAmount,
    activePercent,
    bankAccounts,
    selectedBankId,
    selectedBank,
    validationError,
    isSubmitting,
    handleAmountChange,
    handleSelectPercent,
    handleSelectBank,
    handleAddNewBank,
    handleCancel,
    handleReviewWithdrawal,
    handleBackToEdit,
    handleConfirmWithdraw,
  } = useProWithdrawFlowService(initialStep);

  return (
    <>
      <DashboardTopBarSlot>
        {step === "confirm" ? (
          <ProfessionalWalletTopBar
            breadcrumbs={[
              { label: "Wallet", href: "/wallet" },
              { label: "Withdraw Funds", href: "/wallet/withdraw" },
              { label: "Confirm" },
            ]}
            highlightLastPrimary
          />
        ) : (
          <ProfessionalWalletTopBar
            breadcrumbs={[
              { label: "Wallet", href: "/wallet" },
              { label: "Withdraw Funds" },
            ]}
            highlightLastPrimary
          />
        )}
      </DashboardTopBarSlot>

      <div className="py-2 sm:py-6">
        {step === "confirm" && selectedBank ? (
          <ProWithdrawConfirmCard
            amount={parsedAmount}
            fee={fee}
            netAmount={netAmount}
            bankAccount={selectedBank}
            isSubmitting={isSubmitting}
            onConfirmWithdraw={handleConfirmWithdraw}
            onBackToEdit={handleBackToEdit}
          />
        ) : (
          <ProWithdrawFormCard
            availableBalance={availableBalance}
            amountInput={amountInput}
            activePercent={activePercent}
            selectedBankId={selectedBankId}
            bankAccounts={bankAccounts}
            fee={fee}
            validationError={validationError}
            onAmountChange={handleAmountChange}
            onSelectPercent={handleSelectPercent}
            onSelectBank={handleSelectBank}
            onAddNewBank={handleAddNewBank}
            onReviewWithdrawal={handleReviewWithdrawal}
            onCancel={handleCancel}
          />
        )}
      </div>
    </>
  );
}

export default WalletWithdrawView;
