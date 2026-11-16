import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { NotificationsView } from "@/features/notifications/notifications-view";
import { NotificationsPageSkeleton } from "@/skeletons/(internal-routes)/notifications/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.notifications;

export default function NotificationsPage() {
  return (
    <Suspense fallback={<NotificationsPageSkeleton />}>
      <NotificationsView />
    </Suspense>
  );
}

