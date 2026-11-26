import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { WalletSettingsView } from "@/features/settings/wallet-settings-view";
import { WalletSettingsPageSkeleton } from "@/skeletons/(dashboard)/settings/wallet/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.settingsWallet;

export default function SettingsWalletPage() {
  return (
    <Suspense fallback={<WalletSettingsPageSkeleton />}>
      <WalletSettingsView />
    </Suspense>
  );
}
