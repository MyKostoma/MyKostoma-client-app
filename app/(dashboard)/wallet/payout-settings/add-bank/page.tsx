import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { WalletAddBankView } from "@/features/wallet/wallet-add-bank-view";
import { WalletAddBankPageSkeleton } from "@/skeletons/(dashboard)/wallet/payout-settings/add-bank/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.walletAddBank;

export default function WalletAddBankPage() {
  return (
    <Suspense fallback={<WalletAddBankPageSkeleton />}>
      <WalletAddBankView />
    </Suspense>
  );
}
