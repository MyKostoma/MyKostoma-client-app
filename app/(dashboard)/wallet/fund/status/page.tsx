import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { WalletFundingStatusView } from "@/features/wallet/wallet-funding-status-view";
import type { WalletFundingStatusState } from "@/features/wallet/types";
import { WalletFundingStatusPageSkeleton } from "@/skeletons/(dashboard)/wallet/fund/status/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.walletFundingStatus;

export default function WalletFundingStatusPage() {
  return (
    <Suspense fallback={<WalletFundingStatusPageSkeleton />}>
      <WalletFundingStatusView />
    </Suspense>
  );
}

