import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { WalletTransactionsView } from "@/features/wallet/wallet-transactions-view";
import { WalletTransactionsPageSkeleton } from "@/skeletons/(dashboard)/wallet/transactions/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.walletTransactions;

export default function WalletTransactionsPage() {
  return (
    <Suspense fallback={<WalletTransactionsPageSkeleton />}>
      <WalletTransactionsView />
    </Suspense>
  );
}

