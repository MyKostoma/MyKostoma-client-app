import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { WalletWithdrawView } from "@/features/wallet/wallet-withdraw-view";
import { WalletWithdrawPageSkeleton } from "@/skeletons/(dashboard)/wallet/withdraw/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.walletWithdraw;

export default function WalletWithdrawPage() {
  return (
    <Suspense fallback={<WalletWithdrawPageSkeleton />}>
      <WalletWithdrawView />
    </Suspense>
  );
}
