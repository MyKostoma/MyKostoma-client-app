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

export async function generateMetadata({
  params,
}: WalletTransactionDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const matched = findWalletTransactionById(DEFAULT_WALLET_TRANSACTIONS, id);
  return PAGE_METADATA_GENERATORS.walletTransactionDetail(
    matched?.reference ?? decodeURIComponent(id),
    matched?.note
  );
}

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

