"use client";

import { WalletTransactionDetailCards } from "@/components/wallet/wallet-transaction-detail-cards";
import { ProWalletTransactionDetail } from "@/components/wallet/professional/pro-wallet-transaction-detail";
import { WalletTopBar } from "@/components/layouts/top-bars/wallet/wallet-top-bar";
import { ProfessionalWalletTopBar } from "@/components/layouts/top-bars/wallet/professional-wallet-top-bar";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import { DEFAULT_PRO_WALLET_TRANSACTIONS } from "./data";
import {
  useProWalletTransactionDetailService,
  useWalletTransactionDetailService,
} from "./services/walletApi";
import type { WalletTransactionDetailViewProps } from "./types";

function ConsumerWalletTransactionDetailView({
  transactionId,
}: WalletTransactionDetailViewProps) {
  const {
    transaction,
    copiedReference,
    handleCopyReference,
    handleDownloadReceipt,
    handleShareDetails,
    handleContactSupport,
    handleBackToTransactions,
  } = useWalletTransactionDetailService(transactionId);

  return (
    <>
      <DashboardTopBarSlot>
        <WalletTopBar
          title="Transaction Detail"
          breadcrumbParentLabel="Transactions"
          breadcrumbCurrentLabel="Details"
          onBreadcrumbParentClick={handleBackToTransactions}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <WalletTransactionDetailCards
          transaction={transaction}
          copiedReference={copiedReference}
          onCopyReference={handleCopyReference}
          onDownloadReceipt={handleDownloadReceipt}
          onShareDetails={handleShareDetails}
          onContactSupport={handleContactSupport}
        />
      </div>
    </>
  );
}

export function ProfessionalWalletTransactionDetailView({
  transactionId,
}: WalletTransactionDetailViewProps) {
  const {
    transaction,
    copiedReference,
    handleCopyReference,
    handleBackToHistory,
    handleDownloadReceipt,
    handleOpenRelatedProject,
    handleMessageClient,
    handleContactSupport,
    handleReportIssue,
  } = useProWalletTransactionDetailService(transactionId);

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalWalletTopBar
          breadcrumbs={[
            { label: "Wallet", href: "/wallet" },
            { label: "Transaction History", href: "/wallet/transactions" },
            { label: "Detail" },
          ]}
        />
      </DashboardTopBarSlot>

      <ProWalletTransactionDetail
        transaction={transaction}
        copiedReference={copiedReference}
        onBackToHistory={handleBackToHistory}
        onCopyReference={handleCopyReference}
        onOpenRelatedProject={handleOpenRelatedProject}
        onMessageClient={handleMessageClient}
        onDownloadReceipt={handleDownloadReceipt}
        onContactSupport={handleContactSupport}
        onReportIssue={handleReportIssue}
      />
    </>
  );
}

export function WalletTransactionDetailView({
  transactionId,
}: WalletTransactionDetailViewProps) {
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  const isProTxId =
    DEFAULT_PRO_WALLET_TRANSACTIONS.some(
      (tx) => tx.id.toLowerCase() === transactionId.toLowerCase()
    ) || transactionId.toUpperCase().startsWith("TXN-");

  if (effectiveRole === "professional" || isProTxId) {
    return (
      <ProfessionalWalletTransactionDetailView transactionId={transactionId} />
    );
  }

  return <ConsumerWalletTransactionDetailView transactionId={transactionId} />;
}

