import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { DeleteAccountView } from "@/features/settings/delete-account-view";
import { DeleteAccountPageSkeleton } from "@/skeletons/(dashboard)/settings/delete-account/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.settingsDeleteAccount;

export default function SettingsDeleteAccountPage() {
  return (
    <Suspense fallback={<DeleteAccountPageSkeleton />}>
      <DeleteAccountView />
    </Suspense>
  );
}
