import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { WalletOverviewView } from "@/features/wallet/wallet-overview-view";
import { WalletOverviewPageSkeleton } from "@/skeletons/(dashboard)/wallet/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.walletOverview;

export default function WalletOverviewPage() {
  return (
    <Suspense fallback={<WalletOverviewPageSkeleton />}>
      <WalletOverviewView />
    </Suspense>
  );
}

