import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { RequestsListView } from "@/features/requests/requests-list-view";
import { RequestsPageSkeleton } from "@/skeletons/(dashboard)/requests/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.requestsList;

export default function RequestsPage() {
  return (
    <Suspense fallback={<RequestsPageSkeleton />}>
      <RequestsListView />
    </Suspense>
  );
}
