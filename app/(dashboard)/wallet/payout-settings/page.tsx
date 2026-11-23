import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { WalletPayoutSettingsView } from "@/features/wallet/wallet-payout-settings-view";
import { WalletPayoutSettingsPageSkeleton } from "@/skeletons/(dashboard)/wallet/payout-settings/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.walletPayoutSettings;

export default function WalletPayoutSettingsPage() {
  return (
    <Suspense fallback={<WalletPayoutSettingsPageSkeleton />}>
      <WalletPayoutSettingsView />
    </Suspense>
  );
}
