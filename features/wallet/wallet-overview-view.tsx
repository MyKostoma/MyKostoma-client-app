"use client";

import { WalletBalanceCards } from "@/components/wallet/wallet-balance-cards";
import { WalletTransactionsTable } from "@/components/wallet/wallet-transactions-table";
import { WalletTopBar } from "@/components/layouts/top-bars/wallet/wallet-top-bar";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { useWalletOverviewService } from "./services/walletApi";
import type { WalletOverviewViewProps } from "./types";

export function WalletOverviewView({
  initialTransactions,
}: WalletOverviewViewProps) {
  const {
    summary,
    recentTransactions,
    handleFundWallet,
    handleViewAllTransactions,
    handleSelectTransaction,
  } = useWalletOverviewService(initialTransactions);

  return (
    <>
      <DashboardTopBarSlot>
        <WalletTopBar
          title="Wallet"
          subtitle="Manage your funds and transaction history"
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <WalletBalanceCards
          summary={summary}
          onFundWallet={handleFundWallet}
        />

        <WalletTransactionsTable
          transactions={recentTransactions}
          variant="recent"
          onViewAll={handleViewAllTransactions}
          onSelectTransaction={handleSelectTransaction}
        />
      </div>
    </>
  );
}

