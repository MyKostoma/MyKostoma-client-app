import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { QuotationsListView } from "@/features/quotations/quotations-list-view";
import { QuotationsPageSkeleton } from "@/skeletons/(dashboard)/quotations/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.quotationsList;

export default function QuotationsPage() {
  return (
    <Suspense fallback={<QuotationsPageSkeleton />}>
      <QuotationsListView />
    </Suspense>
  );
}
