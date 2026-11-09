"use client";

import { WalletFundingStatusCard } from "@/components/wallet/wallet-funding-status-card";
import { WalletTopBar } from "@/components/layouts/top-bars/wallet/wallet-top-bar";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { useWalletFundingStatusService } from "./services/walletApi";
import type { WalletFundingStatusViewProps } from "./types";

export function WalletFundingStatusView({
  initialStatus,
  initialReference,
  initialAmount,
}: WalletFundingStatusViewProps) {
  const {
    status,
    amount,
    reference,
    availableBalance,
    failureTitle,
    failureMessage,
    failureReason,
    handleStatusSwitch,
    handleBackToWallet,
    handleViewTransactions,
    handleRetryFunding,
    handleContactSupport,
  } = useWalletFundingStatusService(
    initialStatus,
    initialReference,
    initialAmount
  );

  return (
    <>
      <DashboardTopBarSlot>
        <WalletTopBar
          title="Funding Status"
          subtitle={`Transaction ID: ${reference}`}
          onBack={handleBackToWallet}
        />
      </DashboardTopBarSlot>

      <div className="space-y-8 py-2 sm:py-4">
        <WalletFundingStatusCard
          status={status}
          amount={amount}
          reference={reference}
          availableBalance={availableBalance}
          failureTitle={failureTitle}
          failureMessage={failureMessage}
          failureReason={failureReason}
          onBackToWallet={handleBackToWallet}
          onViewTransactions={handleViewTransactions}
          onRetryFunding={handleRetryFunding}
          onContactSupport={handleContactSupport}
          onStatusSwitch={handleStatusSwitch}
        />
      </div>
    </>
  );
}

