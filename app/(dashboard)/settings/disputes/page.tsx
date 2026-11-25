import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { DisputesSettingsView } from "@/features/settings/disputes-settings-view";
import { DisputesSettingsPageSkeleton } from "@/skeletons/(dashboard)/settings/disputes/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.settingsDisputes;

export default function SettingsDisputesPage() {
  return (
    <Suspense fallback={<DisputesSettingsPageSkeleton />}>
      <DisputesSettingsView />
    </Suspense>
  );
}
