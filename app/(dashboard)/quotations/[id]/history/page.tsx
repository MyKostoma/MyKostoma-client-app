import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { QuotationHistoryView } from "@/features/quotations/quotation-history-view";
import { QuotationHistoryPageSkeleton } from "@/skeletons/(dashboard)/quotations/[id]/history/page-skeleton";
import {
  DEFAULT_PROFESSIONAL_QUOTATIONS,
  DEFAULT_QUOTATIONS,
} from "@/features/quotations/data";

export const metadata: Metadata = PAGE_METADATA.quotationHistoryDefault;

export function generateStaticParams() {
  return [...DEFAULT_QUOTATIONS, ...DEFAULT_PROFESSIONAL_QUOTATIONS].map(
    (q) => ({
      id: q.id,
    })
  );
}

export default async function QuotationHistoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<QuotationHistoryPageSkeleton />}>
      <QuotationHistoryView quotationId={decodeURIComponent(id)} />
    </Suspense>
  );
}
