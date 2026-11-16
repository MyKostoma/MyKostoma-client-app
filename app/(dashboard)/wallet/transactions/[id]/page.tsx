import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { DEFAULT_WALLET_TRANSACTIONS } from "@/features/wallet/data";
import { findWalletTransactionById } from "@/features/wallet/services/walletHelpers";
import { WalletTransactionDetailView } from "@/features/wallet/wallet-transaction-detail-view";
import { WalletTransactionDetailPageSkeleton } from "@/skeletons/(dashboard)/wallet/transactions/[id]/page-skeleton";

interface WalletTransactionDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return DEFAULT_WALLET_TRANSACTIONS.map((tx) => ({
    id: tx.id,
  }));
}

export const metadata: Metadata = {
  title: "Transaction Details",
  description:
    "Review complete payment audit details, escrow references, and transaction receipts on MyKostoma.",
};

export default async function WalletTransactionDetailPage({
  params,
}: WalletTransactionDetailPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<WalletTransactionDetailPageSkeleton />}>
      <WalletTransactionDetailView transactionId={decodeURIComponent(id)} />
    </Suspense>
  );
}

