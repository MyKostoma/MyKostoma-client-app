"use client";

import { WalletTransactionDetailCards } from "@/components/wallet/wallet-transaction-detail-cards";
import { WalletTopBar } from "@/components/layouts/top-bars/wallet/wallet-top-bar";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { useWalletTransactionDetailService } from "./services/walletApi";
import type { WalletTransactionDetailViewProps } from "./types";

export function WalletTransactionDetailView({
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
  } = useWalletTransactionDetailDetailOrFallback(transactionId);

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

function useWalletTransactionDetailDetailOrFallback(transactionId: string) {
  return useWalletTransactionDetailService(transactionId);
}

