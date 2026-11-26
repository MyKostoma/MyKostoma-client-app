import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { PasswordSettingsView } from "@/features/settings/password-settings-view";
import { PasswordSettingsPageSkeleton } from "@/skeletons/(dashboard)/settings/password/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.settingsPassword;

export default function SettingsPasswordPage() {
  return (
    <Suspense fallback={<PasswordSettingsPageSkeleton />}>
      <PasswordSettingsView />
    </Suspense>
  );
}
