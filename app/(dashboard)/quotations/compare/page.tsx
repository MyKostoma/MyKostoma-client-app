import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { CompareQuotationsView } from "@/features/quotations/compare-quotations-view";

export const metadata: Metadata = PAGE_METADATA.quotationsCompare;

export default function CompareQuotationsPage() {
  return (
    <Suspense>
      <CompareQuotationsView />
    </Suspense>
  );
}
