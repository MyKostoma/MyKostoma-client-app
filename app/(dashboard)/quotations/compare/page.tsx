import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { CompareQuotationsView } from "@/features/quotations/compare-quotations-view";

export const metadata: Metadata = PAGE_METADATA.quotationsCompare;

export default async function CompareQuotationsPage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const selectedIds = ids
    ? ids
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
    : undefined;

  return <CompareQuotationsView selectedIds={selectedIds} />;
}
