import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { DisputesView } from "@/features/disputes/disputes-view";
import { DisputesPageSkeleton } from "@/skeletons/(dashboard)/disputes/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.disputesDashboard;

export default function DisputesPage() {
  return (
    <Suspense fallback={<DisputesPageSkeleton />}>
      <DisputesView />
    </Suspense>
  );
}
