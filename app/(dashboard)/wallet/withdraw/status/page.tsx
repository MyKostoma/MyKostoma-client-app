import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { WalletWithdrawStatusView } from "@/features/wallet/wallet-withdraw-status-view";
import { WalletWithdrawStatusPageSkeleton } from "@/skeletons/(dashboard)/wallet/withdraw/status/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.walletWithdrawStatus;

export default function WalletWithdrawStatusPage() {
  return (
    <Suspense fallback={<WalletWithdrawStatusPageSkeleton />}>
      <WalletWithdrawStatusView />
    </Suspense>
  );
}
