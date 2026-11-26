import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { ProfileSettingsView } from "@/features/settings/profile-settings-view";
import { ProfileSettingsPageSkeleton } from "@/skeletons/(dashboard)/settings/profile/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.settingsProfile;

export default function SettingsProfilePage() {
  return (
    <Suspense fallback={<ProfileSettingsPageSkeleton />}>
      <ProfileSettingsView />
    </Suspense>
  );
}
