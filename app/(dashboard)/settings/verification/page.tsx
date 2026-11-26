import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { VerificationSettingsView } from "@/features/settings/verification-settings-view";
import { VerificationSettingsPageSkeleton } from "@/skeletons/(dashboard)/settings/verification/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.settingsVerification;

export default function SettingsVerificationPage() {
  return (
    <Suspense fallback={<VerificationSettingsPageSkeleton />}>
      <VerificationSettingsView />
    </Suspense>
  );
}
