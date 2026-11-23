"use client";

import { WalletBalanceCards } from "@/components/wallet/wallet-balance-cards";
import { WalletTransactionsTable } from "@/components/wallet/wallet-transactions-table";
import { ProWalletBalanceSection } from "@/components/wallet/professional/pro-wallet-balance-section";
import { ProWalletRecentTransactions } from "@/components/wallet/professional/pro-wallet-recent-transactions";
import { WalletTopBar } from "@/components/layouts/top-bars/wallet/wallet-top-bar";
import { ProfessionalWalletTopBar } from "@/components/layouts/top-bars/wallet/professional-wallet-top-bar";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import {
  useProWalletOverviewService,
  useWalletOverviewService,
} from "./services/walletApi";
import type { WalletOverviewViewProps } from "./types";

function ConsumerWalletOverviewView({
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

export function ProfessionalWalletOverviewView() {
  const {
    summary,
    recentTransactions,
    primaryBankAccount,
    handlePayoutSettings,
    handleWithdrawFunds,
    handleViewAllTransactions,
    handleSelectTransaction,
    handleEditBankDetails,
    handleLearnMoreEscrow,
    handleHelpCenter,
  } = useProWalletOverviewService();

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalWalletTopBar
          title="Wallet"
          onHelpCenter={handleHelpCenter}
        />
      </DashboardTopBarSlot>

      <div className="space-y-5">
        <ProWalletBalanceSection
          summary={summary}
          onPayoutSettings={handlePayoutSettings}
          onWithdrawFunds={handleWithdrawFunds}
        />

        <ProWalletRecentTransactions
          transactions={recentTransactions}
          primaryBankAccount={primaryBankAccount}
          onViewAllTransactions={handleViewAllTransactions}
          onSelectTransaction={handleSelectTransaction}
          onEditBankDetails={handleEditBankDetails}
          onLearnMoreEscrow={handleLearnMoreEscrow}
        />
      </div>
    </>
  );
}

export function WalletOverviewView(props: WalletOverviewViewProps) {
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  if (effectiveRole === "professional") {
    return <ProfessionalWalletOverviewView />;
  }

  return <ConsumerWalletOverviewView {...props} />;
}

