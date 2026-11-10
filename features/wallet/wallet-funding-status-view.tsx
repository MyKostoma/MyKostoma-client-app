"use client";

import { useSearchParams } from "next/navigation";
import { WalletFundingStatusCard } from "@/components/wallet/wallet-funding-status-card";
import { WalletTopBar } from "@/components/layouts/top-bars/wallet/wallet-top-bar";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { useWalletFundingStatusService } from "./services/walletApi";
import type {
  WalletFundingStatusState,
  WalletFundingStatusViewProps,
} from "./types";

export function WalletFundingStatusView({
  initialStatus: propStatus,
  initialReference: propRef,
  initialAmount: propAmount,
}: WalletFundingStatusViewProps = {}) {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const refParam = searchParams.get("ref");
  const amountParam = searchParams.get("amount");

  const initialStatus: WalletFundingStatusState | undefined =
    propStatus ??
    (statusParam === "pending" ||
    statusParam === "success" ||
    statusParam === "failed"
      ? statusParam
      : undefined);
  const initialReference = propRef ?? (refParam || undefined);
  const initialAmount =
    propAmount ??
    (amountParam && Number.isFinite(Number(amountParam))
      ? Number(amountParam)
      : undefined);

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

