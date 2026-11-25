import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { NotificationSettingsView } from "@/features/settings/notification-settings-view";
import { NotificationSettingsPageSkeleton } from "@/skeletons/(dashboard)/settings/notifications/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.settingsNotifications;

export default function SettingsNotificationsPage() {
  return (
    <Suspense fallback={<NotificationSettingsPageSkeleton />}>
      <NotificationSettingsView />
    </Suspense>
  );
}
