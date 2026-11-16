import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { WalletFundView } from "@/features/wallet/wallet-fund-view";
import type { WalletFundingStep } from "@/features/wallet/types";
import { WalletFundPageSkeleton } from "@/skeletons/(dashboard)/wallet/fund/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.walletFund;

export default function WalletFundPage() {
  return (
    <Suspense fallback={<WalletFundPageSkeleton />}>
      <WalletFundView />
    </Suspense>
  );
}

