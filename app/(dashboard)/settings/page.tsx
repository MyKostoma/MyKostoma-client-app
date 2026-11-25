import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { SettingsOverviewView } from "@/features/settings/settings-overview-view";
import { SettingsOverviewPageSkeleton } from "@/skeletons/(dashboard)/settings/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.settingsOverview;

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsOverviewPageSkeleton />}>
      <SettingsOverviewView />
    </Suspense>
  );
}
