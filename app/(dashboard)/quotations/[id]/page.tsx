import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { QuotationDetailView } from "@/features/quotations/quotation-detail-view";
import { QuotationDetailPageSkeleton } from "@/skeletons/(dashboard)/quotations/[id]/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.quotationDetailDefault;

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
