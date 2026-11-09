"use client";

import { WalletFundAmountForm } from "@/components/wallet/wallet-fund-amount-form";
import { WalletBankTransferCard } from "@/components/wallet/wallet-bank-transfer-card";
import { WalletTopBar } from "@/components/layouts/top-bars/wallet/wallet-top-bar";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { useWalletFundService } from "./services/walletApi";
import type { WalletFundViewProps } from "./types";

export function WalletFundView({
  initialStep = "amount-method",
  initialAmount,
}: WalletFundViewProps) {
  const {
    step,
    amountInput,
    parsedAmount,
    quickAmounts,
    selectedMethod,
    setSelectedMethod,
    canContinue,
    isConfirming,
    bankDetails,
    copiedField,
    handleAmountInputChange,
    handleSelectQuickAmount,
    handleContinue,
    handleCopyField,
    handleConfirmTransfer,
    handleCancelTransfer,
    handleTopBarBack,
  } = useWalletFundService(initialStep, initialAmount);

  const topBarSubtitle =
    step === "amount-method"
      ? "Step 1: Choose amount and method"
      : "Step 2: Complete the bank transfer";

  return (
    <>
      <DashboardTopBarSlot>
        <WalletTopBar
          title="Fund Your Wallet"
          subtitle={topBarSubtitle}
          onBack={handleTopBarBack}
        />
      </DashboardTopBarSlot>

      <div className="space-y-8 py-2 sm:py-4">
        {step === "amount-method" ? (
          <WalletFundAmountForm
            amountInput={amountInput}
            quickAmounts={quickAmounts}
            selectedMethod={selectedMethod}
            canContinue={canContinue}
            onAmountInputChange={handleAmountInputChange}
            onSelectQuickAmount={handleSelectQuickAmount}
            onSelectMethod={setSelectedMethod}
            onContinue={handleContinue}
          />
        ) : (
          <WalletBankTransferCard
            amount={parsedAmount}
            bankDetails={bankDetails}
            copiedField={copiedField}
            isConfirming={isConfirming}
            onCopyField={handleCopyField}
            onConfirmTransfer={handleConfirmTransfer}
            onCancel={handleCancelTransfer}
          />
        )}
      </div>
    </>
  );
}

