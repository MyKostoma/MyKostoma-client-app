"use client";

import { useSearchParams } from "next/navigation";
import { ProWithdrawStatusCard } from "@/components/wallet/professional/pro-withdraw-status-card";
import { ProfessionalWalletTopBar } from "@/components/layouts/top-bars/wallet/professional-wallet-top-bar";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { useProWithdrawStatusService } from "./services/walletApi";
import type {
  ProWalletWithdrawStatusViewProps,
  ProWithdrawalStatusState,
} from "./types";

export function WalletWithdrawStatusView({
  initialStatus: propStatus,
}: ProWalletWithdrawStatusViewProps) {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");

  const resolvedInitialStatus: ProWithdrawalStatusState | undefined =
    propStatus ??
    (statusParam === "processing" ||
    statusParam === "success" ||
    statusParam === "failed"
      ? statusParam
      : undefined);

  const {
    session,
    processingStage,
    handleBackToWallet,
    handleViewTransactionDetails,
    handleDownloadReceipt,
    handleTryAgain,
    handleCheckPayoutSettings,
    handleContactSupport,
  } = useProWithdrawStatusService(resolvedInitialStatus);

  const breadcrumbs =
    session.status === "success"
      ? [
          { label: "Wallet", href: "/wallet" },
          { label: "Withdrawal Processing" },
          { label: "Success" },
        ]
      : session.status === "failed"
        ? [
            { label: "Wallet", href: "/wallet" },
            { label: "Withdrawal Processing" },
            { label: "Failure" },
          ]
        : [
            { label: "Wallet", href: "/wallet" },
            { label: "Withdrawal Processing" },
          ];

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalWalletTopBar breadcrumbs={breadcrumbs} />
      </DashboardTopBarSlot>

      <div className="py-2 sm:py-6">
        <ProWithdrawStatusCard
          session={session}
          processingStage={processingStage}
          onBackToWallet={handleBackToWallet}
          onViewTransactionDetails={handleViewTransactionDetails}
          onDownloadReceipt={handleDownloadReceipt}
          onTryAgain={handleTryAgain}
          onCheckPayoutSettings={handleCheckPayoutSettings}
          onContactSupport={handleContactSupport}
        />
      </div>
    </>
  );
}

export default WalletWithdrawStatusView;
