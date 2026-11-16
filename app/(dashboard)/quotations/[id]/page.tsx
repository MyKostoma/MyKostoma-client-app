import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { QuotationDetailView } from "@/features/quotations/quotation-detail-view";
import { QuotationDetailPageSkeleton } from "@/skeletons/(dashboard)/quotations/[id]/page-skeleton";
import {
  DEFAULT_PROFESSIONAL_QUOTATIONS,
  DEFAULT_QUOTATIONS,
} from "@/features/quotations/data";

export const metadata: Metadata = PAGE_METADATA.quotationDetailDefault;

export function generateStaticParams() {
  return [...DEFAULT_QUOTATIONS, ...DEFAULT_PROFESSIONAL_QUOTATIONS].map(
    (q) => ({
      id: q.id,
    })
  );
}

export default async function QuotationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<QuotationDetailPageSkeleton />}>
      <QuotationDetailView quotationId={decodeURIComponent(id)} />
    </Suspense>
  );
}
